declare module "../../../utils/orderDatabank" {
  export function getOrders(): any[];
  export function addOrder(order: Record<string, any>): void;
}
