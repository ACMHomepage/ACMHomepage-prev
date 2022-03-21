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
      image_url: faker.image.abstract(undefined, undefined, true),
      content: 'First '.repeat(1000),
      summary: 'A lot of word `First`',
    },
    {
      id: 2,
      title: 'Second',
      image_url: faker.image.abstract(undefined, undefined, true),
      content: 'Second '.repeat(1000),
      summary: 'A lot of word `Second`',
    },
    {
      id: 3,
      title: 'White',
      image_url: faker.image.abstract(undefined, undefined, true),
      content: 'White '.repeat(1000),
      summary: 'Just white',
    },
    {
      id: 4,
      title: 'Random',
      image_url: faker.image.abstract(undefined, undefined, true),
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
    const { title, image_url, content } = req.variables;
    console.log(req.variables);

    data._id++;
    data.news.push({
      id: data._id,
      title,
      image_url,
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
