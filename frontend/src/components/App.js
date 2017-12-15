import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchCategories, addPost } from '../actions';
import { Route, Switch, withRouter } from 'react-router-dom';
import AppToolbar from './AppToolbar';
import { Fab } from 'rmwc';
import ListPosts from './ListPosts';
import ViewPost from './ViewPost';
import { EditParentPost } from './EditPost';
import './App.css';

class App extends Component {
  state = {
    orderPostsBy: '-voteScore'
  };

  componentDidMount() {
    this.props.fetchCategories();
  }

  changeCategory = (categoryPath, history) => {
    history.push(categoryPath ? `/${categoryPath}` : '/');
  };

  createPost = (post) => (
    this.props.addPost(post)
  );

  render() {
    const { categoriesStore } = this.props;
    return (
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
                />
                <Switch>
                  <Route
                    path="/:category?/add"
                    render={({ match, history, location }) => (
                      <EditParentPost
                        focus
                        categoryPath={match.params.category}
                        onSend={(post) => {
                          this.createPost(post).then(
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
                        <ListPosts selectedCategory={selectedCategory} orderBy={this.state.orderPostsBy} />
                      </div>
                    )}
                  />
                  <Route
                    path="/:category/:post_id"
                    render={({ match, history }) => (
                      <ViewPost
                        postId={match.params.post_id}
                        showDetails={true}
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

function mapStateToProps({ categories }) {
  return {
    categoriesStore: categories
  };
}

export default withRouter( //allows for re-rendering when url changes
  connect(mapStateToProps, {
    fetchCategories,
    addPost
  })(App)
);