import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card, CardPrimary, CardTitle, CardSupportingText, CardActions, CardAction} from 'rmwc/Card';
import { TextField } from 'rmwc/TextField';
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
                  /**
                  * TODO: Remove css loading when updating to a rmwc version with MDC 27.
                  */
                }
                {
                  postId === undefined &&
                  <div>
                    <link
                      rel="stylesheet"
                      href="https://unpkg.com/material-components-web@0.27.0/dist/material-components-web.min.css" />
                    <div className="mdc-select">
                      <select className="mdc-select__surface" required="true" name="category" defaultValue={categoryPath}>
                        <option value="">Pick a category</option>
                        {
                          categoriesStore.items.map(category => (
                            <option key={category.path} value={category.path}>{category.name}</option>
                          ))
                        }
                      </select>
                      <div className="mdc-select__bottom-line"></div>
                    </div>
                  </div>
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