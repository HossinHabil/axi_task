import React from "react";
import { render, screen, within } from "@testing-library/react";

import Counter from "@/components/Counter";

describe("Counter Component", () => {
  const mockInitialCounters = [
    { id: 1, status: "idle", current: null, processed: [] },
    { id: 2, status: "processing", current: 2, processed: [1] },
    { id: 3, status: "idle", current: null, processed: [2, 3] },
    { id: 4, status: "processing", current: 4, processed: [] },
  ];

  it("renders the correct number of counters", () => {
    render(
      <table>
        <tbody>
          <Counter initialCounters={mockInitialCounters} />
        </tbody>
      </table>
    );
    const rows = screen.getAllByRole("row");
    expect(rows).toHaveLength(mockInitialCounters.length);
  });

  it("renders each counter with correct data", () => {
    render(
      <table>
        <tbody>
          <Counter initialCounters={mockInitialCounters} />
        </tbody>
      </table>
    );
    mockInitialCounters.forEach((counter, index) => {
      const row = screen.getAllByRole("row")[index];
      const cells = within(row).getAllByRole("cell");

      expect(cells[0]).toHaveTextContent(`Counter ${counter.id}`);
      expect(cells[1]).toHaveTextContent(
        counter.status === "idle" ? "idle" : `${counter.current}`
      );
      expect(cells[2]).toHaveTextContent(counter.processed.join(", "));
    });
  });
});
