import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPosts } from '../actions';
import './ListPosts.css';
import sortBy from 'sort-by';
import { ParentPostCard } from './PostCard';

class ListPosts extends Component {
  componentDidMount() {
    this.props.fetchPosts(this.props.selectedCategory);
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.selectedCategory !== prevProps.selectedCategory) {
      this.props.fetchPosts(this.props.selectedCategory);
    }
  }

  render() {
    const { postsStore, orderBy } = this.props;
    let orderedPosts = [...postsStore.items];
    orderedPosts.sort(sortBy(orderBy));
    return (
      <div>
        {orderedPosts.map(post =>
          <ParentPostCard key={post.id} post={post} />
        )}
      </div>
    );
  }
}

function mapStateToProps({ categories, posts }) {
  return {
    categoriesStore: categories,
    postsStore: {
      ...posts,
      items: Object.keys(posts.items).reduce((postsArray, postId) => {
        postsArray.push(posts.items[postId]);
        return postsArray;
      }, [])
    }
  };
}

export default connect(mapStateToProps, {
  fetchPosts
})(ListPosts);
