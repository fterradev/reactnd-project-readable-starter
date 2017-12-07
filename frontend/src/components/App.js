import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchCategories } from '../actions';
import { Route, withRouter } from 'react-router-dom';
import AppToolbar from './AppToolbar';
import ListPosts from './ListPosts';
import ViewPost from './ViewPost'

class App extends Component {
  state = {
    orderPostsBy: '-voteScore'
  };

  componentDidMount() {
    this.props.fetchCategories();
  }

  changeCategory = (categoryPath, history) => {
    history.replace({
      pathname: categoryPath ? `/${categoryPath}` : '/'
    });
  }

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
                <Route
                  exact
                  path="/:category?"
                  render={({ history }) => (
                    <ListPosts selectedCategory={selectedCategory} orderBy={this.state.orderPostsBy} />
                  )}
                />
                <Route
                  path="/:category/:post_id"
                  render={({ match }) => (
                    <ViewPost postId={match.params.post_id} showDetails={true} />
                  )}
                />
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
    fetchCategories
  })(App)
);