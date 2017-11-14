import React, { Component } from 'react';
import logo from './logo.svg';
//import './App.css';
import {Toolbar, ToolbarRow, ToolbarTitle, Fab} from 'rmwc';

class App extends Component {
  render() {
    return (
      <div>
        <Toolbar>
          <ToolbarRow>
            <ToolbarTitle>Toolbar</ToolbarTitle>
          </ToolbarRow>
          <Fab>add</Fab>
        </Toolbar>
      </div>
    );
  }
}

export default App;
