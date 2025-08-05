// Utilitários de acessibilidade para o projeto

export const ARIA_LABELS = {
  navigation: {
    main: 'Navegação principal',
    breadcrumb: 'Navegação estrutural',
    pagination: 'Navegação de páginas',
  },
  buttons: {
    close: 'Fechar',
    menu: 'Menu',
    search: 'Pesquisar',
    submit: 'Enviar',
    cancel: 'Cancelar',
    delete: 'Excluir',
    edit: 'Editar',
    save: 'Salvar',
    logout: 'Sair da conta',
  },
  forms: {
    required: 'Campo obrigatório',
    optional: 'Campo opcional',
    error: 'Erro de validação',
    success: 'Campo válido',
  },
  status: {
    loading: 'Carregando...',
    error: 'Erro',
    success: 'Sucesso',
    warning: 'Aviso',
  },
} as const;

export const FOCUS_CLASSES = {
  default: 'focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50',
  button: 'focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50',
  input: 'focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent',
  danger: 'focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50',
} as const;

// Função para anunciar mudanças para leitores de tela
export const announceToScreenReader = (message: string, priority: 'polite' | 'assertive' = 'polite') => {
  const announcement = document.createElement('div');
  announcement.setAttribute('aria-live', priority);
  announcement.setAttribute('aria-atomic', 'true');
  announcement.className = 'sr-only';
  announcement.textContent = message;
  
  document.body.appendChild(announcement);
  
  setTimeout(() => {
    document.body.removeChild(announcement);
  }, 1000);
};

// Utilitário para IDs únicos acessíveis
let idCounter = 0;
export const generateAccessibleId = (prefix: string = 'accessible'): string => {
  idCounter++;
  return `${prefix}-${idCounter}`;
};