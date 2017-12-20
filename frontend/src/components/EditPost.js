import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card, CardPrimary, CardTitle, CardSupportingText, CardActions, CardAction} from 'rmwc/Card';
import { TextField } from 'rmwc/TextField';
import { Select } from 'rmwc/Select';
import serializeForm from 'form-serialize';
import uuidv4 from 'uuid/v4';
import { fetchPostDetails } from '../actions';

class EditPost extends Component {
  componentDidMount() {
    
    /*
    Will refer to the post id on EditParentPost.
    And to the comment id on EditCommentPost.
    */
    const { postId, fetchDetails } = this.props;
    
    if (postId) {
      fetchDetails(postId);
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
    let values = {
      ...serializeForm(e.target, { hash: true }),
      id: uuidv4(),
      author: 'Fernando',
      timestamp: Date.now()
    };
    const { parentId, onSend } = this.props;
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
    const { categoryPath, onCancel, categoriesStore, isParent, postId, details } = this.props;
    return (
      <Card>
        {
          (postId === undefined || details) &&
          <form onSubmit={this.handleSubmit} ref={(form) => { this.form = form }}>
            {
              isParent &&
              <CardPrimary>
                <CardTitle large>
                  <TextField fullwidth name="title" label="Title" required defaultValue={postId ? details.title : ''} />
                </CardTitle>
              </CardPrimary>
            }
            {
              isParent &&
              <CardSupportingText>
                {
                  postId === undefined &&
                  <Select
                    cssOnly
                    name="category"
                    required
                    options={{
                      '': 'Pick a category',
                      ...categoriesStore.options
                    }}
                    defaultValue={categoryPath}
                  />
                }
              </CardSupportingText>
            }
            <CardSupportingText>
              <TextField name="body" textarea fullwidth rows="8" required defaultValue={postId ? details.body : ''} />
            </CardSupportingText>
            <CardActions>
              <CardAction type="submit">
              <i className="material-icons mdc-button__icon">send</i>
                Send
              </CardAction>
              {
                typeof onCancel === 'function' &&
                <CardAction onClick={onCancel}>
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

export const EditParentPost = connect(
  ({ categories, postDetails }) => (
    {
      isParent: true,
      details: postDetails.item,
      categoriesStore: {
        ...categories,
        options: categories.items.reduce((categoriesMap, category) => {
          categoriesMap[category.path] = category.name;
          return categoriesMap;
        }, {})
      }
  }),
  {
    fetchDetails: fetchPostDetails
  }
)(EditPost);

export const EditCommentPost = connect(() => (
  {
    isParent: false
  }
))(EditPost);