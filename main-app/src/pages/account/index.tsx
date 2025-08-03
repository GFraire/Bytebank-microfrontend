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
      router.push("/");
    }
  }, []);

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
    logout();
    router.push("/");
  };

  const renderContent = () => {
    switch (activeView) {
      case "dashboard":
        return <DashboardComponent />;
      case "transactions":
        return <TransactionsComponent />;
      case "add-transaction":
        return <AddTransactionComponent />;
      case "profile":
        return <ProfileComponent />;
      default:
        return <DashboardComponent />;
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-screen bg-gray-50">
      {/* Header Mobile */}
      <MobileHeader onNavigate={handleNavigation} activeView={activeView} />

      {/* Sidebar Desktop */}
      <div className="w-64 flex-shrink-0 sm:hidden md:block">
        <SidebarComponent
          onNavigate={handleNavigation}
          activeView={activeView}
          onLogout={handleLogout}
        />
      </div>

      {/* Área de conteúdo principal */}
      <div className="flex-1 flex flex-col overflow-hidden pb-20 md:pb-0">
        <DashboardHeader
          userName={user?.displayName}
          pageType={activeView}
          showUserProfile={true}
        />
        <div className="flex-1 overflow-auto">{renderContent()}</div>
      </div>

      {/* Navegação Inferior Mobile */}
      <BottomNavigation onNavigate={handleNavigation} activeView={activeView} />
    </div>
  );
}
