import {GraphQLSchema} from "graphql";
import {Mutation, Query} from "./query.js";

export const personQuerySchema = new GraphQLSchema({
    query: Query,
    mutation: Mutation
})