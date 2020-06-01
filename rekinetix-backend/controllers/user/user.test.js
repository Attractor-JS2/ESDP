process.env.NODE_ENV = 'test';
jest.setTimeout(20000);
const request = require('supertest');
const conn = require('../../index.js');
const express = require('express');


beforeAll((done) => {
  conn.connect()
    .then(async () => {
      done();
    })
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
const user = {"fullname": "User", "username": "user", "password": "user"};
const admin = {"username": "testuser", "password": "testuser", "fullname": "testuser"};
let token;


describe('User creating function', () => {
  test('Should log in', async () => {
    await request(app).post('/users/sessions')
      .send({...admin})
      .then(res => {
        expect(res.body.token).toBeTruthy();
        expect(res.body.fullname).toEqual(admin.fullname);
        token = res.body.token;
      })
  });
  test('Should create user with correct data', async () => {
    await request(app).post('/users')
      .set('x-access-token', token)
      .send({...user})
      .then((res) => {
        expect(res.body.message).toEqual('Success');
      })
  });
  test('Should successfully log into new user', async () => {
    await request(app).post('/users/sessions')
      .send({...user})
      .then(res => {
        expect(res.body.token).toBeTruthy();
        expect(res.body.fullname).toEqual(user.fullname);
        token = res.body.token;
      })
  });
  test('Should delete user', async () => {
    await request(app).delete('/users/sessions')
      .set('x-access-token', token)
      .send()
      .then(res => {
        expect(res.body.message).toEqual('Success')
      })
  })
});
