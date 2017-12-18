import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPostDetails, fetchPostComments, addComment } from '../actions';
import { ParentPostCard, CommentPostCard } from './PostCard';
import { Typography } from 'rmwc/Typography';
import sortBy from 'sort-by';
import FlipMove from 'react-flip-move';
import { EditCommentPost } from './EditPost';

class ViewPost extends Component {
  state = {
    newCommentId: null
  };
  
  componentDidMount() {
    const { postId, fetchPostDetails, fetchPostComments } = this.props;
    fetchPostDetails(postId);
    fetchPostComments(postId);
  }

  /**
   * Allows for the newly created comment to be the first at the ordering.
   */
  sortComments = (commentA, commentB) => {
    const { newCommentId } = this.state;
    switch (newCommentId) {
      case commentA.id:
        return -1;
      case commentB.id:
        return 1;
      default: //do nothing
    }
    return sortBy('-voteScore')(commentA, commentB);
  };
  
  render() {
    const { postDetails, commentsStore } = this.props;
    const post = postDetails.item;
    let orderedComments = [...commentsStore.items];
    orderedComments.sort(this.sortComments);
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
                this.setState(
                  {
                    newCommentId: comment.id
                  },
                  () => this.props.addComment(comment).then(callback)
                )
              }}
              parentId={post.id}
            />
            <FlipMove
              onFinish={(commentPostCard) => {
                if (commentPostCard.props.post.id === this.state.newCommentId) {
                  this.setState({
                    newCommentId: null
                  });
                }
              }}
            >
              {
                orderedComments.map(comment => (
                  <CommentPostCard key={comment.id} id={comment.id} post={comment} onLoad={() => console.log('eeeee')} />
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