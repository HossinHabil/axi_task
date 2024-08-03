"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";

export const BankCounterContext = createContext({});

export const BankCounterContextProvider = ({ children }) => {
  const [initialCounters, setInitialCounters] = useState([
    { id: 1, processingTime: 0, status: "idle", current: null, processed: [] },
    { id: 2, processingTime: 0, status: "idle", current: null, processed: [] },
    { id: 3, processingTime: 0, status: "idle", current: null, processed: [] },
    { id: 4, processingTime: 0, status: "idle", current: null, processed: [] },
  ]);
  const [initialQueue, setInitialQueue] = useState([]);
  const [processStatus, setProcessStatus] = useState(false);

  const setInitialCountersFunc = (newCounters) => {
    console.log("Hello setInitialCountersFunc");
    setInitialCounters(newCounters);
    setInitialQueue([]);
  };

  const updateCounterStatus = (id, status, current = null) => {
    console.log("Hello updateCounterStatus");
    setInitialCounters((prevCounters) =>
      prevCounters.map((counter) =>
        counter.id === id ? { ...counter, status, current } : counter
      )
    );
  };

  console.log("Hello CONTEXT");

  const getNextItemFromQueue = useCallback(() => {
    console.log("Hello getNextItemFromQueue");
    if (initialQueue.length > 0) {
      const nextItem = initialQueue.shift();
      setInitialQueue([...initialQueue]);
      return nextItem;
    }
    return null;
  }, [initialQueue]);

  const allocateNextClientToCounter = useCallback(
    (counter) => {
      console.log("Hello allocateNextClientToCounter");
      const nextItem = getNextItemFromQueue();
      if (nextItem !== null) {
        console.log("Hello");
        updateCounterStatus(counter.id, "processing", nextItem);
        setTimeout(() => {
          console.log("Hello");
          setInitialCounters((prevCounters) => {
            return prevCounters.map((c) =>
              c.id === counter.id
                ? {
                    ...c,
                    status: "idle",
                    processed: [...c.processed, nextItem],
                    current: null,
                  }
                : c
            );
          });
        }, counter.processingTime * 1000);
      }
    },
    [getNextItemFromQueue]
  );

  useEffect(() => {
    console.log("Hello useEffect");
    if (processStatus) {
      console.log("Hello processStatus");
      initialCounters.forEach((counter) => {
        if (counter.status === "idle") {
          allocateNextClientToCounter(counter);
        }
      });
    }
  }, [initialCounters, processStatus, allocateNextClientToCounter]);

  return (
    <BankCounterContext.Provider
      value={{
        initialCounters,
        setInitialCounters,
        initialQueue,
        setInitialQueue,
        setInitialCountersFunc,
        processStatus,
        setProcessStatus,
        updateCounterStatus,
        getNextItemFromQueue,
        allocateNextClientToCounter,
      }}
    >
      {children}
    </BankCounterContext.Provider>
  );
};

export const useMultiContext = () => useContext(BankCounterContext);
