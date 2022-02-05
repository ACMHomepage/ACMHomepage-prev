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
          {
            title: 'White',
            image_uri: 'https://images.pexels.com/photos/733852/pexels-photo-733852.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260',
            content: 'White '.repeat(1000),
            summary: 'Just white',
          },
        ],
      }),
    );
  }),
];
