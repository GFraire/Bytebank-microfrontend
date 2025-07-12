import dynamic from "next/dynamic";

const DashboardComponent = dynamic(import("dashboard/Dashboard"), {
  ssr: false,
});

const SidebarComponent = dynamic(import("sidebar/Sidebar"), {
  ssr: false,
});

export default function Account() {
  return (
    <div>
      <h1>Account</h1>

      <SidebarComponent />
      <DashboardComponent />
    </div>
  );
}
