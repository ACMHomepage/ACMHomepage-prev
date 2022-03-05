import express from "express";
import { graphqlHTTP } from "express-graphql";
import { GraphQLSchema } from "./graphql/query/schema.js";

/**
 * GRAPHIQL means if open graphiql (graph-i-ql but not graph-ql). It is helpful
 * for debug.
 */
const GRAPHIQL = process.env.NODE_ENV === 'development' ? true : false;

const personQuery = express();
personQuery.use(
  "/graphql",
  graphqlHTTP({
    schema: GraphQLSchema,
    graphiql: GRAPHIQL,
  })
);
personQuery.listen(4000, () => {
  console.log("Listening...");
});
