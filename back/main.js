import express from "express";
import { graphqlHTTP } from "express-graphql";
import { personQuerySchema } from "./graphql/query/schema.js";

const personQuery = express();
personQuery.use(
  "/person",
  graphqlHTTP({
    schema: personQuerySchema,
    graphiql: true,
  })
);
personQuery.listen(4000, () => {
  console.log("Listening...");
});
