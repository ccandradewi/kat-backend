import { NextFunction, Request, Response } from "express";
import orderService from "../services/order.service";

export default class OrderController {
  async createOrder(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await orderService.createOrder(req);
      res.status(201).send({
        message: "Order created successfully",
        data,
      });
    } catch (error) {
      next(error);
    }
  }

  async getTopCustomer(req: Request, res: Response, next: NextFunction) {
    try {
      const topCustomer = await orderService.getTopCustomer();
      res.send({
        message: "Top customer retrieved successfully",
        data: topCustomer,
      });
    } catch (error) {
      next(error);
    }
  }

  async createOrderWithTransaction(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      await orderService.createOrderWithTransaction(req);
      res.status(201).send({
        message: "Order created with transaction successfully",
      });
    } catch (error) {
      next(error);
    }
  }
}
