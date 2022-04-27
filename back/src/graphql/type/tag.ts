import {
  GraphQLInt,
  GraphQLList,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';

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
 * Query field.
 *****************************************************************************/
export const getTagsByNewsID = (database) => ({
  type: new GraphQLList(TagType),
  args: {
    id: {
      type: GraphQLInt,
      description: 'The news id',
    },
  },
  async resolve(_parentVal, args) {
    return database.tagNews.getTagsByNewsID(args.id);
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
    const rows = await database.tag.insert(args.name);
    return await database.tag.getById(rows.insertId);
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
    const result = await database.tag.getByName(args.name);
    await database.tag.remove(args.name);
    return result;
  },
});
