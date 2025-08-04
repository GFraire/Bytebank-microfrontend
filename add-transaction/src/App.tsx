import React, { useState } from "react";

const TRANSACTION_TYPES = [
  { value: "deposit", label: "Depósito" },
  { value: "transfer", label: "Transferência" },
  { value: "payment", label: "Pagamento de Boleto" },
  { value: "withdrawal", label: "Saque" },
];

const TRANSACTION_CATEGORIES = [
  { value: "bills", label: "Contas e Faturas" },
  { value: "services", label: "Serviços" },
  { value: "taxes", label: "Impostos" },
  { value: "education", label: "Educação" },
  { value: "entertainment", label: "Entretenimento" },
  { value: "groceries", label: "Supermercado" },
  { value: "transportation", label: "Transporte" },
  { value: "health", label: "Saúde" },
  { value: "clothing", label: "Vestuário" },
  { value: "gifts", label: "Presentes" },
  { value: "travel", label: "Viagens" },
  { value: "other", label: "Outros" },
];

export interface AuthUser {
  uid: string;
  email: string | null;
  displayName: string | null;
}

export interface AppTransactionProps {
  user: AuthUser | null;
}

function AppTransaction({ user }: AppTransactionProps) {
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3333/transactions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          amount: parseFloat(formData.amount),
          type:
            formData.type === "deposit" || formData.type === "transfer"
              ? "income"
              : "expense",
          userId: user?.uid,
        }),
      });
      if (response.ok) {
        alert("Transação criada com sucesso!");
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
      }
    } catch (error) {
      console.error("Erro:", error);
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
                type="number"
                step="0.01"
                min="0.01"
                value={formData.amount}
                onChange={(e) =>
                  setFormData({ ...formData, amount: e.target.value })
                }
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholder="0,00"
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

export default AppTransaction;
