import React, { Component } from 'react';
import { connect } from 'react-redux';
import { TextField } from 'rmwc/TextField';
import { Select } from 'rmwc/Select';

class EditPost extends Component {

  render() {
    const { categoriesStore } = this.props;
    return (
      <div>
        <TextField fullwidth label="Title" required /><br />
        <Select label="Category" required
          options={categoriesStore.items.map(category => category.name)}
        />
        <TextField textarea fullwidth rows="8" required />
      </div>
    );
  }
}

function mapStateToProps({ categories }) {
  return {
    categoriesStore: categories
  };
}

export default connect(mapStateToProps)(EditPost);