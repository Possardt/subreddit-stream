import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { subscribeToSubredditStream } from './api'

class App extends Component {
  constructor(props){
    super(props);

    subscribeToSubredditStream((data) => console.log(data));
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Subreddit Stream</h1>
        </header>
      </div>
    );
  }
}

export default App;
