export interface SelectOption {
  value: string;
  label: string;
}

export const TRANSACTION_CATEGORIES: SelectOption[] = [
  { value: "", label: "Selecione" },
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

export const TRANSACTION_TYPES: SelectOption[] = [
  { value: "", label: "Selecione" },
  { value: "deposit", label: "Depósito" },
  { value: "transfer", label: "Transferência" },
  { value: "payment", label: "Pagamento de Boleto" },
  { value: "withdrawal", label: "Saque" },
];

// Função utilitária para obter o label de uma categoria pelo value
export const getCategoryLabel = (categoryValue: string): string => {
  const category = TRANSACTION_CATEGORIES.find(
    (cat) => cat.value === categoryValue
  );
  return category?.label || categoryValue;
};

// Função utilitária para obter todas as categorias exceto a opção "Selecione"
export const getValidCategories = (): SelectOption[] => {
  return TRANSACTION_CATEGORIES.filter((category) => category.value !== "");
};

// Função utilitária para obter o label de um tipo de transação pelo value
export const getTransactionTypeLabel = (typeValue: string): string => {
  const type = TRANSACTION_TYPES.find((type) => type.value === typeValue);
  return type?.label || typeValue;
};

// Função utilitária para obter todos os tipos de transação exceto a opção "Selecione"
export const getValidTransactionTypes = (): SelectOption[] => {
  return TRANSACTION_TYPES.filter((type) => type.value !== "");
};
