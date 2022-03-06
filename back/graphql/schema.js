import {
  GraphQLSchema as GraphQLSchemaCreator,
  GraphQLObjectType,
} from "graphql";
import { createNews, getNews } from "./type/news.js";
import { createUsers, getUsers } from "./type/users.js";

export const QueryType = new GraphQLObjectType({
  name: "query",
  fields: {
    getNews,
    getUsers,
  },
});

export const MutationType = new GraphQLObjectType({
  name: "createNews",
  fields: {
    createNews,
    createUsers,
  },
});

export const GraphQLSchema = new GraphQLSchemaCreator({
  query: QueryType,
  mutation: MutationType,
});
