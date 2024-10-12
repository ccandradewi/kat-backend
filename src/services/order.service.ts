import { Request } from "express";
import { execute_query } from "../lib/mysql";

class OrderService {
  async createOrder(req: Request) {
    const { customer_name, order_total, product_name } = req.body;

    if (!customer_name || order_total === undefined || !product_name) {
      throw new Error(
        "Please input customer_name and order_total and product_name"
      );
    }
    await execute_query("START TRANSACTION");
    try {
      const countQuery = `SELECT COUNT(*) as count FROM orders WHERE order_date = CURDATE()`;
      const countResult = await execute_query(countQuery);
      const runningNumber = countResult[0].count + 1;

      const uniqueOrderCode = `ORD-${new Date()
        .toISOString()
        .slice(0, 10)
        .replace(/-/g, "")}-${String(runningNumber).padStart(3, "0")}`;

      const insertQuery = `INSERT INTO orders (customer_name, order_total, product_name, order_date, running_number, unique_code)
                           VALUES ('${customer_name}', ${order_total}, '${product_name}', CURDATE(), ${runningNumber}, '${uniqueOrderCode}')`;

      await execute_query(insertQuery);

      await execute_query("COMMIT");

      return {
        message: "Order created successfully",
        order_code: uniqueOrderCode,
      };
    } catch (error) {
      await execute_query("ROLLBACK");
      throw new Error("Transaction failed, rolled back changes");
    }
  }

  async getTopCustomer() {
    const query = `
      SELECT customer_name, SUM(order_total) as total_purchases
      FROM orders
      GROUP BY customer_name
      ORDER BY total_purchases DESC
      LIMIT 1
    `;
    return execute_query(query);
  }

  async createOrderWithTransaction(req: Request) {
    const { customer_name, order_total } = req.body;

    if (!customer_name || order_total === undefined) {
      throw new Error("Please input customer_name and order_total");
    }

    const transactionStart = `START TRANSACTION`;
    await execute_query(transactionStart);

    try {
      const insertQuery = `INSERT INTO orders (customer_name, order_total, order_date) VALUES ('${customer_name}', ${order_total}, CURDATE())`;
      await execute_query(insertQuery);

      const updateQuery = `UPDATE some_other_table SET some_column = some_value WHERE condition`;
      await execute_query(updateQuery);

      const transactionCommit = `COMMIT`;
      await execute_query(transactionCommit);
    } catch (error) {
      const transactionRollback = `ROLLBACK`;
      await execute_query(transactionRollback);
      throw new Error("Transaction failed, rolled back changes: ");
    }
  }
}

export default new OrderService();
