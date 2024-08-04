"use client"

import React from 'react';

export const Counter = ({ initialCounters }) => {
  return (
    <>
      {initialCounters.map((counter) => (
        <tr
          className="text-center border-b border-gray-400 dark:border-neutral-500"
          key={counter.id}
        >
          <td className="whitespace-nowrap text-black dark:text-white border-r px-6 py-4 font-medium border-gray-400 dark:border-neutral-500">{`Counter ${counter.id}`}</td>
          <td className="whitespace-nowrap text-black dark:text-white border-r px-6 py-4 font-medium border-gray-400 dark:border-neutral-500">
            {counter.status === "idle" ? "idle" : `${counter.current}`}
          </td>
          <td className="whitespace-nowrap text-black dark:text-white border-r px-6 py-4 font-medium border-gray-400 dark:border-neutral-500">
            {counter.processed.join(", ")}
          </td>
        </tr>
      ))}
    </>
  );
};
const MemoizedCounter = React.memo(Counter);
MemoizedCounter.displayName = 'Counter';

export default MemoizedCounter;
