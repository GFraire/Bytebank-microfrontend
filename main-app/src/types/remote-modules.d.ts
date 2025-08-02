declare module 'dashboard/Dashboard' {
  const Component: React.ComponentType;
  export default Component;
}

declare module 'sidebar/Sidebar' {
  interface SidebarProps {
    onNavigate?: (view: string) => void;
    activeView?: string;
  }
  const Component: React.ComponentType<SidebarProps>;
  export default Component;
}

declare module 'transactions/Transactions' {
  const Component: React.ComponentType;
  export default Component;
}

declare module 'addTransaction/AddTransaction' {
  const Component: React.ComponentType;
  export default Component;
}

declare module 'profile/Profile' {
  const Component: React.ComponentType;
  export default Component;
}
