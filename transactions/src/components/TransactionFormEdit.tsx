import React, { useState, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import Button from "./ui/form/Button";
import Label from "./ui/form/Label";
import Input from "./ui/Input";
import Select from "./ui/form/Select";
import FileUpload from "./FileUpload";
import { Transaction } from "./Extrato";
import { transactionService } from "../services/transactionService";
import {
  TRANSACTION_CATEGORIES,
  TRANSACTION_TYPES,
} from "../utils/transactionConstants";

const formSchema = z.object({
  type: z.enum(['deposit', 'transfer', 'payment', 'withdrawal'], { message: "Selecione um tipo de transação" }),
  description: z.string().min(3, { message: "Descrição deve ter pelo menos 3 caracteres" }),
  amount: z
    .number({
      message: "Valor inválido",
    })
    .min(0.01, { message: "O valor deve ser maior que zero" })
    .max(1000000, { message: "O valor deve ser menor que 1.000.000" }),
  category: z.string().min(1, { message: "Selecione uma categoria" }),
  date: z.string().min(1, { message: "Data é obrigatória" }),
  recipient: z.string().optional(),
});

type Inputs = z.infer<typeof formSchema>;

interface TransacaoFormProps {
  fecharModal?: () => void;
  transacaoParaEditar?: Transaction | null;
  onSave?: (transacao: Transaction) => void;
  onDelete?: (id: number) => void;
  modo?: "criar" | "editar";
}

export default function TransacaoForm({
  fecharModal,
  transacaoParaEditar,
  onSave,
  onDelete,
  modo = "editar",
}: TransacaoFormProps) {
  const [categorySuggestions, setCategorySuggestions] = useState<string[]>([]);
  const [attachments, setAttachments] = useState<File[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const getSuggestions = (description: string) => {
    const suggestions: Record<string, string[]> = {
      'supermercado': ['Alimentação'],
      'mercado': ['Alimentação'],
      'gasolina': ['Transporte'],
      'uber': ['Transporte'],
      'aluguel': ['Moradia'],
      'salário': ['Trabalho'],
      'freelance': ['Trabalho'],
      'cinema': ['Lazer'],
      'médico': ['Saúde'],
      'farmácia': ['Saúde'],
      'curso': ['Educação'],
      'conta': ['Outros'],
      'imposto': ['Outros'],
      'roupa': ['Outros'],
      'presente': ['Outros'],
      'viagem': ['Lazer'],
    };
    
    const desc = description.toLowerCase();
    for (const [key, cats] of Object.entries(suggestions)) {
      if (desc.includes(key)) {
        return cats;
      }
    }
    return [];
  };

  const {
    register,
    handleSubmit,
    setError,
    reset,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<Inputs>({
    resolver: zodResolver(formSchema),
    mode: "onBlur",
    defaultValues: {
      type: (transacaoParaEditar?.type as 'deposit' | 'transfer' | 'payment' | 'withdrawal') || 'deposit',
      description: transacaoParaEditar?.description || '',
      amount: transacaoParaEditar?.amount || 0,
      category: transacaoParaEditar?.category || '',
      date: transacaoParaEditar?.date ? 
        (transacaoParaEditar.date instanceof Date ? 
          transacaoParaEditar.date.toISOString().split('T')[0] : 
          String(transacaoParaEditar.date).split('T')[0]
        ) : new Date().toISOString().split('T')[0],
      recipient: transacaoParaEditar?.recipient || '',
    },
  });

  const watchDescription = watch('description');

  useEffect(() => {
    if (watchDescription) {
      const suggestions = getSuggestions(watchDescription);
      setCategorySuggestions(suggestions);
    }
  }, [watchDescription]);

  const handleOnSubmit: SubmitHandler<Inputs> = async (data) => {
    setIsLoading(true);
    try {
      const transactionData = {
        description: data.description,
        amount: data.amount,
        type: (data.type === 'deposit' || data.type === 'transfer' ? 'income' : 'expense') as 'income' | 'expense',
        category: data.category,
        date: data.date,
        recipient: data.recipient,
        attachments: attachments.map(f => f.name),
      };

      if (modo === 'editar' && transacaoParaEditar?.id) {
        await transactionService.update(transacaoParaEditar.id, transactionData);
      } else {
        await transactionService.create(transactionData);
      }
      
      onSave?.({} as Transaction); // Apenas sinaliza que houve mudança
      fecharModal?.();
    } catch (error) {
      console.error('Erro ao salvar transação:', error);
      setError('root', { message: 'Erro ao salvar transação' });
    } finally {
      setIsLoading(false);
    }
  }

  const handleDelete = async () => {
    if (!transacaoParaEditar?.id) return;
    
    setIsLoading(true);
    try {
      await transactionService.delete(transacaoParaEditar.id);
      onDelete?.(transacaoParaEditar.id);
      fecharModal?.();
    } catch (error) {
      console.error('Erro ao excluir transação:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const formTitle = modo === "editar" ? "Editar transação" : "Nova transação";
  const submitButtonText = modo === "editar" ? "Atualizar transação" : "Concluir transação";

  return (
    <section className="flex flex-col w-full items-center justify-center xs:items-start xs:justify-start gap-2">
      {modo == "criar" && <h2 className="title pb-4">{formTitle}</h2>}
      <form onSubmit={handleSubmit(handleOnSubmit)} className="p-2 flex w-full">
        <div className="flex flex-col w-full justify-between xs:items-start xs:justify-start">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 lg:gap-4 justify-between">
            <div className="campo">
              <Label htmlFor="type">Tipo de Transação:</Label>
              <Select 
                options={TRANSACTION_TYPES.filter(t => t.value !== '')} 
                id="type" 
                {...register("type")} 
              />
              {errors.type && (
                <p className="text-red-500 text-size-14 mt-1">{errors.type.message}</p>
              )}
            </div>
            
            <div className="campo">
              <Label htmlFor="description">Descrição:</Label>
              <Input
                type="text"
                id="description"
                placeholder="Ex: Supermercado, Salário..."
                {...register("description")}
              />
              {errors.description && (
                <p className="text-red-500 text-size-14 mt-1">{errors.description.message}</p>
              )}
            </div>
            
            <div className="campo">
              <Label htmlFor="amount">Valor:</Label>
              <Input
                type="number"
                id="amount"
                placeholder="0,00"
                step=".01"
                min="0.01"
                {...register("amount", { valueAsNumber: true })}
              />
              {errors.amount && (
                <p className="text-red-500 text-size-14 mt-1">{errors.amount.message}</p>
              )}
            </div>
            
            <div className="campo">
              <Label htmlFor="category">Categoria:</Label>
              <Select
                options={TRANSACTION_CATEGORIES.filter(c => c.value !== '')}
                id="category"
                {...register("category")} 
              />
              {categorySuggestions.length > 0 && (
                <div className="mt-1">
                  <p className="text-xs text-gray-600 mb-1">Sugestões:</p>
                  <div className="flex gap-1 flex-wrap">
                    {categorySuggestions.map(suggestion => (
                      <button
                        key={suggestion}
                        type="button"
                        onClick={() => setValue('category', suggestion)}
                        className="px-2 py-1 text-xs bg-green-100 text-green-700 rounded hover:bg-green-200"
                      >
                        {suggestion}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              {errors.category && (
                <p className="text-red-500 text-size-14 mt-1">{errors.category?.message}</p>
              )}
            </div>
            
            <div className="campo">
              <Label htmlFor="date">Data:</Label>
              <Input type="date" id="date" {...register("date")} />
              {errors.date && (
                <p className="text-red-500 text-size-14 mt-1">{errors.date.message}</p>
              )}
            </div>
            
            <div className="campo">
              <Label htmlFor="recipient">Remetente/Destinatário:</Label>
              <Input type="string" id="recipient" {...register("recipient")} />
              {errors.recipient && (
                <p className="text-red-500 text-size-14 mt-1">{errors.recipient?.message}</p>
              )}
            </div>
          </div>
          
          <div className="campo mt-4">
            <Label htmlFor="attachments">Anexos (Recibos/Documentos):</Label>
            <FileUpload onFilesChange={setAttachments} />
          </div>

          {errors.root && (
            <p className="text-red-500 text-sm mt-2">{errors.root.message}</p>
          )}
          
          <div className="flex flex-row justify-between gap-2 mt-4 pt-6">
            {modo === "editar" && (
              <Button variant="outline" type="button" onClick={fecharModal}>
                Cancelar
              </Button>
            )}
            {modo === "criar" && <div></div>}
            
            <div className="flex gap-2">
              {modo === "editar" && (
                <Button variant="danger" type="button" onClick={handleDelete} disabled={isLoading}>
                  Excluir
                </Button>
              )}
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Processando..." : submitButtonText}
              </Button>
            </div>
          </div>
        </div>
      </form>
    </section>
  );
}