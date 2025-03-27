"use client"; // Wichtig für useState

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import { countryDistances } from './country-distances';
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
  const [shippingDate, setShippingDate] = useState('');
  const [deliveryDate, setDeliveryDate] = useState('');
  const [consignorCountry, setConsignorCountry] = useState("");
  const [consigneeCountry, setConsigneeCountry] = useState("");

  const countriesWithPorts = [
    "Albania", "Algeria", "Angola", "Argentina", "Australia", "Bangladesh", "Belgium", "Brazil", "Bulgaria", "Cambodia", "Cameroon", "Canada", "Chile", "China", "Colombia", "Croatia", "Cyprus", "Denmark", "Djibouti", "Dominican Republic", "Ecuador", "Egypt", "Estonia", "Finland", "France", "Germany", "Ghana", "Greece", "Guatemala", "Honduras", "Hong Kong", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Israel", "Italy", "Ivory Coast", "Jamaica", "Japan", "Jordan", "Kenya", "Kuwait", "Latvia", "Lebanon", "Lithuania", "Malaysia", "Malta", "Mauritius", "Mexico", "Montenegro", "Morocco", "Mozambique", "Myanmar", "Namibia", "Netherlands", "New Zealand", "Nigeria", "Norway", "Oman", "Pakistan", "Panama", "Peru", "Philippines", "Poland", "Portugal", "Qatar", "Romania", "Russia", "Saudi Arabia", "Senegal", "Singapore", "Slovenia", "South Africa", "South Korea", "Spain", "Sri Lanka", "Sweden", "Taiwan", "Tanzania", "Thailand", "Trinidad and Tobago", "Tunisia", "Turkey", "Ukraine", "United Arab Emirates", "United Kingdom", "United States", "Uruguay", "Venezuela", "Vietnam", "Yemen"
  ];

  const citiesWithPorts = {
    Albania: ["Durrës", "Vlorë", "Shëngjin", "Sarandë"],
    Algeria: ["Algiers", "Oran", "Annaba", "Skikda"],
    Angola: ["Luanda", "Lobito", "Namibe"],
    Argentina: ["Buenos Aires", "Rosario", "Bahía Blanca", "Mar del Plata"],
    Australia: ["Sydney", "Melbourne", "Brisbane", "Perth", "Adelaide"],
    Bangladesh: ["Chittagong", "Mongla"],
    Belgium: ["Antwerp", "Bruges", "Ghent", "Brussels", "Ostend"],
    Brazil: ["Santos", "Rio de Janeiro", "Paranaguá", "Salvador", "Recife"],
    Bulgaria: ["Varna", "Burgas", "Ruse"],
    Cambodia: ["Sihanoukville", "Phnom Penh"],
    Cameroon: ["Douala", "Kribi"],
    Canada: ["Vancouver", "Montreal", "Halifax", "Toronto"],
    Chile: ["Valparaíso", "San Antonio", "Talcahuano"],
    China: ["Shanghai", "Shenzhen", "Guangzhou", "Ningbo", "Qingdao"],
    Colombia: ["Cartagena", "Barranquilla", "Buenaventura"],
    Croatia: ["Rijeka", "Split", "Ploče"],
    Cyprus: ["Limassol", "Larnaca"],
    Denmark: ["Copenhagen", "Aarhus", "Esbjerg"],
    Djibouti: ["Djibouti"],
    DominicanRepublic: ["Santo Domingo", "Puerto Plata", "La Romana", "Haina"],
    Ecuador: ["Guayaquil", "Manta"],
    Egypt: ["Alexandria", "Port Said", "Suez"],
    Estonia: ["Tallinn", "Muuga"],
    Finland: ["Helsinki", "Turku"],
    France: ["Marseille", "Le Havre", "Bordeaux", "Nantes", "Dunkirk"],
    Germany: ["Hamburg", "Bremen", "Bremerhaven", "Lübeck", "Kiel", "Rostock"],
    Ghana: ["Tema", "Takoradi"],
    Greece: ["Piraeus", "Thessaloniki", "Heraklion"],
    Guatemala: ["Puerto Quetzal", "Santo Tomás de Castilla"],
    Honduras: ["Puerto Cortés", "La Ceiba"],
    HongKong: ["Hong Kong"],
    India: ["Mumbai", "Chennai", "Kolkata", "Cochin"],
    Indonesia: ["Jakarta", "Surabaya", "Semarang", "Belawan"],
    Iran: ["Bandar Abbas", "Bandar Imam Khomeini"],
    Iraq: ["Umm Qasr", "Basra"],
    Ireland: ["Dublin", "Cork"],
    Israel: ["Haifa", "Ashdod", "Eilat"],
    Italy: ["Genoa", "Naples", "Venice", "Trieste"],
    IvoryCoast: ["Abidjan", "San Pedro"],
    Jamaica: ["Kingston", "Montego Bay"],
    Japan: ["Tokyo", "Yokohama", "Osaka", "Kobe", "Nagoya"],
    Jordan: ["Aqaba"],
    Kenya: ["Mombasa"],
    Kuwait: ["Shuwaikh", "Shuaiba"],
    Latvia: ["Riga", "Ventspils"],
    Lebanon: ["Beirut", "Tripoli"],
    Lithuania: ["Klaipeda"],
    Malaysia: ["Port Klang", "Penang", "Johor Bahru"],
    Malta: ["Valletta"],
    Mauritius: ["Port Louis"],
    Mexico: ["Veracruz", "Manzanillo", "Lázaro Cárdenas"],
    Montenegro: ["Bar"],
    Morocco: ["Casablanca", "Tangier", "Agadir"],
    Mozambique: ["Maputo", "Beira"],
    Myanmar: ["Yangon"],
    Namibia: ["Walvis Bay"],
    Netherlands: ["Rotterdam", "Amsterdam", "The Hague", "Utrecht"],
    NewZealand: ["Auckland", "Wellington", "Christchurch", "Tauranga"],
    Nigeria: ["Lagos", "Port Harcourt", "Apapa"],
    Norway: ["Oslo", "Bergen"],
    Oman: ["Sohar", "Salalah"],
    Pakistan: ["Karachi", "Port Qasim"],
    Panama: ["Balboa", "Colón"],
    Peru: ["Callao", "Paita"],
    Philippines: ["Manila", "Cebu"],
    Poland: ["Gdansk", "Gdynia", "Szczecin"],
    Portugal: ["Lisbon", "Porto", "Sines"],
    Qatar: ["Doha"],
    Romania: ["Constanta"],
    Russia: ["Saint Petersburg", "Vladivostok", "Novorossiysk"],
    SaudiArabia: ["Jeddah", "Dammam", "Jubail", "Yanbu"],
    Senegal: ["Dakar"],
    Singapore: ["Singapore"],
    Slovenia: ["Koper"],
    SouthAfrica: ["Durban", "Cape Town", "Port Elizabeth", "Johannesburg"],
    SouthKorea: ["Busan", "Incheon", "Ulsan", "Gwangyang"],
    Spain: ["Barcelona", "Valencia", "Bilbao", "Malaga", "Algeciras"],
    SriLanka: ["Colombo", "Galle", "Trincomalee"],
    Sweden: ["Gothenburg", "Stockholm"],
    Taiwan: ["Kaohsiung", "Keelung"],
    Tanzania: ["Dar es Salaam", "Zanzibar"],
    Thailand: ["Bangkok", "Laem Chabang"],
    TrinidadandTobago: ["Port of Spain", "Point Lisas", "Scarborough"],
    Tunisia: ["Tunis", "Sfax"],
    Turkey: ["Istanbul", "Izmir", "Mersin"],
    Ukraine: ["Odessa", "Mariupol"],
    UnitedArabEmirates: ["Dubai", "Abu Dhabi", "Sharjah", "Fujairah"],
    UnitedKingdom: ["London", "Liverpool", "Southampton", "Bristol", "Manchester"],
    UnitedStates: ["Los Angeles", "New York", "Houston", "Miami", "San Francisco"],
    Uruguay: ["Montevideo", "Nueva Palmira"],
    Venezuela: ["Puerto Cabello", "La Guaira"],
    Vietnam: ["Ho Chi Minh City", "Hai Phong", "Da Nang"],
    Yemen: ["Aden", "Al Hudaydah", "Mukalla"]
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

  // Ensure all countries are connected with realistic distances
  const allCountries = Object.keys(countryDistances);
  allCountries.forEach((country) => {
    allCountries.forEach((otherCountry) => {
      if (country !== otherCountry) {
        if (!countryDistances[country]) {
          countryDistances[country] = {};
        }
        if (!countryDistances[country][otherCountry]) {
          // Add realistic distances manually for missing combinations
          countryDistances[country][otherCountry] = 20; // Example default realistic distance
        }
      }
    });
  });

  const getMinimumDeliveryDays = (origin: string, destination: string): number => {
    if (!origin || !destination) return 0;
    return countryDistances[origin]?.[destination] || 0; // Default to 0 days if no distance is defined
  };

  const getFormattedDate = (date: Date): string => {
    return date.toISOString().split("T")[0];
  };

  const handleShippingDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedDate = new Date(e.target.value);
    const today = new Date();
    today.setDate(today.getDate() + 1); // Tomorrow

    if (selectedDate < today) {
      setShowError(true);
      setShippingDate(""); // Reset invalid date
      setDeliveryDate(""); // Reset delivery date
    } else {
      setShowError(false);
      setShippingDate(e.target.value);
      setDeliveryDate(""); // Reset delivery date
    }
  };

  const handleDeliveryDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedDate = new Date(e.target.value);
    const shippingDateObj = new Date(shippingDate);

    if (country && destinationCountry) {
      const minDays = getMinimumDeliveryDays(country, destinationCountry);
      const earliestDeliveryDate = new Date(shippingDateObj);
      earliestDeliveryDate.setDate(earliestDeliveryDate.getDate() + minDays);

      if (selectedDate < earliestDeliveryDate) {
        setShowError(true);
        setDeliveryDate(""); // Reset invalid date
      } else {
        setShowError(false);
        setDeliveryDate(e.target.value);
      }
    }
  };

  const getShippingDateConstraints = (): { min: string; max: string } => {
    const today = new Date();
    today.setDate(today.getDate() + 1); // Tomorrow
    return { min: getFormattedDate(today), max: "" }; // No maximum date
  };

  const getDeliveryDateConstraints = (): { min: string; max: string } => {
    if (!shippingDate || !country || !destinationCountry) {
      return { min: "", max: "" }; // No constraints
    }

    const shippingDateObj = new Date(shippingDate);
    const minDays = getMinimumDeliveryDays(country, destinationCountry);
    const earliestDeliveryDate = new Date(shippingDateObj);
    earliestDeliveryDate.setDate(earliestDeliveryDate.getDate() + minDays);

    return { min: getFormattedDate(earliestDeliveryDate), max: "" }; // No maximum date
  };

  // Ensure delivery date is not clickable if invalid
  const isDeliveryDateValid = (date: string): boolean => {
    if (!shippingDate || !country || !destinationCountry) return false;

    const selectedDate = new Date(date);
    const shippingDateObj = new Date(shippingDate);
    const minDays = getMinimumDeliveryDays(country, destinationCountry);
    const earliestDeliveryDate = new Date(shippingDateObj);
    earliestDeliveryDate.setDate(earliestDeliveryDate.getDate() + minDays);

    return selectedDate >= earliestDeliveryDate;
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
      shippingDate &&
      deliveryDate &&
      new Date(shippingDate) < new Date(deliveryDate)
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
    shippingDate,
    deliveryDate,
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
      if (!consignorFullName || !consignorFullAddress || !consignorCity || !country || !originCity || !street || !destinationCountry || !destinationCity || !destinationStreet || !shipmentType || !description || (shipmentType === "FCL" && !fclSelection) || (shipmentType === "LCL" && !lclSelection) || !consigneeFullName || !consigneeFullAddress || !consigneeCity || !shippingDate || !deliveryDate) {
        setShowWarning(true);
        setInvalidDateWarning(false);
        setDateWarning(false);
      } else if (isNaN(new Date(shippingDate).getTime()) || isNaN(new Date(deliveryDate).getTime())) {
        setInvalidDateWarning(true);
        setShowWarning(false);
        setDateWarning(false);
      } else if (shippingDate && deliveryDate && new Date(shippingDate) >= new Date(deliveryDate)) {
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

  const isShippingDateEnabled = Boolean(country && originCity && destinationCountry && destinationCity);
  const isDeliveryDateEnabled = Boolean(shippingDate);

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
          {/* Shippers Box */}
          <div className="bg-white p-6 shadow-lg rounded-lg w-1/2">
            <h2 className="text-lg font-bold mb-4">Consignor (Shipper)</h2>
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
            <select
              className={`w-full p-2 border rounded mb-3 ${showError && !consignorCountry ? 'bg-red-100' : 'bg-gray-100'}`}
              value={consignorCountry}
              onChange={(e) => {
                setConsignorCountry(e.target.value);
                setConsignorCity("");
              }}
            >
              <option value="">Select Country *</option>
              {countriesWithPorts.map((country: string) => (
                <option key={country} value={country}>{country}</option>
              ))}
            </select>
            <select
              className={`w-full p-2 border rounded ${!consignorCountry ? 'bg-gray-300 cursor-not-allowed' : 'bg-gray-100'} ${showError && !consignorCity ? 'bg-red-100' : ''}`}
              value={consignorCity}
              onChange={(e) => setConsignorCity(e.target.value)}
              disabled={!consignorCountry}
            >
              <option value="">Select City *</option>
              {getCitiesByCountry(consignorCountry).map((city: string) => (
                <option key={city} value={city}>{city}</option>
              ))}
            </select>
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
            <select
              className={`w-full p-2 border rounded mb-3 ${showError && !consigneeCountry ? 'bg-red-100' : 'bg-gray-100'}`}
              value={consigneeCountry}
              onChange={(e) => {
                setConsigneeCountry(e.target.value);
                setConsigneeCity("");
              }}
            >
              <option value="">Select Country *</option>
              {countriesWithPorts.map((country: string) => (
                <option key={country} value={country}>{country}</option>
              ))}
            </select>
            <select
              className={`w-full p-2 border rounded ${!consigneeCountry ? 'bg-gray-300 cursor-not-allowed' : 'bg-gray-100'} ${showError && !consigneeCity ? 'bg-red-100' : ''}`}
              value={consigneeCity}
              onChange={(e) => setConsigneeCity(e.target.value)}
              disabled={!consigneeCountry}
            >
              <option value="">Select City *</option>
              {getCitiesByCountry(consigneeCountry).map((city: string) => (
                <option key={city} value={city}>{city}</option>
              ))}
            </select>
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
                setShippingDate(""); // Reset Shipping Date
                setDeliveryDate(""); // Reset Delivery Date
              }}
            >
              <option value="">Select Country *</option>
              {countriesWithPorts.map((country: string) => (
                <option key={country} value={country}>{country}</option>
              ))}
            </select>
            <select
              className={`w-full p-2 border rounded mb-3 ${!country ? 'bg-gray-300 cursor-not-allowed' : 'bg-gray-100'} ${showError && !originCity ? 'bg-red-100' : ''}`}
              value={originCity}
              onChange={(e) => {
                setOriginCity(e.target.value);
                setShippingDate(""); // Reset Shipping Date
                setDeliveryDate(""); // Reset Delivery Date
              }}
              disabled={!country}
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
                setShippingDate(""); // Reset Shipping Date
                setDeliveryDate(""); // Reset Delivery Date
              }}
            >
              <option value="">Select Country *</option>
              {countriesWithPorts.map((country: string) => (
                <option key={country} value={country}>{country}</option>
              ))}
            </select>
            <select
              className={`w-full p-2 border rounded mb-3 ${!destinationCountry ? 'bg-gray-300 cursor-not-allowed' : 'bg-gray-100'} ${showError && !destinationCity ? 'bg-red-100' : ''}`}
              value={destinationCity}
              onChange={(e) => {
                setDestinationCity(e.target.value);
                setShippingDate(""); // Reset Shipping Date
                setDeliveryDate(""); // Reset Delivery Date
              }}
              disabled={!destinationCountry}
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
              <label className="block text-lg font-medium text-gray-700">Shipping Date</label>
              <input
                type="date"
                value={shippingDate}
                onChange={handleShippingDateChange}
                min={isShippingDateEnabled ? getShippingDateConstraints().min : ""}
                max={isShippingDateEnabled ? getShippingDateConstraints().max : ""}
                disabled={!isShippingDateEnabled}
                className={`mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${!isShippingDateEnabled ? 'bg-gray-300 cursor-not-allowed' : ''} ${showError && !shippingDate ? 'bg-red-100' : ''}`}
              />
            </div>
            <div className="mt-4">
              <label className="block text-lg font-medium text-gray-700">Delivery Date</label>
              <input
                type="date"
                value={deliveryDate}
                onChange={(e) => {
                  if (isDeliveryDateValid(e.target.value)) {
                    handleDeliveryDateChange(e);
                  } else {
                    setShowError(true);
                    setDeliveryDate(""); // Reset invalid date
                  }
                }}
                min={isDeliveryDateEnabled ? getDeliveryDateConstraints().min : ""}
                max={isDeliveryDateEnabled ? getDeliveryDateConstraints().max : ""}
                disabled={!isDeliveryDateEnabled}
                className={`mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${!isDeliveryDateEnabled ? 'bg-gray-300 cursor-not-allowed' : ''} ${showError && !deliveryDate ? 'bg-red-100' : ''}`}
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
                The shipping date must be before the delivery date.
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