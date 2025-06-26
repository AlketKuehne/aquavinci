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

const STATUS_OPTIONS = [
  {
    value: "PNEDING",
    color: "#bdbdbd",
    label: "PENDING",
    desc: ""
  },
  {
    value: "BEING LOADED",
    color: "#997bcc",
    label: "BEING LOADED",
    desc: ""
  },
  {
    value: "LOADED",
    color: "#cdb4f6",
    label: "LOADED",
    desc: ""
  },
  {
    value: "ON ROUTE",
    color: "#90caf9",
    label: "ON ROUTE",
    desc: ""
  },
  {
    value: "ARRIVED",
    color: "#00d0ff",
    label: "ARRIVED",
    desc: ""
  },
  {
    value: "BEING UNLOADED",
    color: "#64ffda",
    label: "BEIND UNLOADED",
    desc: ""
  },
  {
    value: "UNLOADED",
    color: "#00ffa6",
    label: "UNLOADED",
    desc: ""
  },
  {
    value: "READY FOR PICKUP",
    color: "#1976d2",
    label: "READY FOR PICKUP",
    desc: ""
  },
  {
    value: "DELIVERY ON ROUTE",
    color: "#95ff00",
    label: "DELIVERY ON ROUTE",
    desc: ""
  },
  {
    value: "COLLECTED/DELIVERED",
    color: "#1fcc26",
    label: "COLLECTED/DELIVERED",
    desc: ""
  },
  {
    value: "DELAYS",
    color: "#ffe066",
    label: "DELYAS",
    desc: ""
  },
  {
    value: "IN CLARIFICATION",
    color: "#ff9800",
    label: "IN CLARIFICATION",
    desc: ""
  },
  {
    value: "LOST",
    color: "#002966",
    label: "LOST",
    desc: "Maybe fallen into the sea, maybe not. Who knows? But it's lost."
  },
];

