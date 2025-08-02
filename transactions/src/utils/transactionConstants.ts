export interface SelectOption {
  value: string;
  label: string;
}

export const TRANSACTION_CATEGORIES: SelectOption[] = [
  { value: "", label: "Selecione" },
  { value: "Alimentação", label: "Alimentação" },
  { value: "Transporte", label: "Transporte" },
  { value: "Moradia", label: "Moradia" },
  { value: "Lazer", label: "Lazer" },
  { value: "Saúde", label: "Saúde" },
  { value: "Educação", label: "Educação" },
  { value: "Trabalho", label: "Trabalho" },
  { value: "Outros", label: "Outros" },
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
