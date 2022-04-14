import { jest } from '@jest/globals';

import { getUser, register, signIn } from './user';

interface User {
  nickname: string;
  email: string;
  isAdmin: boolean;
  password: string;
}

interface UserWithId extends User {
  id: number;
}

let userList = [] as UserWithId[];
let _userListId = 1;

const PETER: User = {
  nickname: 'peter',
  email: 'p@g.c',
  password: 'pp',
  isAdmin: true,
};
const MARY: User = {
  nickname: 'mary',
  email: 'm@g.c',
  password: 'mm',
  isAdmin: false,
};

const ID = 'id';
const NICKNAME = 'nickname';
const EMAIL = 'email';
const IS_ADMIN = 'isAdmin';

const getAll = jest.fn((_fields) => userList);
const getById = jest.fn((_fields, id) => {
  return userList.filter((u) => u.id === id)[0];
});
const getByEmail = jest.fn((_fields, email) => {
  return userList.filter((u) => u.email === email)[0];
});
const getNumber = jest.fn(() => userList.length);
const insert = jest.fn((user: User) => {
  userList.push({ ...user, [ID]: _userListId });
  return { insertId: _userListId++ };
});

const database = {
  user: {
    FIELDS: { ID, NICKNAME, EMAIL, IS_ADMIN },
    getAll,
    getById,
    getNumber,
    getByEmail,
    insert,
  },
};

let contextCookie: { jwt?: undefined } = {};

const context = {
  res: {
    cookie: jest.fn((key: string, value: string) => (contextCookie[key] = value)),
  },
};

beforeEach(() => {
  userList = [];
  _userListId = 1;

  getAll.mockClear();
  getById.mockClear();
  getNumber.mockClear();
  insert.mockClear();

  contextCookie = {};
});

test('Get user infomation without id!', async () => {
  const resolve = getUser(database).resolve;
  let result = await resolve(null, {});
  expect(getAll).toBeCalledTimes(1);
  expect(getAll).toBeCalledWith([ID, EMAIL, NICKNAME, IS_ADMIN]);
  expect(getById).not.toBeCalled();
  expect(result).toEqual(userList);
});

test('Get user infomation with id!', async () => {
  const resolve = getUser(database).resolve;
  let result = await resolve(null, { id: 1 });
  expect(getAll).not.toBeCalled();
  expect(getById).toBeCalledTimes(1);
  expect(getById).toBeCalledWith([ID, EMAIL, NICKNAME, IS_ADMIN], 1);
  expect(result).toEqual(userList[0]);
});

test('Maybe we need register firstly~', async () => {
  const resolve = register(database).resolve;

  // The first one is admin.
  let result = await resolve(null, PETER);
  expect(insert).toBeCalledWith({ ...PETER, isAdmin: true });
  expect(userList).toHaveLength(1);
  expect(result.isAdmin).toBe(true);

  // The second one is not.
  result = await resolve(null, MARY);
  expect(insert).toBeCalledWith({ ...MARY, isAdmin: false });
  expect(result.isAdmin).toBe(false);

  // We have two user now.
  expect(insert).toBeCalled();
  expect(insert).toBeCalledTimes(2);
  expect(userList).toHaveLength(2);
});

test('Maybe we can sign in!', async () => {
  const resolveRegister = register(database).resolve;
  const resolveSignIn = signIn(database).resolve;

  // The first one is admin.
  let result = await resolveRegister(null, PETER);
  expect(result.isAdmin).toBe(true);

  // We have two user now.
  expect(insert).toBeCalled();
  expect(insert).toBeCalledTimes(1);
  expect(userList).toHaveLength(1);

  // Sign in.
  const { email, password } = PETER;
  result = await resolveSignIn(null, { email, password }, context);
  expect(context.res.cookie).toBeCalledTimes(1);
  expect(contextCookie).toHaveProperty('jwt');
  expect(contextCookie.jwt).not.toBe(PETER.email);
});
