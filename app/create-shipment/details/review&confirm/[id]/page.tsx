"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import NavigationBar from "../NavigationBar";
import countryCityData from "../../../../../utils/countryCityData";
import { FaEdit } from "react-icons/fa";
import { supabase } from "../../../../../utils/supabaseClient";

interface ShipmentData {
  id: string;
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
  selectedProtections: string[];
  numberOfPackages?: string;
}

export default function ReviewAndConfirmIdPage() {
  const router = useRouter();
  const params = useParams();
  const { id } = params as { id: string };
  const [fields, setFields] = useState<Partial<ShipmentData>>({});
  const [isEditing, setIsEditing] = useState<Record<keyof ShipmentData, boolean>>({} as Record<keyof ShipmentData, boolean>);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchShipment = async () => {
      const { data, error } = await supabase.from("shipments").select("*").eq("id", id).single();
      if (error) setError(error.message);
      setFields(data || {});
      setLoading(false);
    };
    fetchShipment();
  }, [id]);

  const handleEditClick = (field: string) => {
    setIsEditing((prev) => {
      const updatedEditing: Record<string, boolean> = {};
      Object.keys(fields).forEach((key) => {
        updatedEditing[key] = key === field;
      });
      return updatedEditing;
    });
  };

  const handleInputChange = (field: string, value: string) => {
    setFields((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = (field: string) => {
    setIsEditing((prev) => ({ ...prev, [field]: false }));
  };

  const handleConfirm = async () => {
    try {
      const { error } = await supabase.from("shipments").update(fields).eq("id", id);
      if (error) throw error;
      router.push("/databank");
    } catch (error) {
      setError('Fehler beim Speichern in der Datenbank!');
    }
  };

  if (loading) return <div className="p-8">Lade Daten...</div>;
  if (error) return <div className="p-8 text-red-500">Fehler: {error}</div>;
  if (!fields || Object.keys(fields).length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-lg font-bold text-gray-700">No data available to display.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-start min-h-screen w-full px-8 pt-4">
      <NavigationBar onNavigate={(url) => router.push(url)} />
      <div className="flex flex-col items-start w-full max-w-6xl mt-12 px-8">
        <h1 className="text-4xl font-extrabold mb-6 self-start">Review & Confirm</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
          {/* --- Die Render-Methoden werden 1:1 übernommen wie im Original --- */}
          {/* renderField, renderFieldWithDropdown, renderFieldWithDropdownOptions, renderShipmentType, renderSizeAndWeightDetails, renderFragileItem, renderShippingDetails, renderAdditionalProtection, renderConfirmButton */}
          {/* --- */}
        </div>
      </div>
    </div>
  );
}
