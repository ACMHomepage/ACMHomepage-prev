import { graphql } from 'msw';
import { filter } from 'lodash';

const data = {
  users: [
    {
      id: 1,
      name: 'Peter',
      email: 'peterlitszo@gmail.com',
      password: 'admin123',
      isAdmin: true,
    },
  ],
};

export default graphql.query('SignIn', (req, res, ctx) => {
  const { email, password } = req.variables;

  // get the user by email
  const userArray = filter(data.users, (user) => user.email === email);
  if (userArray.length === 0) {
    return res(ctx.errors([{ message: `The email ${email} is not existed` }]));
  } else if (userArray.length !== 1) {
    return res(ctx.errors([{ message: 'I am teapot' }]));
  }
  const user = userArray[0];

  // check the password.
  if (user.password !== password) {
    return res(ctx.errors([{ message: 'The password is not right' }]));
  }

  const result = res(
    ctx.cookie('jwt', `I AM ${email}`),
    ctx.data({
      users: [],
    }),
  );
  return result;
});
