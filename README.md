# uketuke - 出欠管理システム

会議の出欠をバーコードリーダーでスキャン管理するシステム。

## 技術スタック

- Next.js 16 (App Router)
- TypeScript
- Prisma + SQLite
- Tailwind CSS

## セットアップ

```bash
# 依存関係のインストール
npm install

# データベースのセットアップ
npx prisma migrate dev

# 職員データのシード（任意）
npx prisma db seed

# 開発サーバー起動
npm run dev
```

http://localhost:3000 でアクセス。

## 使い方

### 受付モード (`/reception`)
1. 会議を選択
2. バーコードをスキャン → 自動で出席登録
3. ESCキーで終了

### 管理モード (`/admin`)
- 会議の作成・削除
- 出席者の確認・手動追加・削除
- 職員CSVインポート

## 詳細設計

API設計・DB設計の詳細は [DESIGN.md](./DESIGN.md) を参照。
