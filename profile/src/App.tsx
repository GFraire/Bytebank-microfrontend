import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const API_URL = "http://localhost:3333";

const changePasswordSchema = z
  .object({
    oldPassword: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
    newPassword: z
      .string()
      .min(6, "A nova senha deve ter pelo menos 6 caracteres"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"],
  });

const personalInfoSchema = z.object({
  name: z.string().optional(),
  phone: z.string().optional(),
  cpf: z.string().optional(),
  address: z.string().optional(),
});

type ChangePasswordFormData = z.infer<typeof changePasswordSchema>;
type PersonalInfoFormData = z.infer<typeof personalInfoSchema>;

function App() {
  const [profile, setProfile] = useState<any>(null);
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [showEditInfo, setShowEditInfo] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const passwordForm = useForm<ChangePasswordFormData>({
    resolver: zodResolver(changePasswordSchema),
  });

  const infoForm = useForm<PersonalInfoFormData>({
    resolver: zodResolver(personalInfoSchema),
  });

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      setError("Nenhum usuário logado.");
      setLoading(false);
      return;
    }

    fetch(`${API_URL}/profile/${userId}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Erro ao buscar perfil");
        }
        return res.json();
      })
      .then((data) => {
        setProfile(data);
        infoForm.reset({
          name: data.name || "",
          phone: data.phone || "",
          cpf: data.cpf || "",
          address: data.address || "",
        });
      })
      .catch(() => {
        setError("Falha ao carregar dados da API.");
      })
      .finally(() => setLoading(false));
  }, [infoForm]);

  const onPasswordSubmit = async (data: ChangePasswordFormData) => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      setError("Usuário não está logado");
      return;
    }

    setError(null);
    setSuccess(null);

    try {
      const response = await fetch(`${API_URL}/profile/${userId}`);
      if (!response.ok) {
        throw new Error("Erro ao buscar perfil atual");
      }
      const currentProfile = await response.json();

      if (currentProfile.password !== data.oldPassword) {
        setError("Senha antiga incorreta");
        return;
      }

      const updateResponse = await fetch(`${API_URL}/profile/${userId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: data.newPassword }),
      });

      if (!updateResponse.ok) {
        throw new Error("Erro ao atualizar senha");
      }

      setSuccess("Senha alterada com sucesso!");
      setTimeout(() => setSuccess(null), 5000);
      setShowChangePassword(false);
      passwordForm.reset();
    } catch (err) {
      setError("Erro na troca de senha. Tente novamente.");
    }
  };

  const onInfoSubmit = async (data: PersonalInfoFormData) => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      setError("Usuário não está logado");
      return;
    }

    setError(null);
    setSuccess(null);

    try {
      const { name, ...updateData } = data;

      const updateResponse = await fetch(`${API_URL}/profile/${userId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...profile,
          ...updateData,
          id: userId,
          email: profile.email,
        }),
      });

      if (!updateResponse.ok) {
        throw new Error("Erro ao atualizar informações");
      }

      const updatedProfile = await updateResponse.json();
      setProfile(updatedProfile);
      setSuccess("Informações atualizadas com sucesso!");
      setTimeout(() => setSuccess(null), 5000); // Mensagem de sucesso desaparece após 5 segundos
      setShowEditInfo(false);
    } catch (err) {
      setError("Erro na atualização de informações. Tente novamente.");
    }
  };

  if (loading) {
    return <div>Carregando...</div>;
  }

  if (error && !profile) {
    return <div>{error}</div>;
  }

  const initials = profile.name
    .split(" ")
    .slice(0, 2)
    .map((n: string) => n[0])
    .join("")
    .toUpperCase();

  return (
    <div className="bg-gray-50">
      <main className="p-4 md:p-6">
        <div className="max-w-2xl mx-auto space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center space-x-6">
              <div
                className="w-20 h-20 rounded-full flex items-center justify-center"
                style={{
                  backgroundImage: "linear-gradient(180deg, #4ade80, #22c55e)",
                }}
              >
                <span
                  className="text-3xl font-bold"
                  style={{
                    color: "#ffffff",
                    opacity: 1,
                    visibility: "visible",
                    display: "block",
                  }}
                >
                  {initials}
                </span>
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-gray-900">
                  {profile.name}
                </h2>
                <p className="text-gray-600">{profile.email}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Informações Pessoais
            </h3>
            <form onSubmit={infoForm.handleSubmit(onInfoSubmit)}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nome Completo
                  </label>
                  <input
                    type="text"
                    {...infoForm.register("name")}
                    defaultValue={profile.name || ""}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-gray-200"
                    readOnly
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    E-mail
                  </label>
                  <input
                    type="email"
                    value={profile.email}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-gray-200"
                    readOnly
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Telefone
                  </label>
                  <input
                    type="tel"
                    {...infoForm.register("phone")}
                    defaultValue={profile.phone || ""}
                    className={`w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                      showEditInfo ? "" : "bg-gray-50"
                    }`}
                    readOnly={!showEditInfo}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    CPF
                  </label>
                  <input
                    type="text"
                    {...infoForm.register("cpf")}
                    defaultValue={profile.cpf || ""}
                    className={`w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                      showEditInfo ? "" : "bg-gray-50"
                    }`}
                    readOnly={!showEditInfo}
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Endereço
                  </label>
                  <input
                    type="text"
                    {...infoForm.register("address")}
                    defaultValue={profile.address || ""}
                    className={`w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                      showEditInfo ? "" : "bg-gray-50"
                    }`}
                    readOnly={!showEditInfo}
                  />
                </div>
              </div>
              {error && <p className="text-red-500 text-sm mt-4">{error}</p>}
              {success && (
                <p
                  className="text-sm mt-4"
                  style={{
                    color: "#003012",
                    border: "1px solid #024f1e",
                    padding: "16px",
                    textAlign: "center",
                    backgroundColor: "#b2f4ca",
                    borderRadius: "8px",
                  }}
                >
                  {success}
                </p>
              )}
              <div className="mt-6 flex space-x-3">
                <button
                  type="button"
                  onClick={() => setShowEditInfo(!showEditInfo)}
                  className="px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
                  style={{
                    backgroundColor: "#16a34a",
                    color: "#ffffff",
                    display: "block",
                  }}
                >
                  {showEditInfo ? "Cancelar" : "Editar Informações"}
                </button>
                {showEditInfo && (
                  <button
                    type="submit"
                    className="px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
                    style={{
                      backgroundColor: "#16a34a",
                      color: "#ffffff",
                      display: "block",
                    }}
                  >
                    Salvar Informações
                  </button>
                )}
              </div>
            </form>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Segurança
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div>
                  <h4 className="font-medium text-gray-900">Alterar Senha</h4>
                  <p className="text-sm text-gray-600">
                    Mantenha sua conta segura
                  </p>
                </div>
                <button
                  onClick={() => setShowChangePassword(!showChangePassword)}
                  className="px-4 py-2 rounded-lg hover:bg-green-50 transition-colors"
                  style={{
                    color: "#47A138",
                    borderColor: "#47A138",
                    display: "block",
                  }}
                >
                  {showChangePassword ? "Cancelar" : "Alterar"}
                </button>
              </div>
            </div>
            {showChangePassword && (
              <form
                onSubmit={passwordForm.handleSubmit(onPasswordSubmit)}
                className="mt-6 space-y-4"
              >
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Senha Antiga
                  </label>
                  <input
                    type="password"
                    {...passwordForm.register("oldPassword")}
                    className={`w-full p-3 border ${
                      passwordForm.formState.errors.oldPassword
                        ? "border-red-500"
                        : "border-gray-300"
                    } rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent`}
                  />
                  {passwordForm.formState.errors.oldPassword && (
                    <p className="text-red-500 text-xs mt-1">
                      {passwordForm.formState.errors.oldPassword.message}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nova Senha
                  </label>
                  <input
                    type="password"
                    {...passwordForm.register("newPassword")}
                    className={`w-full p-3 border ${
                      passwordForm.formState.errors.newPassword
                        ? "border-red-500"
                        : "border-gray-300"
                    } rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent`}
                  />
                  {passwordForm.formState.errors.newPassword && (
                    <p className="text-red-500 text-xs mt-1">
                      {passwordForm.formState.errors.newPassword.message}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Confirme a Nova Senha
                  </label>
                  <input
                    type="password"
                    {...passwordForm.register("confirmPassword")}
                    className={`w-full p-3 border ${
                      passwordForm.formState.errors.confirmPassword
                        ? "border-red-500"
                        : "border-gray-300"
                    } rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent`}
                  />
                  {passwordForm.formState.errors.confirmPassword && (
                    <p className="text-red-500 text-xs mt-1">
                      {passwordForm.formState.errors.confirmPassword.message}
                    </p>
                  )}
                </div>
                {error && <p className="text-red-500 text-sm">{error}</p>}
                {success && <p className="text-green-600 text-sm">{success}</p>}
                <button
                  type="submit"
                  className="px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
                  style={{
                    backgroundColor: "#16a34a",
                    color: "#ffffff",
                    display: "block",
                  }}
                >
                  Salvar Nova Senha
                </button>
              </form>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
