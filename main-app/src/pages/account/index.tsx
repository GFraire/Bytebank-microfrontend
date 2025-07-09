import dynamic from "next/dynamic";

const HomeComponent = dynamic(import("home/Home"), { ssr: false });

export default function Account() {
  return (
    <div>
      <h1>Account</h1>
      
      <HomeComponent />
    </div>
  );
}
