import { conn } from '../../db/connection.js';
import {
  GraphQLInt,
  GraphQLList,
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLNonNull,
} from 'graphql';
import { salt } from '../../main.js';
import jwt from 'jsonwebtoken';
/******************************************************************************
 * Util function.
 *****************************************************************************/
const getNewsById = async (id) => {
  let result;
  if (id === undefined) {
    result = await conn.execute('SELECT * FROM news');
  } else {
    result = await conn.execute('SELECT * FROM news WHERE id = ?', [id]);
  }

  const [rows, _fields] = result;
  return rows;
};

/******************************************************************************
 * Main part
 *****************************************************************************/

/**
 * Summary is the begining part of the content. `SUMMARY_LENGTH` means the max
 * length of summary.
 */
const SUMMARY_LENGTH = 200;

const NewsType = new GraphQLObjectType({
  name: 'news',
  fields: {
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    content: { type: GraphQLString },
    summary: {
      type: GraphQLString,
      resolve(self) {
        return self.content.substr(0, SUMMARY_LENGTH);
      },
    },
    image_url: { type: GraphQLString },
    created_date: { type: GraphQLString },
    modified_date: { type: GraphQLString },
  },
});
export default NewsType;

/******************************************************************************
 * Query field.
 *****************************************************************************/
export const getNews = {
  type: new GraphQLList(NewsType),
  args: {
    id: {
      type: GraphQLInt,
      description: 'The ID of the news.',
    },
  },
  async resolve(_parentVal, args) {
    return getNewsById(args.id);
  },
};

/******************************************************************************
 * Mutation field.
 *****************************************************************************/
export const createNews = {
  type: NewsType,
  args: {
    title: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'The title of the news to create.',
    },
    image_url: {
      type: new GraphQLNonNull(GraphQLString),
      description: "The picture's URL of the news to create.",
    },
    content: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'The content of the news to create.',
    },
  },
  async resolve(_parentVal, args, context) {
    const verified = await jwt.verify(
      context.req.cookies.jwt,
      salt,
      (err, decoded) => {
        if (err) {
          console.log('Error!');
          return false;
        } else if (decoded.isAdmin) {
          return true;
        }
      },
    );
    if (!verified) {
      throw new Error('Cannot verify.');
    }

    const sql = `INSERT INTO news
      (title, image_url, content, created_date, modified_date)
      VALUES ( ?, ?, ?, NOW(), NOW() )`;
    const [rows, _fields] = await conn.execute(sql, [
      args.title,
      args.image_url,
      args.content,
    ]);

    // With the `rows.insertId`, we can find the created news, and it will
    // return the an array with length 1.
    const result = await getNewsById(rows.insertId);
    return result[0];
  },
};
