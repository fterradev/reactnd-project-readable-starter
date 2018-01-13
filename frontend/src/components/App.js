import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  fetchCategories,
  addPost,
  updatePost,
  login,
  restoreComment,
  permanentlyDeleteComment
} from '../actions';
import { Route, Switch, withRouter } from 'react-router-dom';
import AppToolbar from './AppToolbar';
import { Fab } from 'rmwc/Fab';
import { Snackbar } from 'rmwc/Snackbar';
import ListPosts from './ListPosts';
import ViewPost from './ViewPost';
import { EditPost } from './EditPostable';
import orderingOptions from '../orderingOptions';
import LoginDialog from './LoginDialog';
import { getUsername } from '../LocalStorageAPI';
import './App.css';
import { firstChars } from '../util';

class App extends Component {
  state = {
    orderPostsBy: orderingOptions.VOTE_SCORE.value,
    loginDialogIsOpen: false,
    showOrderingMenu: true,
    restoredComments: {}
  };

  componentDidMount() {
    this.props.fetchCategories();
    this.props.login(getUsername());
  }

  changeCategory = (categoryPath, history) => {
    history.push(categoryPath ? `/${categoryPath}` : '/');
  };

  onEditPost = (post, history) =>
    history.push(`/${post.category}/${post.id}/edit`, {
      fromEditButton: true
    });

  render() {
    const {
      categoriesStore,
      addPost,
      updatePost,
      deletedComments,
      permanentlyDeleteComment,
      restoreComment
    } = this.props;
    const { loginDialogIsOpen, showOrderingMenu } = this.state;
    return (
      <Route
        path="/:category?"
        render={({ match, history }) => {
          if (categoriesStore.items.length > 0) {
            let selectedCategory = undefined;
            if (match.params.category) {
              const categoryPath = match.params.category;
              selectedCategory = categoriesStore.items.find(
                category => category.path === categoryPath
              );
            }
            return (
              <div>
                {deletedComments.map(deletedComment => (
                  <Snackbar
                    key={deletedComment.id}
                    show={true}
                    onShow={() => {}}
                    timeout={6000}
                    onHide={() => {
                      if (deletedComment) {
                        permanentlyDeleteComment(deletedComment.id);
                      }
                    }}
                    message={`Comment "${firstChars(deletedComment.body)}" by ${
                      deletedComment.author
                    } deleted`}
                    actionText="Undo"
                    actionHandler={() => {
                      restoreComment(deletedComment);
                    }}
                    alignStart
                  />
                ))}
                <AppToolbar
                  selectedCategory={selectedCategory}
                  onChangeCategory={categoryPath => {
                    this.changeCategory(categoryPath, history);
                  }}
                  onChangeOrdering={orderBy => {
                    this.setState({
                      orderPostsBy: orderBy
                    });
                  }}
                  onOpenLogin={() =>
                    this.setState({
                      loginDialogIsOpen: true
                    })
                  }
                  onLogin={null}
                  showOrderingMenu={showOrderingMenu}
                />
                <LoginDialog
                  isOpen={loginDialogIsOpen}
                  onClose={() =>
                    this.setState({
                      loginDialogIsOpen: false
                    })
                  }
                />
                <Switch>
                  <Route
                    path="/:category?/add"
                    render={({ match, history, location }) => (
                      <EditPost
                        focus
                        categoryPath={match.params.category}
                        onSend={post => {
                          addPost(post).then(({ post }) =>
                            history.push(`/${post.category}/${post.id}`)
                          );
                        }}
                        onCancel={() => history.goBack()}
                      />
                    )}
                  />
                  <Route
                    exact
                    path="/:category?"
                    render={({ match, history }) => (
                      <div>
                        <Fab
                          className="app-fab app-fab--absolute"
                          onClick={evt =>
                            history.push(
                              `${
                                match.params.category
                                  ? `/${match.params.category}`
                                  : ''
                              }/add`
                            )
                          }
                        >
                          add
                        </Fab>
                        <ListPosts
                          selectedCategory={selectedCategory}
                          orderBy={this.state.orderPostsBy}
                          onEditPost={post => this.onEditPost(post, history)}
                          onComponentDidMount={() =>
                            this.setState({
                              showOrderingMenu: true
                            })
                          }
                          onComponentWillUnmount={() =>
                            this.setState({
                              showOrderingMenu: false
                            })
                          }
                        />
                      </div>
                    )}
                  />
                  <Route
                    path="/:category/:post_id/edit"
                    render={({ match, history }) => (
                      <EditPost
                        categoryPath={match.params.category}
                        postId={match.params.post_id}
                        onSend={post => {
                          updatePost(match.params.post_id, post).then(
                            ({ post }) =>
                              history.push(`/${post.category}/${post.id}`)
                          );
                        }}
                        onCancel={
                          history.location.state.fromEditButton
                            ? () => history.goBack()
                            : null
                        }
                      />
                    )}
                  />
                  <Route
                    path="/:category/:post_id"
                    render={({ match, history }) => (
                      <ViewPost
                        postId={match.params.post_id}
                        showDetails={true}
                        onEditPost={post => this.onEditPost(post, history)}
                        onAfterRemove={() => history.goBack()}
                      />
                    )}
                  />
                </Switch>
              </div>
            );
          } else {
            return null;
          }
        }}
      />
    );
  }
}

function mapStateToProps({ categories, deletedComments }) {
  return {
    categoriesStore: categories,
    deletedComments: deletedComments.items
  };
}

export default withRouter(
  //allows for re-rendering when url changes
  connect(mapStateToProps, {
    fetchCategories,
    addPost,
    updatePost,
    login,
    permanentlyDeleteComment,
    restoreComment
  })(App)
);
