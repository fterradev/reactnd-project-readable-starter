import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  fetchCategories,
  addPost,
  updatePost,
  login,
  restoreComment,
  permanentlyDeleteComment,
  restorePost,
  permanentlyDeletePost
} from '../actions';
import { Route, Switch, withRouter } from 'react-router-dom';
import AppToolbar from './AppToolbar';
import { Fab } from 'rmwc/Fab';
import $ from 'jquery';
import 'snackbarjs';
import ListPosts from './ListPosts';
import ViewPost from './ViewPost';
import { EditPost } from './EditPostable';
import orderingOptions from '../orderingOptions';
import LoginDialog from './LoginDialog';
import { getUsername } from '../LocalStorageAPI';
import './App.css';

class App extends Component {
  state = {
    orderPostsBy: orderingOptions.VOTE_SCORE.value,
    loginDialogIsOpen: false,
    showOrderingMenu: true
  };

  componentDidMount() {
    this.props.fetchCategories();
    this.props.login(getUsername());
  }

  showSnackbar() {
    const options =  {
      content: `
      <div class="mdc-snackbar__text">Message sent</div>
      <div class="mdc-snackbar__action-wrapper">
        <button type="button" class="mdc-snackbar__action-button">Undo</button>
      </div>`, // text of the snackbar
      style: 'mdc-snackbar--align-start mdc-snackbar--active',
      timeout: 0, // time in milliseconds after the snackbar autohides, 0 is disabled
      htmlAllowed: true, // allows HTML as content value
      onClose: function(){ } // callback called when the snackbar gets closed.
    }
    $.snackbar(options);
  }

  showDeletedCommentSnackbar() {
    this.showSnackbar();
  }

  componentDidUpdate() {
    this.showDeletedCommentSnackbar();
  }

  changeCategory = (categoryPath, history) => {
    history.push(categoryPath ? `/${categoryPath}` : '/');
  };

  onEditPost = (post, history) => history.push(
    `/${post.category}/${post.id}/edit`,
    {
      fromEditButton: true
    }
  );

  render() {
    const {
      categoriesStore, 
      addPost,
      updatePost,
      deletedPost,
      deletedCommentStore,
      permanentlyDeleteComment,
      restoreComment,
      permanentlyDeletePost,
      restorePost
    } = this.props;
    const { loginDialogIsOpen, showOrderingMenu } = this.state;
    return (
      <div>
        <Route
          path="/:category?"
          render={({ match, history }) => {
            if (categoriesStore.items.length > 0) {
              let selectedCategory = undefined;
              if (match.params.category) {
                const categoryPath = match.params.category;
                selectedCategory = categoriesStore.items.find(category => category.path === categoryPath);
              }
              return (
                <div>
                  <AppToolbar
                    selectedCategory={selectedCategory}
                    onChangeCategory={(categoryPath) => {
                      this.changeCategory(categoryPath, history);
                    }}
                    onChangeOrdering={orderBy => {
                      this.setState({
                        orderPostsBy: orderBy
                      });
                    }}
                    onOpenLogin={() => this.setState({
                      loginDialogIsOpen: true
                    })}
                    onLogin={null}
                    showOrderingMenu={showOrderingMenu}
                  />
                  <LoginDialog
                    isOpen={loginDialogIsOpen}
                    onClose={() => this.setState({
                      loginDialogIsOpen: false
                    })}
                  />
                  <div>
                    DELITEM: {JSON.stringify(deletedCommentStore.item)}
                  </div>
                  <Switch>
                    <Route
                      path="/:category?/add"
                      render={({ match, history, location }) => (
                        <EditPost
                          focus
                          categoryPath={match.params.category}
                          onSend={(post) => {
                            addPost(post).then(
                              ({ post }) =>
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
                            onClick={evt => history.push(
                              `${match.params.category ? `/${match.params.category}` : ''}/add`
                            )}
                          >
                            add
                          </Fab>
                          <ListPosts
                            selectedCategory={selectedCategory}
                            orderBy={this.state.orderPostsBy}
                            onEditPost={(post) => this.onEditPost(post, history)}
                            onComponentDidMount={() => this.setState({
                              showOrderingMenu: true
                            })}
                            onComponentWillUnmount={() => this.setState({
                              showOrderingMenu: false
                            })}
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
                          onSend={(post) => {
                            updatePost(match.params.post_id, post).then(
                              ({ post }) =>
                                history.push(`/${post.category}/${post.id}`)
                            );
                          }}
                          onCancel={
                            (history.location.state.fromEditButton)
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
                          onEditPost={(post) => this.onEditPost(post, history)}
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
      </div>
    );
  }
}

function mapStateToProps({ categories, deletedPost, deletedComment }) {
  return {
    categoriesStore: categories,
    deletedPostStore: deletedPost,
    deletedCommentStore: deletedComment
  };
}

export default withRouter( //allows for re-rendering when url changes
  connect(mapStateToProps, {
    fetchCategories,
    addPost,
    updatePost,
    login,
    permanentlyDeleteComment,
    restoreComment,
    permanentlyDeletePost,
    restorePost
  })(App)
);