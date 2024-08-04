import { CounterTable } from "@/components/CounterTable";
import { InitialSettings } from "@/components/InitialSettings";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between px-4 py-12 lg:p-24">
      <div className="max-w-[600px] w-full">
        <h1 className="text-center font-semibold text-2xl mb-6">
          Bank Counter
        </h1>
        <CounterTable />
        <InitialSettings />
      </div>
    </main>
  );
}
