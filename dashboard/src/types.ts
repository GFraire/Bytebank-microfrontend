export interface Transaction {
  id: number;
  description: string;
  amount: number;
  type: 'income' | 'expense';
  category: string;
  date: string;
}

export interface DashboardData {
  balance: number;
  income: number;
  expense: number;
  transactions: Transaction[];
}

export interface CategoryTotal {
  name: string;
  value: number;
}