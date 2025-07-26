import Head from "next/head";
import React from "react";

import styles from "../styles/Home.module.css";

export default function Home() {
  const advantageCards = [
    {
      icon: "present",
      title: "Conta e cartão gratuitos",
      description:
        "Isso mesmo, nossa conta é digital, sem custo fixo e mais que isso: sem tarifa de manutenção.",
      alt: "Presente",
    },
    {
      icon: "withdraw",
      title: "Saques sem custo",
      description:
        "Você pode sacar gratuitamente 4x por mês de qualquer Banco 24h.",
      alt: "Mão retirando dinheiro do caixa",
    },
    {
      icon: "star",
      title: "Programa de pontos",
      description:
        "Você pode acumular pontos com suas compras no crédito sem pagar mensalidade!",
      alt: "Estrela",
    },
    {
      icon: "devices",
      title: "Seguro Dispositivos",
      description:
        "Seus dispositivos móveis (computador e laptop) protegidos por uma mensalidade simbólica.",
      alt: "Notebook, tablet e celular",
    },
  ];

  return (
    <div>
      <Head>
        <title>Bytebank | Home</title>

        <meta
          name="description"
          content="Um banco digital feito especialmente para você."
        />
      </Head>

      <div className="w-full min-h-full flex flex-col">
        <header className="bg-black">
          <div
            className={`flex items-center justify-between p-6 m-auto ${styles["container-page"]}`}
          >
            a
          </div>
        </header>
      </div>
    </div>
  );
}

export async function getStaticProps() {
  return {
    props: {},
  };
}
