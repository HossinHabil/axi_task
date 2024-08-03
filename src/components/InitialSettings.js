"use client";

import { useState, useContext } from "react";
import { BankCounterContext } from "@/context/bank_counter_context";

export const InitialSettings = () => {
  const { setInitialCounters, setInitialQueue, setProcessStatus } =
    useContext(BankCounterContext);
  const [settings, setSettings] = useState({
    counter1: 0,
    counter2: 0,
    counter3: 0,
    counter4: 0,
    startNumber: 0,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSettings((prev) => ({
      ...prev,
      [name]: value !== "" ? parseInt(value) : "",
    }));
  };

  const applySettings = () => {
    const newCounters = [
      { id: 1, processingTime: settings.counter1 || 0, status: "idle", current: null, processed: [] },
      { id: 2, processingTime: settings.counter2 || 0, status: "idle", current: null, processed: [] },
      { id: 3, processingTime: settings.counter3 || 0, status: "idle", current: null, processed: [] },
      { id: 4, processingTime: settings.counter4 || 0, status: "idle", current: null, processed: [] },
    ];
    setInitialCounters(newCounters);

    const queue = Array.from({ length: settings.startNumber || 0 }, (_, i) => i + 1);
    setInitialQueue(queue);
    setProcessStatus(true);
  };

  return (
    <div className="flex flex-col gap-4">
      <div>
        <label className="flex flex-col md:flex-row justify-center gap-4">
          Counter 1 Processing Time:
          <input
            type="number"
            name="counter1"
            value={settings.counter1}
            onChange={handleChange}
            className="text-black border pl-2 border-gray-600"
          />
        </label>
      </div>
      <div>
        <label className="flex flex-col md:flex-row justify-center gap-4">
          Counter 2 Processing Time:
          <input
            type="number"
            name="counter2"
            value={settings.counter2}
            onChange={handleChange}
            className="text-black border pl-2 border-gray-600"
          />
        </label>
      </div>
      <div>
        <label className="flex flex-col md:flex-row justify-center gap-4">
          Counter 3 Processing Time:
          <input
            type="number"
            name="counter3"
            value={settings.counter3}
            onChange={handleChange}
            className="text-black border pl-2 border-gray-600"
          />
        </label>
      </div>
      <div>
        <label className="flex flex-col md:flex-row justify-center gap-4">
          Counter 4 Processing Time:
          <input
            type="number"
            name="counter4"
            value={settings.counter4}
            onChange={handleChange}
            className="text-black border pl-2 border-gray-600"
          />
        </label>
      </div>
      <div>
        <label className="flex flex-col md:flex-row justify-center gap-4">
          Start Number:
          <input
            type="number"
            name="startNumber"
            value={settings.startNumber}
            onChange={handleChange}
            className="text-black border pl-2 border-gray-600"
          />
        </label>
      </div>
      <button
        onClick={applySettings}
        className="inline-block w-40 mx-auto my-6 rounded-lg font-medium text-white bg-[#67e9ff] hover:bg-[#62d7eb] dark:bg-teal-700 hover:dark:bg-teal-500 py-2 px-5 transition duration-150 ease-in-out"
      >
        Change
      </button>
    </div>
  );
};
