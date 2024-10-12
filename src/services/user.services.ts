import { Request } from "express";
import { execute_query } from "../lib/mysql";

class UserService {
  async userLogin(req: Request) {
    const { email, username, password } = req.body;
    if ((!username && !email) || !password)
      throw new Error("please input email or username and password");
    const query = `select id,email,username from users where email = '${email}' OR username = '${username}' and password = '${password}'`;
    return execute_query(query);
  }
  async userRegister(req: Request) {
    const { email, password, username } = req.body;

    if (!email || !password || !username)
      throw new Error("please input email, password and username");
    const query = `insert into users (email,password,username) values('${email}','${password}','${username}')`;
    return execute_query(query);
  }
}

export default new UserService();
