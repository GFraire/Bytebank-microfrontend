import axios from "axios";
import { DashboardData, Transaction } from "./types/types";
import { AuthUser } from "./App";

const API_URL = process.env.REACT_APP_API_URL

const api = axios.create({
  baseURL: API_URL,
});

export const getDashboardData = async (
  user: AuthUser | null
): Promise<DashboardData> => {
  try {
    const transactions = await getTransactions(user);

    const income = transactions
      .filter((t) => t.type === "income")
      .reduce((sum, t) => sum + t.amount, 0);

    const expense = transactions
      .filter((t) => t.type === "expense")
      .reduce((sum, t) => sum + t.amount, 0);

    const balance = income - expense;

    return {
      balance,
      income,
      expense,
      transactions: transactions.slice(0, 5), // últimas 5 transações
    };
  } catch (error) {
    console.error("Erro ao buscar dados do dashboard:", error);
    return {
      balance: 0,
      income: 0,
      expense: 0,
      transactions: [],
    };
  }
};

export const getTransactions = async (
  user: AuthUser | null
): Promise<Transaction[]> => {
  try {
    const response = await api.get(`transactions?userId=${user?.uid}`);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar transações:", error);
    return [];
  }
};

export const getCategories = async (
  user: AuthUser | null
): Promise<string[]> => {
  try {
    const transactions = await getTransactions(user);
    const categories = [...new Set(transactions.map((t) => t.category))];
    return categories;
  } catch (error) {
    console.error("Erro ao buscar categorias:", error);
    return [];
  }
};
