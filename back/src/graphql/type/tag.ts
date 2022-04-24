import {
    GraphQLBoolean,
    GraphQLID,
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
            description: 'The tag ID.'
        },
        name: {
            type: GraphQLString,
            description: 'The tag name'
        }
    }
});

/******************************************************************************
 * Query field.
 *****************************************************************************/
export const getTag = (database) => ({
    type: new GraphQLList(TagType),
    args: {
        id: {
            type: GraphQLInt,
            description: 'The ID of the tag.'
        }
    },
    async resolve(_parentVal, args){
        const {ID, NAME} = database.tag.FIELDS;
        const fields = [ID, NAME];
        if (args.id === undefined){
            return await database.tag.getAll();
        } else{
            return await database.tag.getById(args.id);
        }
    }
});

/******************************************************************************
 * Mutation field.
 *****************************************************************************/
export const removeTag = (database) => ({
    type: TagType,
    args: {
        id: {
            type: GraphQLInt,
            description: 'The tag ID.'
        },
        name: {
            type: GraphQLString,
            description: 'The tag name.'
        }
    },
    async resolve(_parentVal, args) {

    }
});