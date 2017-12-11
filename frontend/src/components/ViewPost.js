import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPostDetails, fetchPostComments } from '../actions';
import { ParentPostCard, CommentPostCard } from './PostCard';
import { Typography } from 'rmwc/Typography';
import sortBy from 'sort-by';

class ViewPost extends Component {
  componentDidMount() {
    const { postId, fetchPostDetails, fetchPostComments } = this.props;
    fetchPostDetails(postId);
    fetchPostComments(postId);
  }
  
  render() {
    const { postDetails, commentsStore } = this.props;
    const post = postDetails.item;
    let orderedComments = [...commentsStore.items];
    orderedComments.sort(sortBy('-voteScore'));
    return (
      <div>
        {
          post &&
          <ParentPostCard post={post}>
            <Typography use="title">Comments</Typography>
            <div>
              {
                orderedComments.map(
                  comment => (
                    <CommentPostCard key={comment.id} post={comment} />
                  )
                )
              }
            </div>
          </ParentPostCard>
        }
      </div>
    );
  }
}

function mapStateToProps({ postDetails, comments }) {
  return {
    postDetails,
    commentsStore: comments
  };
}

export default connect(mapStateToProps, {
  fetchPostDetails,
  fetchPostComments
})(ViewPost);