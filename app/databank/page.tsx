"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../utils/supabaseClient";
import { FaEdit } from "react-icons/fa";

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
      <h1 className="text-4xl font-extrabold mb-6 self-start">Databank</h1>
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
                  className="flex items-center justify-center w-8 h-8 rounded-full border-2 border-black bg-[#E5E5E5] text-black cursor-pointer transition-all duration-[1250ms] hover:bg-black hover:text-[#E5E5E5] hover:border-[#E5E5E5]"
                >
                  <FaEdit />
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
