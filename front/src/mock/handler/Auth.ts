import { graphql } from 'msw';
import { filter, isUndefined } from 'lodash';

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

const signIn = graphql.query('SignIn', (req, res, ctx) => {
  const { email, password } = req.variables;

  // get the user by email
  const userArray = filter(data.users, (user) => user.email === email);
  if (userArray.length === 0) {
    return res(ctx.errors([{ message: `The email ${email} is not existed` }]));
  } else if (userArray.length !== 1) {
    return res(ctx.errors([{ message: 'I am teapot.' }]));
  }
  const user = userArray[0];

  // check the password.
  if (user.password !== password) {
    return res(ctx.errors([{ message: 'The password is not right' }]));
  }

  const result = res(
    ctx.cookie('jwt', `${email}`),
    ctx.data({
      user,
    }),
  );
  return result;
});

const currentUser = graphql.query('CurrentUser', (req, res, ctx) => {
  // In mock data, the jwt will just be the email.
  const jwt = req.cookies['jwt'];
  if (isUndefined(jwt)) {
    return res(ctx.errors([{ message: 'Do not have JWT. Please sign in.' }]));
  }

  const users = filter(data.users, (user) => user.email === jwt);
  if (users.length === 0) {
    return res(
      ctx.errors([{ message: 'Your JWT is invaild. Please sign in.' }]),
    );
  } else if (users.length !== 1) {
    return res(ctx.errors([{ message: 'I am teapot.' }]));
  }

  const { id, name, email, isAdmin } = users[0];

  const result = res(
    ctx.data({
      currentUser: { id, name, email, isAdmin },
    }),
  );
  return result;
});

export default [signIn, currentUser];
