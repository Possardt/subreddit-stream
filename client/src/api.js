import openSocket from 'socket.io-client';
const socket = openSocket('http://localhost:3001/newPosts');

let subscribeToSubredditStream = (cb) => {
  socket.on('hello', data => cb(data));
};

export { subscribeToSubredditStream }
