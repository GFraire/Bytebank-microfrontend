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
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Nova Transação</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6" role="form" aria-labelledby="form-title">
              <h2 id="form-title" className="sr-only">Formulário de nova transação</h2>
              
              {/* Primeira linha - Descrição e Valor */}
              <fieldset className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <legend className="sr-only">Informações básicas da transação</legend>
                
                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                    Descrição *
                  </label>
                  <input
                    type="text"
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent focus:outline-none"
                    placeholder="Ex: Supermercado, Salário..."
                    aria-describedby="description-help"
                    required
                  />
                  <div id="description-help" className="sr-only">
                    Digite uma descrição clara para identificar a transação
                  </div>
                </div>

                <div>
                  <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-2">
                    Valor *
                  </label>
                  <input
                    type="text"
                    id="amount"
                    name="amount"
                    value={formData.amount}
                    onChange={handleAmountChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent focus:outline-none"
                    placeholder="R$ 0,00"
                    aria-describedby="amount-help"
                    required
                  />
                  <div id="amount-help" className="sr-only">
                    Digite o valor da transação em reais
                  </div>
                </div>
              </fieldset>

              {/* Segunda linha - Tipo e Categoria */}
              <fieldset className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <legend className="sr-only">Classificação da transação</legend>
                
                <div>
                  <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-2">
                    Tipo de Transação *
                  </label>
                  <select
                    id="type"
                    name="type"
                    value={formData.type}
                    onChange={(e) =>
                      setFormData({ ...formData, type: e.target.value })
                    }
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent focus:outline-none"
                    aria-describedby="type-help"
                  >
                    {TRANSACTION_TYPES.map((type) => (
                      <option key={type.value} value={type.value}>
                        {type.label}
                      </option>
                    ))}
                  </select>
                  <div id="type-help" className="sr-only">
                    Selecione o tipo de operação financeira
                  </div>
                </div>

                <div>
                  <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                    Categoria *
                  </label>
                  <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={(e) =>
                      setFormData({ ...formData, category: e.target.value })
                    }
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent focus:outline-none"
                    aria-describedby="category-help"
                    required
                  >
                    <option value="">Selecione uma categoria</option>
                    {TRANSACTION_CATEGORIES.map((category) => (
                      <option key={category.value} value={category.value}>
                        {category.label}
                      </option>
                    ))}
                  </select>
                  <div id="category-help" className="sr-only">
                    Escolha a categoria que melhor descreve esta transação
                  </div>
                </div>
              </fieldset>

              {/* Terceira linha - Data */}
              <fieldset className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <legend className="sr-only">Data da transação</legend>
                
                <div>
                  <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-2">
                    Data *
                  </label>
                  <input
                    type="date"
                    id="date"
                    name="date"
                    value={formData.date}
                    onChange={(e) =>
                      setFormData({ ...formData, date: e.target.value })
                    }
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent focus:outline-none"
                    aria-describedby="date-help"
                    required
                  />
                  <div id="date-help" className="sr-only">
                    Selecione a data em que a transação foi realizada
                  </div>
                </div>
              </fieldset>

              {/* Botão de ação */}
              <div className="flex justify-end pt-4">
                <button
                  type="submit"
                  className="px-8 py-3 bg-green-btn text-white rounded-lg hover:bg-green-700 focus:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 font-semibold transition-colors duration-200 shadow-sm"
                  aria-describedby="submit-help"
                >
                  Adicionar Transação
                </button>
                <div id="submit-help" className="sr-only">
                  Clique para salvar a nova transação no sistema
                </div>
              </div>
            </form>
          </div>

          {/* Dicas */}
          <div className="mt-6 bg-blue-50 border border-blue-200 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-blue-900 mb-3">💡 Dicas</h3>
            <ul className="space-y-2 text-blue-800">
              <li>• Use descrições claras para facilitar o controle</li>
              <li>• Categorize corretamente para relatórios precisos</li>
              <li>• Anexe comprovantes quando possível</li>
            </ul>
          </div>
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
