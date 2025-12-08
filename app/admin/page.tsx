"use client";

import { useRouter } from "next/navigation";
import React, { useState, useEffect, useRef } from "react";

// ============================================
// 型定義
// ============================================

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

// ============================================
// コンポーネント
// ============================================

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

  // ============================================
  // useEffect
  // ============================================

  // 会議一覧を取得
  useEffect(() => {
    fetchMeetings();
  }, []);

  // ============================================
  // 関数定義
  // ============================================

  // 会議一覧取得
  async function fetchMeetings(): Promise<void> {
    // TODO: GET /api/meeting を呼び出し、meetings を更新
  }

  // 会議作成
  async function handleCreateMeeting(e: React.FormEvent): Promise<void> {
    e.preventDefault();
    // TODO: POST /api/meeting を呼び出し、成功したら fetchMeetings() + フォームリセット
  }

  // 会議削除
  async function handleDeleteMeeting(id: number): Promise<void> {
    // TODO: DELETE /api/meeting/:id を呼び出し、成功したら fetchMeetings()
  }

  // CSVインポート
  async function handleCsvImport(e: React.FormEvent): Promise<void> {
    e.preventDefault();
    // TODO: POST /api/staff/import を呼び出し、結果を importResult に設定
  }

  // フォーム入力変更
  function handleFormChange(e: React.ChangeEvent<HTMLInputElement>): void {
    // TODO: formData を更新
  }

  // ファイル選択変更
  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>): void {
    // TODO: csvFile を更新
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
        {/* TODO: h2「会議を作成」 */}
        <form onSubmit={handleCreateMeeting}>
          {/* TODO: name入力 */}
          {/* TODO: date入力 */}
          {/* TODO: place入力 */}
          {/* TODO: 作成ボタン */}
        </form>
      </div>

      {/* 会議一覧 */}
      <div>
        {/* TODO: h2「会議一覧」 */}
        {/* TODO: loading中の表示 */}
        {/* TODO: meetings.map で各会議を表示 */}
        {/*   - 会議名、日付、場所 */}
        {/*   - 「出席者を見る」リンク → /admin/meeting/[id] */}
        {/*   - 削除ボタン */}
      </div>

      {/* CSVインポート */}
      <div>
        {/* TODO: h2「職員CSVインポート」 */}
        <form onSubmit={handleCsvImport}>
          {/* TODO: ファイル選択 input[type="file"] */}
          {/* TODO: インポートボタン */}
        </form>
        {/* TODO: importResult の表示 */}
      </div>
    </div>
  );
}
