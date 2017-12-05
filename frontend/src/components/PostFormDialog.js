import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Dialog, DialogRoot, DialogSurface, DialogHeader, DialogHeaderTitle, DialogBody, DialogFooter, DialogFooterButton, DialogBackdrop } from 'rmwc/Dialog';
import { TextField } from 'rmwc/TextField';
import { Select } from 'rmwc/Select';

class PostFormDialog extends Component {

  render() {
    const { isOpen, onClose, categoriesStore } = this.props;
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
                <TextField fullwidth label="Title" required /><br />
                <Select label="Category" required
                  options={categoriesStore.items.map(category => category.name)}
                />
                <TextField textarea fullwidth rows="8" required />
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

function mapStateToProps({ categories }) {
  return {
    categoriesStore: categories
  };
}

export default connect(mapStateToProps)(PostFormDialog);