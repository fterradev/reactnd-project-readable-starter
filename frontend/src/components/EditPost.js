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
      category: this.categorySelect.value,
      id: uuidv4(),
      author: 'Fernando',
      timestamp: Date.now()
    }
    console.log(values);
    if (this.props.onCreatePost) {
      this.props.onCreatePost(values);
    }
  }

  render() {
    const { categoryPath, categoriesStore } = this.props;
    return (
      <Card>
        <form onSubmit={this.handleSubmit}>
          <CardPrimary>
            <CardTitle large>
              <TextField fullwidth name="title" label="Title" required inputRef={(input) => { this.titleInput = input }} />
            </CardTitle>
          </CardPrimary>
          <CardSupportingText>
            <br />
            <Select name="category"
              label="Category" required
              placeholder="Select a category"
              options={categoriesStore.options}
              value={categoryPath}
              apiRef={(select) => this.categorySelect = select}
            /><br />
            <TextField name="body" textarea fullwidth rows="8" required />
          </CardSupportingText>
          <CardActions>
            <CardAction type="submit">
            <i className="material-icons mdc-button__icon">done</i>
              Create
            </CardAction>
            <CardAction>
            <i className="material-icons mdc-button__icon">cancel</i>
              Cancel
            </CardAction>
          </CardActions>
        </form>
      </Card>
    );
  }
}

function mapStateToProps({ categories }) {
  return {
    categoriesStore: {
      ...categories,
      options: categories.items.reduce((categoriesMap, category) => {
        categoriesMap[category.path] = category.name;
        return categoriesMap;
      }, {})
    }
  };
}

export default connect(mapStateToProps)(EditPost);