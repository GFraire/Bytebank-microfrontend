import { AppProps } from "next/app";
import { AuthProvider } from "../../authContext";
import "../../../design-system/src/global.css";

import("../styles/global.css")

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
}

export default MyApp;
