interface AuthUser {
  uid: string;
  email: string | null;
  displayName: string | null;
}

declare module "dashboard/Dashboard" {
  interface DashboardProps {
    user: AuthUser | null;
  }

  const Component: React.ComponentType<DashboardProps>;
  export default Component;
}

declare module "dashboard/Styles" {
  const noop: undefined;
  export default noop;
}

declare module "sidebar/Sidebar" {
  interface SidebarProps {
    onNavigate?: (view: string) => void;
    activeView?: string;
    onLogout?: () => void;
  }

  const Component: React.ComponentType<SidebarProps>;
  export default Component;
}

declare module "sidebar/Styles" {
  const noop: undefined;
  export default noop;
}

declare module "transactions/Transactions" {
  interface TransactionsProps {
    user: AuthUser | null;
  }

  const Component: React.ComponentType<TransactionsProps>;
  export default Component;
}

declare module "transactions/Styles" {
  const noop: undefined;
  export default noop;
}

declare module "addTransaction/AddTransaction" {
  interface AddTransactionProps {
    user: AuthUser | null;
  }

  const Component: React.ComponentType<AddTransactionProps>;
  export default Component;
}

declare module "addTransaction/Styles" {
  const noop: undefined;
  export default noop;
}

declare module "profile/Profile" {
  interface ProfileProps {
    user: AuthUser | null;
  }

  const Component: React.ComponentType<ProfileProps>;
  export default Component;
}

declare module "profile/Styles" {
  const noop: undefined;
  export default noop;
}
