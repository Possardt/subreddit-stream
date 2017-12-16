const rp = require('request-promise');

let getSubredditInfo = subredditName => {
  let url = 'http://www.reddit.com/r/' + subredditName + '/top.json?count=10&sort=new';
  return rp(url)
    .then(data => {
      data = JSON.parse(data);
      return data.data.children;
    })
    .then(children => {
      return children.map(child => {
        return child.data.title;
      });
    })
    .catch(err => {
      console.error('error getting subreddit info for ' + subredditName + '\n' + err);
    });
};

module.exports = {
  getSubredditInfo : getSubredditInfo
}
