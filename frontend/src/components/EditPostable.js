import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card, CardPrimary, CardTitle, CardSupportingText, CardActions, CardAction} from 'rmwc/Card';
import { TextField } from 'rmwc/TextField';
import { Select } from 'rmwc/Select';
import serializeForm from 'form-serialize';
import uuidv4 from 'uuid/v4';
import { fetchPostDetails, fetchCommentDetails } from '../actions';

class EditPostable extends Component {
  
  componentDidMount(prevProps) {
    const { postableId, fetchDetails } = this.props;
    
    if (postableId) {
      fetchDetails(postableId);
    }

    if (this.props.focus) {
      const firstField = this.form.elements.length > 0 ? this.form.elements[0] : null;
      if (firstField) {
        firstField.focus();
      }
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    let values = serializeForm(e.target, { hash: true });
    const { postableId, parentId, username, onSend, updateTimestamp } = this.props;
    if (!postableId) {
      values = {
        ...values,
        id: uuidv4(),
        author: username
      };
    }
    if (!postableId || updateTimestamp) {
      values.timestamp = Date.now();
    }
    if (parentId) {
      values.parentId = parentId;
    }
    if (onSend) {
      onSend(values, () => {
        this.form.reset();
      })
    }
  }

  render() {
    const { categoryPath, onCancel, categoriesStore, isPost, postableId, details } = this.props;
    return (
      <Card>
        {
          (
            postableId === undefined
            ||

            /*
            The condition below is essential to make the component render the
            desired details instead of other post's details previously fetched.
            This happens because defaultValue props doesn't get updated, so it
            must render with proper values at the very first time.
            */
            (details && details.id === postableId)
          ) &&
          <form onSubmit={this.handleSubmit} ref={(form) => { this.form = form }}>
            {
              isPost &&
              <CardPrimary>
                <CardTitle large>
                  <TextField fullwidth name="title" label="Title" required defaultValue={postableId ? details.title : ''} />
                </CardTitle>
              </CardPrimary>
            }
            {
              isPost &&
              <CardSupportingText>
                {
                  postableId === undefined &&
                  <Select
                    cssOnly
                    name="category"
                    required
                    options={{
                      '': 'Pick a category',
                      ...categoriesStore.options
                    }}
                    defaultValue={categoryPath}
                    tabIndex=""
                  />
                }
              </CardSupportingText>
            }
            <CardSupportingText>
              <TextField name="body" textarea fullwidth rows="8" required defaultValue={postableId ? details.body : ''} />
            </CardSupportingText>
            <CardActions>
              <CardAction type="submit">
              <i className="material-icons mdc-button__icon">send</i>
                Send
              </CardAction>
              {
                typeof onCancel === 'function' &&
                <CardAction type="button" onClick={onCancel}>
                <i className="material-icons mdc-button__icon">cancel</i>
                  Cancel
                </CardAction>
              }
            </CardActions>
          </form>
        }
      </Card>
    );
  }
}

export const EditPost = connect(
  ({ categories, postDetails, app }, ownProps) => (
    {
      postableId: ownProps.postId,
      isPost: true,
      details: postDetails.item,
      isFetching: postDetails.isFetching,
      categoriesStore: {
        ...categories,
        options: categories.items.reduce((categoriesMap, category) => {
          categoriesMap[category.path] = category.name;
          return categoriesMap;
        }, {})
      },
      username: app.username
  }),
  {
    fetchDetails: fetchPostDetails
  }
)(EditPostable);

export const EditComment = connect(
  ({ comments, app }, ownProps) => (
    {
      postableId: ownProps.commentId,
      isPost: false,
      details: comments.items[ownProps.commentId]
        ? comments.items[ownProps.commentId].item // Allows multiple comments opened for edition.
        : undefined,
      isFetching: comments.items[ownProps.commentId]
        ? comments.items[ownProps.commentId].isFetching
        : false,
      username: app.username
    }
  ),
  {
    fetchDetails: fetchCommentDetails
  }
)(EditPostable);