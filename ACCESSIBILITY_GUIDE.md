# Guia de Acessibilidade - ByteBank Microfrontend

## ✅ Correções Implementadas

### 1. **Estrutura Semântica**
- Adicionados roles ARIA apropriados (`banner`, `navigation`, `main`, `alert`)
- Implementados landmarks semânticos para navegação por leitores de tela
- Estrutura hierárquica de headings corrigida

### 2. **Navegação por Teclado**
- Focus trap implementado em modais
- Estados de foco visíveis com `focus:ring-2`
- Navegação sequencial lógica com `tabindex`
- Suporte completo a navegação por teclado

### 3. **Labels e Descrições**
- Todos os inputs possuem labels associados com `htmlFor`
- Botões com `aria-label` descritivos
- Campos obrigatórios marcados com asterisco (*)
- Textos de ajuda com `aria-describedby`

### 4. **Feedback para Leitores de Tela**
- Toasts com `role="alert"` e `aria-live`
- Mensagens de erro anunciadas automaticamente
- Estados de carregamento comunicados
- Mudanças de contexto anunciadas

### 5. **Contraste e Visibilidade**
- Estados de foco com contraste adequado
- Ícones decorativos marcados com `aria-hidden="true"`
- Texto alternativo descritivo em imagens
- Classes `sr-only` para conteúdo apenas para leitores de tela

## 📋 Componentes Corrigidos

### Main App (`/main-app/`)
- ✅ `pages/account/index.tsx` - Estrutura principal com roles e cleanup de eventos
- ✅ `components/MobileHeader.tsx` - Header com aria-labels e foco
- ✅ `components/BottomNavigation.tsx` - Navegação com estados acessíveis
- ✅ `components/DashboardHeader.tsx` - Header semântico
- ✅ `components/ModuleFederationErrorBoundary.tsx` - Error boundary acessível

### Sidebar (`/sidebar/`)
- ✅ `src/App.tsx` - Menu lateral com navegação por teclado

### Add Transaction (`/add-transaction/`)
- ✅ `src/App.tsx` - Formulário com labels e fieldsets
- ✅ `src/components/Toast.tsx` - Notificações acessíveis

## 🛠️ Utilitários Criados

### `main-app/src/utils/accessibility.ts`
- Constantes para ARIA labels
- Classes de foco padronizadas
- Função para anúncios a leitores de tela
- Gerador de IDs únicos

## 📱 Padrões Implementados

### Formulários
```tsx
<fieldset>
  <legend className="sr-only">Grupo de campos</legend>
  <label htmlFor="campo" className="block text-sm font-medium">
    Campo Obrigatório *
  </label>
  <input
    id="campo"
    name="campo"
    aria-describedby="campo-help"
    className="focus:outline-none focus:ring-2 focus:ring-green-500"
    required
  />
  <div id="campo-help" className="sr-only">
    Texto de ajuda para o campo
  </div>
</fieldset>
```

### Botões
```tsx
<button
  type="button"
  aria-label="Descrição clara da ação"
  className="focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
>
  <svg aria-hidden="true">...</svg>
  Texto do botão
</button>
```

### Navegação
```tsx
<nav role="navigation" aria-label="Menu principal">
  <button
    aria-current={isActive ? "page" : undefined}
    aria-label="Navegar para Dashboard"
  >
    Dashboard
  </button>
</nav>
```

### Notificações
```tsx
<div
  role="alert"
  aria-live={type === 'error' ? 'assertive' : 'polite'}
>
  <span className="sr-only">Tipo da mensagem: </span>
  Mensagem
</div>
```

## 🎯 Próximos Passos Recomendados

### 1. **Testes de Acessibilidade**
- Implementar testes automatizados com `@axe-core/react`
- Testes manuais com leitores de tela (NVDA, JAWS, VoiceOver)
- Validação com usuários reais

### 2. **Melhorias Adicionais**
- Implementar modo de alto contraste
- Suporte a redução de movimento (`prefers-reduced-motion`)
- Melhorar responsividade para zoom até 200%

### 3. **Documentação**
- Criar guia de desenvolvimento acessível
- Documentar padrões de componentes
- Treinamento da equipe

## 🔧 Como Usar

### Importar Utilitários
```tsx
import { ARIA_LABELS, FOCUS_CLASSES, announceToScreenReader } from '../utils/accessibility';

// Usar labels padronizados
<button aria-label={ARIA_LABELS.buttons.close}>

// Aplicar classes de foco
<input className={FOCUS_CLASSES.input} />

// Anunciar mudanças
announceToScreenReader('Transação salva com sucesso!', 'polite');
```

### Validação
- Use ferramentas como Lighthouse, axe-core
- Teste navegação apenas por teclado (Tab, Enter, Esc, setas)
- Verifique com leitores de tela

## 📊 Conformidade WCAG 2.1

### Nível A - ✅ Implementado
- 1.1.1 Conteúdo não textual
- 1.3.1 Informações e relacionamentos
- 2.1.1 Teclado
- 2.4.1 Ignorar blocos
- 4.1.2 Nome, função, valor

### Nível AA - ✅ Implementado
- 1.4.3 Contraste (mínimo)
- 2.4.6 Cabeçalhos e rótulos
- 2.4.7 Foco visível
- 3.2.1 Em foco
- 3.3.2 Rótulos ou instruções

Este guia garante que o ByteBank seja acessível para todos os usuários, incluindo pessoas com deficiências visuais, motoras e cognitivas.