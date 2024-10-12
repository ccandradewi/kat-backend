INSERT INTO archived_orders (order_id, customer_name, order_total, product_name, order_date, running_number, unique_code)
SELECT order_id, customer_name, order_total, product_name, order_date, running_number, unique_code
FROM orders;
DELETE FROM orders;


SELECT product_name, COUNT(order_id) AS total_orders, SUM(order_total) AS total_sales
FROM orders
GROUP BY product_name;


WITH recent_orders AS (
    SELECT o.order_id, o.product_name, o.order_total, o.customer_name, o.order_date, p.product_price
    FROM orders o
    JOIN products p ON o.product_name = p.product_name
)
SELECT u.username, r.product_name, r.order_total, r.product_price
FROM users u
JOIN recent_orders r ON u.id = r.customer_id;
