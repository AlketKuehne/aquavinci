"use client"; // Wichtig für useState

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
// Entfernen Sie den Import des Icons
// import { FaArrowRight } from "react-icons/fa";

export default function ShipmentPage() {
  const router = useRouter();
  const [shipmentType, setShipmentType] = useState("");
  const [fclSelection, setFclSelection] = useState(""); // Speichert die FCL-Auswahl
  const [lclSelection, setLclSelection] = useState(""); // Speichert die LCL-Auswahl
  const [description, setDescription] = useState(""); // Speichert die Beschreibung der Waren
  const [fullName, setFullName] = useState("");
  const [fullAddress, setFullAddress] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [originCity, setOriginCity] = useState("");
  const [street, setStreet] = useState("");
  const [destinationCountry, setDestinationCountry] = useState("");
  const [destinationCity, setDestinationCity] = useState("");
  const [destinationStreet, setDestinationStreet] = useState("");
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);
  const [showError, setShowError] = useState(false);
  const [showWarning, setShowWarning] = useState(false);
  const [dateWarning, setDateWarning] = useState(false);
  const [invalidDateWarning, setInvalidDateWarning] = useState(false);

  const [consignorFullName, setConsignorFullName] = useState("");
  const [consigneeFullName, setConsigneeFullName] = useState("");
  const [consignorFullAddress, setConsignorFullAddress] = useState("");
  const [consigneeFullAddress, setConsigneeFullAddress] = useState("");
  const [consignorCity, setConsignorCity] = useState("");
  const [consigneeCity, setConsigneeCity] = useState("");
  const [consignorEmail, setConsignorEmail] = useState("");
  const [consigneeEmail, setConsigneeEmail] = useState("");
  const [consignorPhone, setConsignorPhone] = useState("");
  const [consigneePhone, setConsigneePhone] = useState("");
  const [numberOfPieces, setNumberOfPieces] = useState('');
  const [isDangerousGoods, setIsDangerousGoods] = useState(false);
  const [sendDate, setSendDate] = useState('');
  const [arrivalDate, setArrivalDate] = useState('');

  const countriesWithPorts = [
    "Albania", "Algeria", "Angola", "Argentina", "Australia", "Bangladesh", "Belgium", "Brazil", "Bulgaria", "Cambodia", "Cameroon", "Canada", "Chile", "China", "Colombia", "Croatia", "Cyprus", "Denmark", "Djibouti", "Dominican Republic", "Ecuador", "Egypt", "Estonia", "Finland", "France", "Germany", "Ghana", "Greece", "Guatemala", "Honduras", "Hong Kong", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Israel", "Italy", "Ivory Coast", "Jamaica", "Japan", "Jordan", "Kenya", "Kuwait", "Latvia", "Lebanon", "Lithuania", "Malaysia", "Malta", "Mauritius", "Mexico", "Montenegro", "Morocco", "Mozambique", "Myanmar", "Namibia", "Netherlands", "New Zealand", "Nigeria", "Norway", "Oman", "Pakistan", "Panama", "Peru", "Philippines", "Poland", "Portugal", "Qatar", "Romania", "Russia", "Saudi Arabia", "Senegal", "Singapore", "Slovenia", "South Africa", "South Korea", "Spain", "Sri Lanka", "Sweden", "Taiwan", "Tanzania", "Thailand", "Trinidad and Tobago", "Tunisia", "Turkey", "Ukraine", "United Arab Emirates", "United Kingdom", "United States", "Uruguay", "Venezuela", "Vietnam", "Yemen"
  ];

  const citiesWithPorts = {
    Albania: ["Durrës"],
    Algeria: ["Algiers", "Oran"],
    Angola: ["Luanda"],
    Argentina: ["Buenos Aires", "Rosario"],
    Australia: ["Sydney", "Melbourne"],
    Bangladesh: ["Chittagong"],
    Belgium: ["Antwerp", "Bruges"],
    Brazil: ["Santos", "Rio de Janeiro"],
    Bulgaria: ["Varna", "Burgas"],
    Cambodia: ["Sihanoukville"],
    Cameroon: ["Douala"],
    Canada: ["Vancouver", "Montreal"],
    Chile: ["Valparaíso", "San Antonio"],
    China: ["Shanghai", "Shenzhen", "Guangzhou"],
    Colombia: ["Cartagena", "Barranquilla"],
    Croatia: ["Rijeka", "Split"],
    Cyprus: ["Limassol"],
    Denmark: ["Copenhagen", "Aarhus"],
    Djibouti: ["Djibouti"],
    DominicanRepublic: ["Santo Domingo"],
    Ecuador: ["Guayaquil"],
    Egypt: ["Alexandria", "Port Said"],
    Estonia: ["Tallinn"],
    Finland: ["Helsinki"],
    France: ["Marseille", "Le Havre"],
    Germany: ["Hamburg", "Bremen", "Bremerhaven"],
    Ghana: ["Tema", "Takoradi"],
    Greece: ["Piraeus", "Thessaloniki"],
    Guatemala: ["Puerto Quetzal"],
    Honduras: ["Puerto Cortés"],
    HongKong: ["Hong Kong"],
    India: ["Mumbai", "Chennai"],
    Indonesia: ["Jakarta", "Surabaya"],
    Iran: ["Bandar Abbas"],
    Iraq: ["Umm Qasr"],
    Ireland: ["Dublin"],
    Israel: ["Haifa", "Ashdod"],
    Italy: ["Genoa", "Naples"],
    IvoryCoast: ["Abidjan"],
    Jamaica: ["Kingston"],
    Japan: ["Tokyo", "Yokohama"],
    Jordan: ["Aqaba"],
    Kenya: ["Mombasa"],
    Kuwait: ["Shuwaikh"],
    Latvia: ["Riga"],
    Lebanon: ["Beirut"],
    Lithuania: ["Klaipeda"],
    Malaysia: ["Port Klang", "Penang"],
    Malta: ["Valletta"],
    Mauritius: ["Port Louis"],
    Mexico: ["Veracruz", "Manzanillo"],
    Montenegro: ["Bar"],
    Morocco: ["Casablanca", "Tangier"],
    Mozambique: ["Maputo"],
    Myanmar: ["Yangon"],
    Namibia: ["Walvis Bay"],
    Netherlands: ["Rotterdam", "Amsterdam"],
    NewZealand: ["Auckland", "Wellington"],
    Nigeria: ["Lagos", "Port Harcourt"],
    Norway: ["Oslo"],
    Oman: ["Sohar"],
    Pakistan: ["Karachi"],
    Panama: ["Balboa"],
    Peru: ["Callao"],
    Philippines: ["Manila"],
    Poland: ["Gdansk", "Gdynia"],
    Portugal: ["Lisbon", "Porto"],
    Qatar: ["Doha"],
    Romania: ["Constanta"],
    Russia: ["Saint Petersburg", "Vladivostok"],
    SaudiArabia: ["Jeddah", "Dammam"],
    Senegal: ["Dakar"],
    Singapore: ["Singapore"],
    Slovenia: ["Koper"],
    SouthAfrica: ["Durban", "Cape Town"],
    SouthKorea: ["Busan", "Incheon"],
    Spain: ["Barcelona", "Valencia"],
    SriLanka: ["Colombo"],
    Sweden: ["Gothenburg"],
    Taiwan: ["Kaohsiung"],
    Tanzania: ["Dar es Salaam"],
    Thailand: ["Bangkok", "Laem Chabang"],
    TrinidadandTobago: ["Port of Spain"],
    Tunisia: ["Tunis"],
    Turkey: ["Istanbul", "Izmir"],
    Ukraine: ["Odessa"],
    UnitedArabEmirates: ["Dubai", "Abu Dhabi"],
    UnitedKingdom: ["London", "Liverpool"],
    UnitedStates: ["Los Angeles", "New York", "Houston"],
    Uruguay: ["Montevideo"],
    Venezuela: ["Puerto Cabello"],
    Vietnam: ["Ho Chi Minh City", "Hai Phong"],
    Yemen: ["Aden"]
  };

  const getCitiesByCountry = (country: string): string[] => {
    return citiesWithPorts[country as keyof typeof citiesWithPorts] || [];
  };

  const handleNumberOfPiecesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      setNumberOfPieces(value || '1');
    }
  };

  const handleDangerousGoodsChange = () => {
    setIsDangerousGoods(!isDangerousGoods);
  };

  const handleSendDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSendDate(e.target.value);
  };

  const handleArrivalDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setArrivalDate(e.target.value);
  };

  const handleContinue = () => {
    // Handle continue action
    console.log('Continue clicked');
  };

  const handleFullNameChange = (setter: React.Dispatch<React.SetStateAction<string>>) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^[a-zA-Z\s]*$/.test(value)) {
      setter(value);
    }
  };

  const handlePhoneNumberChange = (setter: React.Dispatch<React.SetStateAction<string>>) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      setter(value);
    }
  };

  const handleCityChange = (setter: React.Dispatch<React.SetStateAction<string>>) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^[a-zA-Z\s]*$/.test(value)) {
      setter(value);
    }
  };

  useEffect(() => {
    const isFormValid = Boolean(
      consignorFullName &&
      consignorFullAddress &&
      consignorCity &&
      country &&
      originCity &&
      street &&
      destinationCountry &&
      destinationCity &&
      destinationStreet &&
      shipmentType &&
      description &&
      ((shipmentType === "FCL" && fclSelection) || (shipmentType === "LCL" && lclSelection)) &&
      consigneeFullName &&
      consigneeFullAddress &&
      consigneeCity &&
      sendDate &&
      arrivalDate &&
      new Date(sendDate) < new Date(arrivalDate)
    );
    setIsButtonEnabled(isFormValid);
  }, [
    consignorFullName,
    consignorFullAddress,
    consignorCity,
    country,
    originCity,
    street,
    destinationCountry,
    destinationCity,
    destinationStreet,
    shipmentType,
    description,
    fclSelection,
    lclSelection,
    consigneeFullName,
    consigneeFullAddress,
    consigneeCity,
    sendDate,
    arrivalDate,
  ]);

  // Handler zum Ändern des Versandtyps (setzt die Dropdowns und die Beschreibung zurück)
  const handleShipmentChange = (type: string) => {
    setShipmentType(type);
    setFclSelection("");
    setLclSelection("");
    setDescription("");
  };

  const resetForm = () => {
    setShipmentType("");
    setFclSelection("");
    setLclSelection("");
    setDescription("");
    setConsignorFullName("");
    setConsigneeFullName("");
    setConsignorFullAddress("");
    setConsigneeFullAddress("");
    setConsignorCity("");
    setConsigneeCity("");
    setCountry("");
    setOriginCity("");
    setStreet("");
    setDestinationCountry("");
    setDestinationCity("");
    setDestinationStreet("");
    setFullName("");
    setFullAddress("");
    setCity("");
    setConsignorEmail("");
    setConsigneeEmail("");
    setConsignorPhone("");
    setConsigneePhone("");
    document.querySelectorAll('input[name="shipmentType"]').forEach((input) => {
      (input as HTMLInputElement).checked = false;
    });
  };

  const handleContinueClick = () => {
    if (!isButtonEnabled) {
      setShowError(true);
      if (!consignorFullName || !consignorFullAddress || !consignorCity || !country || !originCity || !street || !destinationCountry || !destinationCity || !destinationStreet || !shipmentType || !description || (shipmentType === "FCL" && !fclSelection) || (shipmentType === "LCL" && !lclSelection) || !consigneeFullName || !consigneeFullAddress || !consigneeCity || !sendDate || !arrivalDate) {
        setShowWarning(true);
        setInvalidDateWarning(false);
        setDateWarning(false);
      } else if (isNaN(new Date(sendDate).getTime()) || isNaN(new Date(arrivalDate).getTime())) {
        setInvalidDateWarning(true);
        setShowWarning(false);
        setDateWarning(false);
      } else if (sendDate && arrivalDate && new Date(sendDate) >= new Date(arrivalDate)) {
        setDateWarning(true);
        setShowWarning(false);
        setInvalidDateWarning(false);
      }
    } else {
      setShowWarning(false);
      setDateWarning(false);
      setInvalidDateWarning(false);
      router.push('/create-shipment/details');
    }
  };

  const closeWarning = () => {
    setShowWarning(false);
  };

  return (
    <div className="flex flex-col items-center min-h-screen">
      {/* Navigation Bar */}
      <nav className="w-full h-12 bg-[#242424] flex items-center px-4">
        <Link href="/">
          <Image src="/logoname.png" alt="Logo" width={140} height={50} className="h-10 w-auto cursor-pointer" />
        </Link>

        <div className="flex h-full ml-4">
          <Link
            href="/"
            className="flex items-center justify-center px-6 text-lg text-white bg-[#242424] transition-all duration-1250 hover:bg-gray-200 hover:text-black h-full"
          >
            Homepage
          </Link>
          <Link
            href="/create-shipment"
            className="flex items-center justify-center px-6 text-lg text-white bg-[#242424] transition-all duration-1250 hover:bg-gray-200 hover:text-black h-full"
            onClick={resetForm}
          >
            Create Shipment
          </Link>
        </div>
      </nav>

      {/* Page Content */}
      <div className="flex flex-col items-start w-full max-w-6xl mt-12 px-8">
        <h1 className="text-4xl font-extrabold mb-8 self-start">Create Shipment</h1>

        {/* First Form Section */}
        <div className="flex justify-between w-full gap-x-4">
          {/* Sender Box */}
          <div className="bg-white p-6 shadow-lg rounded-lg w-1/2">
            <h2 className="text-lg font-bold mb-4">Consignor (Sender)</h2>
            <input
              type="text"
              placeholder="Full Name *"
              className={`w-full p-2 border rounded mb-3 ${showError && !consignorFullName ? 'bg-red-100' : 'bg-gray-100'}`}
              value={consignorFullName}
              onChange={handleFullNameChange(setConsignorFullName)}
            />
            <input
              type="email"
              placeholder="Email Address"
              className="w-full p-2 border rounded mb-3 bg-gray-100"
              value={consignorEmail}
              onChange={(e) => setConsignorEmail(e.target.value)}
            />
            <input
              type="tel"
              placeholder="Phone Number"
              className="w-full p-2 border rounded mb-3 bg-gray-100"
              value={consignorPhone}
              onChange={handlePhoneNumberChange(setConsignorPhone)}
            />
            <input
              type="text"
              placeholder="Full Address *"
              className={`w-full p-2 border rounded mb-3 ${showError && !consignorFullAddress ? 'bg-red-100' : 'bg-gray-100'}`}
              value={consignorFullAddress}
              onChange={(e) => setConsignorFullAddress(e.target.value)}
            />
            <input
              type="text"
              placeholder="City *"
              className={`w-full p-2 border rounded ${showError && !consignorCity ? 'bg-red-100' : 'bg-gray-100'}`}
              value={consignorCity}
              onChange={handleCityChange(setConsignorCity)}
            />
          </div>

          {/* Recipient Box */}
          <div className="bg-white p-6 shadow-lg rounded-lg w-1/2">
            <h2 className="text-lg font-bold mb-4">Consignee (Recipient)</h2>
            <input
              type="text"
              placeholder="Full Name *"
              className={`w-full p-2 border rounded mb-3 ${showError && !consigneeFullName ? 'bg-red-100' : 'bg-gray-100'}`}
              value={consigneeFullName}
              onChange={handleFullNameChange(setConsigneeFullName)}
            />
            <input
              type="email"
              placeholder="Email Address"
              className="w-full p-2 border rounded mb-3 bg-gray-100"
              value={consigneeEmail}
              onChange={(e) => setConsigneeEmail(e.target.value)}
            />
            <input
              type="tel"
              placeholder="Phone Number"
              className="w-full p-2 border rounded mb-3 bg-gray-100"
              value={consigneePhone}
              onChange={handlePhoneNumberChange(setConsigneePhone)}
            />
            <input
              type="text"
              placeholder="Full Address *"
              className={`w-full p-2 border rounded mb-3 ${showError && !consigneeFullAddress ? 'bg-red-100' : 'bg-gray-100'}`}
              value={consigneeFullAddress}
              onChange={(e) => setConsigneeFullAddress(e.target.value)}
            />
            <input
              type="text"
              placeholder="City *"
              className={`w-full p-2 border rounded ${showError && !consigneeCity ? 'bg-red-100' : 'bg-gray-100'}`}
              value={consigneeCity}
              onChange={handleCityChange(setConsigneeCity)}
            />
          </div>
        </div>

        {/* Second Form Section (From - To) */}
        <div className="flex justify-between w-full mt-8 gap-x-4">
          {/* From Box */}
          <div className="bg-white p-6 shadow-lg rounded-lg w-1/2">
            <h2 className="text-lg font-bold mb-4">Origin (From)</h2>
            <select
              className={`w-full p-2 border rounded mb-3 ${showError && !country ? 'bg-red-100' : 'bg-gray-100'}`}
              value={country}
              onChange={(e) => {
                setCountry(e.target.value);
                setOriginCity("");
              }}
            >
              <option value="">Select Country *</option>
              {countriesWithPorts.map((country: string) => (
                <option key={country} value={country}>{country}</option>
              ))}
            </select>
            <select
              className={`w-full p-2 border rounded mb-3 ${showError && !originCity ? 'bg-red-100' : 'bg-gray-100'}`}
              value={originCity}
              onChange={(e) => setOriginCity(e.target.value)}
            >
              <option value="">Select City *</option>
              {getCitiesByCountry(country).map((city: string) => (
                <option key={city} value={city}>{city}</option>
              ))}
            </select>
            <input
              type="text"
              placeholder="Street & House Number *"
              className={`w-full p-2 border rounded ${showError && !street ? 'bg-red-100' : 'bg-gray-100'}`}
              value={street}
              onChange={(e) => setStreet(e.target.value)}
            />
          </div>

          {/* To Box */}
          <div className="bg-white p-6 shadow-lg rounded-lg w-1/2">
            <h2 className="text-lg font-bold mb-4">Destination (To)</h2>
            <select
              className={`w-full p-2 border rounded mb-3 ${showError && !destinationCountry ? 'bg-red-100' : 'bg-gray-100'}`}
              value={destinationCountry}
              onChange={(e) => {
                setDestinationCountry(e.target.value);
                setDestinationCity("");
              }}
            >
              <option value="">Select Country *</option>
              {countriesWithPorts.map((country: string) => (
                <option key={country} value={country}>{country}</option>
              ))}
            </select>
            <select
              className={`w-full p-2 border rounded mb-3 ${showError && !destinationCity ? 'bg-red-100' : 'bg-gray-100'}`}
              value={destinationCity}
              onChange={(e) => setDestinationCity(e.target.value)}
            >
              <option value="">Select City *</option>
              {getCitiesByCountry(destinationCountry).map((city: string) => (
                <option key={city} value={city}>{city}</option>
              ))}
            </select>
            <input
              type="text"
              placeholder="Street & House Number *"
              className={`w-full p-2 border rounded ${showError && !destinationStreet ? 'bg-red-100' : 'bg-gray-100'}`}
              value={destinationStreet}
              onChange={(e) => setDestinationStreet(e.target.value)}
            />
          </div>
        </div>

        {/* FCL und LCL Boxen */}
        <div className="flex justify-between w-full mt-8 gap-x-4">
          {/* FCL Box */}
          <div className="bg-white p-6 shadow-lg rounded-lg w-1/2">
            <h2 className="text-lg font-bold mb-4">Full Container Load</h2>
            <label className="flex items-center space-x-2 mb-4">
              <input
                type="radio"
                name="shipmentType"
                value="FCL"
                onChange={() => handleShipmentChange("FCL")}
                className="w-5 h-5"
              />
              <span className="text-lg font-medium">FCL (Full Container Load){shipmentType === "FCL" && '*'}</span>
            </label>
            <select
              disabled={shipmentType !== "FCL"}
              value={fclSelection}
              onChange={(e) => setFclSelection(e.target.value)}
              className={`w-full p-3 border rounded bg-gray-100 disabled:bg-gray-300 disabled:cursor-not-allowed mb-3 ${showError && shipmentType === "FCL" && !fclSelection ? 'bg-red-100' : ''}`}
            >
              <option value="">Select Container Type *</option>
              <option value="20ft">20ft Container</option>
              <option value="40ft">40ft Container</option>
            </select>
            <label className="block text-lg font-medium mb-2">Description of Goods{shipmentType === "FCL" && '*'}</label>
            <textarea
              rows={2}
              placeholder="Enter description of goods *"
              className={`w-full p-3 border rounded ${shipmentType !== "FCL" ? "bg-[#D1D5DC] cursor-not-allowed" : showError && shipmentType === "FCL" && !description ? "bg-red-100" : "bg-gray-100"}`}
              disabled={shipmentType !== "FCL"}
              value={shipmentType === "FCL" ? description : ""}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>

          {/* LCL Box */}
          <div className="bg-white p-6 shadow-lg rounded-lg w-1/2">
            <h2 className="text-lg font-bold mb-4">Less Container Load</h2>
            <label className="flex items-center space-x-2 mb-4">
              <input
                type="radio"
                name="shipmentType"
                value="LCL"
                onChange={() => handleShipmentChange("LCL")}
                className="w-5 h-5"
              />
              <span className="text-lg font-medium">LCL (Less Container Load)</span>
            </label>
            <select
              disabled={shipmentType !== "LCL"}
              value={lclSelection}
              onChange={(e) => setLclSelection(e.target.value)}
              className={`w-full p-3 border rounded bg-gray-100 disabled:bg-gray-300 disabled:cursor-not-allowed mb-3 ${showError && shipmentType === "LCL" && !lclSelection ? 'bg-red-100' : ''}`}
            >
              <option value="">Select Package Type *</option>
              <option value="palette">Palette</option>
              <option value="barrel">Barrel</option>
            </select>
            <label className="block text-lg font-medium mb-2">Description of Goods</label>
            <textarea
              rows={2}
              placeholder="Enter description of goods *"
              className={`w-full p-3 border rounded ${shipmentType !== "LCL" ? "bg-[#D1D5DC] cursor-not-allowed" : showError && shipmentType === "LCL" && !description ? "bg-red-100" : "bg-gray-100"}`}
              disabled={shipmentType !== "LCL"}
              value={shipmentType === "LCL" ? description : ""}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>
        </div>

        <div className="flex justify-between w-full mt-8 gap-x-4">
          {/* Box für Anzahl der Stücke und Dangerous Goods */}
          <div className="bg-white p-6 shadow-lg rounded-lg w-1/2">
            <h2 className="text-lg font-bold mb-4">Additional Information</h2>
            <div className="mt-4">
              <label className="block text-lg font-medium text-gray-700">Number of Pieces</label>
              <input
                type="text"
                placeholder="Number of Pieces (default: 1)"
                value={numberOfPieces}
                onChange={handleNumberOfPiecesChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div className="mt-4 flex items-center">
              <input
                type="checkbox"
                checked={isDangerousGoods}
                onChange={handleDangerousGoodsChange}
                className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
              />
              <label className="ml-2 block text-lg font-medium text-gray-700">Dangerous Goods</label>
            </div>
          </div>

          {/* Box für Datum */}
          <div className="bg-white p-6 shadow-lg rounded-lg w-1/2">
            <h2 className="text-lg font-bold mb-4">Date Information</h2>
            <div className="mt-4">
              <label className="block text-lg font-medium text-gray-700">Send Date</label>
              <input
                type="date"
                value={sendDate}
                onChange={handleSendDateChange}
                className={`mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${showError && !sendDate ? 'bg-red-100' : ''}`}
              />
            </div>
            <div className="mt-4">
              <label className="block text-lg font-medium text-gray-700">Arrival Date</label>
              <input
                type="date"
                value={arrivalDate}
                onChange={handleArrivalDateChange}
                className={`mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${showError && !arrivalDate ? 'bg-red-100' : ''}`}
              />
            </div>
          </div>
        </div>

        {/* Continue Button */}
        <div className="flex justify-end w-full mt-16 mb-16">
          <button
            className="flex items-center px-6 py-3 bg-black text-white text-lg font-medium rounded-full transition-all duration-[1250ms] hover:bg-[#E5E5E5] hover:text-black cursor-pointer"
            onClick={handleContinueClick}
          >
            Continue
          </button>
        </div>
        {dateWarning && (
          <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
            <div className="bg-white p-6 rounded-lg shadow-lg relative w-96 z-10">
              <button
                className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 cursor-pointer text-3xl"
                onClick={() => setDateWarning(false)}
              >
                &times;
              </button>
              <div className="text-red-500 text-lg font-bold mb-4 text-center">
                !!WARNING!!
              </div>
              <div className="text-black text-lg">
                The send date must be before the arrival date.
              </div>
            </div>
          </div>
        )}
        {invalidDateWarning && (
          <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
            <div className="bg-white p-6 rounded-lg shadow-lg relative w-96 z-10">
              <button
                className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 cursor-pointer text-3xl"
                onClick={() => setInvalidDateWarning(false)}
              >
                &times;
              </button>
              <div className="text-red-500 text-lg font-bold mb-4 text-center">
                !!WARNING!!
              </div>
              <div className="text-black text-lg">
                Invalid date input. Please enter a valid date.
              </div>
            </div>
          </div>
        )}
        {showWarning && (
          <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
            <div className="bg-white p-6 rounded-lg shadow-lg relative w-96 z-10">
              <button
                className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 cursor-pointer text-3xl"
                onClick={() => setShowWarning(false)}
              >
                &times;
              </button>
              <div className="text-red-500 text-lg font-bold mb-4 text-center">
                !!WARNING!!
              </div>
              <div className="text-black text-lg">
                You can't continue without filling the mandatory fields (*)
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}