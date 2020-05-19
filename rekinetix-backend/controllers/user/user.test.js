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
    });
    test('Should response with 201 on correct request', async () => {
        req.body.fullname = 'User';
        req.body.username = 'testuser';
        req.body.role = 'doctcor';
        req.body.password =  'user';
        await createUser(req, res);
        expect(res.send).toBeCalledTimes(1)
        expect(res.status).toHaveBeenCalledWith(201)

    })
})
