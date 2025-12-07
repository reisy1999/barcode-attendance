"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";

type Meeting = {
  id: number;
  name: string;
  date: string;
  place: string;
};

type Staff = {
  staffId: string;
  name: string;
  department: string;
};

type ScanResult = {
  type: "success" | "error";
  message: string;
  staff?: Staff;
};

export default function ReceptionPage() {
  const router = useRouter();
  const [meetings, setMeetings] = useState<Meeting[]>([]);
  const [selectedMeeting, setSelectedMeeting] = useState<Meeting | null>(null);
  const [scanResult, setScanResult] = useState<ScanResult | null>(null);
  const [staffId, setStaffId] = useState("");
  const [loading, setLoading] = useState(true);
  const inputRef = useRef<HTMLInputElement>(null);

  // 会議一覧を取得
  useEffect(() => {
    async function fetchMeetings() {
      try {
        const res = await fetch("/api/meeting");
        const data = await res.json();
        setMeetings(data);
      } catch {
        console.error("会議一覧の取得に失敗しました");
      } finally {
        setLoading(false);
      }
    }
    fetchMeetings();
  }, []);
}