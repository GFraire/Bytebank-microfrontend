import React from "react";

interface AppSidebarProps {
  onNavigate?: (view: string) => void;
  activeView?: string;
  onLogout?: () => void;
}

function AppSidebar({
  onNavigate,
  activeView = "dashboard",
  onLogout,
}: AppSidebarProps) {
  const menuItems = [
    {
      id: "dashboard",
      icon: (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
          />
        </svg>
      ),
      label: "Dashboard",
    },
    {
      id: "transactions",
      icon: (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
          />
        </svg>
      ),
      label: "Transações",
    },
    {
      id: "add-transaction",
      icon: (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
          />
        </svg>
      ),
      label: "Nova Transação",
    },
    {
      id: "profile",
      icon: (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
          />
        </svg>
      ),
      label: "Perfil",
    },
  ];

  const handleNavigation = (viewId: string) => {
    if (onNavigate) {
      onNavigate(viewId);
    } else {
      console.error("onNavigate function not provided to sidebar");
    }
  };

  return (
    <aside className="bg-white border-r border-gray-200 text-gray-900 w-64 h-screen p-6 shadow-sm flex flex-col" role="navigation" aria-label="Menu principal">
      {/* Logo */}
      <div className="flex items-center space-x-3 px-4 py-3">
        <div className="mb-8">
          <img src="/logo.png" alt="ByteBank - Logotipo do banco digital" className="h-8 w-auto" />
          <p className="text-gray-600 text-sm">Seu banco digital</p>
        </div>
      </div>

      {/* Menu */}
      <nav className="space-y-2 flex-1 mt-10" role="menu">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => handleNavigation(item.id)}
            className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors text-left focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
            style={{
              backgroundColor:
                activeView === item.id ? "#22c55e" : "transparent",
              color: activeView === item.id ? "white" : "#374151",
              fontWeight: activeView === item.id ? "500" : "400",
            }}
            onMouseEnter={(e) => {
              if (activeView !== item.id) {
                e.currentTarget.style.backgroundColor = "#f3f4f6";
                e.currentTarget.style.color = "#111827";
              }
            }}
            onMouseLeave={(e) => {
              if (activeView !== item.id) {
                e.currentTarget.style.backgroundColor = "transparent";
                e.currentTarget.style.color = "#374151";
              }
            }}
            aria-label={`Navegar para ${item.label}`}
            aria-current={activeView === item.id ? "page" : undefined}
            role="menuitem"
            type="button"
          >
            <div className="w-5 h-5" aria-hidden="true">{item.icon}</div>
            <span>{item.label}</span>
          </button>
        ))}
      </nav>

      {/* Footer */}
      <div className="border-t border-gray-200 pt-4">
        <button
          onClick={onLogout}
          className="flex items-center space-x-2 text-gray-600 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 rounded-lg p-2"
          onMouseEnter={(e) => {
            e.currentTarget.style.color = "#dc2626";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = "#6b7280";
          }}
          aria-label="Sair da conta"
          type="button"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
            />
          </svg>
          <span>Sair</span>
        </button>
      </div>
    </aside>
  );
}

export default AppSidebar;
