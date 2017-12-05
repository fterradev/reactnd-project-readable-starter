import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchCategories } from '../actions';
import { Route, withRouter } from 'react-router-dom';
import AppToolbar from './AppToolbar';
import ListPosts from './ListPosts';

class App extends Component {
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
        exact
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
                <AppToolbar selectedCategory={selectedCategory} onChangeCategory={categoryPath => {
                  this.changeCategory(categoryPath, history);
                }} />
                <ListPosts selectedCategory={selectedCategory} />
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