import { graphql } from 'msw';
import { filter } from 'lodash';

import type {
  RegisterData,
  RegisterVars,
  SignInData,
  SignInVars,
  SignOutData,
  ProfileData,
  ProfileVars
} from '../../api/auth';
import {
  SIGN_IN_MUTATION_NAME,
  REGISTER_MUTATION_NAME,
  SIGN_OUT_MUTATION_NAME,
  PROFILE_QUERY_NAME,
} from '../../api/auth';
import type { UserData } from '../../store/authSlice';

interface FullUserData extends UserData {
  id: number;
  password: string;
}

const data = {
  _id: 0,
  users: [] as FullUserData[],
};

/**
 * Handle sign in GraphQL request.
 */
export const signIn = graphql.mutation<SignInData, SignInVars>(
  SIGN_IN_MUTATION_NAME,
  (req, res, ctx) => {
    const { email, password } = req.variables;

    // get the user by email
    const userArray = filter(data.users, (user) => user.email === email);
    if (userArray.length === 0) {
      return res(
        ctx.errors([{ message: `The email ${email} is not existed` }]),
      );
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
        signIn: user,
      }),
    );
    return result;
  },
);

/**
 * Handle the register GraphQL request.
 */
export const register = graphql.mutation<RegisterData, RegisterVars>(
  REGISTER_MUTATION_NAME,
  (req, res, ctx) => {
    const { nickname, email, password } = req.variables;

    // Add new user.
    data._id++;
    data.users.push({
      id: data._id,
      nickname,
      email,
      password,
      isAdmin: data.users.length === 0,
    });

    return res(
      ctx.cookie('jwt', `${email}`, { path: '/', httpOnly: true }),
      ctx.data({
        register: data.users[data._id - 1],
      }),
    );
  },
);

/**
 * Handle the sign out GraphQL request.
 */
export const signOut = graphql.mutation<SignOutData>(
  SIGN_OUT_MUTATION_NAME,
  (_req, res, ctx) => {
    return res(
      ctx.cookie('jwt', '', { path: '/', httpOnly: true }),
      ctx.data({ signOut: true }),
    );
  },
);

/**
 * Handle the profile GraphQL request.
 */
export const proFile = graphql.query<ProfileData,ProfileVars>(
  PROFILE_QUERY_NAME,
  (req, res, ctx) => {
    const {userId} = req.variables;

    // get the user by email
    const userArray = filter(data.users, (user) => user.id === userId);
    if (userArray.length === 0) {
      return res(
        ctx.errors([{ message: `The id ${userId} is not existed` }]),
      );
    } else if (userArray.length !== 1) {
      return res(ctx.errors([{ message: 'I am teapot.' }]));
    }
    const user = userArray[0];

    return res(
      ctx.data({
        userById: user,
      })
    )
  }
);

export default [signIn, register, signOut, proFile];
