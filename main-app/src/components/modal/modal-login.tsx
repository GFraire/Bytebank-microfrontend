import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Image from "next/image";
import { useAuth } from "../../../authContext";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3333";

const loginSchema = z.object({
  email: z.string().email("E-mail inválido"),
  password: z.string().min(6, "Senha deve ter pelo menos 6 caracteres"),
});

type LoginFormData = z.infer<typeof loginSchema>;

interface IUserData {
  id: string;
  name: string;
  email: string;
  password: string;
}

interface ModalLoginProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ModalLogin({ isOpen, onClose }: ModalLoginProps) {
  const { setUser } = useAuth();
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      const response = await fetch(`${API_URL}/profile?email=${data.email}`);
      if (!response.ok) {
        throw new Error("Erro ao conectar ao servidor: " + response.statusText);
      }

      const userData: IUserData[] = await response.json();
      const user = userData[0];

      if (user.password !== data.password) {
        throw new Error("Credenciais inválidas");
      }

      setUser({
        uid: user.id.toString(),
        email: user.email,
        displayName: user.name,
      });

      // Armazenar o uid no localStorage
      localStorage.setItem("userId", user.id.toString());

      onClose();
      router.push("/account");
    } catch (err) {
      setError((err as Error).message);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-[#f8f8f8] w-[600px] h-screen pl-20 pr-20 pt-6 relative flex flex-col">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-600 text-xl"
        >
          ×
        </button>
        <Image
          width={192}
          height={261}
          src="/images/ilustracao-login.svg"
          alt="Pessoa com celular"
          className="w-48 mb-6 mx-auto"
        />
        <h2 className="text-black text-xl font-bold mb-6 text-center">Login</h2>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full space-y-4 text-left flex-grow overflow-y-auto"
        >
          <div>
            <label
              htmlFor="email"
              className="block text-black text-sm font-medium"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="Digite seu email"
              className={`w-full p-1.5 h-10 rounded-md border ${
                errors.email ? "border-red-500" : "border-gray-300"
              } bg-white text-black placeholder-gray-500 focus:border-blue-500 focus:outline-none`}
              {...register("email")}
            />
            {errors.email && (
              <p className="text-red-500 text-xs">{errors.email.message}</p>
            )}
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-black text-sm font-medium"
            >
              Senha
            </label>
            <input
              id="password"
              type="password"
              placeholder="Digite sua senha"
              className={`w-full p-1.5 h-10 rounded-md border ${
                errors.password ? "border-red-500" : "border-gray-300"
              } bg-white text-black placeholder-gray-500 focus:border-blue-500 focus:outline-none`}
              {...register("password")}
            />
            {errors.password && (
              <p className="text-red-500 text-xs">{errors.password.message}</p>
            )}
          </div>
          <div className="text-left -mt-2">
            <a
              href="/forgot-password"
              className="text-[#47a138] text-sm underline hover:text-[#3b8a2f]"
            >
              Esqueci a senha
            </a>
            {error && <p className="text-red-500 text-base mt-2">{error}</p>}
          </div>
          <div className="flex justify-center mt-4">
            <button
              type="submit"
              className="w-32 bg-[#47a138] text-white py-2 px-4 rounded-md font-bold hover:bg-[#3b8a2f] focus:outline-none focus:ring-2 focus:ring-[#47a138]"
            >
              Acessar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
