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

  constructor() {
    this.initializeDefaults();
  }

  // Initialize all fields with default values
  private initializeDefaults(): void {
    const defaultValues: Partial<ShipmentData> = {
      consignorName: "No Input",
      consignorEmail: "No Input",
      consignorPhone: "No Input",
      consignorAddress: "No Input",
      consignorCountry: "No Input",
      consignorCity: "No Input",
      consigneeName: "No Input",
      consigneeEmail: "No Input",
      consigneePhone: "No Input",
      consigneeAddress: "No Input",
      consigneeCountry: "No Input",
      consigneeCity: "No Input",
      originCountry: "No Input",
      originCity: "No Input",
      originStreet: "No Input",
      destinationCountry: "No Input",
      destinationCity: "No Input",
      destinationStreet: "No Input",
      containerType: "No Input",
      goodsDescription: "No Input",
      packageType: "No Input",
      numberOfPieces: "No Input",
      dangerousGoods: "No Input",
      shippingDate: "No Input",
      deliveryDate: "No Input",
      shipmentType: "No Input",
      fclSelection: "No Input",
      lclSelection: "No Input",
      weight: "No Input",
      height: "No Input",
      length: "No Input",
      width: "No Input",
      isFragile: false,
      fragileCategory: "No Input",
      fragileSubCategory: "No Input",
      extraProtection: false,
      deliveryOption: "No Input",
    };
    this.data = { ...defaultValues };
  }

  // Get the current data
  getData(): Partial<ShipmentData> {
    return this.data;
  }

  // Update a specific field in real-time
  updateField(field: keyof ShipmentData, value: string | boolean): void {
    this.data[field] = value as any; // Explicitly cast to `any` to handle `string | boolean`
  }

  // Reset the databank
  reset(): void {
    this.initializeDefaults();
  }
}

const temporaryDatabank = new TemporaryDatabank();
export default temporaryDatabank;
