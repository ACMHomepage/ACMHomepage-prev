import {
  GraphQLBoolean,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';
import jwt from 'jsonwebtoken';
import { salt } from '../../salt.js';

/******************************************************************************
 * Main part
 *****************************************************************************/
export const UserType = new GraphQLObjectType({
  name: 'user',
  fields: {
    id: {
      type: GraphQLID,
      description: 'The user ID.',
    },
    email: {
      type: GraphQLString,
      description: 'The user email.',
    },
    nickname: {
      type: GraphQLString,
      description: 'The user nickname',
    },
    isAdmin: {
      type: GraphQLBoolean,
      description: 'Check if the user is admin',
    },
  },
});

/******************************************************************************
 * Query field.
 *****************************************************************************/
export const getUser = (database) => ({
  type: new GraphQLList(UserType),
  args: {
    id: {
      type: GraphQLInt,
      description: 'The ID of the user',
    },
  },
  async resolve(_parentVal, args) {
    const { ID, EMAIL, NICKNAME, IS_ADMIN } = database.user.FIELDS;
    const fields = [ID, EMAIL, NICKNAME, IS_ADMIN];

    if (args.id === undefined) {
      return await database.user.getAll(fields);
    } else {
      return await database.user.getById(fields, args.id);
    }
  },
});

/******************************************************************************
 * Mutation field.
 *****************************************************************************/
export const register = (database) => ({
  type: UserType,
  args: {
    email: {
      type: GraphQLString,
      description: 'The user email to create',
    },
    password: {
      type: GraphQLString,
      description: 'The user password',
    },
    nickname: {
      type: GraphQLString,
      description: 'The user nickname',
    },
  },
  async resolve(_parentVal, args) {
    // TODO: Use bcrypt rather than plain text.
    const { ID, EMAIL, NICKNAME, IS_ADMIN } = database.user.FIELDS;
    const fields = [ID, EMAIL, NICKNAME, IS_ADMIN];

    const userNumber = await database.user.getNumber();
    const rows = await database.user.insert({
      email: args.email,
      password: args.password,
      nickname: args.nickname,
      // If this user is the first one, then he/she is the asmin.
      isAdmin: userNumber === 0,
    });
    const result = await database.user.getById(fields, rows.insertId);
    return result;
  },
});

export const signIn = (database) => ({
  type: UserType,
  args: {
    email: {
      type: GraphQLString,
      description: 'The user email to create',
    },
    password: {
      type: GraphQLString,
      description: 'The user password',
    },
  },
  async resolve(_parentVal, args, context) {
    // TODO: Use bcrypt rather than plain text.
    const { ID, EMAIL, NICKNAME, IS_ADMIN, PASSWORD } = database.user.FIELDS;
    const field = [ID, EMAIL, NICKNAME, IS_ADMIN, PASSWORD];
    const user = await database.user.getByEmail(field, args.email);
    if (user === undefined) {
      throw new Error('The user is not existed.');
    }
    if (user.password !== args.password) {
      throw new Error('The password is not right.');
    }
    const res = {
      id: user[ID],
      email: user[EMAIL],
      nickname: user[NICKNAME],
      isAdmin: user[IS_ADMIN],
    };
    const token = jwt.sign(
      { id: res.id, isAdmin: res.isAdmin },
      salt,
      { expiresIn: '15d', algorithm: 'HS256' },
    );
    context.res.cookie('jwt', token, { httpOnly: true });
    return res;
  },
});
