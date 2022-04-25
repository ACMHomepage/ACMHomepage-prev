import {
  GraphQLInt,
  GraphQLList,
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLNonNull,
} from 'graphql';
import { salt } from '../../salt.js';
import * as jwt from 'jsonwebtoken';
const { verify } = jwt;
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
    imageUrl: { type: GraphQLString },
    createdDate: { type: GraphQLString },
    modifiedDate: { type: GraphQLString },
  },
});
export default NewsType;

/******************************************************************************
 * Query field.
 *****************************************************************************/
export const getNews = (database) => ({
  type: new GraphQLList(NewsType),
  args: {
    id: {
      type: GraphQLInt,
      description: 'The ID of the news.',
    },
  },
  async resolve(_parentVal, args) {
    const FIELDS = database.news.FIELDS;
    const { ID, TITLE, IMAGE_URL, CONTENT, CREATE_DATA, MODIFIED_DATA } =
      FIELDS;
    const fields = [ID, TITLE, IMAGE_URL, CONTENT, CREATE_DATA, MODIFIED_DATA];

    if (args.id === undefined) {
      return await database.news.getAll(fields);
    } else {
      return await database.news.getById(fields, args.id);
    }
  },
});

/******************************************************************************
 * Mutation field.
 *****************************************************************************/
export const createNews = (database) => ({
  type: NewsType,
  args: {
    title: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'The title of the news to create.',
    },
    imageUrl: {
      type: new GraphQLNonNull(GraphQLString),
      description: "The picture's URL of the news to create.",
    },
    content: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'The content of the news to create.',
    },
  },
  async resolve(_parentVal, args, context) {
    verify(context.req.cookies.jwt, salt, (err, decoded) => {
      if (process.env.NODE_ENV === 'development') {
        return true;
      } else if (err) {
        throw new Error('Cannot verify.');
      } else if (decoded.isAdmin) {
        return true;
      }
    });

    const FIELDS = database.news.FIELDS;
    const {
      ID,
      TITLE,
      IMAGE_URL,
      CONTENT,
      CREATE_DATA: CREATED_DATE,
      MODIFIED_DATA,
    } = FIELDS;
    const fields = [ID, TITLE, IMAGE_URL, CONTENT, CREATED_DATE, MODIFIED_DATA];

    const rows = database.news.insert({
      title: args.title,
      imageUrl: args.imageUrl,
      content: args.content,
    });
    return await database.news.getById(fields, rows.insertId);
  },
});
