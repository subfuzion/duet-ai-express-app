// create an express app with ejs template engine
import {default as express, Request, Response} from "express";

const app = express();
app.set('view engine', 'ejs');

// add urlencoded middleware to parse form data
app.use(express.urlencoded({ extended: true }));

// add json middleware to parse json data
app.use(express.json());

// define the home route
app.get('/', (req: Request, res: Response) => {
  res.render('index');
});

// create a /greeting POST route with a `name` parameter
app.post('/greeting', (req: Request, res: Response) => {
  const name = req.body.name || 'World';
  res.render('greeting', { name });
});

// add POST /api/echo to echo request body
app.post('/api/echo', (req: Request, res: Response) => {
  res.json(req.body);
});

// start the server
const port = parseInt(process.env.PORT || "8080", 10);
app.listen(port, () => {
  console.log(`App listening on port ${port}`);
  console.log('Press Ctrl+C to quit.');
});

// export app for testing
export default app;
