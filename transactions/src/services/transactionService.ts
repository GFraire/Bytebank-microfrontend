const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3333';

export interface Transaction {
  id?: number;
  description: string;
  amount: number;
  type: 'income' | 'expense';
  category: string;
  date: string;
  attachments?: string[];
}

export const transactionService = {
  async getAll(): Promise<Transaction[]> {
    const response = await fetch(`${API_URL}/transactions`);
    if (!response.ok) throw new Error('Erro ao buscar transações');
    return response.json();
  },

  async getById(id: number): Promise<Transaction> {
    const response = await fetch(`${API_URL}/transactions/${id}`);
    if (!response.ok) throw new Error('Erro ao buscar transação');
    return response.json();
  },

  async create(transaction: Omit<Transaction, 'id'>): Promise<Transaction> {
    const response = await fetch(`${API_URL}/transactions`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(transaction),
    });
    if (!response.ok) throw new Error('Erro ao criar transação');
    return response.json();
  },

  async update(id: number, transaction: Partial<Transaction>): Promise<Transaction> {
    const response = await fetch(`${API_URL}/transactions/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(transaction),
    });
    if (!response.ok) throw new Error('Erro ao atualizar transação');
    return response.json();
  },

  async delete(id: number): Promise<void> {
    const response = await fetch(`${API_URL}/transactions/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Erro ao excluir transação');
  },

  async getCategories(): Promise<string[]> {
    const response = await fetch(`${API_URL}/categories`);
    if (!response.ok) throw new Error('Erro ao buscar categorias');
    return response.json();
  },
};