import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { zodResolver } from "@hookform/resolvers/zod";
import { IUserData, useAuth } from "../../contexts/authContext";

import * as z from "zod";
import Image from "next/image";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3333";

const loginSchema = z.object({
  email: z.string().email("E-mail inválido"),
  password: z.string().min(6, "Senha deve ter pelo menos 6 caracteres"),
});

type LoginFormData = z.infer<typeof loginSchema>;

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
      <div className="bg-[#f8f8f8] w-[500px] max-h-[90vh] rounded-2xl shadow-2xl relative flex flex-col overflow-hidden">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-800 text-2xl font-light z-10 w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-200 transition-colors"
        >
          ×
        </button>
        <div className="px-12 py-8 flex flex-col h-full">
          <Image
            width={160}
            height={220}
            src="/icons/ilustracao-login.svg"
            alt="Pessoa com celular"
            className="w-40 mb-8 mx-auto"
          />
          <h2 className="text-black text-2xl font-bold mb-8 text-center">Login</h2>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full space-y-6 text-left flex-grow"
          >
          <div>
            <label
              htmlFor="email"
              className="block text-black text-sm font-medium mb-2"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="Digite seu email"
              className={`w-full p-3 h-12 rounded-lg border ${
                errors.email ? "border-red-500" : "border-gray-300"
              } bg-white text-black placeholder-gray-500 focus:ring-2 focus:ring-[#47a138] focus:border-transparent focus:outline-none transition-all`}
              {...register("email")}
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
            )}
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-black text-sm font-medium mb-2"
            >
              Senha
            </label>
            <input
              id="password"
              type="password"
              placeholder="Digite sua senha"
              className={`w-full p-3 h-12 rounded-lg border ${
                errors.password ? "border-red-500" : "border-gray-300"
              } bg-white text-black placeholder-gray-500 focus:ring-2 focus:ring-[#47a138] focus:border-transparent focus:outline-none transition-all`}
              {...register("password")}
            />
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>
            )}
          </div>
          <div className="text-left mb-6">
            <a
              href="/forgot-password"
              className="text-[#47a138] text-sm underline hover:text-[#3b8a2f] transition-colors"
            >
              Esqueci a senha
            </a>
            {error && <p className="text-red-500 text-sm mt-3">{error}</p>}
          </div>
          <div className="flex justify-center pb-4">
            <button
              type="submit"
              className="w-full bg-[#47a138] text-white py-3 px-6 rounded-lg font-semibold hover:bg-[#3b8a2f] focus:outline-none focus:ring-2 focus:ring-[#47a138] focus:ring-opacity-50 transition-colors shadow-sm"
            >
              Acessar
            </button>
          </div>
        </form>
        </div>
      </div>
    </div>
  );
}
