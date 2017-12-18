const express     = require('express');
const app         = express();
const bodyParser  = require('body-parser');
const server      = require('http').createServer(app);
const io          = require('socket.io')(server);
const redditApi   = require('./reddit');
const _           = require('lodash');


let redditNamespace,
    lastSentPosts = [];

app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('port', process.env.PORT || 3001);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

redditNamespace = io.of('/newPosts');

setInterval(() => {
  redditApi.getSubredditInfo('soccer')
    .then(data => {
      let newPosts = _.difference(data, lastSentPosts);
      console.log('new posts : ' + newPosts);
      redditNamespace.emit('posts', newPosts);
      lastSentPosts = lastSentPosts.concat(newPosts);
    });
}, 10000);

redditNamespace.on('connect', socket => {
  redditNamespace.emit('hello', {message : 'Hello curious traveler!'});
});

server.listen(app.get('port'), () => {
  console.log('Server started at http://localhost:' + app.get('port') + '/');
});

exports = module.exports = app;
