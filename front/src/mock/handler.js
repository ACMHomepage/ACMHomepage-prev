import { graphql } from 'msw';

export const handlers = [
  graphql.query('News', (req, res, ctx) => {
    return res(
      ctx.data({
        news: [
          {
            title: 'First',
            image_uri:
              'https://mdbootstrap.com/img/Photos/Slides/img%20(15).jpg',
            content: 'First '.repeat(1000),
            summary: 'A lot of word `First`',
          },
          {
            title: 'Second',
            image_uri:
              'https://mdbootstrap.com/img/Photos/Slides/img%20(22).jpg',
            content: 'Second '.repeat(1000),
            summary: 'A lot of word `Second`',
          },
        ],
      }),
    );
  }),
];
