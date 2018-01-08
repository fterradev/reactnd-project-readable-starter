import React, { Component } from 'react';
import { Typography } from 'rmwc/Typography';
import { Card, CardPrimary, CardTitle, CardSubtitle, CardSupportingText, CardActions, CardAction } from 'rmwc/Card';
import { Button } from 'rmwc/Button';
import { Link } from 'react-router-dom';
import { votePost, deletePost, voteComment, deleteComment } from '../actions';
import { connect } from 'react-redux';
import nl2br from 'react-nl2br';

class PostableCard extends Component {

  remove = (postableId) => {
    if (this.props.remove) {
      this.props.remove(postableId).then(() => {
        if (this.props.onAfterRemove) {
          this.props.onAfterRemove();
        }
      });
    }
  };

  render() {
    const { postable, children, isDetails, vote, isPost, onEdit } = this.props;
    return (
      <Card>
        <CardPrimary>
          <CardTitle large>
            {
              isDetails
                ? <span>{postable.title}</span>
                : <Link to={`/${postable.category}/${postable.id}`}>{postable.title}</Link>
            }
          </CardTitle>
          <CardSubtitle>{(new Date(postable.timestamp)).toLocaleString()} by {postable.author}</CardSubtitle>
        </CardPrimary>
        {
          isDetails &&
          <CardSupportingText>
            <Typography use="body2">{nl2br(postable.body)}</Typography>
          </CardSupportingText>
        }
        <CardSupportingText>
          <Typography use="button">{postable.voteScore} votes</Typography><br />
          <Button stroked onClick={() => vote(postable.id, 'upVote')}>
            <i className="material-icons mdc-button__icon">arrow_upward</i>
            Upvote
          </Button>&nbsp;
          <Button stroked onClick={() => vote(postable.id, 'downVote')}>
            <i className="material-icons mdc-button__icon">arrow_downward</i>
            Downvote
          </Button>
        </CardSupportingText>
        {
          isPost &&
          <CardSupportingText>
            <Typography use="button">{postable.commentCount} comments</Typography>
          </CardSupportingText>
        }
        <CardActions>
          <CardAction onClick={() => onEdit(postable)}>
            <i className="material-icons mdc-button__icon">edit</i>
            Edit
          </CardAction>
          <CardAction onClick={() => this.remove(postable.id)}>
            <i className="material-icons mdc-button__icon">delete</i>
            Remove
          </CardAction>
        </CardActions>
        <CardSupportingText>
          {children}
        </CardSupportingText>
      </Card>
    );
  }
}

export const PostCard = connect(
  (props, ownProps) => ({
    postable: ownProps.post,
    isPost: true
  }),
  {
    vote: votePost,
    remove: deletePost
  }
)(PostableCard);

export const CommentCard = connect(
  (props, ownProps) => ({
    postable: ownProps.comment,
    isPost: false,
    isDetails: true
  }),
  {
    vote: voteComment,
    remove: deleteComment
  }
)(PostableCard);