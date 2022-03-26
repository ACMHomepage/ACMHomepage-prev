import { jest } from '@jest/globals';

import getUser from './user';

const userList = [
  {
    id: 1,
    nickname: 'peter',
    email: 'p@g.c',
    isAdmin: true,
  },
  {
    id: 2,
    nickname: 'mary',
    email: 'm@g.c',
    isAdmin: false,
  },
];

const execute = jest.fn();
const conn = { execute };
const user = getUser(conn);

beforeEach(() => {
  execute.mockReset();
});

test('Get all users', async () => {
  execute.mockReturnValueOnce([userList, undefined]);
  let result = await user.getAll(['id', 'email', 'nickname', 'isAdmin']);
  expect(execute).toBeCalledTimes(1);
  expect(execute.mock.calls[0].length).toBe(1);
  expect(execute.mock.calls[0][0]).toMatch(
    /^\s*SELECT id,email,nickname,isAdmin\s*FROM user\s*$/,
  );
  expect(result).toBe(userList);
});

test('Get a user by his/her id', async () => {
  execute.mockReturnValueOnce([[userList[0]], undefined]);
  let result = await user.getById(['id', 'email', 'nickname', 'isAdmin'], 1);
  expect(execute).toBeCalledTimes(1);
  expect(execute.mock.calls[0].length).toBe(2);
  expect(execute.mock.calls[0][0]).toMatch(
    /^\s*SELECT id,email,nickname,isAdmin\s*FROM user\s*WHERE id = \?\s*$/,
  );
  expect(execute.mock.calls[0][1]).toEqual([1]);
  expect(result).toBe(userList[0]);
});
