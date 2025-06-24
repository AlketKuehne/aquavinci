"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { supabase } from "../../../../../utils/supabaseClient";

interface Shipment {
  id: string;
  shipmenttype: string;
  fclselection: string;
  lclselection: string;
  weight: string;
  height: string;
  length: string;
  width: string;
  isfragile: boolean;
  fragilecategory: string;
  fragilesubcategory: string;
  extraprotection: boolean;
  selectedprotections: string[];
  deliveryoption: string;
  deliverydate: string;
  created_at: string;
  // ...weitere Felder nach Bedarf
}

export default function ReviewAndConfirmPage() {
  const router = useRouter();
  const params = useParams();
  const { id } = params as { id: string };
  const [shipment, setShipment] = useState<Shipment | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchShipment = async () => {
      const { data, error } = await supabase.from("shipments").select("*").eq("id", id).single();
      if (error) setError(error.message);
      setShipment(data as Shipment);
      setLoading(false);
    };
    fetchShipment();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    if (!shipment) return;
    const target = e.target;
    const { name, value, type } = target;
    setShipment({
      ...shipment,
      [name]: type === "checkbox" && target instanceof HTMLInputElement ? target.checked : value,
    });
  };

  const handleSave = async () => {
    if (!shipment) return;
    setSaving(true);
    setError(null);
    const { error } = await supabase.from("shipments").update(shipment).eq("id", shipment.id);
    setSaving(false);
    if (error) {
      setError(error.message);
    } else {
      router.push("/databank");
    }
  };

  if (loading) return <div className="p-8">Lade Daten...</div>;
  if (error) return <div className="p-8 text-red-500">Fehler: {error}</div>;
  if (!shipment) return <div className="p-8">Kein Shipment gefunden.</div>;

  return (
    <div className="p-8 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Shipment bearbeiten & bestätigen</h1>
      <form className="space-y-4" onSubmit={e => { e.preventDefault(); handleSave(); }}>
        <div>
          <label className="block font-semibold">Shipment Type</label>
          <input className="border px-2 py-1 w-full" name="shipmenttype" value={shipment.shipmenttype} onChange={handleChange} />
        </div>
        <div>
          <label className="block font-semibold">FCL Selection</label>
          <input className="border px-2 py-1 w-full" name="fclselection" value={shipment.fclselection} onChange={handleChange} />
        </div>
        <div>
          <label className="block font-semibold">LCL Selection</label>
          <input className="border px-2 py-1 w-full" name="lclselection" value={shipment.lclselection} onChange={handleChange} />
        </div>
        {/* Weitere Felder nach Bedarf */}
        <div>
          <label className="block font-semibold">Gewicht</label>
          <input className="border px-2 py-1 w-full" name="weight" value={shipment.weight} onChange={handleChange} />
        </div>
        <div>
          <label className="block font-semibold">Höhe</label>
          <input className="border px-2 py-1 w-full" name="height" value={shipment.height} onChange={handleChange} />
        </div>
        <div>
          <label className="block font-semibold">Breite</label>
          <input className="border px-2 py-1 w-full" name="width" value={shipment.width} onChange={handleChange} />
        </div>
        <div>
          <label className="block font-semibold">Länge</label>
          <input className="border px-2 py-1 w-full" name="length" value={shipment.length} onChange={handleChange} />
        </div>
        <div>
          <label className="block font-semibold">Lieferoption</label>
          <input className="border px-2 py-1 w-full" name="deliveryoption" value={shipment.deliveryoption} onChange={handleChange} />
        </div>
        {/* Beispiel für Boolean */}
        <div>
          <label className="block font-semibold">Fragile?</label>
          <input type="checkbox" name="isfragile" checked={shipment.isfragile} onChange={handleChange} />
        </div>
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded" disabled={saving}>
          {saving ? "Speichern..." : "Speichern & Bestätigen"}
        </button>
      </form>
    </div>
  );
}
