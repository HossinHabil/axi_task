import Queue from "../components/Queue";
import {InitialSettings} from "../components/InitialSettings";
import QueueTest from "@/components/QueueTest";

export default function Home() {
  console.log('Hello Home')
  return (
    <main className="flex min-h-screen flex-col items-center justify-between px-4 py-12 lg:p-24">
      <div className="max-w-[600px] w-full">
        <h1 className="text-center font-semibold text-2xl mb-6">
          Bank Counter
        </h1>
        {/* <Queue initialCounters={counters} initialQueue={initialQueue} /> */}
        <QueueTest />
        <InitialSettings />
      </div>
    </main>
  );
}
