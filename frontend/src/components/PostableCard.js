import React, { Component } from 'react';
import { Typography } from 'rmwc/Typography';
import {
  Card,
  CardPrimary,
  CardTitle,
  CardSubtitle,
  CardSupportingText,
  CardActions,
  CardAction
} from 'rmwc/Card';
import { Button } from 'rmwc/Button';
import { Link } from 'react-router-dom';
import { votePost, deletePost, voteComment, deleteComment } from '../actions';
import { connect } from 'react-redux';
import nl2br from 'react-nl2br';
import { SimpleDialog } from 'rmwc/Dialog';

class PostableCard extends Component {
  state = {
    deleteDialogOpen: false
  };

  remove = postableId => {
    const { remove, onAfterRemove } = this.props;
    if (remove) {
      remove(postableId).then(() => {
        if (onAfterRemove) {
          onAfterRemove();
        }
      });
    }
  };

  render() {
    const {
      postable,
      children,
      isDetails,
      vote,
      isPost,
      onEdit,
      confirmRemoval,
      typeName
    } = this.props;

    const { deleteDialogOpen } = this.state;

    return (
      <div>
        <SimpleDialog
          title={`Delete ${typeName}`}
          body={`Are you sure you want to delete this ${typeName}? This cannot be undone.`}
          open={deleteDialogOpen}
          onClose={() => this.setState({ deleteDialogOpen: false })}
          onAccept={() => this.remove(postable.id)}
        />
        <Card>
          <CardPrimary>
            <CardTitle large>
              {isDetails ? (
                <span>{postable.title}</span>
              ) : (
                <Link to={`/${postable.category}/${postable.id}`}>
                  {postable.title}
                </Link>
              )}
            </CardTitle>
            <CardSubtitle>
              {new Date(postable.timestamp).toLocaleString()} by{' '}
              {postable.author}
            </CardSubtitle>
          </CardPrimary>
          {isDetails && (
            <CardSupportingText>
              <Typography use="body2">{nl2br(postable.body)}</Typography>
            </CardSupportingText>
          )}
          <CardSupportingText>
            <Typography use="button">{postable.voteScore} votes</Typography>
            &nbsp;
            <Button
              compact
              className="voteButton"
              onClick={() => vote(postable.id, 'upVote')}
            >
              <i className="material-icons mdc-button__icon">thumb_up</i>
            </Button>
            &nbsp;
            <Button
              compact
              className="voteButton"
              onClick={() => vote(postable.id, 'downVote')}
            >
              <i className="material-icons mdc-button__icon">thumb_down</i>
            </Button>
          </CardSupportingText>
          {isPost && (
            <CardSupportingText>
              <Typography use="button">
                {postable.commentCount} comments
              </Typography>
            </CardSupportingText>
          )}
          <CardActions>
            <CardAction onClick={() => onEdit(postable)}>
              <i className="material-icons mdc-button__icon">edit</i>
              Edit
            </CardAction>
            <CardAction
              onClick={() =>
                confirmRemoval
                  ? this.setState({
                      deleteDialogOpen: true
                    })
                  : this.remove(postable.id)
              }
              elementRef={button => (this.deleteButton = button)}
            >
              <i className="material-icons mdc-button__icon">delete</i>
              Remove
            </CardAction>
          </CardActions>
          <CardSupportingText>{children}</CardSupportingText>
        </Card>
      </div>
    );
  }
}

export const PostCard = connect(
  (props, ownProps) => ({
    postable: ownProps.post,
    typeName: 'post',
    isPost: true,
    confirmRemoval: true
  }),
  {
    vote: votePost,
    remove: deletePost
  }
)(PostableCard);

export const CommentCard = connect(
  (props, ownProps) => ({
    postable: ownProps.comment,
    typeName: 'comment',
    isPost: false,
    isDetails: true
  }),
  {
    vote: voteComment,
    remove: deleteComment
  }
)(PostableCard);
