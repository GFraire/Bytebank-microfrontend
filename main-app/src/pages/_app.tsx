import { AppProps } from "next/app";
import { useEffect } from "react";

// Importa CSS global do design-system via Module Federation
const loadGlobalCSS = async () => {
  try {
    await import('designSystem/GlobalCSS');
  } catch (error) {
    console.warn('Design system CSS não carregado:', error);
  }
};

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    loadGlobalCSS();
  }, []);

  return <Component {...pageProps} />;
}

export default MyApp;
