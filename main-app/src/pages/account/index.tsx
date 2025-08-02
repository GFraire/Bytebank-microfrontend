import dynamic from "next/dynamic";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useAuth } from "../../../authContext";
import MobileHeader from "../../components/MobileHeader";
import BottomNavigation from "../../components/BottomNavigation";
import DashboardHeader from "../../components/DashboardHeader";

const DashboardComponent = dynamic(() => import("dashboard/Dashboard"), {
  ssr: false,
});

const SidebarComponent = dynamic(() => import("sidebar/Sidebar"), {
  ssr: false,
});

const TransactionsComponent = dynamic(() => import("transactions/Transactions"), {
  ssr: false,
});

const AddTransactionComponent = dynamic(() => import("addTransaction/AddTransaction"), {
  ssr: false,
});

const ProfileComponent = dynamic(() => import("profile/Profile"), {
  ssr: false,
});

export default function Account() {
  const [activeView, setActiveView] = useState('dashboard');
  const [userProfile, setUserProfile] = useState({ name: 'Usuário' });
  const router = useRouter();
  const { logout } = useAuth();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await fetch('http://localhost:3333/profile/1');
        if (response.ok) {
          const profile = await response.json();
          console.log('Profile fetched:', profile);
          setUserProfile(profile);
        }
      } catch (error) {
        console.error('Erro ao buscar perfil:', error);
      }
    };
    fetchUserProfile();
  }, []);
  
  const handleNavigation = (view: string) => {
    console.log('Main navigation:', view);
    setActiveView(view);
  };

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  const renderContent = () => {
    switch (activeView) {
      case 'dashboard':
        return (
          <>
            <DashboardHeader userName={userProfile.name} pageType="dashboard" showUserProfile={true} />
            <DashboardComponent />
          </>
        );
      case 'transactions':
        return (
          <>
            <DashboardHeader userName={userProfile.name} pageType="transactions" showUserProfile={true} />
            <TransactionsComponent />
          </>
        );
      case 'add-transaction':
        return (
          <>
            <DashboardHeader userName={userProfile.name} pageType="add-transaction" showUserProfile={true} />
            <AddTransactionComponent />
          </>
        );
      case 'profile':
        return (
          <>
            <DashboardHeader userName={userProfile.name} pageType="profile" showUserProfile={true} />
            <ProfileComponent />
          </>
        );
      default:
        return (
          <>
            <DashboardHeader userName={userProfile.name} pageType="dashboard" showUserProfile={true} />
            <DashboardComponent />
          </>
        );
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-screen bg-gray-50">
      {/* Header Mobile */}
      <MobileHeader onNavigate={handleNavigation} activeView={activeView} />
      
      {/* Sidebar Desktop */}
      <div className="w-64 flex-shrink-0 hidden md:block">
        <SidebarComponent onNavigate={handleNavigation} activeView={activeView} onLogout={handleLogout} />
      </div>
      
      {/* Área de conteúdo principal */}
      <div className="flex-1 overflow-auto pb-20 md:pb-0">
        {renderContent()}
      </div>
      
      {/* Navegação Inferior Mobile */}
      <BottomNavigation onNavigate={handleNavigation} activeView={activeView} />
    </div>
  );
}
