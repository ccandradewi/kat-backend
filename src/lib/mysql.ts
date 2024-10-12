import mysql from "mysql2";
import { DB_CONFIG } from "../config/config";
import { TUser } from "../models/user.model";
import { TOrder } from "../models/order.model";

export const db = mysql.createPool(DB_CONFIG);

export const test_connection = () =>
  db.getConnection((error, connection) => {
    if (error) {
      return console.log(error);
    }
    console.log("success connection", connection.threadId);
    connection.release();
  });

export const execute_query = async (
  query: string
): Promise<TUser | TUser[] | TOrder | TOrder[] | any> =>
  await new Promise((resolve, reject) => {
    db.query(query, (err: unknown, result: TUser[]) => {
      if (err instanceof Error) reject(err);
      resolve(result);
    });
  });
