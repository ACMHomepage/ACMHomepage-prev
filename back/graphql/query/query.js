import {
  GraphQLInt,
  GraphQLObjectType,
  GraphQLList,
  GraphQLString,
  GraphQLNonNull,
} from "graphql";
import { NewsType } from "../data_types/dataTypes.js";
import { conn } from "../../db/connection.js";

async function getNewsById(id) {
  let result;
  if (id === undefined) {
    result = await conn.execute("SELECT * FROM news");
  } else {
    result = await conn.execute("SELECT * FROM news WHERE id = ?", [id]);
  }

  const [row, _fields] = result;
  return row;
}

export const GetNewsType = new GraphQLObjectType({
  name: "getNews",
  fields: {
    news: {
      type: new GraphQLList(NewsType),
      args: {
        id: {
          type: GraphQLInt,
          description: "The ID of the news.",
        },
      },
      async resolve(_parentVal, args) {
        return getNewsById(args.id);
      },
    },
  },
});

export const CreateNewsType = new GraphQLObjectType({
  name: "createNews",
  fields: {
    createNews: {
      type: NewsType,
      args: {
        title: {
          type: new GraphQLNonNull(GraphQLString),
          description: "The title of the news to create.",
        },
        image_url: {
          type: new GraphQLNonNull(GraphQLString),
          description: "The picture's URL of the news to create.",
        },
        content: {
          type: new GraphQLNonNull(GraphQLString),
          description: "The content of the news to create.",
        },
      },
      async resolve(_parentVal, args) {
        const sql = `INSERT INTO news
          (title, image_url, content, created_date, modified_date)
          VALUES ( ?, ?, ?, NOW(), NOW() )`;
        const [rows, _fields] = await conn.execute(sql, [
          args.title,
          args.image_url,
          args.content,
        ]);

        // With the `rows.insertId`, we can find the created news, and it will
        // return the an array with length 1.
        const result = await getNewsById(rows.insertId);
        return result[0];
      },
    },
  },
});
