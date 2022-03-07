import { conn } from "../../db/connection.js";
import {
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLObjectType,
  GraphQLString,
  GraphQLBoolean,
} from "graphql";

/******************************************************************************
 * Util function.
 *****************************************************************************/
export const getUserById = async (id) => {
  let result;
  if (id === undefined) {
    result = await conn.execute(`
      SELECT id, email, nickname, isAdmin
      FROM user
    `);
  } else {
    result = await conn.execute(`
      SELECT id, email, nickname, isAdmin
      FROM user
      WHERE id = ?
    `, [id]);
  }

  const [rows, _fields] = result;
  return rows;
};

/******************************************************************************
 * Main part
 *****************************************************************************/
export const UserType = new GraphQLObjectType({
  name: "user",
  fields: {
    id: {
      type: GraphQLID,
      description: "The user ID.",
    },
    email: {
      type: GraphQLString,
      description: "The user email.",
    },
    nickname: {
      type: GraphQLString,
      description: "The user nickname",
    },
    isAdmin: {
      type: GraphQLBoolean,
      description: "Check if the user is admin",
    }
  },
});

/******************************************************************************
 * Query field.
 *****************************************************************************/
export const getUser = {
  type: new GraphQLList(UserType),
  args: {
    id: {
      type: GraphQLInt,
      description: "The ID of the user",
    },
  },
  async resolve(_parentVal, args) {
    return await getUserById(args.id);
  },
};

/******************************************************************************
 * Mutation field.
 *****************************************************************************/
export const register = {
  type: UserType,
  args: {
    email: {
      type: GraphQLString,
      description: "The user email to create",
    },
    password: {
      type: GraphQLString,
      description: "The user password",
    },
    nickname: {
      type: GraphQLString,
      description: "The user nickname",
    },
  },
  async resolve(_parentVal, args) {
    const sql = `
      INSERT INTO user (email, password, nickname, isAdmin)
      VALUES (?, ?, ?, ?)
    `;
    // TODO: Use bcrypt rather than plain text.
    const [rows, _fields] = await conn.execute(sql, [
      args.email,
      args.password,
      args.nickname,
      false, // TODO: Make sure the first one is admin.
    ]);
    const res = (await getUserById(rows.insertId))[0];
    return res;
  },
};

export const signIn = {
  type: UserType,
  args: {
    email: {
      type: GraphQLString,
      description: "The user email to create",
    },
    password: {
      type: GraphQLString,
      description: "The user password",
    },
  },
  async resolve(_parentVal, args, context) {
    const sql = `
      SELECT id, password
      FROM user
      WHERE email = ?
    `;
    // TODO: Use bcrypt rather than plain text.
    const [rows, _fields] = await conn.execute(sql, [
      args.email,
    ]);
    if (rows.length <= 0) {
      throw new Error('The email is not existed.');
    }
    const {id, password} = rows[0];
    if (password !== args.password) {
      throw new Error('The password is not right.');
    }
    const res = (await getUserById(id))[0];
    context.res.cookie('jwt', `${res.email}`);
    return res;
  },
}