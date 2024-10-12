import { Router } from "express";
import UserController from "../controller/user.controller";

class UserRouter {
  private router: Router;
  private userController: UserController;
  constructor() {
    this.router = Router();
    this.userController = new UserController();
    this.initializedRoutes();
  }

  private initializedRoutes() {
    this.router.get("/v2", this.userController.login);
    this.router.post("/v1", this.userController.register);
  }

  getRouter() {
    return this.router;
  }
}

export default new UserRouter();
