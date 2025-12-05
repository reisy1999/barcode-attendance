# 出欠管理システム 設計ドキュメント

## 概要

会議の出欠を一次元バーコードリーダーでスキャン管理するシステム。
8時会（毎日）や忘年会（一部・二部）など、複数の会議に対応。

## 環境

- 閉域ネットワーク内で運用
- サーバー: Ubuntu（Docker使用）
- 専用端末1台にバーコードリーダーを接続
- 単一端末からのアクセスのみ想定

## 技術スタック

- フロントエンド / バックエンド: Next.js (App Router)
- 言語: TypeScript
- ORM: Prisma
- DB: SQLite

---

## テーブル設計

### Staff（職員）

| カラム | 型 | 説明 |
|--------|------|------|
| staffId | String | PK, バーコードの番号 |
| name | String | 氏名 |
| department | String | 部署名 |

### Meeting（会議）

| カラム | 型 | 説明 |
|--------|------|------|
| id | Int | PK, 自動採番 |
| name | String | "八時会" / "忘年会一部" / "忘年会二部" など |
| date | String | "2024-12-04" |
| place | String | "講堂" |

### Attendance（出席）

| カラム | 型 | 説明 |
|--------|------|------|
| id | Int | PK, 自動採番 |
| staffId | String | FK → Staff.staffId |
| meetingId | Int | FK → Meeting.id |
| checkTime | DateTime | スキャン日時（サーバー側で自動付与） |

重複防止: `@@unique([staffId, meetingId])`
→ 同じ人が同じ会議に2回登録されるのを防ぐ

---

## Prisma スキーマ

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "sqlite"
  url      = env("DATABASE_URL")
}

model Staff {
  staffId     String       @id
  name        String
  department  String
  attendances Attendance[]
}

model Meeting {
  id          Int          @id @default(autoincrement())
  name        String
  date        String
  place       String
  attendances Attendance[]
}

model Attendance {
  id        Int      @id @default(autoincrement())
  staffId   String
  meetingId Int
  checkTime DateTime @default(now())
  staff     Staff    @relation(fields: [staffId], references: [staffId])
  meeting   Meeting  @relation(fields: [meetingId], references: [id])

  @@unique([staffId, meetingId])
}
```

---

## API設計

### Staff（職員）

| メソッド | エンドポイント | 用途 | リクエスト | レスポンス |
|----------|----------------|------|------------|------------|
| GET | /api/staff/:staffId | 職員情報取得 | - | `{ staffId, name, department }` |
| POST | /api/staff/import | CSV一括登録 | CSVファイル | `{ count: 登録件数 }` |

CSVフォーマット:
```
staffId,name,department
001,田中太郎,医局
002,鈴木花子,総務
```

### Meeting（会議）

| メソッド | エンドポイント | 用途 | リクエスト | レスポンス |
|----------|----------------|------|------------|------------|
| GET | /api/meeting | 会議一覧取得 | - | `[{ id, name, date, place }, ...]` |
| POST | /api/meeting | 会議作成 | `{ name, date, place }` | `{ id, name, date, place }` |
| DELETE | /api/meeting/:id | 会議削除 | - | `{ success: true }` |

### Attendance（出席）

| メソッド | エンドポイント | 用途 | リクエスト | レスポンス |
|----------|----------------|------|------------|------------|
| GET | /api/attendance?meetingId=1 | 出席者一覧取得 | - | `[{ id, staffId, name, department, checkTime }, ...]` |
| POST | /api/attendance | 出席登録 | `{ staffId, meetingId }` | `{ id, staffId, meetingId, checkTime }` |
| DELETE | /api/attendance/:id | 出席削除 | - | `{ success: true }` |

### エラーレスポンス

| 状況 | ステータス | レスポンス |
|------|------------|------------|
| 職員が見つからない | 404 | `{ error: "Staff not found" }` |
| 会議が見つからない | 404 | `{ error: "Meeting not found" }` |
| 既に登録済み | 409 | `{ error: "Already registered" }` |

---

## 画面設計

### 画面遷移

```
トップ画面 (/)
├── 受付モード (/reception)
│   └── 会議選択 → 全画面スキャン待機
│
└── 管理モード (/admin)
    ├── 会議管理（作成・削除）
    ├── 出席者管理（一覧・追加・削除）
    └── CSVインポート
```

### トップ画面 (/)
- 「受付モード」ボタン
- 「管理モード」ボタン
- ログイン機能なし（閉域ネットワーク専用端末のため）

### 受付モード (/reception)
1. 会議一覧から選択（GET /api/meeting）
2. 全画面表示でスキャン待機（「スキャンしてください」）
3. バーコードスキャン → staffIdを取得
4. APIで職員検索（GET /api/staff/:staffId）
   - 存在する → 名前・部署を表示、出席登録（POST /api/attendance）
     - 登録成功 → 「田中太郎さん（医局）」表示
     - 登録済み → 「登録済みです」表示
   - 存在しない → 「未登録です」表示、記録しない
5. 1秒後にスキャン待機に戻る
6. 全画面解除（ESCキー）で終了、トップに戻る

### 管理モード (/admin)
1. 会議管理
   - 会議一覧表示（GET /api/meeting）
   - 新規作成（POST /api/meeting）
   - 削除（DELETE /api/meeting/:id）
2. 会議を選択 → 出席者管理
   - 出席者一覧表示（GET /api/attendance?meetingId=X）
   - 手動追加（staffId入力 → POST /api/attendance）
   - 削除（DELETE /api/attendance/:id）
3. CSVインポート
   - ファイルアップロード → POST /api/staff/import

---

## バーコードリーダーについて

- 一次元バーコードリーダーはキーボードと同じ扱い
- スキャンすると文字列がキーボード入力として送られる
- input要素にフォーカスを当てておけば自動入力される

---

## 実装順序

1. プロジェクト作成（Next.js）
2. Prisma導入 + スキーマ定義 + マイグレーション
3. API - GET /api/staff/:staffId
4. API - POST /api/staff/import
5. API - GET /api/meeting
6. API - POST /api/meeting
7. API - DELETE /api/meeting/:id
8. API - GET /api/attendance
9. API - POST /api/attendance
10. API - DELETE /api/attendance/:id
11. 画面 - トップページ
12. 画面 - 受付モード
13. 画面 - 管理モード