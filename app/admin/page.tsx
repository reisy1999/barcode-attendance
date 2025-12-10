"use client";

import { useRouter } from "next/navigation";
import React, { useState, useEffect, useRef } from "react";

type Meeting = {
  id: number;
  name: string;
  date: string;
  place: string;
};

type MeetingFormData = {
  name: string;
  date: string;
  place: string;
};


export default function AdminPage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  // ============================================
  // State
  // ============================================

  // 会議一覧
  const [meetings, setMeetings] = useState<Meeting[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // 会議作成フォーム
  const [formData, setFormData] = useState<MeetingFormData>({
    name: "",
    date: "",
    place: "",
  });

  // CSVインポート
  const [csvFile, setCsvFile] = useState<File | null>(null);
  const [importResult, setImportResult] = useState<string | null>(null);

  // 会議一覧を取得
  useEffect(() => {
    fetchMeetings();
  }, []);

  // ============================================
  // 関数定義
  // ============================================

  // 会議一覧取得
  async function fetchMeetings(): Promise<void> {
    try {
      const res = await fetch("/api/meeting");
      const data = await res.json();
      setMeetings(data);
    } catch{
      console.error("failed to get meeting");
    }
  }

  // 会議作成
  async function handleCreateMeeting(e: React.FormEvent): Promise<void> {
    e.preventDefault();
    try {
      const res = await fetch("/api/meeting", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!res.ok) {
        throw new Error("failed to create meeting");
      }
      await fetchMeetings();
      setFormData({ name: "", date: "", place: "" });
    } catch (err) {
      console.error(err);
    }
  }

  // 会議削除
  async function handleDeleteMeeting(id: number): Promise<void> {
    try {
      const res = await fetch(`/api/meeting/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        throw new Error("failed to delete meeting");
      }
      await fetchMeetings();
    } catch (err) {
      console.error(err);
    }
  }

  // CSVインポート
  async function handleCsvImport(e: React.FormEvent): Promise<void> {
    e.preventDefault();
    if (!csvFile) {
      setImportResult("CSVファイルを選択してください");
      return;
    }

    const body = new FormData();
    body.append("file", csvFile);

    try {
      const res = await fetch("/api/staff/import", {
        method: "POST",
        body,
      });
      if (!res.ok) {
        throw new Error("failed to import staff");
      }
      const result = await res.json();
      setImportResult(`職員データを${result.count}件インポートしました`);
      setCsvFile(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (err) {
      console.error(err);
      setImportResult("CSVのインポートに失敗しました");
    }
  }

  // フォーム入力変更
  function handleFormChange(e: React.ChangeEvent<HTMLInputElement>): void {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  // ファイル選択変更
  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>): void {
  }

  // トップに戻る
  function handleBackToTop(): void {
    router.push("/");
  }

  // ============================================
  // JSX
  // ============================================

  return (
    <div>
      {/* ヘッダー */}
      <div>
        {/* TODO: タイトル「管理モード」 */}
        {/* TODO: トップに戻るボタン */}
      </div>

      {/* 会議作成フォーム */}
      <div>
        <h2>会議作成</h2>
        <form onSubmit={handleCreateMeeting}>
          <div>
            <label htmlFor="meeting-name">会議名</label>
            <input
              id="meeting-name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleFormChange}
              required
            />
          </div>
          <div>
            <label htmlFor="meeting-date">日付</label>
            <input
              id="meeting-date"
              name="date"
              type="date"
              value={formData.date}
              onChange={handleFormChange}
              required
            />
          </div>
          <div>
            <label htmlFor="meeting-place">場所</label>
            <input
              id="meeting-place"
              name="place"
              type="text"
              value={formData.place}
              onChange={handleFormChange}
              required
            />
          </div>
          <button type="submit">作成</button>
        </form>
      </div>

      {/* 会議一覧 */}
      <div>
        <h2>会議一覧</h2>
        {loading && <p>Loading...</p>}
        {!loading && meetings.length === 0 && <p>会議が未登録です</p>}
        {!loading && meetings.length > 0 && (
          <ul>
            {meetings.map((meeting) => (
              <li key={meeting.id}>
                <div>
                  <p>会議名: {meeting.name}</p>
                  <p>日付: {meeting.date}</p>
                  <p>場所: {meeting.place}</p>
                </div>
                <div>
                  <button
                    type="button"
                    onClick={() => router.push(`/admin/meeting/${meeting.id}`)}
                  >
                    出席者を見る
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDeleteMeeting(meeting.id)}
                  >
                    削除
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* CSVインポート */}
      <div>
        <h2>職員CSVインポート</h2>
        <form onSubmit={handleCsvImport}>
          <input
            type="file"
            accept=".csv"
            onChange={handleFileChange}
            ref={fileInputRef}
          />
          <button type="submit">インポート</button>
        </form>
        {importResult && <p>{importResult}</p>}
      </div>
    </div>
  );
}
