import {
  GraphQLSchema as GraphQLSchemaCreator,
  GraphQLObjectType,
} from "graphql";
import { createNews, getNews } from "./type/news.js";

export const QueryType = new GraphQLObjectType({
  name: "query",
  fields: {
    getNews,
  },
});

export const MutationType = new GraphQLObjectType({
  name: "createNews",
  fields: {
    createNews,
  },
});

export const GraphQLSchema = new GraphQLSchemaCreator({
  query: QueryType,
  mutation: MutationType,
});
