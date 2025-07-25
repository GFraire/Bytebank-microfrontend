import axios from 'axios';
import { DashboardData, Transaction } from './types';

// URL base da API - em produção usará a URL do Vercel
const API_URL = process.env.NODE_ENV === 'production' 
  ? 'https://bytebank-api-grupo-9-fiapinhos-projects.vercel.app'
  : 'http://localhost:3333';

const api = axios.create({
  baseURL: API_URL,
});

export const getDashboardData = async (): Promise<DashboardData> => {
  try {
    const response = await api.get('/dashboard');
    return response.data;
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
    const response = await api.get('/categories');
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar categorias:', error);
    return [];
  }
};