import React, { useState, useEffect } from "react";
import Modal from "./components/ui/Modal";
import TransacaoForm from "./components/TransactionFormEdit";
import { ToastProvider, useToast } from "./contexts/ToastContext";
import Toast from "./components/Toast";

interface Transaction {
  id: number;
  description: string;
  amount: number;
  type: "income" | "expense";
  category: string;
  date: string;
  recipient?: string;
  attachments?: string[];
  userId?: string;
}

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
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [periodFilter, setPeriodFilter] = useState("all");
  const [editingTransaction, setEditingTransaction] =
    useState<Transaction | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState<number | null>(null);
  const [attachmentsModalOpen, setAttachmentsModalOpen] = useState(false);
  const [selectedAttachments, setSelectedAttachments] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const mapCategoryToPortuguese = (category: string) => {
    const categoryMap: Record<string, string> = {
      bills: "Contas e Faturas",
      services: "Serviços",
      taxes: "Impostos",
      education: "Educação",
      entertainment: "Entretenimento",
      groceries: "Supermercado",
      transportation: "Transporte",
      health: "Saúde",
      clothing: "Vestuário",
      gifts: "Presentes",
      travel: "Viagens",
      other: "Outros",
    };
    return categoryMap[category] || category;
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest(".relative")) {
        setDropdownOpen(null);
      }
    };
    if (dropdownOpen !== null) {
      setTimeout(() => {
        document.addEventListener("click", handleClickOutside);
      }, 0);
      return () => document.removeEventListener("click", handleClickOutside);
    }
  }, [dropdownOpen]);

  const fetchTransactions = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/transactions?userId=${user?.uid}`);
      
      if (response.ok) {
        const data = await response.json();
        const sortedData = data.sort(
          (a: Transaction, b: Transaction) =>
            new Date(b.date).getTime() - new Date(a.date).getTime()
        );
        setTransactions(sortedData);
      }
    } catch (error) {
      addToast("Erro ao carregar transações", "error");
    } finally {
      setLoading(false);
    }
  };

  const filteredTransactions = transactions.filter((transaction) => {
    const matchesSearch =
      transaction.description
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      transaction.amount.toString().includes(searchTerm);
    const matchesCategory =
      categoryFilter === "all" || transaction.type === categoryFilter;
    let matchesPeriod = true;

    if (periodFilter !== "all") {
      const transactionDate = new Date(transaction.date);
      const today = new Date();
      if (periodFilter === "this_year") {
        matchesPeriod = transactionDate.getFullYear() === today.getFullYear();
      } else {
        const daysAgo = parseInt(periodFilter);
        const filterDate = new Date(
          today.getTime() - daysAgo * 24 * 60 * 60 * 1000
        );
        matchesPeriod = transactionDate >= filterDate;
      }
    }

    return matchesSearch && matchesCategory && matchesPeriod;
  });

  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, categoryFilter, periodFilter]);

  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedTransactions = filteredTransactions.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("pt-BR");
  };

  const handleEdit = (transaction: Transaction) => {
    setEditingTransaction(transaction);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setEditingTransaction(null);
    setModalOpen(false);
  };

  const handleSave = () => {
    addToast("Transação atualizada com sucesso!", "success");
    fetchTransactions();
    handleCloseModal();
  };

  const handleDelete = () => {
    addToast("Transação excluída com sucesso!", "success");
    fetchTransactions();
    handleCloseModal();
  };

  const handleRemove = async (id: number) => {
    if (confirm("Tem certeza que deseja remover esta transação?")) {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/transactions/${id}`,
          {
            method: "DELETE",
          }
        );
        if (response.ok) {
          addToast("Transação removida com sucesso!", "success");
          fetchTransactions();
        } else {
          addToast("Erro ao remover transação", "error");
        }
      } catch (error) {
        addToast("Erro ao remover transação", "error");
      }
    }
  };

  if (loading) {
    return (
      <div className="bg-gray-50 p-4 md:p-6">
        <div className="flex items-center justify-center py-20">
          <div className="flex flex-col items-center space-y-4">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
            <p className="text-gray-600">Carregando transações...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50">
      <Toast />
      <div className="p-4 md:p-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Período
              </label>
              <select
                value={periodFilter}
                onChange={(e) => setPeriodFilter(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">Todos os períodos</option>
                <option value="30">Últimos 30 dias</option>
                <option value="90">Últimos 90 dias</option>
                <option value="this_year">Este ano</option>
              </select>
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Tipo
              </label>
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">Todos os tipos</option>
                <option value="income">Receitas</option>
                <option value="expense">Despesas</option>
              </select>
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Buscar
              </label>
              <input
                type="text"
                placeholder="Buscar transação..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">
              Transações ({filteredTransactions.length})
            </h2>
          </div>
          <div className="divide-y divide-gray-200">
            {filteredTransactions.length === 0 ? (
              <div className="p-8 text-center">
                <div className="text-4xl mb-4">📋</div>
                <p className="text-gray-500">Nenhuma transação encontrada</p>
              </div>
            ) : (
              paginatedTransactions.map((transaction) => (
                <div
                  key={transaction.id}
                  className="p-4 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div
                        className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                          transaction.type === "income"
                            ? "bg-green-100 text-green-600"
                            : "bg-red-100 text-red-600"
                        }`}
                        style={{
                          backgroundColor:
                            transaction.type === "income"
                              ? "#dcfce7"
                              : "#fee2e2",
                          color:
                            transaction.type === "income"
                              ? "#16a34a"
                              : "#dc2626",
                        }}
                      >
                        {transaction.type === "income" ? (
                          <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M7 11l5-5m0 0l5 5m-5-5v12"
                            />
                          </svg>
                        ) : (
                          <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M17 13l-5 5m0 0l-5-5m5 5V6"
                            />
                          </svg>
                        )}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="font-medium text-gray-900">
                            {transaction.description}
                          </p>
                          {transaction.attachments &&
                            transaction.attachments.length > 0 && (
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setSelectedAttachments(
                                    transaction.attachments!
                                  );
                                  setAttachmentsModalOpen(true);
                                }}
                                className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800 hover:bg-blue-200 transition-colors cursor-pointer"
                                title="Ver arquivos anexados"
                              >
                                <svg
                                  className="w-3 h-3 mr-1"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                                  />
                                </svg>
                                {transaction.attachments.length}
                              </button>
                            )}
                        </div>
                        <p className="text-sm text-gray-500">
                          {mapCategoryToPortuguese(transaction.category)} •{" "}
                          {formatDate(transaction.date)}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <p
                          className={`font-semibold ${
                            transaction.type === "income"
                              ? "text-green-600"
                              : "text-red-600"
                          }`}
                          style={{
                            color:
                              transaction.type === "income"
                                ? "#16a34a"
                                : "#dc2626",
                          }}
                        >
                          {transaction.type === "income" ? "+" : "-"}
                          {formatCurrency(transaction.amount)}
                        </p>
                        {transaction.recipient && (
                          <p className="text-sm text-gray-500">
                            {transaction.recipient}
                          </p>
                        )}
                      </div>
                      <div className="relative">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setDropdownOpen(
                              dropdownOpen === transaction.id
                                ? null
                                : transaction.id
                            );
                          }}
                          className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                          title="Opções"
                        >
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                            />
                          </svg>
                        </button>
                        {dropdownOpen === transaction.id && (
                          <div className="absolute right-0 mt-1 w-32 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleEdit(transaction);
                                setDropdownOpen(null);
                              }}
                              className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center space-x-2 rounded-t-lg"
                            >
                              <svg
                                className="w-4 h-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                                />
                              </svg>
                              <span>Editar</span>
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleRemove(transaction.id);
                                setDropdownOpen(null);
                              }}
                              className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center space-x-2 rounded-b-lg"
                            >
                              <svg
                                className="w-4 h-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                />
                              </svg>
                              <span>Remover</span>
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
          {totalPages > 1 && (
            <div className="flex items-center justify-between px-4 py-3 border-t border-gray-200">
              <div className="text-sm text-gray-700">
                Mostrando {startIndex + 1} a{" "}
                {Math.min(
                  startIndex + itemsPerPage,
                  filteredTransactions.length
                )}{" "}
                de {filteredTransactions.length} transações
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                  disabled={currentPage === 1}
                  className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Anterior
                </button>
                <span className="px-3 py-1 text-sm text-gray-700">
                  Página {currentPage} de {totalPages}
                </span>
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                  }
                  disabled={currentPage === totalPages}
                  className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Próxima
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {modalOpen && editingTransaction && (
        <Modal onClose={handleCloseModal} title="Editar Transação">
          <TransacaoForm
            fecharModal={handleCloseModal}
            modo="editar"
            transacaoParaEditar={{
              id: editingTransaction.id,
              type:
                editingTransaction.type === "income" ? "deposit" : "withdrawal",
              amount: editingTransaction.amount,
              date: new Date(editingTransaction.date),
              month: new Date(editingTransaction.date).toLocaleDateString(
                "pt-BR",
                {
                  month: "long",
                }
              ),
              description: editingTransaction.description,
              category: editingTransaction.category,
              recipient: editingTransaction.recipient,
              userId: (editingTransaction as any).userId,
            }}
            onSave={handleSave}
            onDelete={handleDelete}
          />
        </Modal>
      )}

      {attachmentsModalOpen && (
        <Modal
          onClose={() => setAttachmentsModalOpen(false)}
          title="Arquivos Anexados"
        >
          <div className="space-y-4">
            {selectedAttachments.map((fileName, index) => {
              const fileUrl = `${process.env.REACT_APP_API_URL}/files/${fileName}`;
              const originalName = fileName.includes("_")
                ? fileName.split("_").slice(1).join("_")
                : fileName;
              const isImage = /\.(jpg|jpeg|png|gif|webp)$/i.test(fileName);
              return (
                <div key={index} className="bg-gray-50 rounded-lg border p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center">
                      <svg
                        className="w-5 h-5 text-blue-600 mr-3"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                      </svg>
                      <span className="text-sm font-medium text-gray-900">
                        {originalName}
                      </span>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => window.open(fileUrl, "_blank")}
                        className="px-3 py-1 text-xs bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition-colors"
                      >
                        Ver
                      </button>
                      <button
                        onClick={() => {
                          const link = document.createElement("a");
                          link.href = fileUrl;
                          link.download = originalName;
                          link.click();
                        }}
                        className="px-3 py-1 text-xs bg-green-100 text-green-700 rounded hover:bg-green-200 transition-colors"
                      >
                        Download
                      </button>
                    </div>
                  </div>
                  {isImage && (
                    <div className="mt-3">
                      <img
                        src={fileUrl}
                        alt={originalName}
                        className="max-w-full h-auto max-h-64 rounded-lg border"
                        onError={(e) => {
                          e.currentTarget.style.display = "none";
                        }}
                      />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </Modal>
      )}
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
