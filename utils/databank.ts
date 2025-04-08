interface ShipmentData {
  consignorFullName: string;
  consignorFullAddress: string;
  consignorCity: string;
  consignorCountry: string;
  consignorEmail: string;
  consignorPhone: string;
  consigneeFullName: string;
  consigneeFullAddress: string;
  consigneeCity: string;
  consigneeCountry: string;
  consigneeEmail: string;
  consigneePhone: string;
  originCity: string;
  street: string;
  destinationCountry: string;
  destinationCity: string;
  destinationStreet: string;
  shipmentType: string;
  description: string;
  fclSelection: string;
  lclSelection: string;
  numberOfPieces: string;
  isDangerousGoods: boolean;
  shippingDate: string;
  deliveryDate: string;
}

class Databank {
  private data: ShipmentData[] = [];

  // Save a new row of data
  saveData(newData: ShipmentData): void {
    this.data.push(newData);
  }

  // Get all saved data
  getData(): ShipmentData[] {
    return this.data;
  }

  // Reset all data
  reset(): void {
    this.data = [];
  }
}

const databank = new Databank();
export default databank;
