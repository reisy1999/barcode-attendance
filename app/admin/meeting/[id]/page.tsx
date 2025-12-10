"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

// 会議詳細と出席者一覧の型
type MeetingDetail = {
  id: number;
  name: string;
  date: string;
  place: string;
};

type Attendance = {
  id: number;
  staffId: string;
  checkTime: string;
};

export default function MeetingDetailPage() {
  const router = useRouter();
  const [meeting, setMeeting] = useState<MeetingDetail | null>(null);
  const [attendances, setAttendances] = useState<Attendance[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // TODO: ここで会議詳細と出席者一覧を取得するfetch処理を呼ぶ
    // TODO: 取得が終わったら loading を false にする
  }, []);

  // 会議詳細を取得
  async function fetchMeetingDetail(): Promise<void> {
    // TODO: /api/meeting/[id] 相当のエンドポイントから会議情報を取得して setMeeting
  }

  // 出席者一覧を取得
  async function fetchAttendances(): Promise<void> {
    // TODO: /api/attendance?meetingId=... など仮のAPIを叩いて setAttendances
  }

  // 出席者を手動で追加（例: 打刻漏れ救済）
  async function handleAddAttendance(e: React.FormEvent): Promise<void> {
    e.preventDefault();
    // TODO: フォーム入力値を取得して /api/attendance にPOST
    // TODO: 成功したら再度 fetchAttendances で最新化
  }

  // トップに戻る
  function handleBack(): void {
    router.push("/admin");
  }

  return (
    <div>
      <h1>会議詳細</h1>
      <button type="button" onClick={handleBack}>
        管理トップに戻る
      </button>

      {loading && <p>Loading...</p>}

      {!loading && meeting && (
        <div>
          <p>会議名: {meeting.name}</p>
          <p>日付: {meeting.date}</p>
          <p>場所: {meeting.place}</p>
        </div>
      )}

      {/* 出席者一覧 */}
      <div>
        <h2>出席者一覧</h2>
        {/* TODO: attendances を map で表示 */}
        {/* TODO: 出席者がゼロの場合の表示 */}
      </div>

      {/* 出席者追加フォーム（練習用） */}
      <div>
        <h2>出席者を追加</h2>
        <form onSubmit={handleAddAttendance}>
          {/* TODO: staffId や名前などのinputを用意 */}
          <button type="submit">追加</button>
        </form>
      </div>
    </div>
  );
}
