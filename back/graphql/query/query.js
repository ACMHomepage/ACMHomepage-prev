import { GraphQLInt, GraphQLObjectType, GraphQLString } from "graphql";
import { PersonType } from "../data_types/dataTypes.js";
import { query } from "../../db/query.js";

export const Query = new GraphQLObjectType({
  name: "query", // 为了维持语义，没有实际作用
  fields: {
    // 这里的person对应了GraphQL查询语句中的person字段
    person: {
      type: PersonType, // 指定查询的数据类型是 PersonType
      // args 字段内配置 GraphQL 查询参数，例如如下GraphQL语句
      /*
       * query{
       *   person(id:1){
       *     name
       *   }
       * }
       */
      // 之所以能够指定查询id=1的数据，就是因为在args内添加了id
      // 这在resolve内被用来填充SQL语句
      args: {
        id: { type: GraphQLInt },
      },
      // resolve函数用来决议当前的查询的SQL语义
      // 也就是说，当前这个Query要对应成哪个SQL代码
      async resolve(_parentVal, args) {
        const sql = `SELECT * FROM PERSON WHERE ID = ?`;
        const res = await query(sql, [args.id]);
        return res[0]; // res 是一个数组，取出第一个元素作为查询结果
      },
    },
  },
});
export const Mutation = new GraphQLObjectType({
  name: "mutation",
  fields: {
    insertPerson: {
      type: PersonType,
      args: {
        id: { type: GraphQLInt },
        name: { type: GraphQLString },
      },
      async resolve(_parentVal, args) {
        const sql = `INSERT INTO PERSON (ID, NAME) VALUES ( ?, ? )`;
        await query(sql, [args.id, args.name]);
        return { id: args.id, name: args.name };
      },
    },
  },
});
