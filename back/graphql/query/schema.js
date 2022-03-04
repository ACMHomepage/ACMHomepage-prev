import { GraphQLSchema } from "graphql";
import { GetNewsType, CreateNewsType } from "./query.js";

export const personQuerySchema = new GraphQLSchema({
  query: GetNewsType,
  mutation: CreateNewsType,
});
