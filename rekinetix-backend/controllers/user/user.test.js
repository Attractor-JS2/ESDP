const {mockRequest, mockResponse} = require('../../configs/mockInterceptors');
const userController = require('./user');

let req;
let res;
let createUser = userController.createUser;


beforeEach(() => {
    req = mockRequest();
    res = mockResponse();
});

describe('User creating function', () => {
    test('Should be defined', () => {
        expect(createUser(req, res)).toBeDefined()
    })
})
