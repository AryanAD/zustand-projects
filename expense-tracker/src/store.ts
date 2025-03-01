import { create } from "zustand";

interface Expense {
  id: number;
  amount: number;
  description: string;
}

interface ExpenseStore {
  expenses: Expense[];
  addExpense: (expense: Expense) => void;
  removeExpense: (id: number) => void;
}

export const useStore = create<ExpenseStore>((set) => ({
  expenses: [],
  addExpense: (expense) =>
    set((state) => ({
      expenses: [...state.expenses, expense],
    })),

  removeExpense: (id) =>
    set((state) => ({
      expenses: state.expenses.filter((expense) => expense.id !== id),
    })),
}));
