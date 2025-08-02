import { AppProps } from "next/app";
import { AuthProvider } from "../../authContext";

import "../styles/global.css";
import("transactions/Styles");
import("sidebar/Styles");
import("dashboard/Styles");
import("addTransaction/Styles");
import("profile/Styles");

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
}

export default MyApp;
