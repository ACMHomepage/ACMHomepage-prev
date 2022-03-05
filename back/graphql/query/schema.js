import { GraphQLSchema as GraphQLSchemaCreator } from "graphql";
import { QueryType, MutationType } from "./query.js";

export const GraphQLSchema = new GraphQLSchemaCreator({
  query: QueryType,
  mutation: MutationType,
});
