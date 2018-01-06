import React, { Component } from 'react';
import { connect } from 'react-redux';
import { CommentCard } from './PostableCard';
import { EditComment } from './EditPostable';
import { updateComment } from '../actions';

class EditableComment extends Component {
  state = {
    edit: false
  };
  
  render() {
    const { edit } = this.state;
    const { comment, updateComment } = this.props;
    const commentId = comment.id;
    return (
      edit ?
        <EditComment
          commentId={comment.id}
          onSend={(comment) => {
            updateComment(commentId, comment).then(
              () =>
              this.setState({
                edit: false
              })
            );
          }}
          onCancel={
            () => this.setState({
              edit: false
            })
          }
        />
      :
        <CommentCard
          comment={comment}
          onEdit={() => this.setState({
            edit: true
          })}
        />
    );
  }
}

function mapStateToProps() {
  return {};
}

export default connect(mapStateToProps, {
  updateComment
})(EditableComment);