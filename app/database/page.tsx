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
  [key: string]: any;
}

export default function DatabasePage() {
  const [shipments, setShipments] = useState<Shipment[]>([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [sortKey, setSortKey] = useState<string>(""); // Anfangs kein Sortierschlüssel
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>("asc");
  const [isSorting, setIsSorting] = useState(false);
  const router = useRouter();

  // Session-Check beim Mounten (nur für diese Tab-Session)
  useEffect(() => {
    if (typeof window !== "undefined") {
      const dbLoggedIn = sessionStorage.getItem("dbLoggedIn");
      const dbUser = sessionStorage.getItem("dbUser");
      if (dbLoggedIn === "true" && dbUser) {
        setLoggedIn(true);
        setUsername(dbUser);
      }
    }
  }, []);

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
      if (typeof window !== "undefined") {
        sessionStorage.setItem("dbLoggedIn", "true");
        sessionStorage.setItem("dbUser", username);
      }
    } else {
      setError("Falscher Nutzername oder Passwort!");
    }
  };

  // Beim echten Reload oder Navigation auf Database: Session löschen
  useEffect(() => {
    const handleUnload = () => {
      sessionStorage.removeItem("dbLoggedIn");
      sessionStorage.removeItem("dbUser");
    };
    window.addEventListener("beforeunload", handleUnload);
    return () => {
      window.removeEventListener("beforeunload", handleUnload);
    };
  }, []);

  // Sortierfunktion
  const sortableKeys = shipments[0]
    ? Object.keys(shipments[0]).filter(
        (key) => key !== "id"
      )
    : [];

  const handleSort = (key: string) => {
    if (key === sortKey) {
      setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortOrder(key === "created_at" ? "desc" : "asc");
    }
    setIsSorting(true);
    setTimeout(() => setIsSorting(false), 350);
  };

  const sortedShipments = sortKey
    ? [...shipments].sort((a, b) => {
        const aValue = a[sortKey];
        const bValue = b[sortKey];
        if (sortKey === "created_at") {
          const aDate = new Date(aValue as string).getTime();
          const bDate = new Date(bValue as string).getTime();
          return sortOrder === "asc" ? aDate - bDate : bDate - aDate;
        }
        if (typeof aValue === "string" && typeof bValue === "string") {
          return sortOrder === "asc"
            ? aValue.localeCompare(bValue)
            : bValue.localeCompare(aValue);
        }
        if (typeof aValue === "number" && typeof bValue === "number") {
          return sortOrder === "asc" ? aValue - bValue : bValue - aValue;
        }
        if (typeof aValue === "boolean" && typeof bValue === "boolean") {
          return sortOrder === "asc"
            ? Number(aValue) - Number(bValue)
            : Number(bValue) - Number(aValue);
        }
        return 0;
      })
    : shipments;

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
                {sortableKeys.map((key, idx, arr) => (
                  <th
                    key={key}
                    className={`border px-4 py-2 cursor-pointer select-none${idx === arr.length - 1 ? ' rounded-tr-xl' : ''}`}
                    onClick={() => handleSort(key)}
                  >
                    <span className="flex items-center gap-1">
                      {key}
                      {sortKey === key && (
                        <span>{sortOrder === 'asc' ? '▲' : '▼'}</span>
                      )}
                    </span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {sortedShipments.map((s, idx) => (
                <tr
                  key={s.id || idx}
                  className={
                    `${idx % 2 === 0 ? "bg-white" : "bg-[#F5F5F5]"} transition-all duration-500 ease-in-out ${isSorting ? 'opacity-60 translate-y-2' : 'opacity-100 translate-y-0'}`
                  }
                  style={{ transition: 'all 0.5s cubic-bezier(0.4,0,0.2,1)' }}
                >
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
                  {sortableKeys.map((key, i, arr) => (
                    <td key={key} className={`border px-4 py-2${idx === sortedShipments.length - 1 && i === arr.length - 1 ? ' rounded-br-xl' : ''}${idx === sortedShipments.length - 1 && i === 0 ? ' rounded-bl-xl' : ''}`}>
                      {key === "created_at"
                        ? new Date(s[key] as string).toLocaleString("de-DE", { dateStyle: "short", timeStyle: "short" })
                        : Array.isArray(s[key])
                        ? (s[key] as any[]).join(", ")
                        : typeof s[key] === "boolean"
                          ? s[key] ? "Yes" : "No"
                          : s[key]?.toString()}
                    </td>
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
