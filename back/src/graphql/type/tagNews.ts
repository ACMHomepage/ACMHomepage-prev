import { GraphQLInt, GraphQLObjectType } from 'graphql';

/******************************************************************************
 * Main part
 *****************************************************************************/
export const TagNewsRelationType = new GraphQLObjectType({
  name: 'tagNewsRelation',
  fields: {
    tagID: { type: GraphQLInt },
    newsID: { type: GraphQLInt },
  },
});

/******************************************************************************
 * Mutation field.
 *****************************************************************************/
export const unbindRelation = (database) => ({
  type: TagNewsRelationType,
  args: {
    tagID: {
      type: GraphQLInt,
      description: 'tag id',
    },
    newsID: {
      type: GraphQLInt,
      description: 'news id',
    },
  },
  async resolve(_parentVal, args) {
    return await database.tagNews.unbindRelation(args.tagID, args.newsID);
  },
});
