import dynamic from "next/dynamic";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useAuth } from "../../contexts/authContext";
import MobileHeader from "../../components/MobileHeader";
import BottomNavigation from "../../components/BottomNavigation";
import DashboardHeader from "../../components/DashboardHeader";

const DashboardComponent = dynamic(() => import("dashboard/Dashboard"), {
  ssr: false,
});

const SidebarComponent = dynamic(() => import("sidebar/Sidebar"), {
  ssr: false,
});

const TransactionsComponent = dynamic(
  () => import("transactions/Transactions"),
  {
    ssr: false,
  }
);

const AddTransactionComponent = dynamic(
  () => import("addTransaction/AddTransaction"),
  {
    ssr: false,
  }
);

const ProfileComponent = dynamic(() => import("profile/Profile"), {
  ssr: false,
});

type PageType = "dashboard" | "transactions" | "add-transaction" | "profile";

export default function Account() {
  const { logout, user } = useAuth();
  const [activeView, setActiveView] = useState<PageType>("dashboard");
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/").catch(console.error);
    }

    const handler = (event: Event) => {
      try {
        const customEvent = event as CustomEvent;
        const view = customEvent.detail?.view;
        if (view) {
          handleNavigation(view);
        }
      } catch (error) {
        console.error('Error handling view change:', error);
      }
    };

    window.addEventListener("viewChanged", handler);
    
    return () => {
      window.removeEventListener("viewChanged", handler);
    };
  }, [user, router]);

  const handleNavigation = (view: string) => {
    if (
      view === "dashboard" ||
      view === "transactions" ||
      view === "add-transaction" ||
      view === "profile"
    ) {
      setActiveView(view as PageType);
    }
  };

  const handleLogout = () => {
    try {
      logout();
      router.push("/").catch(console.error);
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  const renderContent = () => {
    switch (activeView) {
      case "dashboard":
        return <DashboardComponent user={user} />;
      case "transactions":
        return <TransactionsComponent user={user} />;
      case "add-transaction":
        return <AddTransactionComponent user={user} />;
      case "profile":
        return <ProfileComponent user={user} />;
      default:
        return <DashboardComponent user={user} />;
    }
  };

  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="flex flex-col md:flex-row h-screen bg-gray-50" role="application" aria-label="ByteBank Dashboard">
      <MobileHeader onNavigate={handleNavigation} activeView={activeView} />

      {isDesktop && (
        <div className="w-64 flex-shrink-0">
          <SidebarComponent
            onNavigate={handleNavigation}
            activeView={activeView}
            onLogout={handleLogout}
          />
        </div>
      )}

      <div className="flex-1 flex flex-col overflow-hidden pb-20 md:pb-0">
        <DashboardHeader
          userName={user?.displayName || ""}
          pageType={activeView}
          showUserProfile={true}
        />
        <main className="flex-1 overflow-auto" role="main" aria-label={`Conteúdo da página ${activeView}`}>
          {renderContent()}
        </main>
      </div>

      <BottomNavigation onNavigate={handleNavigation} activeView={activeView} />
    </div>
  );
}
