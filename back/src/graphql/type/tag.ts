import { GraphQLInt, GraphQLObjectType, GraphQLString } from 'graphql';

/******************************************************************************
 * Main part
 *****************************************************************************/
export const TagType = new GraphQLObjectType({
  name: 'tag',
  fields: {
    id: {
      type: GraphQLInt,
      description: 'The tag ID.',
    },
    name: {
      type: GraphQLString,
      description: 'The tag name',
    },
  },
});

/******************************************************************************
 * Mutation field.
 *****************************************************************************/
export const insertTag = (database) => ({
  type: TagType,
  args: {
    name: {
      type: GraphQLString,
      description: 'The name of the tag.',
    },
  },
  async resolve(_parentVal, args) {
    return await database.tag.insert(args.name);
  },
});

export const removeTag = (database) => ({
  type: TagType,
  args: {
    name: {
      type: GraphQLString,
      description: 'The tag name.',
    },
  },
  async resolve(_parentVal, args) {
    return database.tag.remove(args.name);
  },
});
