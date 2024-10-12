import { Router } from "express";
import UserController from "../controller/user.controller";
import OrderController from "../controller/order.controller";

class OrderRouter {
  private router: Router;
  private orderController: OrderController;
  constructor() {
    this.router = Router();
    this.orderController = new OrderController();
    this.initializedRoutes();
  }

  private initializedRoutes() {
    this.router.post("/", this.orderController.createOrder);
    this.router.get("/top-customer", this.orderController.getTopCustomer);
    this.router.post(
      "/transaction",
      this.orderController.createOrderWithTransaction
    );
  }

  getRouter() {
    return this.router;
  }
}

export default new OrderRouter();
