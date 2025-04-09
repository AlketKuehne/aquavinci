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
  packageType: string; // Represents "Number of Packages/Containers"
  numberOfPackages: string; // Added to store the unified "Number of Packages" value
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
  selectedProtections?: string[]; // Added missing property
}

let dataStore: Partial<ShipmentData>[] = [];

const databank = {
  saveData: (data: Partial<ShipmentData>) => {
    // Ensure "numberOfPackages" is consistent with "packageType" or "lclSelection"
    if (data.shipmentType === "LCL" && data.lclSelection) {
      data.numberOfPackages = data.lclSelection; // Use "lclSelection" for "Number of Packages"
    } else if (data.shipmentType === "FCL" && data.packageType) {
      data.numberOfPackages = data.packageType; // Use "packageType" for "Number of Packages"
    }
    dataStore.push(data);
  },
  getData: () => {
    return dataStore;
  },
  updateData: (updatedData: Partial<ShipmentData>) => {
    if (dataStore.length > 0) {
      // Ensure "numberOfPackages" is consistent during updates
      if (updatedData.shipmentType === "LCL" && updatedData.lclSelection) {
        updatedData.numberOfPackages = updatedData.lclSelection;
      } else if (updatedData.shipmentType === "FCL" && updatedData.packageType) {
        updatedData.numberOfPackages = updatedData.packageType;
      }
      dataStore[dataStore.length - 1] = { ...dataStore[dataStore.length - 1], ...updatedData };
    }
  },
};

export default databank;
