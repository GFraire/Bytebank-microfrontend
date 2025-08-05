import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/router";
import { IUserData, useAuth  } from "../../contexts/authContext";
import * as z from "zod";
import Image from "next/image";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3333";

const signupSchema = z.object({
  name: z.string().min(3, "Nome deve ter pelo menos 3 caracteres"),
  email: z.string().email("Dado incorreto. Revise e digite novamente."),
  password: z.string().min(6, "Senha deve ter pelo menos 6 caracteres"),
  acceptPolicy: z
    .boolean()
    .refine((val) => val === true, "Aceite a política de privacidade"),
});

type SignupFormData = z.infer<typeof signupSchema>;

interface ModalCreateAccountProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ModalCreateAccount({
  isOpen,
  onClose,
}: ModalCreateAccountProps) {
  const { setUser } = useAuth();
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = async (data: SignupFormData) => {
    try {
      const newProfile = {
        name: data.name,
        email: data.email,
        password: data.password,
      };

      const response = await fetch(`${API_URL}/profile`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newProfile),
      });

      if (!response.ok) {
        throw new Error("Erro ao criar perfil: " + response.statusText);
      }

      const userData: IUserData = await response.json();

      setUser({
        uid: userData.id.toString(),
        email: userData.email,
        displayName: userData.name,
      });

      // Armazenar o uid no localStorage
      localStorage.setItem("userId", userData.id.toString());

      onClose();
      
      router.push("account");
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
        <div className="px-12 py-8 flex flex-col h-full overflow-y-auto">
          <Image
            width={160}
            height={220}
            src="/icons/ilustracao-cadastro.svg"
            alt="Pessoa com laptop"
            className="w-40 mb-6 mx-auto"
          />
          <h2 className="text-black text-lg font-bold mb-8 text-center leading-relaxed">
            Preencha os campos abaixo para criar sua conta corrente!
          </h2>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full space-y-6 text-left flex-grow"
          >
          <div>
            <label
              htmlFor="name"
              className="block text-black text-sm font-medium mb-2"
            >
              Nome
            </label>
            <input
              id="name"
              type="text"
              placeholder="Digite seu nome completo"
              className={`w-full p-3 h-12 rounded-lg border ${
                errors.name ? "border-red-500" : "border-gray-300"
              } bg-white text-black placeholder-gray-500 focus:ring-2 focus:ring-[#47a138] focus:border-transparent focus:outline-none transition-all`}
              {...register("name")}
            />
            {errors.name && (
              <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
            )}
          </div>
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
          <div className="flex items-start gap-3">
            <input
              id="acceptPolicy"
              type="checkbox"
              className="mt-1 w-4 h-4 text-[#47a138] border-gray-300 rounded focus:ring-[#47a138] focus:ring-2"
              {...register("acceptPolicy")}
            />
            <label htmlFor="acceptPolicy" className="text-black text-sm leading-relaxed">
              Li e estou ciente quanto às condições de tratamento dos meus dados
              conforme descrito na Política de Privacidade do banco.
            </label>
          </div>
          {errors.acceptPolicy && (
            <p className="text-red-500 text-xs mt-1">
              {errors.acceptPolicy.message}
            </p>
          )}
          <div className="flex justify-center pt-4 pb-4">
            <button
              type="submit"
              className="w-full bg-[#47a138] text-white py-3 px-6 rounded-lg font-semibold hover:bg-[#3b8a2f] focus:outline-none focus:ring-2 focus:ring-[#47a138] focus:ring-opacity-50 transition-colors shadow-sm"
            >
              Criar conta
            </button>
          </div>
          {error && (
            <p className="text-red-500 text-center text-sm">{error}</p>
          )}
        </form>
        </div>
      </div>
    </div>
  );
}
