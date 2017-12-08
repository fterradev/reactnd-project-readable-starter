import React, { Component } from 'react';
import { Typography } from 'rmwc/Typography';
import { Card, CardPrimary, CardTitle, CardSubtitle, CardSupportingText, CardActions, CardAction} from 'rmwc/Card';
import { Button } from 'rmwc/Button';
import { Link } from 'react-router-dom';
import { votePost } from '../actions';
import { connect } from 'react-redux';

class PostCard extends Component {
  render() {
    const { post, children, hideBody, vote, isParent, postDetailsStore } = this.props;
    const showBody = !hideBody;
    const voteScore =
      (postDetailsStore.item && postDetailsStore.item.id === post.id)
        ? postDetailsStore.item.voteScore
        : post.voteScore;
    return (
      <Card key={post.id}>
        <CardPrimary>
          <CardTitle large><Link to={`/${post.category}/${post.id}`}>{post.title}</Link></CardTitle>
          <CardSubtitle>{(new Date(post.timestamp)).toDateString()} by {post.author}</CardSubtitle>
        </CardPrimary>
        {
          showBody &&
          <CardSupportingText>
            <Typography use="body2">{post.body}</Typography>
          </CardSupportingText>
        }
        <CardSupportingText>
          <Typography use="button">{voteScore} votes</Typography><br />
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
          <CardAction>
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

function mapParentStateToProps({ postDetails }) {
  return {
    postDetailsStore: postDetails,
    isParent: true
  };
}
export const ParentPostCard = connect(
  mapParentStateToProps,
  {
    vote: votePost,
  }
)(PostCard);

function mapCommentStateToProps() {
  return {
    postDetailsStore: {}, // TODO: set this to commentDetails
    isParent: true
  };
}
export const CommentPostCard = connect(
  mapCommentStateToProps,
  {
    vote: undefined
  }
)(PostCard);