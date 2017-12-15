import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card, CardPrimary, CardTitle, CardSupportingText, CardActions, CardAction} from 'rmwc/Card';
import { TextField } from 'rmwc/TextField';
import serializeForm from 'form-serialize';
import uuidv4 from 'uuid/v4';

class EditPost extends Component {
  componentDidMount() {
    this.titleInput.focus();
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const values = {
      ...serializeForm(e.target, { hash: true }),
      id: uuidv4(),
      author: 'Fernando',
      timestamp: Date.now()
    };
    if (this.props.onCreate) {
      this.props.onCreate(values);
    }
  }

  render() {
    const { categoryPath, onExit, categoriesStore, isParent } = this.props;
    return (
      <Card>
        <form onSubmit={this.handleSubmit}>
          {
            isParent &&
            <CardPrimary>
              <CardTitle large>
                <TextField fullwidth name="title" label="Title" required inputRef={(input) => { this.titleInput = input }} />
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
            </CardSupportingText>
          }
          <CardSupportingText>
            <TextField name="body" textarea fullwidth rows="8" required />
          </CardSupportingText>
          <CardActions>
            <CardAction type="submit">
            <i className="material-icons mdc-button__icon">send</i>
              Send
            </CardAction>
            <CardAction onClick={onExit}>
            <i className="material-icons mdc-button__icon">cancel</i>
              Cancel
            </CardAction>
          </CardActions>
        </form>
      </Card>
    );
  }
}

export const EditParentPost = connect(({ categories }) => (
  {
    isParent: true,
    categoriesStore: {
      ...categories,
      options: categories.items.reduce((categoriesMap, category) => {
        categoriesMap[category.path] = category.name;
        return categoriesMap;
      }, {})
    }
  }
))(EditPost);

export const EditCommentPost = connect(() => (
  {
    isParent: false
  }
))(EditPost);