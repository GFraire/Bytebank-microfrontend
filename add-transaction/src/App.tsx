import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
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

const transactionSchema = z.object({
  description: z.string().min(1, "Descrição é obrigatória"),
  amount: z.string().min(1, "Valor é obrigatório"),
  type: z.string().min(1, "Tipo é obrigatório"),
  category: z.string().min(1, "Categoria é obrigatória"),
  date: z.string().min(1, "Data é obrigatória"),
});

type TransactionFormData = z.infer<typeof transactionSchema>;

export interface AppTransactionProps {
  user: AuthUser | null;
}

function AppTransactionContent({ user }: AppTransactionProps) {
  const { addToast } = useToast();
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
  } = useForm<TransactionFormData>({
    resolver: zodResolver(transactionSchema),
    defaultValues: {
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
    },
  });

  const watchedAmount = watch("amount");

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
    const formattedValue = formatCurrency(value);
    setValue("amount", formattedValue);
  };

  const onSubmit = async (data: TransactionFormData) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/transactions`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...data,
            amount: parseFloat(
              data.amount.replace(/[^\d,]/g, "").replace(",", ".")
            ),
            type:
              data.type === "deposit" || data.type === "transfer"
                ? "income"
                : "expense",
            userId: user?.uid,
          }),
        }
      );
      if (response.ok) {
        addToast("Transação criada com sucesso!", "success");
        reset({
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
      <Toast />
      {/* Content */}
      <main className="p-4 md:p-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Nova Transação</h2>
            
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" role="form" aria-labelledby="form-title">
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
                    placeholder="Ex: Supermercado, Salário..."
                    className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent focus:outline-none ${
                      errors.description ? "border-red-500" : "border-gray-300"
                    }`}
                    aria-describedby="description-help"
                    {...register("description")}
                  />
                  {errors.description && (
                    <p className="text-red-500 text-xs mt-1">{errors.description.message}</p>
                  )}
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
                    placeholder="R$ 0,00"
                    className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent focus:outline-none ${
                      errors.amount ? "border-red-500" : "border-gray-300"
                    }`}
                    aria-describedby="amount-help"
                    value={watchedAmount}
                    onChange={handleAmountChange}
                  />
                  {errors.amount && (
                    <p className="text-red-500 text-xs mt-1">{errors.amount.message}</p>
                  )}
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
                    className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent focus:outline-none ${
                      errors.type ? "border-red-500" : "border-gray-300"
                    }`}
                    aria-describedby="type-help"
                    {...register("type")}
                  >
                    {TRANSACTION_TYPES.map((type) => (
                      <option key={type.value} value={type.value}>
                        {type.label}
                      </option>
                    ))}
                  </select>
                  {errors.type && (
                    <p className="text-red-500 text-xs mt-1">{errors.type.message}</p>
                  )}
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
                    className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent focus:outline-none ${
                      errors.category ? "border-red-500" : "border-gray-300"
                    }`}
                    aria-describedby="category-help"
                    {...register("category")}
                  >
                    <option value="">Selecione uma categoria</option>
                    {TRANSACTION_CATEGORIES.map((category) => (
                      <option key={category.value} value={category.value}>
                        {category.label}
                      </option>
                    ))}
                  </select>
                  {errors.category && (
                    <p className="text-red-500 text-xs mt-1">{errors.category.message}</p>
                  )}
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
                    className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent focus:outline-none ${
                      errors.date ? "border-red-500" : "border-gray-300"
                    }`}
                    aria-describedby="date-help"
                    {...register("date")}
                  />
                  {errors.date && (
                    <p className="text-red-500 text-xs mt-1">{errors.date.message}</p>
                  )}
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
    </ToastProvider>
  );
}

export default AppTransaction;
