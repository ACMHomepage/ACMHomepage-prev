import express from "express";
import { graphqlHTTP } from "express-graphql";
import { GraphQLSchema } from "./graphql/schema.js";
import cors from 'cors';

/**
 * GRAPHIQL means if open graphiql (graph-i-ql but not graph-ql). It is helpful
 * for debug.
 */
const GRAPHIQL = process.env.NODE_ENV === 'development' ? true : false;

const GraphQLServer = express();

// If the env is development, then open the CORS to support front-end's GraphQL
// Query and Mutation from another port.
if (process.env.NODE_ENV === 'development') {
  GraphQLServer.use(cors())
}

GraphQLServer.use(
  "/graphql",
  graphqlHTTP({
    schema: GraphQLSchema,
    graphiql: GRAPHIQL,
  })
);

GraphQLServer.listen(4000, () => {
  console.log("Listening on localhost:4000...");
});
