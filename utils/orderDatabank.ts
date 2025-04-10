import fs from "fs";
import path from "path";

const ordersFilePath = path.join(process.cwd(), "data", "confirmedOrders.json");

// Ensure the file exists
if (!fs.existsSync(ordersFilePath)) {
  console.log("Creating data folder and confirmedOrders.json file...");
  fs.mkdirSync(path.dirname(ordersFilePath), { recursive: true }); // Create the `data` folder if it doesn't exist
  fs.writeFileSync(ordersFilePath, JSON.stringify([])); // Create the `confirmedOrders.json` file with an empty array
}

export function getOrders() {
  console.log("Reading orders from file...");
  const data = fs.readFileSync(ordersFilePath, "utf-8");
  return JSON.parse(data);
}

export function addOrder(order: Record<string, any>) {
  console.log("Adding order:", order);
  const orders = getOrders();
  orders.push(order);
  fs.writeFileSync(ordersFilePath, JSON.stringify(orders, null, 2));
  console.log("Order written to file successfully!");
}
