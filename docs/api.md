### 画面設計

```
トップ画面 (/)
├── 受付モード
│   └── 会議選択 → スキャン待機（全画面）
│
└── 管理モード
    ├── 会議管理（作成・削除）
    ├── 出席者管理（一覧・追加・削除）
    └── CSVインポート
```

---

### API設計

**Staff**
| メソッド | エンドポイント | 用途 |
|----------|----------------|------|
| GET | /api/staff/:staffId | 職員情報取得 |
| POST | /api/staff/import | CSV一括登録 |

**Meeting**
| メソッド | エンドポイント | 用途 |
|----------|----------------|------|
| GET | /api/meeting | 会議一覧取得 |
| POST | /api/meeting | 会議作成 |
| DELETE | /api/meeting/:id | 会議削除 |

**Attendance**
| メソッド | エンドポイント | 用途 |
|----------|----------------|------|
| GET | /api/attendance?meetingId=1 | 出席者一覧取得 |
| POST | /api/attendance | 出席登録 |
| DELETE | /api/attendance/:id | 出席削除 |

---

## シミュレーション

### 初期設定

1. CSVで職員登録 → `POST /api/staff/import` ✅

### 管理者：会議準備

2. 「今日の八時会」を作成 → `POST /api/meeting` ✅
3. 会議一覧を確認 → `GET /api/meeting` ✅

### 受付

4. 会議一覧から選択 → `GET /api/meeting` ✅
5. バーコードスキャン → `GET /api/staff/:staffId` ✅
6. 出席登録 → `POST /api/attendance` ✅

### 管理者：確認・修正

7. 出席者一覧を見る → `GET /api/attendance?meetingId=1` ✅
8. 手動で追加 → `POST /api/attendance` ✅
9. 間違いを削除 → `DELETE /api/attendance/:id` ✅
10. 会議を削除 → `DELETE /api/meeting/:id` ✅

---