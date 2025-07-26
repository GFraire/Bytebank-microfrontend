import { AppProps } from "next/app";

import "../../../design-system/src/global.css";

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
