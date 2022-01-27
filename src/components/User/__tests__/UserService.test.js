require('dotenv').config();
const UserModel = require('../model');
const UserService = require('../service');
const connections = require('../../../config/connection');

beforeAll(() => {
  process.env.NODE_ENV = 'test';
});

describe('UserComponent -> service', () => {
  beforeAll(async () => {
    await UserModel.deleteMany({});
  });

  afterAll(async () => {
    await UserModel.deleteMany({});
    await connections.close();
  });

  describe('findAll', () => {
    test('when return a array with no users', (done) => {
      UserService.findAll()
        .then((data) => {
          expect(data).toBeInstanceOf(Array);
          expect(data.length).toBe(0);
          done();
        })
        .catch((err) => done(err));
    });
  });

  let uid;

  describe('create', () => {
    test('create', (done) => {
      const profile = { email: 'test@gmail.com', fullName: 'Tester Name' };
      UserService.create(profile)
        .then((data) => {
          expect(data).toMatchObject(profile);
          uid = data._id;
          done();
        })
        .catch((err) => done(err));
    });
  });

  describe('findAll', () => {
    test('when return a array with at least 1 user', (done) => {
      UserService.findAll()
        .then((data) => {
          expect(data).toBeInstanceOf(Array);
          expect(data.length).toBe(1);
          done();
        })
        .catch((err) => done(err));
    });
  });

  describe('findById', () => {
    test('when return an array with user', (done) => {
      UserService.findById(uid)
        .then((data) => {
          expect(data._id).toStrictEqual(uid);
          done();
        })
        .catch((err) => done(err));
    });
  });
});
