// write tests for express app
import { expect } from 'chai';
import request from 'supertest';

import {default as app} from '../src/app';

describe('Express App', () => {
  it('should respond to / with Hello World!', async () => {
    const response = await request(app).get('/');
    expect(response.text).to.equal('Hello World!');
  });

  it('should respond to /echo with the query parameter text', async () => {
    const response = await request(app).get('/echo?text=Hello');
    expect(response.text).to.equal('Hello');
  });

  it('should respond to POST /hello with Hello, message!', async () => {
    const response = await request(app).post('/hello').send({ message: 'World' });
    expect(response.text).to.equal('Hello, World!');
  });
});