// Email templates for all statuses (ENGLISH, with logo and professional layout)
const EMAIL_TEMPLATES: { [status: string]: { subject: string; html: (customText: string, shipmentId?: string) => string } } = {
  'PNEDING': {
    subject: 'STATUS: PENDING for your delivery',
    html: (customText, shipmentId) => `
      <div style="font-family:Arial,sans-serif;max-width:520px;margin:auto;background:#f9f9f9;padding:32px 24px 24px 24px;border-radius:16px;border:1px solid #e0e0e0;">
        <img src="https://aquavinci.vercel.app/logoname.png" alt="Aquavinci Logo" style="height:48px;margin-bottom:24px;display:block;margin-left:auto;margin-right:auto;"/>
        <h2 style="color:#1976d2;margin-bottom:12px;">Your order is pending</h2>
        <p style="margin:0 0 12px 0;">We have received your order and it is currently being processed. You will receive further updates as soon as your shipment status changes.</p>
        <p style="margin:0 0 12px 0;"><b>Shipment ID:</b> ${shipmentId || '-'} </p>
        <p style="margin:0 0 12px 0;">${customText ? `<b>Note:</b> ${customText}` : ''}</p>
        <p style="margin:32px 0 0 0;font-size:15px;color:#222;">Best regards,<br/>Aquavinci Team</p>
        <div style="margin-top:24px;text-align:center;color:#aaa;font-size:12px;">This is an automated message from Aquavinci</div>
        <img src="https://aquavinci.vercel.app/Screenshot.jpg" alt="Shipment Screenshot" style="height:40px;margin-top:32px;display:block;margin-left:auto;margin-right:auto;"/>
      </div>
    `
  },
  'BEING LOADED': {
    subject: 'STATUS: BEING LOADED for your delivery',
    html: (customText, shipmentId) => `
      <div style="font-family:Arial,sans-serif;max-width:520px;margin:auto;background:#f9f9f9;padding:32px 24px 24px 24px;border-radius:16px;border:1px solid #e0e0e0;">
        <img src="https://aquavinci.vercel.app/logoname.png" alt="Aquavinci Logo" style="height:48px;margin-bottom:24px;display:block;margin-left:auto;margin-right:auto;"/>
        <h2 style="color:#1976d2;margin-bottom:12px;">Your shipment is being loaded</h2>
        <p style="margin:0 0 12px 0;">Your shipment is currently being loaded and prepared for transport. We will notify you once it is on its way.</p>
        <p style="margin:0 0 12px 0;"><b>Shipment ID:</b> ${shipmentId || '-'} </p>
        <p style="margin:0 0 12px 0;">${customText ? `<b>Note:</b> ${customText}` : ''}</p>
        <p style="margin:32px 0 0 0;font-size:15px;color:#222;">Best regards,<br/>Aquavinci Team</p>
        <div style="margin-top:24px;text-align:center;color:#aaa;font-size:12px;">This is an automated message from Aquavinci</div>
        <img src="https://aquavinci.vercel.app/Screenshot.jpg" alt="Shipment Screenshot" style="height:40px;margin-top:32px;display:block;margin-left:auto;margin-right:auto;"/>
      </div>
    `
  },
  'LOADED': {
    subject: 'STATUS: LOADED for your delivery',
    html: (customText, shipmentId) => `
      <div style="font-family:Arial,sans-serif;max-width:520px;margin:auto;background:#f9f9f9;padding:32px 24px 24px 24px;border-radius:16px;border:1px solid #e0e0e0;">
        <img src="https://aquavinci.vercel.app/logoname.png" alt="Aquavinci Logo" style="height:48px;margin-bottom:24px;display:block;margin-left:auto;margin-right:auto;"/>
        <h2 style="color:#1976d2;margin-bottom:12px;">Your shipment is loaded</h2>
        <p style="margin:0 0 12px 0;">Your shipment has been successfully loaded and is ready for transport.</p>
        <p style="margin:0 0 12px 0;"><b>Shipment ID:</b> ${shipmentId || '-'} </p>
        <p style="margin:0 0 12px 0;">${customText ? `<b>Note:</b> ${customText}` : ''}</p>
        <p style="margin:32px 0 0 0;font-size:15px;color:#222;">Best regards,<br/>Aquavinci Team</p>
        <div style="margin-top:24px;text-align:center;color:#aaa;font-size:12px;">This is an automated message from Aquavinci</div>
        <img src="https://aquavinci.vercel.app/Screenshot.jpg" alt="Shipment Screenshot" style="height:40px;margin-top:32px;display:block;margin-left:auto;margin-right:auto;"/>
      </div>
    `
  },
  'ON ROUTE': {
    subject: 'STATUS: ON ROUTE for your delivery',
    html: (customText, shipmentId) => `
      <div style="font-family:Arial,sans-serif;max-width:520px;margin:auto;background:#f9f9f9;padding:32px 24px 24px 24px;border-radius:16px;border:1px solid #e0e0e0;">
        <img src="https://aquavinci.vercel.app/logoname.png" alt="Aquavinci Logo" style="height:48px;margin-bottom:24px;display:block;margin-left:auto;margin-right:auto;"/>
        <h2 style="color:#1976d2;margin-bottom:12px;">Your shipment is on route</h2>
        <p style="margin:0 0 12px 0;">Your shipment is currently on its way to the destination. We will keep you updated on its progress.</p>
        <p style="margin:0 0 12px 0;"><b>Shipment ID:</b> ${shipmentId || '-'}</p>
        <p style="margin:0 0 12px 0;">${customText ? `<b>Note:</b> ${customText}` : ''}</p>
        <p style="margin:32px 0 0 0;font-size:15px;color:#222;">Best regards,<br/>Aquavinci Team</p>
        <div style="margin-top:24px;text-align:center;color:#aaa;font-size:12px;">This is an automated message from Aquavinci</div>
        <img src="https://aquavinci.vercel.app/Screenshot.jpg" alt="Shipment Screenshot" style="height:40px;margin-top:32px;display:block;margin-left:auto;margin-right:auto;"/>
      </div>
    `
  },
  'ARRIVED': {
    subject: 'STATUS: ARRIVED for your delivery',
    html: (customText, shipmentId) => `
      <div style="font-family:Arial,sans-serif;max-width:520px;margin:auto;background:#f9f9f9;padding:32px 24px 24px 24px;border-radius:16px;border:1px solid #e0e0e0;">
        <img src="https://aquavinci.vercel.app/logoname.png" alt="Aquavinci Logo" style="height:48px;margin-bottom:24px;display:block;margin-left:auto;margin-right:auto;"/>
        <h2 style="color:#1976d2;margin-bottom:12px;">Your shipment has arrived</h2>
        <p style="margin:0 0 12px 0;">Your shipment has arrived at its destination. Thank you for choosing Aquavinci.</p>
        <p style="margin:0 0 12px 0;"><b>Shipment ID:</b> ${shipmentId || '-'}</p>
        <p style="margin:0 0 12px 0;">${customText ? `<b>Note:</b> ${customText}` : ''}</p>
        <p style="margin:32px 0 0 0;font-size:15px;color:#222;">Best regards,<br/>Aquavinci Team</p>
        <div style="margin-top:24px;text-align:center;color:#aaa;font-size:12px;">This is an automated message from Aquavinci</div>
        <img src="https://aquavinci.vercel.app/Screenshot.jpg" alt="Shipment Screenshot" style="height:40px;margin-top:32px;display:block;margin-left:auto;margin-right:auto;"/>
      </div>
    `
  },
  'BEING UNLOADED': {
    subject: 'STATUS: BEING UNLOADED for your delivery',
    html: (customText, shipmentId) => `
      <div style="font-family:Arial,sans-serif;max-width:520px;margin:auto;background:#f9f9f9;padding:32px 24px 24px 24px;border-radius:16px;border:1px solid #e0e0e0;">
        <img src="https://aquavinci.vercel.app/logoname.png" alt="Aquavinci Logo" style="height:48px;margin-bottom:24px;display:block;margin-left:auto;margin-right:auto;"/>
        <h2 style="color:#1976d2;margin-bottom:12px;">Your shipment is being unloaded</h2>
        <p style="margin:0 0 12px 0;">Your shipment is currently being unloaded at the destination.</p>
        <p style="margin:0 0 12px 0;"><b>Shipment ID:</b> ${shipmentId || '-'}</p>
        <p style="margin:0 0 12px 0;">${customText ? `<b>Note:</b> ${customText}` : ''}</p>
        <p style="margin:32px 0 0 0;font-size:15px;color:#222;">Best regards,<br/>Aquavinci Team</p>
        <div style="margin-top:24px;text-align:center;color:#aaa;font-size:12px;">This is an automated message from Aquavinci</div>
        <img src="https://aquavinci.vercel.app/Screenshot.jpg" alt="Shipment Screenshot" style="height:40px;margin-top:32px;display:block;margin-left:auto;margin-right:auto;"/>
      </div>
    `
  },
  'UNLOADED': {
    subject: 'STATUS: UNLOADED for your delivery',
    html: (customText, shipmentId) => `
      <div style="font-family:Arial,sans-serif;max-width:520px;margin:auto;background:#f9f9f9;padding:32px 24px 24px 24px;border-radius:16px;border:1px solid #e0e0e0;">
        <img src="https://aquavinci.vercel.app/logoname.png" alt="Aquavinci Logo" style="height:48px;margin-bottom:24px;display:block;margin-left:auto;margin-right:auto;"/>
        <h2 style="color:#1976d2;margin-bottom:12px;">Your shipment has been unloaded</h2>
        <p style="margin:0 0 12px 0;">Your shipment has been successfully unloaded and is ready for the next step.</p>
        <p style="margin:0 0 12px 0;"><b>Shipment ID:</b> ${shipmentId || '-'}</p>
        <p style="margin:0 0 12px 0;">${customText ? `<b>Note:</b> ${customText}` : ''}</p>
        <p style="margin:32px 0 0 0;font-size:15px;color:#222;">Best regards,<br/>Aquavinci Team</p>
        <div style="margin-top:24px;text-align:center;color:#aaa;font-size:12px;">This is an automated message from Aquavinci</div>
        <img src="https://aquavinci.vercel.app/Screenshot.jpg" alt="Shipment Screenshot" style="height:40px;margin-top:32px;display:block;margin-left:auto;margin-right:auto;"/>
      </div>
    `
  },
  'READY FOR PICKUP': {
    subject: 'STATUS: READY FOR PICKUP for your delivery',
    html: (customText, shipmentId) => `
      <div style="font-family:Arial,sans-serif;max-width:520px;margin:auto;background:#f9f9f9;padding:32px 24px 24px 24px;border-radius:16px;border:1px solid #e0e0e0;">
        <img src="https://aquavinci.vercel.app/logoname.png" alt="Aquavinci Logo" style="height:48px;margin-bottom:24px;display:block;margin-left:auto;margin-right:auto;"/>
        <h2 style="color:#1976d2;margin-bottom:12px;">Your shipment is ready for pickup</h2>
        <p style="margin:0 0 12px 0;">Your shipment is now ready for pickup at the designated location.</p>
        <p style="margin:0 0 12px 0;"><b>Shipment ID:</b> ${shipmentId || '-'}</p>
        <p style="margin:0 0 12px 0;">${customText ? `<b>Note:</b> ${customText}` : ''}</p>
        <p style="margin:32px 0 0 0;font-size:15px;color:#222;">Best regards,<br/>Aquavinci Team</p>
        <div style="margin-top:24px;text-align:center;color:#aaa;font-size:12px;">This is an automated message from Aquavinci</div>
        <img src="https://aquavinci.vercel.app/Screenshot.jpg" alt="Shipment Screenshot" style="height:40px;margin-top:32px;display:block;margin-left:auto;margin-right:auto;"/>
      </div>
    `
  },
  'DELIVERY ON ROUTE': {
    subject: 'STATUS: DELIVERY ON ROUTE for your delivery',
    html: (customText, shipmentId) => `
      <div style="font-family:Arial,sans-serif;max-width:520px;margin:auto;background:#f9f9f9;padding:32px 24px 24px 24px;border-radius:16px;border:1px solid #e0e0e0;">
        <img src="https://aquavinci.vercel.app/logoname.png" alt="Aquavinci Logo" style="height:48px;margin-bottom:24px;display:block;margin-left:auto;margin-right:auto;"/>
        <h2 style="color:#1976d2;margin-bottom:12px;">Your shipment is out for delivery</h2>
        <p style="margin:0 0 12px 0;">Your shipment is currently out for delivery and will reach you soon.</p>
        <p style="margin:0 0 12px 0;"><b>Shipment ID:</b> ${shipmentId || '-'}</p>
        <p style="margin:0 0 12px 0;">${customText ? `<b>Note:</b> ${customText}` : ''}</p>
        <p style="margin:32px 0 0 0;font-size:15px;color:#222;">Best regards,<br/>Aquavinci Team</p>
        <div style="margin-top:24px;text-align:center;color:#aaa;font-size:12px;">This is an automated message from Aquavinci</div>
        <img src="https://aquavinci.vercel.app/Screenshot.jpg" alt="Shipment Screenshot" style="height:40px;margin-top:32px;display:block;margin-left:auto;margin-right:auto;"/>
      </div>
    `
  },
  'COLLECTED/DELIVERED': {
    subject: 'STATUS: DELIVERED for your delivery',
    html: (customText, shipmentId) => `
      <div style="font-family:Arial,sans-serif;max-width:520px;margin:auto;background:#f9f9f9;padding:32px 24px 24px 24px;border-radius:16px;border:1px solid #e0e0e0;">
        <img src="https://aquavinci.vercel.app/logoname.png" alt="Aquavinci Logo" style="height:48px;margin-bottom:24px;display:block;margin-left:auto;margin-right:auto;"/>
        <h2 style="color:#1976d2;margin-bottom:12px;">Your shipment has been delivered</h2>
        <p style="margin:0 0 12px 0;">Your shipment has been successfully delivered. Thank you for your trust in Aquavinci.</p>
        <p style="margin:0 0 12px 0;"><b>Shipment ID:</b> ${shipmentId || '-'}</p>
        <p style="margin:0 0 12px 0;">${customText ? `<b>Note:</b> ${customText}` : ''}</p>
        <p style="margin:32px 0 0 0;font-size:15px;color:#222;">Best regards,<br/>Aquavinci Team</p>
        <div style="margin-top:24px;text-align:center;color:#aaa;font-size:12px;">This is an automated message from Aquavinci</div>
        <img src="https://aquavinci.vercel.app/Screenshot.jpg" alt="Shipment Screenshot" style="height:40px;margin-top:32px;display:block;margin-left:auto;margin-right:auto;"/>
      </div>
    `
  },
  'DELAYS': {
    subject: 'STATUS: DELAY for your delivery',
    html: (customText, shipmentId) => `
      <div style="font-family:Arial,sans-serif;max-width:520px;margin:auto;background:#f9f9f9;padding:32px 24px 24px 24px;border-radius:16px;border:1px solid #e0e0e0;">
        <img src="https://aquavinci.vercel.app/logoname.png" alt="Aquavinci Logo" style="height:48px;margin-bottom:24px;display:block;margin-left:auto;margin-right:auto;"/>
        <h2 style="color:#d97706;margin-bottom:12px;">Delay in your shipment</h2>
        <p style="margin:0 0 12px 0;">Unfortunately, there is a delay with your shipment. We apologize for the inconvenience and are working to resolve the issue as quickly as possible.</p>
        <p style="margin:0 0 12px 0;"><b>Shipment ID:</b> ${shipmentId || '-'}</p>
        <p style="margin:0 0 12px 0;">${customText ? `<b>Note:</b> ${customText}` : ''}</p>
        <p style="margin:32px 0 0 0;font-size:15px;color:#222;">Best regards,<br/>Aquavinci Team</p>
        <div style="margin-top:24px;text-align:center;color:#aaa;font-size:12px;">This is an automated message from Aquavinci</div>
        <img src="https://aquavinci.vercel.app/Screenshot.jpg" alt="Shipment Screenshot" style="height:40px;margin-top:32px;display:block;margin-left:auto;margin-right:auto;"/>
      </div>
    `
  },
  'IN CLARIFICATION': {
    subject: 'STATUS: IN CLARIFICATION for your delivery',
    html: (customText, shipmentId) => `
      <div style="font-family:Arial,sans-serif;max-width:520px;margin:auto;background:#f9f9f9;padding:32px 24px 24px 24px;border-radius:16px;border:1px solid #e0e0e0;">
        <img src="https://aquavinci.vercel.app/logoname.png" alt="Aquavinci Logo" style="height:48px;margin-bottom:24px;display:block;margin-left:auto;margin-right:auto;"/>
        <h2 style="color:#d97706;margin-bottom:12px;">Clarification required for your shipment</h2>
        <p style="margin:0 0 12px 0;">There is a clarification required for your shipment. Our team will contact you as soon as possible.</p>
        <p style="margin:0 0 12px 0;"><b>Shipment ID:</b> ${shipmentId || '-'}</p>
        <p style="margin:0 0 12px 0;">${customText ? `<b>Note:</b> ${customText}` : ''}</p>
        <p style="margin:32px 0 0 0;font-size:15px;color:#222;">Best regards,<br/>Aquavinci Team</p>
        <div style="margin-top:24px;text-align:center;color:#aaa;font-size:12px;">This is an automated message from Aquavinci</div>
        <img src="https://aquavinci.vercel.app/Screenshot.jpg" alt="Shipment Screenshot" style="height:40px;margin-top:32px;display:block;margin-left:auto;margin-right:auto;"/>
      </div>
    `
  },
  'LOST': {
    subject: 'STATUS: LOST for your delivery',
    html: (customText, shipmentId) => `
      <div style="font-family:Arial,sans-serif;max-width:520px;margin:auto;background:#f9f9f9;padding:32px 24px 24px 24px;border-radius:16px;border:1px solid #e0e0e0;">
        <img src="https://aquavinci.vercel.app/logoname.png" alt="Aquavinci Logo" style="height:48px;margin-bottom:24px;display:block;margin-left:auto;margin-right:auto;"/>
        <h2 style="color:#b91c1c;margin-bottom:12px;">Your shipment is lost</h2>
        <p style="margin:0 0 12px 0;">Unfortunately, your shipment is lost. We sincerely apologize and will support you in clarifying the situation.</p>
        <p style="margin:0 0 12px 0;"><b>Shipment ID:</b> ${shipmentId || '-'}</p>
        <p style="margin:0 0 12px 0;">${customText ? `<b>Note:</b> ${customText}` : ''}</p>
        <p style="margin:32px 0 0 0;font-size:15px;color:#222;">Best regards,<br/>Aquavinci Team</p>
        <div style="margin-top:24px;text-align:center;color:#aaa;font-size:12px;">This is an automated message from Aquavinci</div>
        <img src="https://aquavinci.vercel.app/Screenshot.jpg" alt="Shipment Screenshot" style="height:40px;margin-top:32px;display:block;margin-left:auto;margin-right:auto;"/>
      </div>
    `
  },
};

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
  const [localStatuses, setLocalStatuses] = useState<{[id:string]: string}>({});
  const [emailPopup, setEmailPopup] = useState<{ open: boolean; status: string; shipmentId: string | null }>({ open: false, status: '', shipmentId: null });
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

    // Realtime-Subscription für INSERT, UPDATE und DELETE
    const channel = supabase
      .channel("shipments-realtime")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "shipments" },
        (payload) => {
          setShipments((prev) => {
            if (payload.eventType === "INSERT") {
              return [payload.new as Shipment, ...prev];
            }
            if (payload.eventType === "UPDATE") {
              return prev.map(s => s.id === payload.new.id ? { ...s, ...payload.new } : s);
            }
            if (payload.eventType === "DELETE") {
              return prev.filter(s => s.id !== payload.old.id);
            }
            return prev;
          });
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

  // Custom-Dropdown für Status
  function StatusDropdown({ value, onChange }: { value: string, onChange: (v: string) => void }) {
    const [open, setOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
      if (!open) return;
      function handleClick(e: MouseEvent) {
        if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
      }
      document.addEventListener('mousedown', handleClick);
      return () => document.removeEventListener('mousedown', handleClick);
    }, [open]);

    return (
      <div ref={ref} style={{ position: 'relative', minWidth: 32 }}>
        <button
          type="button"
          aria-label="Status ändern"
          onClick={() => setOpen(v => !v)}
          style={{
            border: 'none',
            borderRadius: 6,
            width: 32,
            height: 28,
            background: 'transparent',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            outline: 'none',
            boxShadow: 'none',
            padding: 0,
          }}
          className="status-dropdown-btn"
        >
          <svg width="16" height="16" viewBox="0 0 20 20"><path d="M5 8l5 5 5-5" stroke="#222" strokeWidth="2" fill="none" strokeLinecap="round"/></svg>
        </button>
        {open && (
          <div
            style={{
              position: 'absolute',
              top: 34,
              left: '50%',
              transform: 'translateX(-50%)',
              background: '#fff',
              border: '1.5px solid #bbb',
              borderRadius: 10,
              boxShadow: '0 4px 16px rgba(0,0,0,0.08)',
              padding: 10,
              zIndex: 100,
              minWidth: 120,
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 32px)',
              gap: 10,
            }}
          >
            {STATUS_OPTIONS.map(opt => (
              <div
                key={opt.value}
                title={`${opt.label} - ${opt.desc}`}
                onClick={() => { onChange(opt.value); setOpen(false); }}
                style={{
                  background: opt.color,
                  borderRadius: '50%',
                  width: 24,
                  height: 24,
                  border: value === opt.value ? '2.5px solid #222' : '1.5px solid #bbb',
                  cursor: 'pointer',
                  boxShadow: value === opt.value ? '0 0 0 2px #e0e0e0' : undefined,
                  transition: 'border 0.15s',
                }}
              />
            ))}
          </div>
        )}
      </div>
    );
  }

  // Popup-Komponente für E-Mail-Versand
  function EmailPopup({
    open,
    status,
    onClose,
    onSend,
    defaultReason = ''
  }: {
    open: boolean;
    status: string;
    onClose: () => void;
    onSend: (customText: string) => void;
    defaultReason?: string;
  }) {
    const [customText, setCustomText] = useState(defaultReason);
    const template = EMAIL_TEMPLATES[status] || { subject: '', body: '' };

    useEffect(() => {
      setCustomText(defaultReason);
    }, [open, defaultReason]);

    if (!open) return null;
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
        <div className="bg-white rounded-xl shadow-xl p-6 min-w-[340px] max-w-[95vw]">
          <h2 className="text-xl font-bold mb-2">E-Mail</h2>
          <div className="mb-2">
            <div className="font-semibold">Subject:</div>
            <div className="mb-2 border rounded px-2 py-1 bg-gray-50">{template.subject}</div>
          </div>
          <div className="mb-2">
            <div className="font-semibold">Vorlage:</div>
            <div className="mb-2 border rounded px-2 py-1 bg-gray-50 whitespace-pre-line" style={{overflowX:'auto',maxHeight:180}}>
              <div dangerouslySetInnerHTML={{__html: template.html(customText, emailPopup.shipmentId || undefined)}} />
            </div>
          </div>
          <div className="mb-2">
            <div className="font-semibold">Note (optional):</div>
            <textarea
              className="border rounded px-2 py-1 w-full min-h-[60px]"
              value={customText}
              onChange={e => setCustomText(e.target.value)}
              placeholder="Here you can type in a custom message that will be included in the email."
            />
          </div>
          <div className="flex gap-2 justify-end mt-4">
            <button className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300" onClick={onClose}>Abbrechen</button>
            <button className="px-4 py-2 rounded bg-black text-white hover:bg-gray-800" onClick={() => onSend(customText)}>E-Mail senden</button>
          </div>
        </div>
      </div>
    );
  }

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
          <table className="min-w-full" style={{ borderCollapse: 'separate', borderSpacing: 0 }}>
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
                  <td className={`border px-4 py-2 text-center${idx === sortedShipments.length - 1 ? '' : ''}`}> 
                    <button
                      onClick={loggedIn && username === "alket.rrushi" ? () => handleDelete(s.id) : undefined}
                      title="Löschen"
                      className={`flex items-center justify-center w-8 h-8 rounded-full ${loggedIn && username === "alket.rrushi" ? 'bg-[#E5E5E5] text-black cursor-pointer transition-all duration-[1250ms] hover:bg-black hover:text-[#E5F5E5]' : 'bg-[#E5E5E5] text-gray-400 opacity-50 cursor-not-allowed'}`}
                      disabled={!(loggedIn && username === "alket.rrushi")}
                    >
                      <FaTrash />
                    </button>
                  </td>
                  <td className={`border px-4 py-2 text-center${idx === sortedShipments.length - 1 ? '' : ''}`}> 
                    <div className="flex items-center gap-2 justify-center">
                      <div
                        style={{
                          background: STATUS_OPTIONS.find(opt => (localStatuses[s.id] ?? s.status ?? 'PNEDING') === opt.value)?.color || '#eee',
                          borderRadius: '50%',
                          width: 20,
                          height: 20,
                          display: 'inline-block',
                          cursor: 'pointer',
                          position: 'relative',
                          border: '1.5px solid #bbb',
                          animation: 'status-blink 1.2s infinite alternate',
                          overflow: 'hidden',
                          boxShadow: 'none',
                        }}
                        className="status-circle"
                        title={
                          `${STATUS_OPTIONS.find(opt => (localStatuses[s.id] ?? s.status ?? 'PNEDING') === opt.value)?.label || (localStatuses[s.id] ?? s.status ?? 'PNEDING') || 'Unbekannt'} - ${STATUS_OPTIONS.find(opt => (localStatuses[s.id] ?? s.status ?? 'PNEDING') === opt.value)?.desc || ''}`
                        }
                      />
                      <StatusDropdown
                        value={localStatuses[s.id] ?? s.status ?? 'Pending'}
                        onChange={async v => {
                          setLocalStatuses(prev => ({ ...prev, [s.id]: v }));
                          await supabase.from('shipments').update({ status: v }).eq('id', s.id);
                          setEmailPopup({ open: true, status: v, shipmentId: s.id });
                        }}
                      />
                    </div>
                  </td>
                  {Object.entries(s).map(([key, value]) =>
                    key === "id" ? (
                      <td key={key} className={`border px-4 py-2${idx === sortedShipments.length - 1 ? '' : ''}`}>{value?.toString()}</td>
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
      {/* EmailPopup anzeigen */}
      <EmailPopup
        open={emailPopup.open}
        status={emailPopup.status}
        onClose={() => setEmailPopup({ open: false, status: '', shipmentId: null })}
        onSend={async (customText) => {
          const shipment = shipments.find(s => s.id === emailPopup.shipmentId);
          const consigneeEmail = shipment?.consigneeEmail || shipment?.consignee_email || shipment?.email || '';
          console.log('DEBUG: shipment object:', shipment);
          console.log('DEBUG: extracted consigneeEmail:', consigneeEmail);
          if (!consigneeEmail) {
            alert('No consignee email found for this shipment! Please check the shipment data.');
            return;
          }
          const template = EMAIL_TEMPLATES[emailPopup.status] || { subject: '', html: () => '' };
          await fetch('/api/send-email', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              status: emailPopup.status,
              shipmentId: emailPopup.shipmentId,
              customText,
              to: consigneeEmail,
              subject: template.subject,
              html: template.html(customText, emailPopup.shipmentId || undefined),
            })
          });
          setEmailPopup({ open: false, status: '', shipmentId: null });
        }}
      />
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
        .status-circle {
          position: relative;
          z-index: 1;
          box-shadow: 0 0 12px 2px rgba(255,255,255,0.25), 0 0 16px 4px rgba(0,0,0,0.10) !important;
          border: 2px solid #fff;
          transition: box-shadow 0.3s, border 0.3s;
        }
        .status-circle::after {
          content: '';
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
          height: 100%;
          border-radius: 50%;
          pointer-events: none;
          background: linear-gradient(120deg, rgba(255,255,255,0.75) 10%, rgba(255,255,255,0.18) 60%, transparent 100%);
          box-shadow: 0 0 18px 6px rgba(255,255,255,0.25), 0 0 8px 2px rgba(0,0,0,0.10);
          mix-blend-mode: lighten;
          animation: status-shine 1.4s infinite linear;
          opacity: 0.85;
        }
        .status-circle::before {
          content: '';
          position: absolute;
          left: 50%;
          top: 18%;
          width: 38%;
          height: 22%;
          background: rgba(255,255,255,0.85);
          border-radius: 50%;
          filter: blur(2px);
          transform: translate(-50%, 0) rotate(-18deg);
          opacity: 0.7;
        }
        @keyframes status-blink {
          0% { filter: brightness(1); }
          100% { filter: brightness(1.18); }
        }
        @keyframes status-shine {
          0% { opacity: 0.7; transform: scale(1) rotate(0deg); }
          50% { opacity: 1; transform: scale(1.08) rotate(10deg); }
          100% { opacity: 0.7; transform: scale(1) rotate(0deg); }
        }
        .status-dropdown-btn:focus {
          outline: none !important;
          box-shadow: none !important;
        }
      `}</style>
    </div>
  );
}
