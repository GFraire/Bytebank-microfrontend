import React, { useState } from "react";
import { ToastProvider, useToast } from "./contexts/ToastContext";
import Toast from "./components/Toast";

const TRANSACTION_TYPES = [
  { value: "deposit", label: "Depósito" },
  { value: "transfer", label: "Transferência" },
  { value: "payment", label: "Pagamento de Boleto" },
  { value: "withdrawal", label: "Saque" },
];

const TRANSACTION_CATEGORIES = [
  { value: "Alimentação", label: "Alimentação" },
  { value: "Transporte", label: "Transporte" },
  { value: "Moradia", label: "Moradia" },
  { value: "Lazer", label: "Lazer" },
  { value: "Saúde", label: "Saúde" },
  { value: "Educação", label: "Educação" },
  { value: "Trabalho", label: "Trabalho" },
  { value: "Outros", label: "Outros" },
];

export interface AuthUser {
  uid: string;
  email: string | null;
  displayName: string | null;
}

export interface AppTransactionProps {
  user: AuthUser | null;
}

function AppTransactionContent({ user }: AppTransactionProps) {
  const { addToast } = useToast();
  const [formData, setFormData] = useState({
    description: "",
    amount: "",
    type: "deposit",
    category: "",
    date: (() => {
      const today = new Date();
      const year = today.getFullYear();
      const month = String(today.getMonth() + 1).padStart(2, "0");
      const day = String(today.getDate()).padStart(2, "0");
      return `${year}-${month}-${day}`;
    })(),
  });

  const formatCurrency = (value: string) => {
    const numericValue = value.replace(/\D/g, "");
    const formattedValue = (Number(numericValue) / 100).toLocaleString(
      "pt-BR",
      {
        style: "currency",
        currency: "BRL",
      }
    );
    return formattedValue;
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "");
    setFormData({ ...formData, amount: formatCurrency(value) });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/transactions`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...formData,
            amount: parseFloat(
              formData.amount.replace(/[^\d,]/g, "").replace(",", ".")
            ),
            type:
              formData.type === "deposit" || formData.type === "transfer"
                ? "income"
                : "expense",
            userId: user?.uid,
          }),
        }
      );
      if (response.ok) {
        addToast("Transação criada com sucesso!", "success");
        setFormData({
          description: "",
          amount: "",
          type: "deposit",
          category: "",
          date: (() => {
            const today = new Date();
            const year = today.getFullYear();
            const month = String(today.getMonth() + 1).padStart(2, "0");
            const day = String(today.getDate()).padStart(2, "0");
            return `${year}-${month}-${day}`;
          })(),
        });
      } else {
        addToast("Erro ao criar transação", "error");
      }
    } catch (error) {
      addToast("Erro ao criar transação", "error");
    }
  };

  return (
    <div className="bg-gray-50">
      {/* Content */}
      <main className="p-4 md:p-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Descrição
              </label>
              <input
                type="text"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholder="Ex: Supermercado, Salário..."
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Valor
              </label>
              <input
                type="text"
                value={formData.amount}
                onChange={handleAmountChange}
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholder="R$ 0,00"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Tipo de Transação
              </label>
              <select
                value={formData.type}
                onChange={(e) =>
                  setFormData({ ...formData, type: e.target.value })
                }
                className="w-full p-2 border border-gray-300 rounded-md"
              >
                {TRANSACTION_TYPES.map((type) => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Categoria
              </label>
              <select
                value={formData.category}
                onChange={(e) =>
                  setFormData({ ...formData, category: e.target.value })
                }
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              >
                <option value="">Selecione uma categoria</option>
                {TRANSACTION_CATEGORIES.map((category) => (
                  <option key={category.value} value={category.value}>
                    {category.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Data
              </label>
              <input
                type="date"
                value={formData.date}
                onChange={(e) =>
                  setFormData({ ...formData, date: e.target.value })
                }
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-slate-600 text-white py-2 px-4 rounded-md hover:bg-green-700 font-semibold"
            >
              Adicionar Transação
            </button>
          </form>
        </div>

        {/* Dicas */}
        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-3">Dicas</h3>
          <ul className="space-y-2 text-blue-800">
            <li>• Use descrições claras para facilitar o controle</li>
            <li>• Categorize corretamente para relatórios precisos</li>
            <li>• Anexe comprovantes quando possível</li>
          </ul>
        </div>
      </main>
    </div>
  );
}

function AppTransaction({ user }: AppTransactionProps) {
  return (
    <ToastProvider>
      <AppTransactionContent user={user} />
      <Toast />
    </ToastProvider>
  );
}

export default AppTransaction;
