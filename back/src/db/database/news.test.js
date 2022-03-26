import { jest } from '@jest/globals';

import getNews from './news';

const newsList = [
  {
    id: 1,
    title: 'title1',
    imageUrl: 'imageUrl1',
    content: 'content1',
    createDate: 'now10',
    modifiedDate: 'now11',
  },
  {
    id: 2,
    title: 'title2',
    imageUrl: 'imageUrl2',
    content: 'content2',
    createDate: 'now20',
    modifiedDate: 'now21',
  },
];

const execute = jest.fn();
const conn = { execute };
const news = getNews(conn);

beforeEach(() => {
  execute.mockReset();
});

test('Get all news', async () => {
  execute.mockReturnValueOnce([newsList, undefined]);
  let result = await news.getAll([
    'id',
    'title',
    'imageUrl',
    'content',
    'createDate',
    'modifiedDate',
  ]);
  expect(execute).toBeCalledTimes(1);
  expect(execute.mock.calls[0].length).toBe(1);
  expect(execute.mock.calls[0][0]).toMatch(
    new RegExp(
      '' +
        /^\s*SELECT id,title,imageUrl,content,createDate,modifiedDate/.source +
        /\s*FROM news\s*$/.source,
    ),
  );
  expect(result).toBe(newsList);
});

test('Get a news by its id', async () => {
  execute.mockReturnValueOnce([[newsList[0]], undefined]);
  let result = await news.getById(
    ['id', 'title', 'imageUrl', 'content', 'createDate', 'modifiedDate'],
    1,
  );
  expect(execute).toBeCalledTimes(1);
  expect(execute.mock.calls[0].length).toBe(2);
  expect(execute.mock.calls[0][0]).toMatch(
    new RegExp(
      '' +
        /^\s*SELECT id,title,imageUrl,content,createDate,modifiedDate/.source +
        /\s*FROM news/.source +
        /\s*WHERE id = \?\s*$/.source,
    ),
  );
  expect(execute.mock.calls[0][1]).toEqual([1]);
  expect(result).toBe(newsList[0]);
});
