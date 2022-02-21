import { graphql } from 'msw';
import { filter } from 'lodash';

const data = {
  users: [
    {
      id: 1,
      name: 'Peter',
      emails: ['peterlitszo@gmail.com'],
      isAdmin: true,
    },
  ],
};

export default graphql.query('Log', (req, res, ctx) => {
  const { email } = req.variables;
  return res(
    ctx.data({
      ...filter(data.users, (o) => o.emails.includes(email)),
    }),
  );
});
