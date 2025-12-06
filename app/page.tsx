import { Button } from "@/components/Button";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100">
      <main className="flex flex-col items-center gap-8">
        <h1 className="text-3xl font-bold text-gray-800">受付システム</h1>

        <div className="flex flex-col gap-4">
          <Button href="/reception" variant="primary">
            受付モード
          </Button>

          <Button href="/admin" variant="secondary">
            管理モード
          </Button>
        </div>
      </main>
    </div>
  );
}
