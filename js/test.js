// create app tests
const assert = require('assert');
const request = require('supertest');

// import app
const app = require('./app');

describe('Express App', () => {
  it('should return a 200 status code for the / route', async () => {
    const response = await request(app).get('/');
    assert.strictEqual(response.statusCode, 200);
  });

  it('should return a 200 status code for the /greeting route', async () => {
    const response = await request(app).post('/greeting');
    assert.strictEqual(response.statusCode, 200);
  });

  it('should render the greeting page for the /greeting route', async () => {
    const response = await request(app).post('/greeting');
    assert.ok(response.text.includes('<h1>Hello World!</h1>'));
  });

  // add a /greeting test with a urlencoded name parameter
  it('should render the greeting page for the /greeting route with a urlencoded name parameter', async () => {
    const response = await request(app).post('/greeting').send('name=John');
    assert.ok(response.text.includes('<h1>Hello John!</h1>'));
  });

  // add a /greeting test with a json encoded name parameter
  it('should render the greeting page for the /greeting route with a json encoded name parameter', async () => {
    const response = await request(app).post('/greeting').send({name: 'John'});
    assert.ok(response.text.includes('<h1>Hello John!</h1>'));
  });

  // add POST /api/echo test
  it('should return a 200 status code for the /api/echo route', async () => {
    const response = await request(app).post('/api/echo');
    assert.strictEqual(response.statusCode, 200);
  });

  it('should return the request body for the /api/echo route', async () => {
    const response = await request(app).post('/api/echo').send({name: 'John'});
    assert.strictEqual(response.text, JSON.stringify({name: 'John'}));
  });

});
