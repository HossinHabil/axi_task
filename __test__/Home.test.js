import { render, screen, fireEvent } from "@testing-library/react";

import Home from "@/app/page";
import { BankCounterContextProvider } from "@/context/bank_counter_context";

describe("Home Page", () => {
  it("renders the Bank Counter title", () => {
    render(
      <BankCounterContextProvider>
        <Home />
      </BankCounterContextProvider>
    );
    const titleElement = screen.getByText(/Bank Counter/i);
    expect(titleElement).toBeInTheDocument();
  });

    it("renders the Queue component", () => {
      render(
        <BankCounterContextProvider>
          <Home />
        </BankCounterContextProvider>
      );
      const queueElement = screen.getByText(/Number of people waiting:/i);
      expect(queueElement).toBeInTheDocument();
    });

    it("renders the InitialSettings component", () => {
      render(
        <BankCounterContextProvider>
          <Home />
        </BankCounterContextProvider>
      );
      const changeButton = screen.getByText(/Change/i);
      expect(changeButton).toBeInTheDocument();
    });

    it("allows setting initial settings and updating the queue", () => {
      render(
        <BankCounterContextProvider>
          <Home />
        </BankCounterContextProvider>
      );

      fireEvent.change(screen.getByLabelText(/Counter 1 Processing Time:/i), {
        target: { value: "5" },
      });
      fireEvent.change(screen.getByLabelText(/Counter 2 Processing Time:/i), {
        target: { value: "4" },
      });
      fireEvent.change(screen.getByLabelText(/Counter 3 Processing Time:/i), {
        target: { value: "3" },
      });
      fireEvent.change(screen.getByLabelText(/Counter 4 Processing Time:/i), {
        target: { value: "2" },
      });
      fireEvent.change(screen.getByLabelText(/Start Number:/i), {
        target: { value: "10" },
      });

      fireEvent.click(screen.getByText(/Change/i));

      expect(screen.getByText(/Number of people waiting: 6/i)).toBeInTheDocument();

      fireEvent.click(screen.getByText(/Next 11/i));
      expect(screen.getByText(/Number of people waiting: 7/i)).toBeInTheDocument();
    });
});
