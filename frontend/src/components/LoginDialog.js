import React, { Component } from 'react';
import {
  Dialog,
  DialogRoot,
  DialogSurface,
  DialogHeader,
  DialogHeaderTitle,
  DialogBody,
  DialogFooter,
  DialogFooterButton,
  DialogBackdrop
} from 'rmwc/Dialog';
import { connect } from 'react-redux';
import { TextField } from 'rmwc/TextField';
import { login } from '../actions'

class LoginDialog extends Component {
  state = {
    usernameInputValue: this.props.username
  }
  
  handleSubmit(e) {
    e.preventDefault();
    this.props.login(this.state.usernameInputValue);
  }
  
  render() {
    const { usernameInputValue } = this.state;
    const { isOpen, onClose } = this.props;
    return (
      <Dialog
        onFocus={() => this.loginInput.select()}
        open={isOpen}
        onClose={() => onClose()}
      >
        <DialogRoot>
          <DialogSurface>
              <DialogHeader>
                <DialogHeaderTitle>Login</DialogHeaderTitle>
              </DialogHeader>
              <form onSubmit={(e) => {
                this.handleSubmit(e);
                this.props.onClose();
              }}>
                <DialogBody>
                  <TextField
                    fullwidth
                    name="username"
                    label="Username"
                    required
                    inputRef={(input) => { this.loginInput = input }}
                    value={usernameInputValue}
                    onChange={(event) => this.setState({
                      usernameInputValue: event.target.value.trim()
                    })}
                  />
                </DialogBody>
                <DialogFooter>
                    <DialogFooterButton cancel type="button">Cancel</DialogFooterButton>
                    <DialogFooterButton type="submit">Login</DialogFooterButton>
                </DialogFooter>
              </form>
          </DialogSurface>
          <DialogBackdrop />
        </DialogRoot>
      </Dialog>
    );
  }
}

export default connect(
  ({ app }) => ({
    username: app.username
  }),
  { login }
)(LoginDialog);