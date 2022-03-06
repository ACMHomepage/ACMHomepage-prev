import { conn } from "../../db/connection.js";
import {
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLObjectType,
  GraphQLString,
} from "graphql";

export const getUserByUid = async (uid) => {
  let result;
  if (uid === undefined) {
    result = await conn.execute(`SELECT *
                                     FROM users`);
  } else {
    result = await conn.execute(
      `SELECT *
                                     FROM users
                                     WHERE uid = ?`,
      [uid]
    );
  }

  const [rows, _fields] = result;
  return rows;
};

export const UsersType = new GraphQLObjectType({
  name: "users",
  fields: {
    uid: { type: GraphQLID },
    email: { type: GraphQLString },
    password: { type: GraphQLString },
    nickname: { type: GraphQLString },
  },
});

export const getUsers = {
  type: new GraphQLList(UsersType),
  args: {
    uid: {
      type: GraphQLInt,
      description: "The ID of the user",
    },
  },
  async resolve(parentVal, args) {
    return await getUserByUid(args.uid);
  },
};

export const createUsers = {
  type: UsersType,
  args: {
    email: {
      type: GraphQLString,
      description: "The users email to create",
    },
    password: {
      type: GraphQLString,
      description: "The users password",
    },
    nickname: {
      type: GraphQLString,
      description: "The users nickname",
    },
  },
  async resolve(parentVal, args) {
    const sql = `INSERT INTO USERS (email, password, nickname)
                     VALUES (?, ?, ?);
        `;
    const [rows, fields] = await conn.execute(sql, [
      args.email,
      args.password,
      args.nickname,
    ]);
    const res = await getUserByUid(rows.insertId);
    return res[0];
  },
};
