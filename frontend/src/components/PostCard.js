import React, { Component } from 'react';
import { Typography } from 'rmwc/Typography';
import { Card, CardPrimary, CardTitle, CardSubtitle, CardSupportingText, CardActions, CardAction} from 'rmwc/Card';
import { Button } from 'rmwc/Button';
import { Link } from 'react-router-dom';
import { votePost, voteComment, deletePost } from '../actions';
import { connect } from 'react-redux';

class PostCard extends Component {

  remove = (id) => {
    if (this.props.remove) {
      this.props.remove(id).then(() => {
        if (this.props.onAfterRemove) {
          this.props.onAfterRemove();
        }
      });
    }
  };
  
  render() {
    const { post, children, isDetails, vote, isParent } = this.props;
    return (
      <Card>
        <CardPrimary>
          <CardTitle large>
            {
              isDetails
              ? <span>{post.title}</span>
              : <Link to={`/${post.category}/${post.id}`}>{post.title}</Link>
            }
          </CardTitle>
          <CardSubtitle>{(new Date(post.timestamp)).toDateString()} by {post.author}</CardSubtitle>
        </CardPrimary>
          <CardSupportingText>
            <Typography use="body2">{post.body}</Typography>
          </CardSupportingText>
        <CardSupportingText>
          <Typography use="button">{post.voteScore} votes</Typography><br />
          <Button stroked onClick={() => vote(post.id, 'upVote')}>
            <i className="material-icons mdc-button__icon">arrow_upward</i>
            Upvote
          </Button>&nbsp;
          <Button stroked onClick={() => vote(post.id, 'downVote')}>
            <i className="material-icons mdc-button__icon">arrow_downward</i>
            Downvote
          </Button>
        </CardSupportingText>
        {
          isParent &&
          <CardSupportingText>
            <Typography use="button">{post.commentCount} comments</Typography>
          </CardSupportingText>
        }
        <CardActions>
          <CardAction>
          <i className="material-icons mdc-button__icon">edit</i>
            Edit
          </CardAction>
          <CardAction onClick={() => this.remove(post.id)}>
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

function prepareMapStateToProps(isParent) {
  return () => ({
    isParent
  });
}

export const ParentPostCard = connect(
  prepareMapStateToProps(true),
  {
    vote: votePost,
    remove: deletePost
  }
)(PostCard);

export const CommentPostCard = connect(
  prepareMapStateToProps(false),
  {
    vote: voteComment
  }
)(PostCard);