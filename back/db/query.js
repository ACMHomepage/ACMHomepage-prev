import {conn} from "./connection.js"
import util from "util";

/**
 * Promisify query, whose connection object is exported by file
 * `back/db/connection.js` and binded to itself.
 */
export const query = util.promisify(conn.query).bind(conn)
