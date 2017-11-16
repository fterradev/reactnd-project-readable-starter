import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {Toolbar, ToolbarRow, ToolbarTitle, Fab, Card, CardMedia, CardPrimary, CardTitle, CardSubtitle, CardSupportingText, CardActions, CardAction, Typography, Button, IconToggle} from 'rmwc';

class App extends Component {
  render() {
    return (
      <div>
        <Toolbar>
          <ToolbarRow>
            <ToolbarTitle>Toolbar</ToolbarTitle>
          </ToolbarRow>
        </Toolbar>
        <Fab className="app-fab app-fab--absolute">add</Fab>
        <Card>
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
              <i className="material-icons mdc-button__icon">arrow_drop_up</i>
              Upvote
            </CardAction>
            <CardAction>
            <i className="material-icons mdc-button__icon">arrow_drop_down</i>
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
        <Card>
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
              <i className="material-icons mdc-button__icon">arrow_drop_up</i>
              Upvote
            </CardAction>
            <CardAction>
            <i className="material-icons mdc-button__icon">arrow_drop_down</i>
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
      </div>
    );
  }
}

export default App;
