"use client";

import { useContext } from "react";

import Counter from "@/components/Counter";
import { BankCounterContext } from "@/context/bank_counter_context";

export const CounterTable = () => {
  const {
    initialCounters,
    initialQueue,
    setInitialQueue,
    setArrayLength,
    arrayLength,
  } = useContext(BankCounterContext);

  const addPersonToQueue = () => {
    setInitialQueue((prevQueue) => [...prevQueue, arrayLength + 1]);
    setArrayLength((prevLength) => prevLength + 1);
  };
  return (
    <div className="text-center border-b pb-8 mb-8">
      <table className="min-w-full border text-center text-sm font-light border-gray-400 dark:border-neutral-500">
        <thead className="border-b font-medium border-gray-400 dark:border-neutral-500">
          <tr>
            <th className="border-r px-6 py-4 border-gray-400 dark:border-neutral-500">
              Counter
            </th>
            <th className="border-r px-6 py-4 border-gray-400 dark:border-neutral-500">
              Processing
            </th>
            <th className="border-r px-6 py-4 border-gray-400 dark:border-neutral-500">
              Processed
            </th>
          </tr>
        </thead>
        <tbody>
          <Counter initialCounters={initialCounters} />
        </tbody>
      </table>
      <div className="my-6">
        Number of people waiting: {initialQueue.length}
      </div>
      <button
        onClick={addPersonToQueue}
        className="inline-block w-40 mx-auto my-6 rounded-lg font-medium text-white bg-[#67e9ff] hover:bg-[#62d7eb] dark:bg-teal-700 hover:dark:bg-teal-500 py-2 px-5 transition duration-150 ease-in-out"
      >
        Next {arrayLength + 1}
      </button>
    </div>
  );
};
