import dynamic from "next/dynamic";
import Head from "next/head";

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

export default function Account() {
  return (
    <>
      <Head>
        <title>Bytebank | Serviços</title>
      </Head>

      <div className="bg-background flex flex-col gap-6 w-full grow">
        <ProfileComponent />

        <div className="flex gap-6 max-w-[1232px] px-4 mx-auto pb-6 h-full w-full tablet:flex-col tablet:px-[60px] mobile:px-4">
          <SidebarComponent />

          <main>
            <DashboardComponent />
            <AddTransactionComponent />
          </main>
          <TransactionsComponent />
        </div>
      </div>
    </>
  );
}
