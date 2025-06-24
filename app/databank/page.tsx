"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
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
  const router = useRouter();

  useEffect(() => {
    // Initial load
    const fetchShipments = async () => {
      const { data, error } = await supabase.from("shipments").select("*").order("created_at", { ascending: false });
      console.log("Supabase data:", data);
      console.log("Supabase error:", error);
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
      <h1 className="text-3xl font-bold mb-6">Databank</h1>
      <table className="min-w-full border ml-16"> {/* Tabelle weiter nach rechts */}
        <thead>
          <tr>
            <th className="border px-4 py-2">Edit</th> {/* Neue Spalte */}
            {shipments[0] && Object.keys(shipments[0]).map((key) => (
              <th key={key} className="border px-4 py-2">{key}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {shipments.map((s, idx) => (
            <tr key={s.id || idx}>
              <td className="border px-4 py-2 text-center">
                {/* Klickbarer Stift */}
                <button
                  onClick={() => router.push(`/create-shipment/details/review&confirm/${s.id}`)}
                  title="Bearbeiten"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536M9 13l6.586-6.586a2 2 0 112.828 2.828L11.828 15.828a2 2 0 01-2.828 0L9 13zm0 0L4 19l5-1 1-5z" />
                  </svg>
                </button>
              </td>
              {Object.entries(s).map(([key, value]) => (
                <td key={key} className="border px-4 py-2">
                  {key === "created_at"
                    ? new Date(value as string).toLocaleString("de-DE", { dateStyle: "short", timeStyle: "short" })
                    : Array.isArray(value)
                    ? value.join(", ")
                    : typeof value === "boolean"
                      ? value ? "Yes" : "No"
                      : value?.toString()}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
