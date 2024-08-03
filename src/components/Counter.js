import React from 'react';

const Counter = ({ id, status, current, processed }) => {
  return (
    <tr className="text-center border-b border-gray-400 dark:border-neutral-500">
      <td className="whitespace-nowrap text-black dark:text-white border-r px-6 py-4 font-medium border-gray-400 dark:border-neutral-500">{`Counter ${id}`}</td>
      <td className="whitespace-nowrap text-black dark:text-white border-r px-6 py-4 font-medium border-gray-400 dark:border-neutral-500">
        {status === "idle" ? "idle" : `${current}`}
      </td>
      <td className="whitespace-nowrap text-black dark:text-white border-r px-6 py-4 font-medium border-gray-400 dark:border-neutral-500">
        {processed.join(", ")}
      </td>
    </tr>
  );
};

const MemoizedCounter = React.memo(Counter);
MemoizedCounter.displayName = 'Counter';

export default MemoizedCounter;
