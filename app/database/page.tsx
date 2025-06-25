"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../utils/supabaseClient";
import { FaEdit, FaTrash, FaRegEdit } from "react-icons/fa";
import { motion } from "framer-motion";
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
  const [showColumnEdit, setShowColumnEdit] = useState(false);
  const [visibleColumns, setVisibleColumns] = useState<string[]>([]);
  const [defaultColumns, setDefaultColumns] = useState<string[]>([]);
  const [columnWidths, setColumnWidths] = useState<{ [key: string]: number }>({});
  const [draggedCol, setDraggedCol] = useState<string | null>(null);
  const [dragOverCol, setDragOverCol] = useState<string | null>(null);
  const [dragColIndex, setDragColIndex] = useState<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);
  const dragGhostRef = useRef<HTMLDivElement>(null);
  const columnEditRef = useRef<HTMLDivElement>(null);
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

  const handleColumnToggle = (key: string) => {
    setVisibleColumns((prev) => {
      if (prev.includes(key)) {
        return prev.filter((col) => col !== key);
      } else {
        // Füge die Spalte an der Stelle ein, wie sie in defaultColumns steht
        const insertIdx = defaultColumns.indexOf(key);
        const newCols = [...prev];
        newCols.splice(insertIdx, 0, key);
        // Sortiere nach defaultColumns, falls mehrere gleichzeitig wieder ausgewählt werden
        return newCols.sort((a, b) => defaultColumns.indexOf(a) - defaultColumns.indexOf(b));
      }
    });
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

  useEffect(() => {
    if (shipments[0]) {
      const cols = Object.keys(shipments[0]).filter(key => key !== "id");
      setVisibleColumns(cols);
      setDefaultColumns(cols);
    }
  }, [shipments.length]);

  // Dropdown automatisch schließen, wenn außerhalb geklickt wird
  useEffect(() => {
    if (!showColumnEdit) return;
    function handleClickOutside(event: MouseEvent) {
      if (
        columnEditRef.current &&
        !columnEditRef.current.contains(event.target as Node)
      ) {
        setShowColumnEdit(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showColumnEdit]);

  // Handler für Spaltenbreite
  const handleResize = (key: string, deltaX: number) => {
    setColumnWidths((prev) => ({
      ...prev,
      [key]: Math.max((prev[key] || 150) + deltaX, 60),
    }));
  };

  // Drag & Drop für Spalten (ohne externe Bibliothek, mit Animation)
  const handleHeaderMouseDown = (key: string, idx: number, e: React.MouseEvent) => {
    setDraggedCol(key);
    setDragColIndex(idx);
    document.body.style.userSelect = 'none';
    const onMouseMove = (ev: MouseEvent) => {
      const ths = document.querySelectorAll('th[data-col]');
      let found = null;
      ths.forEach((th, i) => {
        const rect = th.getBoundingClientRect();
        if (ev.clientX > rect.left && ev.clientX < rect.right) {
          found = i;
        }
      });
      setDragOverIndex(found);
      setDragOverCol(found !== null ? visibleColumns[found] : null);
    };
    const onMouseUp = () => {
      if (
        dragColIndex !== null &&
        dragOverIndex !== null &&
        dragColIndex !== dragOverIndex
      ) {
        setVisibleColumns((prev) => {
          const updated = [...prev];
          const [removed] = updated.splice(dragColIndex, 1);
          updated.splice(dragOverIndex, 0, removed);
          return updated;
        });
      }
      setDraggedCol(null);
      setDragColIndex(null);
      setDragOverCol(null);
      setDragOverIndex(null);
      document.body.style.userSelect = '';
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
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
          <div className="flex items-center mb-6 relative">
            <h1 className="text-4xl font-extrabold self-start">Database</h1>
            <button
              className="ml-3 p-2 rounded-full flex items-center justify-center transition-all duration-[1250ms] bg-[#E5E5E5] text-black hover:bg-black hover:text-[#F5F5F5] focus:bg-black focus:text-[#F5F5F5] cursor-pointer"
              title="Edit columns"
              onClick={() => setShowColumnEdit((v) => !v)}
              style={{ outline: 'none' }}
            >
              <FaRegEdit size={22} />
            </button>
            {showColumnEdit && (
              <motion.div
                ref={columnEditRef}
                initial={{ opacity: 0, scale: 0.95, y: 0, x: 0 }}
                animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 0, x: 0 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="absolute left-0 translate-x-full top-1 z-50 bg-white border rounded-xl shadow-lg p-4 min-w-[220px] max-h-60 overflow-y-auto flex flex-col gap-2 custom-scrollbar"
                style={{ minWidth: 220, left: 7 }}
              >
                <div className="font-bold mb-2">Select columns</div>
                {defaultColumns.map((key) => (
                  <label key={key} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={visibleColumns.includes(key)}
                      onChange={() => handleColumnToggle(key)}
                    />
                    {key}
                  </label>
                ))}
                <button
                  className="mt-2 bg-black text-white rounded-lg px-4 py-1 hover:bg-gray-800 transition-all"
                  onClick={() => setShowColumnEdit(false)}
                >Done</button>
              </motion.div>
            )}
          </div>
          <table className="min-w-full border ml-16 rounded-xl overflow-hidden mt-2">
            <thead>
              <tr className="bg-[#F5F5F5]">
                <th className="border px-4 py-2 rounded-tl-xl">Edit</th>
                <th className="border px-4 py-2">Delete</th>
                <th className="border px-4 py-2">Status</th>
                {shipments[0] && Object.keys(shipments[0]).map((key, idx) => (
                  key === "id" ? <th key={key} className="border px-4 py-2">{key}</th> : null
                ))}
                {defaultColumns.filter(key => visibleColumns.includes(key)).map((key, idx, arr) => (
                  <th
                    key={key}
                    data-col={idx}
                    className={`border px-4 py-2 cursor-pointer select-none relative group transition-all duration-300${idx === arr.length - 1 ? ' rounded-tr-xl' : ''} ${draggedCol === key ? 'opacity-50' : ''}`}
                    style={{ minWidth: 60, position: 'relative', left: draggedCol === key ? 0 : undefined, zIndex: draggedCol === key ? 20 : undefined, transition: 'all 0.25s cubic-bezier(.4,2,.6,1)' }}
                    onMouseDown={e => handleHeaderMouseDown(key, idx, e)}
                  >
                    <span
                      className="flex items-center gap-1 w-full"
                      onClick={e => { e.stopPropagation(); handleSort(key); }}
                      style={{ cursor: 'pointer', userSelect: 'none' }}
                    >
                      {key}
                      {sortKey === key && (
                        <span>{sortOrder === 'asc' ? '▲' : '▼'}</span>
                      )}
                    </span>
                    {/* Drag-Over-Highlight/Platzhalter */}
                    {draggedCol && dragOverIndex === idx && (
                      <span className="absolute left-0 top-0 w-full h-full bg-blue-200 opacity-30 pointer-events-none transition-all duration-200" />
                    )}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {sortedShipments.map((s, idx) => (
                <tr
                  key={s.id || idx}
                  className={
                    `${idx % 2 === 0 ? "bg-white" : "bg-[#F5F5F5]"} ${isSorting ? 'opacity-60' : 'opacity-100'}`
                  }
                >
                  {/* Edit Button: nur hier links abrunden, wenn letzte Zeile */}
                  <td className={`border px-4 py-2 text-center${idx === sortedShipments.length - 1 ? ' rounded-bl-xl' : ''}`}>
                    <button
                      onClick={loggedIn && username === "alket.rrushi" ? () => router.push(`/create-shipment/details/review&confirm/${s.id}`) : undefined}
                      title="Bearbeiten"
                      className={`flex items-center justify-center w-8 h-8 rounded-full ${loggedIn && username === "alket.rrushi" ? 'bg-[#E5E5E5] text-black cursor-pointer transition-all duration-[1250ms] hover:bg-black hover:text-[#E5F5E5]' : 'bg-[#E5E5E5] text-gray-400 opacity-50 cursor-not-allowed'}`}
                      disabled={!(loggedIn && username === "alket.rrushi")}
                    >
                      <FaEdit />
                    </button>
                  </td>
                  <td className="border px-4 py-2 text-center">
                    <button
                      onClick={loggedIn && username === "alket.rrushi" ? () => handleDelete(s.id) : undefined}
                      title="Löschen"
                      className={`flex items-center justify-center w-8 h-8 rounded-full ${loggedIn && username === "alket.rrushi" ? 'bg-[#E5E5E5] text-black cursor-pointer transition-all duration-[1250ms] hover:bg-black hover:text-[#E5F5E5]' : 'bg-[#E5E5E5] text-gray-400 opacity-50 cursor-not-allowed'}`}
                      disabled={!(loggedIn && username === "alket.rrushi")}
                    >
                      <FaTrash />
                    </button>
                  </td>
                  <td className="border px-4 py-2 text-center">{s.status ? s.status : "Unbekannt"}</td>
                  {Object.entries(s).map(([key, value]) =>
                    key === "id" ? (
                      <td key={key} className="border px-4 py-2">{value?.toString()}</td>
                    ) : null
                  )}
                  {defaultColumns.filter(key => visibleColumns.includes(key)).map((key, i, arr) => {
                    // Nur die allerletzte Zelle der letzten Zeile bekommt rechts eine Abrundung
                    const isLastVisible = i === arr.length - 1;
                    let rounded = '';
                    if (idx === sortedShipments.length - 1 && isLastVisible) {
                      rounded = ' rounded-br-xl';
                    }
                    return (
                      <td key={key} className={`border px-4 py-2${rounded}`} style={{ minWidth: 60 }}>
                        {key === "created_at"
                          ? new Date(s[key] as string).toLocaleString("de-DE", { dateStyle: "short", timeStyle: "short" })
                          : Array.isArray(s[key])
                          ? (s[key] as any[]).join(", ")
                          : typeof s[key] === "boolean"
                            ? s[key] ? "Yes" : "No"
                            : s[key]?.toString()}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #e5e5e5;
          border-radius: 8px;
        }
        .custom-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: #e5e5e5 transparent;
          border-radius: 0 0 12px 12px;
        }
      `}</style>
    </div>
  );
}
