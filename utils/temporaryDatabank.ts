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
}

class TemporaryDatabank {
  private data: Partial<ShipmentData> = {};

  // Get the current data
  getData(): Partial<ShipmentData> {
    return this.data;
  }

  // Update a specific field
  updateField(field: keyof ShipmentData, value: string | boolean): void {
    this.data[field] = value as any; // Explicitly cast to `any` to handle `string | boolean`
  }

  // Initialize with default values if empty
  initializeDefaults(): void {
    if (Object.keys(this.data).length === 0) {
      this.updateField("consignorName", "N/A");
      this.updateField("consigneeName", "N/A");
      this.updateField("shipmentType", "FCL");
    }
  }

  // Reset the databank
  reset(): void {
    this.data = {};
  }
}

const temporaryDatabank = new TemporaryDatabank();
temporaryDatabank.initializeDefaults(); // Ensure defaults are set on initialization
export default temporaryDatabank;
