"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../utils/supabaseClient";

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

export default function DatabankPage() {
  const [shipments, setShipments] = useState<Shipment[]>([]);

  useEffect(() => {
    // Initiales Laden
    const fetchShipments = async () => {
      const { data } = await supabase.from("shipments").select("*").order("created_at", { ascending: false });
      if (data) setShipments(data as Shipment[]);
    };
    fetchShipments();

    // Realtime-Subscription
    const channel = supabase
      .channel("shipments-realtime")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "shipments" },
        (payload) => {
          setShipments((prev) => [payload.new as Shipment, ...prev]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Alle Shipments (Echtzeit)</h1>
      <table className="min-w-full border">
        <thead>
          <tr>
            <th className="border px-4 py-2">ID</th>
            <th className="border px-4 py-2">Typ</th>
            <th className="border px-4 py-2">Gewicht</th>
            <th className="border px-4 py-2">Größe (LxBxH)</th>
            <th className="border px-4 py-2">Lieferdatum</th>
            <th className="border px-4 py-2">Erstellt am</th>
          </tr>
        </thead>
        <tbody>
          {shipments.map((s) => (
            <tr key={s.id}>
              <td className="border px-4 py-2">{s.id}</td>
              <td className="border px-4 py-2">{s.shipmenttype}</td>
              <td className="border px-4 py-2">{s.weight}</td>
              <td className="border px-4 py-2">{s.length} x {s.width} x {s.height}</td>
              <td className="border px-4 py-2">{s.deliverydate}</td>
              <td className="border px-4 py-2">{new Date(s.created_at).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
