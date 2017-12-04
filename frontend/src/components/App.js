import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchCategories } from '../actions';
import { Route } from 'react-router-dom';
import Posts from './Posts'

class App extends Component {
  componentDidMount() {
    this.props.fetchCategories();
  }

  render() {
    const { categoriesStore } = this.props;
    return (
      <Route
        exact
        path="/:category?"
        render={({ match }) => {
          let selectedCategory = undefined;
          if (match.params.category) {
            const categoryPath = match.params.category;
            selectedCategory = categoriesStore.items.find(category => category.path == categoryPath);
          }
          return (
            <Posts category={selectedCategory} />
          );
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

export default connect(mapStateToProps, {
  fetchCategories
})(App);