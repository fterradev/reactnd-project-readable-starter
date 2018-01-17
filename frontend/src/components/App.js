import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  fetchCategories,
  addPost,
  updatePost,
  login,
  restoreComment,
  permanentlyDeletePost,
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
import { Button } from 'rmwc/Button';

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
      deletedPosts,
      permanentlyDeletePost,
      deletedComments,
      permanentlyDeleteComment,
      restoreComment
    } = this.props;
    const { loginDialogIsOpen, showOrderingMenu } = this.state;
    return (
      <div id="top">
        {deletedPosts.map(deletedPost => (
          <Snackbar
            key={deletedPost.id}
            className="mdc-snackbar--actionless"
            show={true}
            timeout={6000}
            onHide={() => {
              if (deletedPost) {
                permanentlyDeletePost(deletedPost.id);
              }
            }}
            message={`Post "${firstChars(deletedPost.title)}" by "${
              deletedPost.author
            }" deleted`}
            actionText=" "
            actionHandler={() => {}}
            alignStart
          />
        ))}
        {deletedComments.map(deletedComment => (
          <Snackbar
            key={deletedComment.id}
            show={true}
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
                          onCancel={
                            location.state && location.state.fromAddButton
                              ? () => history.goBack()
                              : null
                          }
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
                                }/add`,
                                {
                                  fromAddButton: true
                                }
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
                          {match.params.category && (
                            <Button
                              onClick={() => this.props.history.push(`/`)}
                            >{`See all posts`}</Button>
                          )}
                        </div>
                      )}
                    />
                    <Route
                      path="/:category/:post_id/edit"
                      render={({ match, history, location }) => (
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
                            location.state && location.state.fromEditButton
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
                          category={selectedCategory}
                        />
                      )}
                    />
                  </Switch>
                  <Button onClick={() => window.scrollTo(0, 0)}>
                    Back to top
                  </Button>
                </div>
              );
            } else {
              return null;
            }
          }}
        />
      </div>
    );
  }
}

function mapStateToProps({ categories, deletedPosts, deletedComments }) {
  return {
    categoriesStore: categories,
    deletedPosts: deletedPosts.items,
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
    permanentlyDeletePost,
    permanentlyDeleteComment,
    restoreComment
  })(App)
);
