import { GraphQLObjectType, GraphQLString, GraphQLID } from "graphql";

/**
 * Summary is the begining part of the content. `SUMMARY_LENGTH` means the max
 * length of summary.
 */
const SUMMARY_LENGTH = 200;

export const NewsType = new GraphQLObjectType({
  name: "news",
  fields: {
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    content: { type: GraphQLString },
    summary: {
      type: GraphQLString,
      resolve(self) {
        return self.content.substr(0, SUMMARY_LENGTH);
      },
    },
    image_url: { type: GraphQLString },
    created_date: { type: GraphQLString },
    modified_date: { type: GraphQLString },
  },
});
