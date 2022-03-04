import { GraphQLInt, GraphQLObjectType, GraphQLString } from "graphql";

export const PersonType = new GraphQLObjectType({
  name: "person",
  fields: {
    id: { type: GraphQLInt },
    name: { type: GraphQLString },
  },
});
