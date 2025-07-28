import Head from "next/head";
import React, { useState } from "react";
import { useAuth } from "../../authContext";

import styles from "../styles/Home.module.css";
import Image from "next/image";
import ModalLogin from "../components/modal/modal-login";
import ModalCreateAccount from "../components/modal/modal-create-account";

export default function Home() {
  const { user } = useAuth();

  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);
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
    <>
      <Head>
        <title>Bytebank | Home</title>
        <meta
          name="description"
          content="Um banco digital feito especialmente para você."
        />
      </Head>

      <div className="w-full h-full flex flex-col">
        <header className="bg-black">
          <div
            className={`flex items-center justify-between p-6 m-auto ${styles["container-page"]}`}
          >
            <div className="flex items-center gap-10 tablet:gap-2">
              <Image
                alt="Texto escrito Bytebank"
                className="block object-cover mr-5 tablet:hidden"
                height={32}
                src="/logo.png"
                priority
                width={146}
              />
              <Image
                alt=""
                className="hidden mr-0 object-cover tablet:block"
                height={26}
                src="/logo-mini.png"
                priority
                width={26}
              />
              <span className="text-green text-subtitle font-semibold">
                Sobre
              </span>
              <span className="text-green text-subtitle font-semibold">
                Serviços
              </span>
            </div>
            <ModalLogin
              isOpen={showLoginModal}
              onClose={() => setShowLoginModal(false)}
            />
            <ModalCreateAccount
              isOpen={showSignupModal}
              onClose={() => setShowSignupModal(false)}
            />
            <div className="flex items-center gap-6 tablet:gap-3">
              {!user ? (
                <>
                  <button
                    onClick={() => setShowSignupModal(true)}
                    className="h-12 w-[180px] rounded-lg bg-green border-none text-body font-semibold text-white"
                  >
                    Abrir minha conta
                  </button>
                  <button
                    onClick={() => setShowLoginModal(true)}
                    className="h-12 w-[180px] rounded-lg bg-transparent border-solid border-2 border-green text-body font-semibold text-green"
                  >
                    Já tenho conta
                  </button>
                </>
              ) : null}
            </div>
          </div>
        </header>
        <div
          className={`h-full pb-[150px] ${styles["gradient-background"]} from-primary to-white`}
        >
          <main className={`${styles["container-page"]} mx-auto px-6`}>
            <div className="flex justify-between items-center h-full mt-6 tablet:flex-col tablet:gap-4 tablet:mt-10">
              <p className="max-w-[434px] text-display-xl font-semibold">
                Experimente mais liberdade no controle da sua vida financeira.
                Crie sua conta com a gente!
              </p>
              <Image
                alt="Desenho de uma pessoa segurando dinheiro"
                className="tablet:w-[520px] tablet:h-[390px]"
                priority
                src="/banner.png"
                height={412}
                width={660}
              />
            </div>
            <div className="flex flex-col mt-10 gap-10">
              <h3 className="block text-display-lg font-bold text-center">
                Vantagens do nosso banco:
              </h3>
              <div className="grid grid-cols-4 gap-6 tablet:grid-cols-2">
                {advantageCards.map((card) => {
                  return (
                    <div
                      className="flex items-center flex-col gap-4"
                      key={card.title}
                    >
                      <Image
                        alt={card.alt}
                        height={56}
                        src={`/icons/${card.icon}.svg`}
                        width={73}
                      />
                      <span className="text-green text-display-md font-semibold text-center">
                        {card.title}
                      </span>
                      <p className="text-body text-gray-600 text-center">
                        {card.description}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </main>
        </div>
        <footer className="bg-black">
          <div className="flex justify-between max-w-[1200px] mx-auto text-white py-11 px-6">
            <div className="flex flex-col gap-4">
              <strong>Serviços</strong>
              <span>Conta corrente</span>
              <span>Conta PJ</span>
              <span>Cartão de crédito</span>
            </div>
            <div className="flex flex-col gap-4">
              <strong>Contato</strong>
              <span>0800 004 250 08</span>
              <span>meajuda@bytebank.com.br</span>
              <span>ouvidoria@bytebank.com.br</span>
            </div>
            <div className="flex flex-col items-center gap-6">
              <strong>Desenvolvido por Alura</strong>
              <Image
                alt="Texto escrito Bytebank"
                height={32}
                src="/logo-white.png"
                priority
                width={146}
              />
              <div className="flex gap-6">
                <Image
                  alt=""
                  height={30}
                  src="/icons/instagram.svg"
                  width={30}
                />
                <Image
                  alt=""
                  height={30}
                  src="/icons/whatsapp.svg"
                  width={30}
                />
                <Image alt="" height={30} src="/icons/youtube.svg" width={30} />
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}

export async function getStaticProps() {
  return {
    props: {},
  };
}
