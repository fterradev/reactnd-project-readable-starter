import React, { Component } from 'react';
import './App.css';
import PostFormDialog from './PostFormDialog';
import { Toolbar, ToolbarRow, ToolbarTitle } from 'rmwc/Toolbar';
import { Fab, Typography, Button } from 'rmwc';
import { Card, CardPrimary, CardTitle, CardSubtitle, CardSupportingText, CardActions, CardAction} from 'rmwc/Card';

class App extends Component {
  state = {
    postFormDialogIsOpen: false
  };
  render() {
    const { postFormDialogIsOpen } = this.state;
    return (
      <div>
        <Toolbar>
          <ToolbarRow>
            <ToolbarTitle>Readable</ToolbarTitle>
          </ToolbarRow>
        </Toolbar>
        <PostFormDialog isOpen={postFormDialogIsOpen} onClose={() => this.setState({postFormDialogIsOpen: false})} />
        <Fab className="app-fab app-fab--absolute" onClick={evt => this.setState({postFormDialogIsOpen: true})}>add</Fab>
        {[0, 1, 2].map(id =>
          <Card key={id}>
            <CardPrimary>
              <CardTitle large>Post title</CardTitle>
              <CardSubtitle>2017/11/16 by Fernando Terra</CardSubtitle>
            </CardPrimary>
            <CardSupportingText>
              <Typography use="button">5 votes</Typography><br />
              <Button stroked>
                <i className="material-icons mdc-button__icon">arrow_upward</i>
                Upvote
              </Button>&nbsp;
              <Button stroked>
                <i className="material-icons mdc-button__icon">arrow_downward</i>
                Downvote
              </Button>
            </CardSupportingText>
            <CardSupportingText>
              <Typography use="button">2 comments</Typography>
              
            </CardSupportingText>
            {/* <CardActions className="mdc-card__actions--vertical"> */}
            <CardActions>
              {/* <CardAction>
                <i className="material-icons mdc-button__icon">arrow_upward</i>
                Upvote
              </CardAction>
              <CardAction>
              <i className="material-icons mdc-button__icon">arrow_downward</i>
                Downvote
              </CardAction> */}
              <CardAction>
              <i className="material-icons mdc-button__icon">edit</i>
                Edit
              </CardAction>
              <CardAction>
              <i className="material-icons mdc-button__icon">delete</i>
                Remove
              </CardAction>
            </CardActions>
          </Card>
        )}
      </div>
    );
  }
}

export default App;
