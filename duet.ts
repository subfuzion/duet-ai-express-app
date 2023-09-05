// typescript: create express app
import express from 'express';
import { Request, Response } from 'express';

const app = express();

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

// create /echo route
app.get('/echo', (req: Request, res: Response) => {
  res.send(req.query.text);
});

// create POST /hello with message parameter
app.post('/hello', (req: Request, res: Response) => {
  res.send(`Hello, ${req.body.message}!`);
});

app.listen(3000, () => {
  console.log('Example app listening on port 3000!');
});

// export app for testing
export default app;
