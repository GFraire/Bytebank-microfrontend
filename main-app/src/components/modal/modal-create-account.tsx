import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/router";
import { useAuth } from "../../../authContext";
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

      const userData = await response.json();

      setUser({
        uid: userData.id.toString(),
        email: userData.email,
        displayName: userData.name,
      });

      // Armazenar o uid no localStorage
      localStorage.setItem("userId", userData.id.toString());

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
          src="/images/ilustracao-cadastro.svg"
          alt="Pessoa com laptop"
          className="mb-6 mx-auto"
        />
        <h2 className="text-black text-s font-bold mb-6 text-start">
          Preencha os campos abaixo para criar sua conta corrente!
        </h2>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full space-y-4 text-left flex-grow overflow-y-auto"
        >
          <div>
            <label
              htmlFor="name"
              className="block text-black text-sm font-medium"
            >
              Nome
            </label>
            <input
              id="name"
              type="text"
              placeholder="Digite seu nome completo"
              className={`w-full p-1.5 h-10 rounded-md border ${
                errors.name ? "border-red-500" : "border-gray-300"
              } bg-white text-black placeholder-gray-500 focus:border-blue-500 focus:outline-none`}
              {...register("name")}
            />
            {errors.name && (
              <p className="text-red-500 text-xs">{errors.name.message}</p>
            )}
          </div>
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
          <div className="flex items-center">
            <input
              id="acceptPolicy"
              type="checkbox"
              className="mr-2"
              {...register("acceptPolicy")}
            />
            <label htmlFor="acceptPolicy" className="text-black text-xs">
              Li e estou ciente quanto às condições de tratamento dos meus dados
              conforme descrito na Política de Privacidade do banco.
            </label>
          </div>
          {errors.acceptPolicy && (
            <p className="text-red-500 text-xs">
              {errors.acceptPolicy.message}
            </p>
          )}
          <div className="flex justify-center mt-4">
            <button
              type="submit"
              className="w-32 bg-orange-500 text-white py-2 px-4 rounded-md font-bold hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500"
            >
              Criar conta
            </button>
          </div>
        </form>
        {error && (
          <p className="text-red-500 text-center mt-4 text-sm">{error}</p>
        )}
      </div>
    </div>
  );
}
