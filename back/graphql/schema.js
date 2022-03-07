import {
  GraphQLSchema as GraphQLSchemaCreator,
  GraphQLObjectType,
} from "graphql";
import { createNews, getNews } from "./type/news.js";
import { register, signIn, getUser } from "./type/user.js";

export const QueryType = new GraphQLObjectType({
  name: "query",
  fields: {
    getNews,
    getUser,
  },
});

export const MutationType = new GraphQLObjectType({
  name: "createNews",
  fields: {
    createNews,
    register,
    signIn,
  },
});

export const GraphQLSchema = new GraphQLSchemaCreator({
  query: QueryType,
  mutation: MutationType,
});
