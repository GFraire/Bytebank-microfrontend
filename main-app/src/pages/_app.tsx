import { AppProps } from "next/app";
import { AuthProvider, useAuth } from "../contexts/authContext";
import { useRouter } from "next/router";
import { useEffect } from "react";

import "../styles/global.css";
import("transactions/Styles");
import("sidebar/Styles");
import("dashboard/Styles");
import("addTransaction/Styles");
import("profile/Styles");

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <AuthRedirectWrapper>
        <Component {...pageProps} />
      </AuthRedirectWrapper>
    </AuthProvider>
  );
}

export default MyApp;

function AuthRedirectWrapper({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user && router.pathname !== "/account") {
      router.push("/account");
    }
  }, [user, router]);

  return <>{children}</>;
}
