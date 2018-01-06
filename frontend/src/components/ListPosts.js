import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPosts } from '../actions';
import sortBy from 'sort-by';
import { PostCard } from './PostableCard';
import FlipMove from 'react-flip-move';

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
    const { postsStore, orderBy, onEditPost } = this.props;
    let orderedPosts = [...postsStore.items];
    orderedPosts.sort(sortBy.apply(this, orderBy));
    return (
      <FlipMove>
        {orderedPosts.map(post =>
          <PostCard key={post.id} post={post} onEdit={onEditPost} />
        )}
      </FlipMove>
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
