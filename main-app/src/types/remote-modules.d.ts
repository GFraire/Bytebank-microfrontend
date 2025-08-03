declare module "dashboard/Dashboard" {
  const Component: React.ComponentType;
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
  const Component: React.ComponentType;
  export default Component;
}

declare module "transactions/Styles" {
  const noop: undefined;
  export default noop;
}

declare module "addTransaction/AddTransaction" {
  const Component: React.ComponentType;
  export default Component;
}

declare module "addTransaction/Styles" {
  const noop: undefined;
  export default noop;
}

declare module "profile/Profile" {
  const Component: React.ComponentType;
  export default Component;
}

declare module "profile/Styles" {
  const noop: undefined;
  export default noop;
}
