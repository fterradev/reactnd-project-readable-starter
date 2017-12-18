import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPostDetails, fetchPostComments, addComment } from '../actions';
import { ParentPostCard, CommentPostCard } from './PostCard';
import { Typography } from 'rmwc/Typography';
import sortBy from 'sort-by';
import FlipMove from 'react-flip-move';
import { EditCommentPost } from './EditPost';

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
          <ParentPostCard
            post={post}
            isDetails={true}
            onAfterRemove={this.props.onAfterRemove}
          >
            <Typography use="title">Comments</Typography>
            <EditCommentPost
              onSend={(comment, callback) => {
                this.props.addComment(comment).then(callback);
              }}
              parentId={post.id}
            />
            <FlipMove>
              {
                orderedComments.map(comment => (
                  <CommentPostCard key={comment.id} id={comment.id} post={comment} />
                ))
              }
            </FlipMove>
          </ParentPostCard>
        }
      </div>
    );
  }
}

function mapStateToProps({ postDetails, comments }) {
  return {
    postDetails,
    commentsStore: {
      ...comments,
      items: Object.keys(comments.items).reduce((commentsArray, commentId) => {
        commentsArray.push(comments.items[commentId]);
        return commentsArray;
      }, [])
    }
  };
}

export default connect(mapStateToProps, {
  fetchPostDetails,
  fetchPostComments,
  addComment
})(ViewPost);