import 'mocha';
import { expect } from 'chai';
import request from 'supertest';
import Server from '../server';

describe('Examples', () => {
  it('should get all examples', () =>
    request(Server)
      .get('/api/v1/examples')
      .expect('Content-Type', /json/)
      .then(r => {
        expect(r.body.data)
          .to.be.an('array')
          .of.length(2);
        expect(r.body.status)
          .to.be.a('number')
          .equals(200)
      }));
});
