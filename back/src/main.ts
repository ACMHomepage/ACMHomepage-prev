import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import type { IncomingMessage, ServerResponse } from 'http';

import { GraphQLSchema } from './graphql/schema.js';

/**
 * GRAPHIQL means if open graphiql (graph-i-ql but not graph-ql). It is helpful
 * for debug.
 */
const GRAPHIQL = process.env.NODE_ENV === 'development';

const GraphQLServer = express();

GraphQLServer.use(express.json({ limit: '20mb' }));
GraphQLServer.use(cookieParser());

// If the env is development, then open the CORS to support front-end's GraphQL
// Query and Mutation from another port.
if (process.env.NODE_ENV === 'development') {
  GraphQLServer.use(cors());
}

GraphQLServer.use(
  '/graphql',
  // Let the req and res be in these `resolve` functions' context.
  (req: IncomingMessage & { url: string; }, res: ServerResponse & { json?: (data: unknown) => void; }) => {
    return graphqlHTTP({
      schema: GraphQLSchema,
      graphiql: GRAPHIQL,
      context: { req, res },
    })(req, res);
  },
);

GraphQLServer.listen(4000, () => {
  console.log('Listening on localhost:4000...');
});
