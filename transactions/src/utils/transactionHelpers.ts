import { Transaction } from "../components/Extrato";

/* Agrupa as transações por mês*/

export function groupTransactionsByMonth(
  transacoes: Transaction[]
): Record<string, Transaction[]> {
  return transacoes.reduce((grupos, transacao) => {
    const mes = transacao.month;
    if (!grupos[mes]) {
      grupos[mes] = [];
    }
    grupos[mes].push(transacao);
    return grupos;
  }, {} as Record<string, Transaction[]>);
}

/* Obtém a última transação do array*/
export function getLastTransaction(
  transacoes: Transaction[]
): Transaction | null {
  return transacoes.length > 0 ? transacoes[0] : null;
}
