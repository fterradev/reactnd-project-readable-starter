import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPosts } from '../actions';
import './ListPosts.css';
import { Fab } from 'rmwc';
import sortBy from 'sort-by';
import { Link } from 'react-router-dom';
import PostCard from './PostCard';

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
        <Fab className="app-fab app-fab--absolute" onClick={evt => this.setState({postFormDialogIsOpen: true})}>add</Fab>
        {orderedPosts.map(post =>
          <PostCard key={post.id} post={post} hideBody={true} />
        )}
      </div>
    );
  }
}

function mapStateToProps({ categories, posts }) {
  return {
    categoriesStore: categories,
    postsStore: posts
  };
}

export default connect(mapStateToProps, {
  fetchPosts
})(ListPosts);
