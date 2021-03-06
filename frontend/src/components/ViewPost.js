import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPostDetails, fetchPostComments, addComment } from '../actions';
import { PostCard } from './PostableCard';
import EditableComment from './EditableComment';
import { Typography } from 'rmwc/Typography';
import sortBy from 'sort-by';
import FlipMove from 'react-flip-move';
import { EditComment } from './EditPostable';
import orderingOptions from '../orderingOptions';
import { Button } from 'rmwc/Button';
import { withRouter } from 'react-router-dom';

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
    return sortBy.apply(this, orderingOptions.VOTE_SCORE.value)(
      commentA,
      commentB
    );
  };

  onSendComment = (comment, callback) => {
    this.props.addComment(comment).then(callback);

    /*
    Shows the newly created comment at the top of the comments.
    It will stay there just for a moment so the user can confirm the submit
    succedded; it is subsequently moved in an animated way to its correct
    position according to the sorting rules, which is started off at the
    onFinish event of the FlipMove component.
    */
    this.setState({
      newCommentId: comment.id
    });
  };

  render() {
    const {
      postDetails,
      commentsStore,
      onEditPost,
      category,
      postId
    } = this.props;
    const post = postDetails.item;
    let orderedComments = [...commentsStore.items];
    orderedComments.sort(this.sortComments);
    return (
      <div>
        {post &&
          post.id === postId && (
            <PostCard
              post={post}
              isDetails={true}
              onAfterRemove={this.props.onAfterRemove}
              onEdit={onEditPost}
            >
              <Typography use="title">Comments</Typography>
              <EditComment onSend={this.onSendComment} parentId={post.id} />
              <FlipMove
                onFinish={editableComment => {
                  if (
                    editableComment.props.comment.id === this.state.newCommentId
                  ) {
                    this.setState({
                      newCommentId: null
                    });
                  }
                }}
              >
                {orderedComments.map(
                  comment =>
                    comment.parentId === postId && (
                      <EditableComment key={comment.id} comment={comment} />
                    )
                )}
              </FlipMove>
              <Button
                onClick={() => this.props.history.push(`/${category.path}`)}
              >{`See all ${category.name} posts`}</Button>
            </PostCard>
          )}
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
        commentsArray.push(comments.items[commentId].item);
        return commentsArray;
      }, [])
    }
  };
}

export default withRouter(
  connect(mapStateToProps, {
    fetchPostDetails,
    fetchPostComments,
    addComment
  })(ViewPost)
);
