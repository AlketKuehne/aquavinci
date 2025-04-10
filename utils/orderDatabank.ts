import fs from "fs";
import path from "path";

const ordersFilePath = path.join(process.cwd(), "data", "confirmedOrders.json");

// Ensure the file exists
if (!fs.existsSync(ordersFilePath)) {
  fs.mkdirSync(path.dirname(ordersFilePath), { recursive: true });
  fs.writeFileSync(ordersFilePath, JSON.stringify([]));
}

export function getOrders() {
  const data = fs.readFileSync(ordersFilePath, "utf-8");
  return JSON.parse(data);
}

export function addOrder(order: Record<string, any>) {
  const orders = getOrders();
  orders.push(order);
  fs.writeFileSync(ordersFilePath, JSON.stringify(orders, null, 2));
}
