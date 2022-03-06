import { conn } from "../../db/connection.js";
import {
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLObjectType,
  GraphQLString,
} from "graphql";

/******************************************************************************
 * Util function.
 *****************************************************************************/
export const getUserById = async (id) => {
  let result;
  if (id === undefined) {
    result = await conn.execute(`SELECT * FROM user`);
  } else {
    result = await conn.execute(`SELECT * FROM user WHERE id = ?`, [id]);
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
export const createUser = {
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
      INSERT INTO user (email, password, nickname)
      VALUES (?, ?, ?)
    `;
    // TODO: Use bcrypt rather than plain text.
    const [rows, _fields] = await conn.execute(sql, [
      args.email,
      args.password,
      args.nickname,
    ]);
    const res = await getUserById(rows.insertId);
    return res[0];
  },
};
