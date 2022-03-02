import { graphql } from 'msw';
import { filter, isUndefined } from 'lodash';
import { faker } from '@faker-js/faker';

import type { CreateNewsData, CreateNewsVars } from '../../store/newsSlice';

const data = {
  _id: 4,
  news: [
    {
      id: 1,
      title: 'First',
      image_uri: faker.image.abstract(undefined, undefined, true),
      content: 'First '.repeat(1000),
      summary: 'A lot of word `First`',
    },
    {
      id: 2,
      title: 'Second',
      image_uri: faker.image.abstract(undefined, undefined, true),
      content: 'Second '.repeat(1000),
      summary: 'A lot of word `Second`',
    },
    {
      id: 3,
      title: 'White',
      image_uri: faker.image.abstract(undefined, undefined, true),
      content: 'White '.repeat(1000),
      summary: 'Just white',
    },
    {
      id: 4,
      title: 'Random',
      image_uri: faker.image.abstract(undefined, undefined, true),
      content: faker.lorem.paragraphs(100, '\n\n'), // markdown
      summary: 'Hello',
    },
  ],
};

const News = graphql.query('News', (req, res, ctx) => {
  const { newsId } = req.variables;
  const news = isUndefined(newsId)
    ? data.news
    : filter(data.news, (new_) => parseInt(newsId) === new_.id);
  return res(ctx.data({ news }));
});

const CreateNews = graphql.mutation<CreateNewsData, CreateNewsVars>(
  'CreateNews',
  (req, res, ctx) => {
    const { title, image_uri, content } = req.variables;
    console.log(req.variables);

    data._id++;
    data.news.push({
      id: data._id,
      title,
      image_uri,
      content,
      summary: 'TODO',
    });

    return res(
      ctx.data({
        news: {
          id: data._id,
        },
      }),
    );
  },
);

export default [News, CreateNews];
