import("./bootstrap");

// Importar CSS do design system via Module Federation
import("designSystem/GlobalCSS").catch(() =>
  console.warn(
    "Design system CSS não carregado - verifique se o módulo designSystem está rodando na porta 4000"
  )
);
