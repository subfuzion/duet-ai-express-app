// create an express app with ejs template engine
const express = require('express');
const ejs = require('ejs');

const app = express();
app.set('view engine', 'ejs');

// add urlencoded middleware to parse form data
app.use(express.urlencoded({ extended: true }));

// add json middleware to parse json data
app.use(express.json());

// define the home route
app.get('/', (req, res) => {
  res.render('index');
});

// create a /greeting POST route with a `name` parameter
app.post('/greeting', (req, res) => {
  const name = req.body.name || 'World';
  res.render('greeting', { name });
});

// add POST /api/echo to echo request body
app.post('/api/echo', (req, res) => {
  res.json(req.body);
});

// start the server
const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`App listening on port ${port}`);
  console.log('Press Ctrl+C to quit.');
});

// export app for testing
module.exports = app;

// deploy to cloud run from source
// gcloud run deploy express-api --source . --region us-central1 --platform managed --allow-unauthenticated
