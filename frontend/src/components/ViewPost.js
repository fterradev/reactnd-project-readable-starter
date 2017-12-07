import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPostDetails, fetchPostComments } from '../actions';
import PostCard from './PostCard';

class ViewPost extends Component {
  componentDidMount() {
    const { postSummary, postId, showDetails, fetchPostDetails, fetchPostComments } = this.props;
    if (showDetails) {
      fetchPostDetails(postId);
      fetchPostComments(postId);
    }
  }
  
  render() {
    const { showDetails, postDetails, postSummary } = this.props;
    const post = showDetails ? postDetails.item : postSummary;
    return (
      <div>
        {
          post &&
          <PostCard post={post} showBody={true}>
            <div>
            </div>
          </PostCard>
        }
      </div>
    );
  }
}

function mapStateToProps({ postDetails, comments }) {
  return {
    postDetails,
    comments
  };
}

export default connect(mapStateToProps, {
  fetchPostDetails,
  fetchPostComments
})(ViewPost);