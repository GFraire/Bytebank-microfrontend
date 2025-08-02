import React from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { useAuth } from "../../../authContext";

const getInitials = (name: string | null) => {
  if (!name) return "";
  const words = name.split(" ").filter(Boolean);
  if (words.length >= 2) {
    return `${words[0][0]}${words[words.length - 1][0]}`.toUpperCase();
  }
  return words[0]?.[0]?.toUpperCase() || "";
};

const Navbar: React.FC = () => {
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  if (!user?.displayName) {
    return null;
  }

  const initials = getInitials(user.displayName);

  return (
    <nav className="bg-[#004d61] text-white p-4">
      <div className="max-w-[1234px] mx-auto w-full flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center font-bold text-white">
            {initials}
          </div>
          <span className="text-sm font-medium">{user.displayName}</span>
        </div>
        <button
          onClick={handleLogout}
          title="Sair da conta"
          className="hover:bg-teal-800 p-1 rounded transition"
          aria-label="Logout"
        >
          <Image width={25} height={25} src="/logout.png" alt="Logout" />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
