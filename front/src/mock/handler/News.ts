import { graphql } from 'msw';
import { filter, isUndefined } from 'lodash';
import { faker } from '@faker-js/faker';

import type { CreateNewsData, CreateNewsVars } from '../../store/newsSlice';

const markdown = [
  '# This is the H1',
  faker.lorem.paragraphs(1, '\n\n'),
  '## This is the H2',
  faker.lorem.paragraphs(2, '\n\n'),
  '```js',
  'const a = 10;',
  '```',
  faker.lorem.paragraphs(2, '\n\n'),
  'This is a [link](localhost) for you',
  '### This is the H3',
  faker.lorem.paragraphs(1, '\n\n'),
  '## This is the H2',
  faker.lorem.paragraphs(2, '\n\n'),
  '## This is the H2',
  faker.lorem.paragraphs(2, '\n\n'),
  '### This is the H3',
  faker.lorem.paragraphs(1, '\n\n'),
  '#### This is the H4',
  faker.lorem.paragraphs(4, '\n\n'),
  '##### This is the H5',
  faker.lorem.paragraphs(2, '\n\n'),
  '###### This is the H6',
  faker.lorem.paragraphs(1, '\n\n'),
].join('\n');

const data = {
  _id: 4,
  news: [
    {
      id: 1,
      title: 'First',
      imageUrl: faker.image.abstract(1600, 900),
      content: markdown,
      summary: 'A lot of word `First`',
    },
    {
      id: 2,
      title: 'Second',
      imageUrl: faker.image.abstract(1600, 900),
      content: 'Second '.repeat(1000),
      summary: 'A lot of word `Second`',
    },
    {
      id: 3,
      title: 'White',
      imageUrl: faker.image.abstract(1600, 900),
      content: 'White '.repeat(1000),
      summary: 'Just white',
    },
    {
      id: 4,
      title: 'Random',
      imageUrl: faker.image.abstract(1600, 900),
      content: faker.lorem.paragraphs(100, '\n\n'), // markdown
      summary: 'Hello',
    },
  ],
};

const GetNews = graphql.query('GetNews', (req, res, ctx) => {
  const { id } = req.variables;
  const news = isUndefined(id)
    ? data.news
    : filter(data.news, (new_) => parseInt(id) === new_.id);
  return res(ctx.data({ getNews: news }));
});

const CreateNews = graphql.mutation<CreateNewsData, CreateNewsVars>(
  'CreateNews',
  (req, res, ctx) => {
    const { title, imageUrl, content } = req.variables;
    console.log(req.variables);

    data._id++;
    data.news.push({
      id: data._id,
      title,
      imageUrl,
      content,
      summary: 'TODO',
    });

    return res(
      ctx.data({
        createNews: {
          id: data._id,
        },
      }),
    );
  },
);

export default [GetNews, CreateNews];
