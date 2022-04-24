import {
  GraphQLSchema as GraphQLSchemaCreator,
  GraphQLObjectType,
} from 'graphql';

import getDatabase from '../db/database.js';
import { conn } from '../db/connection.js';

import { createNews, getNews } from './type/news.js';
import { register, signIn, getUser } from './type/user.js';
import {getTag, removeTag} from './type/tag.js'

const database = getDatabase(conn);

export const QueryType = new GraphQLObjectType({
  name: 'query',
  fields: {
    getNews: getNews(database),
    getUser: getUser(database),
    getTag: getTag(database)
  },
});

export const MutationType = new GraphQLObjectType({
  name: 'mutation',
  fields: {
    createNews: createNews(database),
    register: register(database),
    signIn: signIn(database),
    removeTag:  removeTag(database)
  },
});

export const GraphQLSchema = new GraphQLSchemaCreator({
  query: QueryType,
  mutation: MutationType,
});
