import { graphql } from 'msw';
import { filter, isUndefined } from 'lodash';
import { faker } from '@faker-js/faker';

const data = {
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

export default [News];
