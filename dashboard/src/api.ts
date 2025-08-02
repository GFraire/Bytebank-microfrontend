import axios from 'axios';
import { DashboardData, Transaction } from './types';

const API_URL = 'http://localhost:3333'

const api = axios.create({
  baseURL: API_URL,
});

export const getDashboardData = async (): Promise<DashboardData> => {
  try {
    const transactions = await getTransactions();
    
    const income = transactions
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0);
    
    const expense = transactions
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);
    
    const balance = income - expense;
    
    return {
      balance,
      income,
      expense,
      transactions: transactions.slice(0, 5) // últimas 5 transações
    };
  } catch (error) {
    console.error('Erro ao buscar dados do dashboard:', error);
    return {
      balance: 0,
      income: 0,
      expense: 0,
      transactions: []
    };
  }
};

export const getTransactions = async (): Promise<Transaction[]> => {
  try {
    const response = await api.get('/transactions');
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar transações:', error);
    return [];
  }
};

export const getCategories = async (): Promise<string[]> => {
  try {
    const transactions = await getTransactions();
    const categories = [...new Set(transactions.map(t => t.category))];
    return categories;
  } catch (error) {
    console.error('Erro ao buscar categorias:', error);
    return [];
  }
};