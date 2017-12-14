import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card, CardPrimary, CardTitle, CardSupportingText, CardActions, CardAction} from 'rmwc/Card';
import { TextField } from 'rmwc/TextField';
import { Select } from 'rmwc/Select';
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
    if (this.props.isParent) {
      values.category = this.categorySelect.value;
    }
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
          <CardSupportingText>
            <br />
            {
              isParent &&
              <div>
                <Select name="category"
                  label="Category" required
                  placeholder="Select a category"
                  options={categoriesStore.options}
                  value={categoryPath}
                  apiRef={(select) => this.categorySelect = select}
                />
              </div>
            }
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