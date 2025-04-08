interface ShipmentData {
  consignorName: string;
  consignorEmail: string;
  consignorPhone: string;
  consignorAddress: string;
  consignorCountry: string;
  consignorCity: string;
  consigneeName: string;
  consigneeEmail: string;
  consigneePhone: string;
  consigneeAddress: string;
  consigneeCountry: string;
  consigneeCity: string;
  originCountry: string;
  originCity: string;
  originStreet: string;
  destinationCountry: string;
  destinationCity: string;
  destinationStreet: string;
  containerType: string;
  goodsDescription: string;
  packageType: string;
  numberOfPieces: string;
  dangerousGoods: string;
  shippingDate: string;
  deliveryDate: string;
  shipmentType: string;
  fclSelection: string;
  lclSelection: string;
  weight: string;
  height: string;
  length: string;
  width: string;
  isFragile: boolean;
  fragileCategory: string;
  fragileSubCategory: string;
  extraProtection: boolean;
  deliveryOption: string;
  consignorFullName: string;
  consignorFullAddress: string;
  consigneeFullName: string;
  consigneeFullAddress: string;
  street: string;
  description: string;
  isDangerousGoods: boolean;
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

  // Update the latest row with new inputs
  updateData(updatedData: Partial<ShipmentData>): void {
    if (this.data.length > 0) {
      const lastIndex = this.data.length - 1;
      this.data[lastIndex] = { ...this.data[lastIndex], ...updatedData };
    }
  }

  // Reset all data
  reset(): void {
    this.data = [];
  }
}

const databank = new Databank();
export default databank;
