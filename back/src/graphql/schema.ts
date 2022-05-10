import {
  GraphQLSchema as GraphQLSchemaCreator,
  GraphQLObjectType,
} from 'graphql';

import getDatabase from '../db/database.js';
import { conn } from '../db/connection.js';

import { createNews, getNews, getNewsByTagName } from './type/news.js';
import { register, signIn, getUser } from './type/user.js';
import { getTagsByNewsID, insertTag, removeTag } from './type/tag.js';
import { unbindRelation } from './type/tagNews.js';
import { getUserAccount, insertUserAccount, removeUserAccount } from './type/userAccount.js';
import { getSovled, insertSolved, removeSolved } from './type/problemSolved.js';

const database = getDatabase(conn);

export const QueryType = new GraphQLObjectType({
  name: 'query',
  fields: {
    getNews: getNews(database),
    getUser: getUser(database),
    getTagsByNewsID: getTagsByNewsID(database),
    getNewsByTagName: getNewsByTagName(database),
    getUserAccount: getUserAccount(database),
    getSovled: getSovled(database)
  },
});

export const MutationType = new GraphQLObjectType({
  name: 'mutation',
  fields: {
    createNews: createNews(database),
    register: register(database),
    signIn: signIn(database),
    removeTag: removeTag(database),
    insertTag: insertTag(database),
    unbindRelation: unbindRelation(database),
    insertUserAccount: insertUserAccount(database),
    removeUserAccount: removeUserAccount(database),
    insertSolved: insertSolved(database),
    removeSolved: removeSolved(database)
  },
});

export const GraphQLSchema = new GraphQLSchemaCreator({
  query: QueryType,
  mutation: MutationType,
});
