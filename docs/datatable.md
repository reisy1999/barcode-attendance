## テーブル設計


### Staff（職員）

| カラム | 型 | 説明 |
|--------|------|------|
| staffId | String | PK |
| name | String | 氏名 |
| department | String | 部署名 |

### Meeting（会議）

| カラム | 型 | 説明 |
|--------|------|------|
| id | Int | PK, 自動採番 |
| name | String | 会議名 |
| date | String | "2024-12-04" |
| place | String | "講堂" |

### Attendance（出席）

| カラム | 型 | 説明 |
|--------|------|------|
| id | Int | PK, 自動採番 |
| staffId | String | FK → Staff |
| meetingId | Int | FK → Meeting |
| checkTime | DateTime | 自動 |

重複防止: `@@unique([staffId, meetingId])`
