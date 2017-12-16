const express     = require('express');
const app         = express();
const bodyParser  = require('body-parser');
const server      = require('http').createServer(app);
const io          = require('socket.io')(server);
const redditApi   = require('./reddit');


let redditNamespace;

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
      console.log(data);
      redditNamespace.emit('posts', data);
    });
}, 10000);

redditNamespace.on('connect', socket => {
  redditNamespace.emit('hello', {message : 'Hello curious traveler!'});
});

server.listen(app.get('port'), () => {
  console.log('Server started at http://localhost:' + app.get('port') + '/');
});

exports = module.exports = app;
