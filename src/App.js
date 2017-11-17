import React, { Component } from 'react';
import './App.css';
import {Toolbar, ToolbarRow, ToolbarTitle, Fab, Card, CardPrimary, CardTitle, CardSubtitle, CardSupportingText, CardActions, CardAction, Typography} from 'rmwc';

class App extends Component {
  render() {
    return (
      <div>
        <Toolbar>
          <ToolbarRow>
            <ToolbarTitle>Readable</ToolbarTitle>
          </ToolbarRow>
        </Toolbar>
        <Fab className="app-fab app-fab--absolute">add</Fab>
        {[0, 1, 2].map(id =>
          <Card key={id}>
            <CardPrimary>
              <CardTitle large>Post title</CardTitle>
              <CardSubtitle>2017/11/16 by Fernando Terra</CardSubtitle>
            </CardPrimary>
            <CardSupportingText>
              <Typography use="button">5 votes</Typography>&nbsp;|&nbsp;
              <Typography use="button">2 comments</Typography>
              
            </CardSupportingText>
            {/* <CardActions className="mdc-card__actions--vertical"> */}
            <CardActions>
              <CardAction>
                <i className="material-icons mdc-button__icon">arrow_upward</i>
                Upvote
              </CardAction>
              <CardAction>
              <i className="material-icons mdc-button__icon">arrow_downward</i>
                Downvote
              </CardAction>
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
