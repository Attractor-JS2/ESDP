process.env.NODE_ENV = 'test';
jest.setTimeout(20000);
const request = require('supertest');
// const app = require("../../server").app;
const conn = require('../../index.js');
const express = require('express');


beforeAll((done) => {
  conn.connect()
    .then(() => done())
    .catch((err) => done(err));
});
afterAll((done) => {
  conn.close()
    .then(() => done())
    .catch(err => done(err))
});


const app = express();
const users = require("../../routes/user.routes");
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use("/users", users);
app.use(express.json());
const testUser = {"fullname": "John Doe", "username": "john", "password": "doe"};
let token;


describe('User creating function', () => {
  test('Should create user with correct data', async () => {
    await request(app).post('/users')
      .send({...testUser})
      .then((res) => {
        expect(res.body.message).toEqual('Success')
      })
  });
  test('Should log in', async () => {
    await request(app).post('/users/sessions')
      .send({...testUser})
      .then(res => {
        expect(res.body.token).toBeTruthy();
        expect(res.body.fullname).toEqual(testUser.fullname);
        token = res.body.token;
      })
  });
  test('Should delete user', async() => {
    await request(app).delete('/users/sessions')
      .set('x-access-token', token)
      .send()
      .then(res => {
        expect(res.body.message).toEqual('Success')
      })
  })
  
});
