import {conn} from "./connection.js"
import util from "util";

export const query = util.promisify(conn.query).bind(conn)