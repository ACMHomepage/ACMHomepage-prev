import {
    GraphQLInt,
    GraphQLList,
    GraphQLObjectType,
    GraphQLString,
} from 'graphql';

/******************************************************************************
 * Main part
 *****************************************************************************/
export const ProblemSolvedType = new GraphQLObjectType({
    name: 'problemSolved',
    fields: {
        account: {
            type: GraphQLString,
            description: "the contest account",
        },
        source: {
            type: GraphQLString,
            description: 'the contest website/name'
        },
        solved: {
            type: GraphQLInt,
            description: "the problem solved"
        },
        date: {
            type: GraphQLString,
            description: "the crawling date"
        }
    }
});

/******************************************************************************
 * Query field.
 *****************************************************************************/
export const getSovled = (database) => ({
    type: GraphQLList(ProblemSolvedType),
    args: {
        id: {
            type: GraphQLInt
        },
        account: {
            type: GraphQLString
        },
        source: {
            type: GraphQLString
        }
    },
    async resolve(_parentVal, args) {
        return await database.problemSolved.getSolved(args.id, args.account, args.source);
    }
});

/******************************************************************************
 * Mutation field.
 *****************************************************************************/
export const insertSolved = (database) => ({
    type: ProblemSolvedType,
    args: {
        account: {
            type: GraphQLString
        },
        source: {
            type: GraphQLString
        },
        solved: {
            type: GraphQLInt
        }
    },
    async resolve(_parentVal, args) {
        return await database.problemSolved.insertSolved(args.account, args.source, args.solved);
    }
});

export const removeSolved = (database) => ({
    type: ProblemSolvedType,
    args: {
        account: {
            type: GraphQLString
        },
        source: {
            type: GraphQLString
        },
    },
    async resolve(_parentVal, args) {
        return await database.problemSolved.remove(args.account, args.source);
    }
});