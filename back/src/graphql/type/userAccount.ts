import {
  GraphQLInt,
  GraphQLList,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';

/******************************************************************************
 * Main part
 *****************************************************************************/
export const UserAccountType = new GraphQLObjectType({
  name: 'userAccount',
  fields: {
    id: {
      type: GraphQLInt,
      description: 'the user id',
    },
    account: {
      type: GraphQLString,
      description: 'the contest account',
    },
    source: {
      type: GraphQLString,
      description: 'the contest website/name',
    },
  },
});

/******************************************************************************
 * Query field.
 *****************************************************************************/
export const getUserAccount = (database) => ({
  type: GraphQLList(UserAccountType),
  args: {
    id: {
      type: GraphQLInt,
      description: 'the user id',
    },
    source: {
      type: GraphQLString,
      description: 'the contest website/name',
    },
  },
  async resolve(_parentVal, args) {
    if (args.id === null && args.source === null) {
      return await database.userAccount.getAll();
    } else if (args.id === null) {
      return await database.userAccount.getBySource(args.source);
    }
    return await database.userAccount.getByID(args.id);
  },
});

/******************************************************************************
 * Mutation field.
 *****************************************************************************/
export const insertUserAccount = (database) => ({
  type: UserAccountType,
  args: {
    id: {
      type: GraphQLInt,
      description: 'the user id',
    },
    account: {
      type: GraphQLString,
      description: 'the contest account',
    },
    source: {
      type: GraphQLString,
      description: 'the contest website/name',
    },
  },
  async resolve(_parentVal, args) {
    return await database.userAccount.insert(
      args.id,
      args.account,
      args.source,
    );
  },
});

export const removeUserAccount = (database) => ({
  type: UserAccountType,
  args: {
    id: {
      type: GraphQLInt,
      description: 'the user id',
    },
    account: {
      type: GraphQLString,
      description: 'the contest account',
    },
    source: {
      type: GraphQLString,
      description: 'the contest website/name',
    },
  },
  async resolve(_parentVal, args) {
    if (args.account === null && args.source === null) {
      return await database.userAccount.removeByID(args.id);
    } else if (args.account !== null && args.source !== null) {
      return await database.userAccount.remove(
        args.id,
        args.account,
        args.source,
      );
    } else {
      return null;
    }
  },
});
