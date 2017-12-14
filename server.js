const express     = require('express');
const app         = express();
const bodyParser  = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('port', process.env.PORT || 3001);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

app.listen(app.get('port'), () => {
  console.log('Server started at http://localhost:${app.get("port")}/');
});

exports = module.exports = app;
