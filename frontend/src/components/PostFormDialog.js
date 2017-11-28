import React, { Component } from 'react';
import { Dialog, DialogRoot, DialogSurface, DialogHeader, DialogHeaderTitle, DialogBody, DialogFooter, DialogFooterButton, DialogBackdrop } from 'rmwc/Dialog';
import { TextField } from 'rmwc/TextField';
import { Select } from 'rmwc/Select';
import * as PostsAPI from '../PostsAPI';

class PostFormDialog extends Component {
  state = {
    categories: []
  };
  
  componentDidMount() {
    PostsAPI.getCategories().then((categories) => this.setState({ categories }))
  }

  render() {
    const { isOpen, onClose } = this.props;
    const { categories } = this.state;
    return (
      <Dialog
        open={isOpen}
        onClose={() => onClose()}
      >
        <DialogRoot>
          <DialogSurface>
              <DialogHeader>
                <DialogHeaderTitle>New Post</DialogHeaderTitle>
              </DialogHeader>
              <DialogBody>
                <TextField fullwidth label="Title" /><br />
                <Select label="Category"
                  value={'Pizza'}
                  options={categories.map(category => category.name)}
                />
                <TextField textarea fullwidth rows="8" />
              </DialogBody>
              <DialogFooter>
                  <DialogFooterButton cancel>Cancel</DialogFooterButton>
                  <DialogFooterButton accept>Post</DialogFooterButton>
              </DialogFooter>
          </DialogSurface>
          <DialogBackdrop />
        </DialogRoot>
      </Dialog>
    );
  }
}

export default PostFormDialog;