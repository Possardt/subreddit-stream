import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { subscribeToSubredditStream } from './api'

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      posts : []
    }
  }
  componentDidMount = () => {
    subscribeToSubredditStream((data) => {
      console.log(data);
      this.setState(prevState => ({
        posts : prevState.posts.concat(data)
      }));
    });
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Subreddit Stream</h1>
        </header>
        {this.state.posts.map((post, index) =>
          <h1 key={index}>{post}</h1>
        )}
      </div>
    );
  }
}

export default App;
