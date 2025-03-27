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
    DominicanRepublic: ["Santo Domingo", "Puerto Plata"],
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
    NewZealand: ["Auckland", "Wellington", "Christchurch"],
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
    SaudiArabia: ["Jeddah", "Dammam", "Jubail"],
    Senegal: ["Dakar"],
    Singapore: ["Singapore"],
    Slovenia: ["Koper"],
    SouthAfrica: ["Durban", "Cape Town", "Port Elizabeth"],
    SouthKorea: ["Busan", "Incheon"],
    Spain: ["Barcelona", "Valencia", "Bilbao", "Malaga", "Algeciras"],
    SriLanka: ["Colombo"],
    Sweden: ["Gothenburg", "Stockholm"],
    Taiwan: ["Kaohsiung", "Keelung"],
    Tanzania: ["Dar es Salaam", "Zanzibar"],
    Thailand: ["Bangkok", "Laem Chabang"],
    TrinidadandTobago: ["Port of Spain", "Point Lisas"],
    Tunisia: ["Tunis", "Sfax"],
    Turkey: ["Istanbul", "Izmir", "Mersin"],
    Ukraine: ["Odessa", "Mariupol"],
    UnitedArabEmirates: ["Dubai", "Abu Dhabi", "Sharjah"],
    UnitedKingdom: ["London", "Liverpool", "Southampton"], // Städte hinzugefügt
    UnitedStates: ["Los Angeles", "New York", "Houston", "Miami", "San Francisco"], // Städte hinzugefügt
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

  const countryDistances: Record<string, Record<string, number>> = {
    Albania: { Algeria: 5, Angola: 15, Argentina: 20, Australia: 25, Bangladesh: 18, Belgium: 7, Brazil: 20, Bulgaria: 3, Cambodia: 22, Cameroon: 15, Canada: 20, Chile: 25, China: 18, Colombia: 22, Croatia: 2, Cyprus: 6, Denmark: 8, Djibouti: 12, DominicanRepublic: 22 },
    Algeria: { Albania: 5, Angola: 12, Argentina: 18, Australia: 25, Bangladesh: 20, Belgium: 6, Brazil: 18, Bulgaria: 7, Cambodia: 22, Cameroon: 10, Canada: 18, Chile: 22, China: 20, Colombia: 20, Croatia: 6, Cyprus: 8, Denmark: 9, Djibouti: 14, DominicanRepublic: 20 },
    Angola: { Albania: 15, Algeria: 12, Argentina: 15, Australia: 20, Bangladesh: 18, Belgium: 18, Brazil: 12, Bulgaria: 17, Cambodia: 25, Cameroon: 8, Canada: 22, Chile: 18, China: 20, Colombia: 18, Croatia: 15, Cyprus: 20, Denmark: 20, Djibouti: 15, DominicanRepublic: 22 },
    Argentina: { Albania: 20, Algeria: 18, Angola: 15, Australia: 25, Bangladesh: 22, Belgium: 20, Brazil: 5, Bulgaria: 22, Cambodia: 30, Cameroon: 20, Canada: 15, Chile: 5, China: 25, Colombia: 10, Croatia: 22, Cyprus: 25, Denmark: 22, Djibouti: 25, DominicanRepublic: 12 },
    Australia: { Albania: 25, Algeria: 25, Angola: 20, Argentina: 25, Bangladesh: 10, Belgium: 25, Brazil: 25, Bulgaria: 25, Cambodia: 8, Cameroon: 22, Canada: 20, Chile: 22, China: 5, Colombia: 25, Croatia: 25, Cyprus: 20, Denmark: 25, Djibouti: 15, DominicanRepublic: 25 },
    Bangladesh: { Albania: 18, Algeria: 20, Angola: 18, Argentina: 22, Australia: 10, Belgium: 20, Brazil: 22, Bulgaria: 20, Cambodia: 5, Cameroon: 20, Canada: 22, Chile: 25, China: 8, Colombia: 25, Croatia: 20, Cyprus: 15, Denmark: 22, Djibouti: 12, DominicanRepublic: 25 },
    Belgium: { Albania: 7, Algeria: 6, Angola: 18, Argentina: 20, Australia: 25, Bangladesh: 20, Brazil: 20, Bulgaria: 8, Cambodia: 25, Cameroon: 15, Canada: 10, Chile: 22, China: 20, Colombia: 20, Croatia: 8, Cyprus: 10, Denmark: 2, Djibouti: 18, DominicanRepublic: 20 },
    Brazil: { Albania: 20, Algeria: 18, Angola: 12, Argentina: 5, Australia: 25, Bangladesh: 22, Belgium: 20, Bulgaria: 22, Cambodia: 30, Cameroon: 15, Canada: 15, Chile: 8, China: 25, Colombia: 10, Croatia: 22, Cyprus: 25, Denmark: 22, Djibouti: 25, DominicanRepublic: 12 },
    Bulgaria: { Albania: 3, Algeria: 7, Angola: 17, Argentina: 22, Australia: 25, Bangladesh: 20, Belgium: 8, Brazil: 22, Cambodia: 25, Cameroon: 15, Canada: 20, Chile: 25, China: 20, Colombia: 22, Croatia: 2, Cyprus: 8, Denmark: 10, Djibouti: 15, DominicanRepublic: 22 },
    Cambodia: { Albania: 22, Algeria: 22, Angola: 25, Argentina: 30, Australia: 8, Bangladesh: 5, Belgium: 25, Brazil: 30, Bulgaria: 25, Cameroon: 25, Canada: 25, Chile: 30, China: 5, Colombia: 30, Croatia: 25, Cyprus: 20, Denmark: 25, Djibouti: 15, DominicanRepublic: 30 },
    Cameroon: { Albania: 15, Algeria: 10, Angola: 8, Argentina: 20, Australia: 22, Bangladesh: 20, Belgium: 15, Brazil: 15, Bulgaria: 15, Cambodia: 25, Canada: 20, Chile: 22, China: 20, Colombia: 22, Croatia: 15, Cyprus: 18, Denmark: 18, Djibouti: 10, DominicanRepublic: 22 },
    Canada: { Albania: 20, Algeria: 18, Angola: 22, Argentina: 15, Australia: 20, Bangladesh: 22, Belgium: 10, Brazil: 15, Bulgaria: 20, Cambodia: 25, Cameroon: 20, Chile: 18, China: 20, Colombia: 15, Croatia: 20, Cyprus: 22, Denmark: 12, Djibouti: 25, DominicanRepublic: 10 },
    Chile: { Albania: 25, Algeria: 22, Angola: 18, Argentina: 5, Australia: 22, Bangladesh: 25, Belgium: 22, Brazil: 8, Bulgaria: 25, Cambodia: 30, Cameroon: 22, Canada: 18, China: 25, Colombia: 12, Croatia: 25, Cyprus: 28, Denmark: 25, Djibouti: 28, DominicanRepublic: 15 },
    China: { Albania: 18, Algeria: 20, Angola: 20, Argentina: 25, Australia: 5, Bangladesh: 8, Belgium: 20, Brazil: 25, Bulgaria: 20, Cambodia: 5, Cameroon: 20, Canada: 20, Chile: 25, Colombia: 25, Croatia: 20, Cyprus: 15, Denmark: 22, Djibouti: 12, DominicanRepublic: 25 },
    Colombia: { Albania: 22, Algeria: 20, Angola: 18, Argentina: 10, Australia: 25, Bangladesh: 25, Belgium: 20, Brazil: 10, Bulgaria: 22, Cambodia: 30, Cameroon: 22, Canada: 15, Chile: 12, China: 25, Croatia: 22, Cyprus: 25, Denmark: 22, Djibouti: 25, DominicanRepublic: 5 },
    Croatia: { Albania: 2, Algeria: 6, Angola: 15, Argentina: 22, Australia: 25, Bangladesh: 20, Belgium: 8, Brazil: 22, Bulgaria: 2, Cambodia: 25, Cameroon: 15, Canada: 20, Chile: 25, China: 20, Colombia: 22, Cyprus: 8, Denmark: 10, Djibouti: 15, DominicanRepublic: 22 },
    Cyprus: { Albania: 6, Algeria: 8, Angola: 20, Argentina: 25, Australia: 20, Bangladesh: 15, Belgium: 10, Brazil: 25, Bulgaria: 8, Cambodia: 20, Cameroon: 18, Canada: 22, Chile: 28, China: 15, Colombia: 25, Croatia: 8, Denmark: 12, Djibouti: 10, DominicanRepublic: 25 },
    Denmark: { Albania: 8, Algeria: 9, Angola: 20, Argentina: 22, Australia: 25, Bangladesh: 22, Belgium: 2, Brazil: 22, Bulgaria: 10, Cambodia: 25, Cameroon: 18, Canada: 12, Chile: 25, China: 22, Colombia: 22, Croatia: 10, Cyprus: 12, Djibouti: 18, DominicanRepublic: 22 },
    Djibouti: { Albania: 12, Algeria: 14, Angola: 15, Argentina: 25, Australia: 15, Bangladesh: 12, Belgium: 18, Brazil: 25, Bulgaria: 15, Cambodia: 15, Cameroon: 10, Canada: 25, Chile: 28, China: 12, Colombia: 25, Croatia: 15, Cyprus: 10, Denmark: 18, DominicanRepublic: 25 },
    DominicanRepublic: { Albania: 22, Algeria: 20, Angola: 22, Argentina: 12, Australia: 25, Bangladesh: 25, Belgium: 20, Brazil: 12, Bulgaria: 22, Cambodia: 30, Cameroon: 22, Canada: 10, Chile: 15, China: 25, Colombia: 5, Croatia: 22, Cyprus: 25, Denmark: 22, Djibouti: 25 },
    Ecuador: { Egypt: 25, Estonia: 30, Finland: 28, France: 22, Germany: 20, Ghana: 18, Greece: 25, Guatemala: 5, Honduras: 8, HongKong: 30, Albania: 27, Algeria: 26, Angola: 24, Argentina: 20, Australia: 35, Bangladesh: 32, Belgium: 22, Brazil: 15, Bulgaria: 25, Cambodia: 40, Cameroon: 30, Canada: 10, Chile: 12, China: 35, Colombia: 8, Croatia: 25, Cyprus: 28, Denmark: 22, Djibouti: 40, DominicanRepublic: 5 },
    Egypt: { Ecuador: 25, Estonia: 15, Finland: 12, France: 10, Germany: 8, Ghana: 6, Greece: 4, Guatemala: 28, Honduras: 30, HongKong: 20, Albania: 10, Algeria: 5, Angola: 15, Argentina: 30, Australia: 25, Bangladesh: 18, Belgium: 12, Brazil: 28, Bulgaria: 8, Cambodia: 22, Cameroon: 10, Canada: 25, Chile: 35, China: 20, Colombia: 30, Croatia: 8, Cyprus: 5, Denmark: 15, Djibouti: 12, DominicanRepublic: 28 },
    Estonia: { Ecuador: 30, Egypt: 15, Finland: 2, France: 8, Germany: 6, Ghana: 20, Greece: 18, Guatemala: 32, Honduras: 35, HongKong: 25, Albania: 12, Algeria: 18, Angola: 25, Argentina: 35, Australia: 30, Bangladesh: 28, Belgium: 6, Brazil: 35, Bulgaria: 10, Cambodia: 35, Cameroon: 25, Canada: 28, Chile: 40, China: 25, Colombia: 35, Croatia: 12, Cyprus: 18, Denmark: 4, Djibouti: 30, DominicanRepublic: 32 },
    Finland: { Ecuador: 28, Egypt: 12, Estonia: 2, France: 10, Germany: 5, Ghana: 22, Greece: 20, Guatemala: 30, Honduras: 33, HongKong: 23, Albania: 15, Algeria: 20, Angola: 28, Argentina: 33, Australia: 28, Bangladesh: 25, Belgium: 8, Brazil: 33, Bulgaria: 12, Cambodia: 30, Cameroon: 28, Canada: 25, Chile: 38, China: 23, Colombia: 33, Croatia: 15, Cyprus: 20, Denmark: 6, Djibouti: 28, DominicanRepublic: 30 },
    France: { Ecuador: 22, Egypt: 10, Estonia: 8, Finland: 10, Germany: 3, Ghana: 15, Greece: 12, Guatemala: 25, Honduras: 28, HongKong: 18, Albania: 8, Algeria: 6, Angola: 18, Argentina: 25, Australia: 25, Bangladesh: 20, Belgium: 2, Brazil: 25, Bulgaria: 6, Cambodia: 25, Cameroon: 15, Canada: 15, Chile: 30, China: 18, Colombia: 25, Croatia: 8, Cyprus: 12, Denmark: 4, Djibouti: 20, DominicanRepublic: 25 },
    Germany: { Ecuador: 20, Egypt: 8, Estonia: 6, Finland: 5, France: 3, Ghana: 12, Greece: 10, Guatemala: 22, Honduras: 25, HongKong: 15, Albania: 10, Algeria: 8, Angola: 15, Argentina: 22, Australia: 22, Bangladesh: 18, Belgium: 2, Brazil: 22, Bulgaria: 5, Cambodia: 22, Cameroon: 12, Canada: 12, Chile: 28, China: 15, Colombia: 22, Croatia: 6, Cyprus: 10, Denmark: 2, Djibouti: 18, DominicanRepublic: 22 },
    Ghana: { Ecuador: 18, Egypt: 6, Estonia: 20, Finland: 22, France: 15, Germany: 12, Greece: 8, Guatemala: 20, Honduras: 22, HongKong: 28, Albania: 15, Algeria: 10, Angola: 8, Argentina: 20, Australia: 25, Bangladesh: 22, Belgium: 15, Brazil: 18, Bulgaria: 12, Cambodia: 28, Cameroon: 5, Canada: 20, Chile: 25, China: 28, Colombia: 20, Croatia: 12, Cyprus: 10, Denmark: 18, Djibouti: 15, DominicanRepublic: 18 },
    Greece: { Ecuador: 25, Egypt: 4, Estonia: 18, Finland: 20, France: 12, Germany: 10, Ghana: 8, Guatemala: 28, Honduras: 30, HongKong: 22, Albania: 4, Algeria: 6, Angola: 15, Argentina: 25, Australia: 25, Bangladesh: 20, Belgium: 12, Brazil: 25, Bulgaria: 2, Cambodia: 25, Cameroon: 10, Canada: 25, Chile: 30, China: 22, Colombia: 28, Croatia: 4, Cyprus: 5, Denmark: 12, Djibouti: 18, DominicanRepublic: 28 },
    Guatemala: { Ecuador: 5, Egypt: 28, Estonia: 32, Finland: 30, France: 25, Germany: 22, Ghana: 20, Greece: 28, Honduras: 3, HongKong: 35, Albania: 30, Algeria: 28, Angola: 25, Argentina: 10, Australia: 35, Bangladesh: 32, Belgium: 25, Brazil: 12, Bulgaria: 28, Cambodia: 40, Cameroon: 30, Canada: 8, Chile: 15, China: 35, Colombia: 5, Croatia: 28, Cyprus: 30, Denmark: 25, Djibouti: 40, DominicanRepublic: 5 },
    Honduras: { Ecuador: 8, Egypt: 30, Estonia: 35, Finland: 33, France: 28, Germany: 25, Ghana: 22, Greece: 30, Guatemala: 3, HongKong: 38, Albania: 32, Algeria: 30, Angola: 28, Argentina: 12, Australia: 38, Bangladesh: 35, Belgium: 28, Brazil: 15, Bulgaria: 30, Cambodia: 42, Cameroon: 32, Canada: 10, Chile: 18, China: 38, Colombia: 8, Croatia: 30, Cyprus: 33, Denmark: 28, Djibouti: 42, DominicanRepublic: 8 },
    HongKong: { India: 5, Indonesia: 8, Iran: 15, Iraq: 18, Ireland: 20, Israel: 22, Italy: 25, IvoryCoast: 30, Jamaica: 35, Japan: 3 },
    India: { HongKong: 5, Indonesia: 7, Iran: 10, Iraq: 12, Ireland: 25, Israel: 20, Italy: 22, IvoryCoast: 28, Jamaica: 32, Japan: 8 },
    Indonesia: { HongKong: 8, India: 7, Iran: 12, Iraq: 15, Ireland: 28, Israel: 25, Italy: 30, IvoryCoast: 35, Jamaica: 40, Japan: 10 },
    Iran: { HongKong: 15, India: 10, Indonesia: 12, Iraq: 5, Ireland: 20, Israel: 8, Italy: 18, IvoryCoast: 25, Jamaica: 30, Japan: 20 },
    Iraq: { HongKong: 18, India: 12, Indonesia: 15, Iran: 5, Ireland: 22, Israel: 10, Italy: 20, IvoryCoast: 28, Jamaica: 35, Japan: 22 },
    Ireland: { HongKong: 20, India: 25, Indonesia: 28, Iran: 20, Iraq: 22, Israel: 8, Italy: 5, IvoryCoast: 15, Jamaica: 18, Japan: 25 },
    Israel: { HongKong: 22, India: 20, Indonesia: 25, Iran: 8, Iraq: 10, Ireland: 8, Italy: 10, IvoryCoast: 18, Jamaica: 22, Japan: 28 },
    Italy: { HongKong: 25, India: 22, Indonesia: 30, Iran: 18, Iraq: 20, Ireland: 5, Israel: 10, IvoryCoast: 12, Jamaica: 20, Japan: 30 },
    IvoryCoast: { HongKong: 30, India: 28, Indonesia: 35, Iran: 25, Iraq: 28, Ireland: 15, Israel: 18, Italy: 12, Jamaica: 10, Japan: 35 },
    Jamaica: { HongKong: 35, India: 32, Indonesia: 40, Iran: 30, Iraq: 35, Ireland: 18, Israel: 22, Italy: 20, IvoryCoast: 10, Japan: 38 }
  };

  const getMinimumDeliveryDays = (origin: string, destination: string): number => {
    return countryDistances[origin]?.[destination] || 7; // Standardwert: 7 Tage
  };

  const getFormattedDate = (date: Date): string => {
    return date.toISOString().split("T")[0];
  };

  const handleShippingDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedDate = new Date(e.target.value);
    const today = new Date();
    today.setDate(today.getDate() + 1); // Morgen

    if (selectedDate < today) {
      setShowError(true);
      setShippingDate(""); // Ungültiges Datum zurücksetzen
      setDeliveryDate(""); // Delivery Date zurücksetzen
    } else {
      setShowError(false);
      setShippingDate(e.target.value);
      setDeliveryDate(""); // Delivery Date zurücksetzen
    }
  };

  const handleDeliveryDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedDate = new Date(e.target.value);
    const shippingDateObj = new Date(shippingDate);

    if (originCity && destinationCity) {
      const minDays = getMinimumDeliveryDays(country, destinationCountry);
      const earliestDeliveryDate = new Date(shippingDateObj);
      earliestDeliveryDate.setDate(earliestDeliveryDate.getDate() + minDays);

      if (selectedDate < earliestDeliveryDate) {
        setShowError(true);
        setDeliveryDate(""); // Ungültiges Datum zurücksetzen
      } else {
        setShowError(false);
        setDeliveryDate(e.target.value);
      }
    }
  };

  const getShippingDateConstraints = (): { min: string; max: string } => {
    const today = new Date();
    today.setDate(today.getDate() + 1); // Morgen
    return { min: getFormattedDate(today), max: "" }; // Kein Maximaldatum
  };

  const getDeliveryDateConstraints = (): { min: string; max: string } => {
    if (!shippingDate || !originCity || !destinationCity) {
      return { min: "", max: "" }; // Keine Einschränkungen
    }

    const shippingDateObj = new Date(shippingDate);
    const minDays = getMinimumDeliveryDays(country, destinationCountry);
    const earliestDeliveryDate = new Date(shippingDateObj);
    earliestDeliveryDate.setDate(earliestDeliveryDate.getDate() + minDays);

    return { min: getFormattedDate(earliestDeliveryDate), max: "" }; // Kein Maximaldatum
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
                onChange={handleDeliveryDateChange}
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