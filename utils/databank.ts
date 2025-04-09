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
  numberOfPackages: string; // Unified "Number of Packages/Containers" value
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
    // Ensure "numberOfPackages" is consistent with the latest input
    if (data.lclSelection) {
      data.numberOfPackages = data.lclSelection; // Use "lclSelection" from /details
    } else if (data.packageType) {
      data.numberOfPackages = data.packageType; // Use "packageType" from /create-shipment
    }
    dataStore.push(data);
  },
  getData: () => {
    // Ensure "numberOfPackages" prioritizes /details input
    if (dataStore.length > 0) {
      const latestData = dataStore[dataStore.length - 1];
      if (latestData.lclSelection) {
        latestData.numberOfPackages = latestData.lclSelection; // Override with /details input
      }
      return dataStore;
    }
    return [];
  },
  updateData: (updatedData: Partial<ShipmentData>) => {
    if (dataStore.length > 0) {
      // Ensure "numberOfPackages" is consistent during updates
      if (updatedData.lclSelection) {
        updatedData.numberOfPackages = updatedData.lclSelection; // Use /details input
      } else if (updatedData.packageType) {
        updatedData.numberOfPackages = updatedData.packageType; // Use /create-shipment input
      }
      dataStore[dataStore.length - 1] = { ...dataStore[dataStore.length - 1], ...updatedData };
    }
  },
};

export default databank;
