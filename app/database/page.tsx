"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../utils/supabaseClient";
import { FaEdit, FaTrash } from "react-icons/fa";
import NavigationBar from "../create-shipment/details/NavigationBar";

const USERS = [
  { username: "alket.rrushi", password: "DatenbankPasswort123" },
  { username: "jan.tietjens", password: "JansZugang123" },
];

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

export default function DatabasePage() {
  const [shipments, setShipments] = useState<Shipment[]>([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (!loggedIn) return;
    // Initial load
    const fetchShipments = async () => {
      const { data, error } = await supabase.from("shipments").select("*").order("created_at", { ascending: false });
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
  }, [loggedIn]);

  const handleDelete = async (id: string) => {
    if (!confirm("Wirklich löschen?")) return;
    const { error } = await supabase.from("shipments").delete().eq("id", id);
    if (!error) setShipments((prev) => prev.filter((s) => s.id !== id));
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const found = USERS.find(
      (u) => u.username === username && u.password === password
    );
    if (found) {
      setLoggedIn(true);
      setError("");
    } else {
      setError("Falscher Nutzername oder Passwort!");
    }
  };

  return (
    <div className="min-h-screen bg-[#E5E5E5]">
      <NavigationBar onNavigate={(url) => router.push(url)} />
      {!loggedIn ? (
        <div className="flex flex-col items-center justify-center min-h-[80vh]">
          <form onSubmit={handleLogin} className="bg-white p-8 rounded-xl shadow-md flex flex-col gap-4 min-w-[320px]">
            <label className="font-bold text-lg" htmlFor="username">Nutzer</label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={e => setUsername(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2"
              autoComplete="username"
              required
            />
            <label className="font-bold text-lg" htmlFor="password">Passwort</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2"
              autoComplete="current-password"
              required
            />
            {error && <div className="text-red-600 text-sm">{error}</div>}
            <button type="submit" className="mt-2 bg-black text-white rounded-lg px-4 py-2 hover:bg-gray-800 transition-all">Login</button>
          </form>
        </div>
      ) : (
        <div className="p-8 mt-12">
          <h1 className="text-4xl font-extrabold mb-6 self-start">Database</h1>
          <table className="min-w-full border ml-16 rounded-xl overflow-hidden">
            <thead>
              <tr className="bg-[#F5F5F5]">
                <th className="border px-4 py-2 rounded-tl-xl">Edit</th>
                <th className="border px-4 py-2">Delete</th>
                {shipments[0] && Object.keys(shipments[0]).map((key, idx) => (
                  key === "id" ? <th key={key} className="border px-4 py-2">{key}</th> : null
                ))}
                {shipments[0] && Object.keys(shipments[0]).map((key, idx, arr) => (
                  key !== "id"
                    ? <th key={key} className={`border px-4 py-2${idx === arr.length - 1 ? ' rounded-tr-xl' : ''}`}>{key}</th>
                    : null
                ))}
              </tr>
            </thead>
            <tbody>
              {shipments.map((s, idx) => (
                <tr key={s.id || idx} className={idx % 2 === 0 ? "bg-white" : "bg-[#F5F5F5]"}>
                  <td className="border px-4 py-2 text-center">
                    <button
                      onClick={loggedIn && username === "alket.rrushi" ? () => router.push(`/create-shipment/details/review&confirm/${s.id}`) : undefined}
                      title="Bearbeiten"
                      className={`flex items-center justify-center w-8 h-8 rounded-full ${loggedIn && username === "alket.rrushi" ? 'bg-[#E5E5E5] text-black cursor-pointer transition-all duration-[1250ms] hover:bg-black hover:text-[#E5E5E5]' : 'bg-[#E5E5E5] text-gray-400 opacity-50 cursor-not-allowed'}`}
                      disabled={!(loggedIn && username === "alket.rrushi")}
                    >
                      <FaEdit />
                    </button>
                  </td>
                  <td className="border px-4 py-2 text-center">
                    <button
                      onClick={loggedIn && username === "alket.rrushi" ? () => handleDelete(s.id) : undefined}
                      title="Löschen"
                      className={`flex items-center justify-center w-8 h-8 rounded-full ${loggedIn && username === "alket.rrushi" ? 'bg-[#E5E5E5] text-black cursor-pointer transition-all duration-[1250ms] hover:bg-black hover:text-[#E5E5E5]' : 'bg-[#E5E5E5] text-gray-400 opacity-50 cursor-not-allowed'}`}
                      disabled={!(loggedIn && username === "alket.rrushi")}
                    >
                      <FaTrash />
                    </button>
                  </td>
                  {Object.entries(s).map(([key, value], i, arr) => (
                    key === "id" ? (
                      <td key={key} className="border px-4 py-2">{value?.toString()}</td>
                    ) : null
                  ))}
                  {Object.entries(s).map(([key, value], i, arr) => (
                    key !== "id" ? (
                      <td key={key} className={`border px-4 py-2${idx === shipments.length - 1 && i === arr.length - 1 ? ' rounded-br-xl' : ''}${idx === shipments.length - 1 && i === 0 ? ' rounded-bl-xl' : ''}`}>
                        {key === "created_at"
                          ? new Date(value as string).toLocaleString("de-DE", { dateStyle: "short", timeStyle: "short" })
                          : Array.isArray(value)
                          ? value.join(", ")
                          : typeof value === "boolean"
                            ? value ? "Yes" : "No"
                            : value?.toString()}
                      </td>
                    ) : null
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
