import {
  GraphQLSchema as GraphQLSchemaCreator,
  GraphQLObjectType,
} from 'graphql';

import getDatabase from '../db/database.js';
import { conn } from '../db/connection.js';

import { createNews, getNews } from './type/news.js';
import { register, signIn, getUser } from './type/user.js';

const database = getDatabase(conn);

export const QueryType = new GraphQLObjectType({
  name: 'query',
  fields: {
    getNews,
    getUser: getUser(database),
  },
});

export const MutationType = new GraphQLObjectType({
  name: 'mutation',
  fields: {
    createNews,
    register: register(database),
    signIn: signIn(database),
  },
});

export const GraphQLSchema = new GraphQLSchemaCreator({
  query: QueryType,
  mutation: MutationType,
});
