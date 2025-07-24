import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Button from "./ui/form/Button";
import Label from "./ui/form/Label";
import Input from "./ui/Input";
import Select from "./ui/form/Select";
import { Transaction } from "./Extrato";
import {
  TRANSACTION_CATEGORIES,
  TRANSACTION_TYPES,
} from "../utils/transactionConstants";

const formSchema = z.object({
  type: z.string().min(1, { message: "Selecione um tipo de transação" }),
  amount: z
    .number({
      message: "Valor inválido",
    })
    .min(0.01, { message: "O valor deve ser maior que zero" })
    .max(1000000, { message: "O valor deve ser menor que 1.000.000" }),
  category: z.string().optional(),
  recipient: z.string().optional(),
});

type Inputs = z.infer<typeof formSchema>;

interface TransacaoFormProps {
  fecharModal?: () => void;
  transacaoParaEditar?: Transaction | null;
  onSave?: (transacao: Transaction) => void;
  modo?: "criar" | "editar";
}
export default function TransacaoForm({
  fecharModal,
  transacaoParaEditar,
  onSave,
  modo = "editar",
}: TransacaoFormProps) {
  const {
    register,
    handleSubmit,
    setError,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<Inputs>({
    resolver: zodResolver(formSchema),
    mode: "onBlur",
    defaultValues: {
      type: transacaoParaEditar?.type,
      amount: transacaoParaEditar?.amount,
      category: transacaoParaEditar?.category,
      recipient: transacaoParaEditar?.recipient,
    },
  });
  function handleOnSubmit(data: Inputs) {
    fecharModal?.();
  }

  const formTitle = modo === "editar" ? "Editar transação" : "Nova transação";

  const submitButtonText =
    modo === "editar" ? "Atualizar transação" : "Concluir transação";

  return (
    <section className="flex flex-col w-full items-center justify-center xs:items-start xs:justify-start gap-2">
      {modo == "criar" && <h2 className="title pb-4">{formTitle}</h2>}
      <form onSubmit={handleSubmit(handleOnSubmit)} className="p-2 flex w-full">
        <div className="flex flex-col w-full justify-between xs:items-start xs:justify-start">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 lg:gap-4 justify-between">
            <div className="campo">
              <Label htmlFor="type" className="">
                Tipo de Transação:
              </Label>
              <Select
                options={TRANSACTION_TYPES}
                id="type"
                {...register("type")}
              />
              {errors.type && (
                <p className="text-red-500 text-size-14 mt-1">
                  {errors.type.message}
                </p>
              )}
            </div>
            <div className="campo">
              <Label htmlFor="valor">Valor:</Label>
              <Input
                type="number"
                id="amount"
                placeholder="0,00"
                step=".01"
                min="0.01"
                {...register("amount")}
              />
              {errors.amount && (
                <p className="text-red-500 text-size-14 mt-1">
                  {errors.amount.message}
                </p>
              )}
            </div>
            <div className="campo">
              <Label htmlFor="category">Categoria:</Label>
              <Select
                options={TRANSACTION_CATEGORIES}
                id="category"
                {...register("category")}
              />
              {errors.category && (
                <p className="text-red-500 text-size-14 mt-1">
                  {errors.category?.message}
                </p>
              )}
            </div>
            <div className="campo">
              <Label htmlFor="recipient">Remetente:</Label>
              <Input type="string" id="recipient" {...register("recipient")} />
              {errors.recipient && (
                <p className="text-red-500 text-size-14 mt-1">
                  {errors.recipient?.message}
                </p>
              )}
            </div>
          </div>
          <div className="flex flex-row justify-between gap-2 mt-4 pt-6">
            {modo === "editar" && (
              <Button
                variant="outline"
                type="button"
                className="flex w-25 justify-start "
                onClick={fecharModal}
              >
                Cancelar
              </Button>
            )}
            {modo === "criar" && <p></p>}
            <Button
              className="flex max-w-45 justify-center"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Processando..." : submitButtonText}
            </Button>
          </div>
        </div>
      </form>
    </section>
  );
}
