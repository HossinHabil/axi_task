import { render, screen, fireEvent, within } from "@testing-library/react";

import { InitialSettings } from "@/components/InitialSettings";
import { BankCounterContextProvider } from "@/context/bank_counter_context";
import { CounterTable } from "@/components/CounterTable";

describe("InitialSettings Component", () => {
  it("renders the settings inputs and change button", () => {
    render(
      <BankCounterContextProvider>
        <InitialSettings />
      </BankCounterContextProvider>
    );
    expect(
      screen.getByLabelText(/Counter 1 Processing Time:/i)
    ).toBeInTheDocument();
    expect(
      screen.getByLabelText(/Counter 2 Processing Time:/i)
    ).toBeInTheDocument();
    expect(
      screen.getByLabelText(/Counter 3 Processing Time:/i)
    ).toBeInTheDocument();
    expect(
      screen.getByLabelText(/Counter 4 Processing Time:/i)
    ).toBeInTheDocument();
    expect(screen.getByLabelText(/Start Number:/i)).toBeInTheDocument();
    expect(screen.getByText(/Change/i)).toBeInTheDocument();
  });

  it("allows setting initial settings and applying them", async () => {
    render(
      <BankCounterContextProvider>
        <InitialSettings />
        <CounterTable />
      </BankCounterContextProvider>
    );

    fireEvent.change(screen.getByLabelText(/Counter 1 Processing Time:/i), {
      target: { value: 5 },
    });
    fireEvent.change(screen.getByLabelText(/Counter 2 Processing Time:/i), {
      target: { value: 4 },
    });
    fireEvent.change(screen.getByLabelText(/Counter 3 Processing Time:/i), {
      target: { value: 3 },
    });
    fireEvent.change(screen.getByLabelText(/Counter 4 Processing Time:/i), {
      target: { value: 2 },
    });
    fireEvent.change(screen.getByLabelText(/Start Number:/i), {
      target: { value: 10 },
    });

    fireEvent.click(screen.getByText(/Change/i));

    const rows = await screen.findAllByRole("row");

    expect(rows.length).toBe(5);

    const [header, ...counterRows] = rows;

    expect(header).toHaveTextContent(/Counter/i);
    expect(header).toHaveTextContent(/Processing/i);
    expect(header).toHaveTextContent(/Processed/i);

    counterRows.forEach((row, index) => {
      const cells = within(row).getAllByRole("cell");

      expect(cells[0]).toHaveTextContent(`Counter ${index + 1}`);
      expect(cells[1]).toHaveTextContent((index + 1).toString());
      expect(cells[2]).toHaveTextContent("");
    });
    expect(
      screen.getByText(/Number of people waiting: 6/i)
    ).toBeInTheDocument();
    expect(screen.getByText(/Next 11/i)).toBeInTheDocument();
  });
});
