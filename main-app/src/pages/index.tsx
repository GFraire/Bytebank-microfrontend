import Head from "next/head";
import React, { useState } from "react";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import ModalLogin from "../components/modal/modal-login";
import ModalCreateAccount from "../components/modal/modal-create-account";

export default function Home() {
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
            className={`flex items-center justify-between py-4 px-6 tablet:px-4 mobile:px-4 m-auto ${styles["container-page"]}`}
          >
            <div className="flex items-center gap-8 tablet:gap-4 mobile:gap-2">
              <Image
                alt="Texto escrito Bytebank"
                className="block object-cover tablet:hidden"
                height={28}
                src="/logo.png"
                priority
                width={130}
              />
              <Image
                alt=""
                className="hidden object-cover tablet:block"
                height={24}
                src="/logo-mini.png"
                priority
                width={24}
              />

              <span className="text-green text-sm tablet:text-xs font-medium mobile:hidden hover:text-green-400 cursor-pointer transition-colors">
                Sobre
              </span>

              <span className="text-green text-sm tablet:text-xs font-medium mobile:hidden hover:text-green-400 cursor-pointer transition-colors">
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

            <div className="flex items-center gap-3 tablet:gap-2 mobile:gap-2">
              <button
                onClick={() => setShowSignupModal(true)}
                className="h-10 px-4 tablet:h-9 tablet:px-3 mobile:h-8 mobile:px-3 rounded-md bg-green border-none text-sm tablet:text-xs mobile:text-xs font-medium text-white whitespace-nowrap hover:bg-green-600 transition-colors"
              >
                Abrir conta
              </button>

              <button
                onClick={() => setShowLoginModal(true)}
                className="h-10 px-4 tablet:h-9 tablet:px-3 mobile:h-8 mobile:px-3 rounded-md bg-transparent border border-green text-sm tablet:text-xs mobile:text-xs font-medium text-green whitespace-nowrap hover:bg-green hover:text-white transition-colors"
              >
                Entrar
              </button>
            </div>
          </div>
        </header>
        <div
          className={`pb-[150px] tablet:pb-[70px] mobile:pb-[50px] ${styles["gradient-background"]} from-primary to-white`}
        >
          <main className={`${styles["container-page"]} mx-auto px-6`}>
            <div className="flex justify-between items-center h-full mt-6 tablet:flex-col tablet:gap-6 tablet:mt-10 mobile:text-center">
              <p className="max-w-[434px] text-display-xl tablet:text-display-lg mobile:text-display-md font-semibold tablet:max-w-full">
                Experimente mais liberdade no controle da sua vida financeira.
                Crie sua conta com a gente!
              </p>
              <Image
                alt="Desenho de uma pessoa segurando dinheiro"
                className="tablet:w-[520px] tablet:h-[390px] mobile:w-[300px] mobile:h-[200px]"
                priority
                src="/banner.png"
                height={412}
                width={660}
              />
            </div>
            <div className="flex flex-col mt-10 tablet:mt-8 mobile:mt-6 gap-10 mobile:gap-8">
              <h3 className="block text-display-lg tablet:text-display-md mobile:text-display-sm font-bold text-center">
                Vantagens do nosso banco:
              </h3>

              <div className="grid grid-cols-4 gap-6 tablet:grid-cols-2 tablet:gap-4 mobile:grid-cols-1 mobile:gap-6">
                {advantageCards.map((card) => {
                  return (
                    <div
                      className="flex items-center flex-col gap-4"
                      key={card.title}
                    >
                      <div className="bg-green-50 p-4 rounded-xl">
                        <Image
                          alt={card.alt}
                          height={56}
                          src={`/icons/${card.icon}.svg`}
                          width={73}
                          className="opacity-80"
                        />
                      </div>
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
          <div className="flex justify-between max-w-[1200px] mx-auto text-white py-8 px-6 tablet:px-4 mobile:flex-col mobile:items-start mobile:px-6 mobile:gap-5 mobile:py-5">
            <div className="flex flex-col gap-3 mobile:gap-2">
              <strong className="text-sm mobile:text-xs font-semibold text-green uppercase tracking-wide">Serviços</strong>
              <span className="text-xs mobile:text-xs text-gray-400 hover:text-white cursor-pointer transition-colors">Conta corrente</span>
              <span className="text-xs mobile:text-xs text-gray-400 hover:text-white cursor-pointer transition-colors">Conta PJ</span>
              <span className="text-xs mobile:text-xs text-gray-400 hover:text-white cursor-pointer transition-colors">Cartão de crédito</span>
            </div>
            <div className="flex flex-col gap-3 mobile:gap-2">
              <strong className="text-sm mobile:text-xs font-semibold text-green uppercase tracking-wide">Contato</strong>
              <span className="text-xs mobile:text-xs text-gray-400">0800 004 250 08</span>
              <span className="text-xs mobile:text-xs text-gray-400">meajuda@bytebank.com.br</span>
              <span className="text-xs mobile:text-xs text-gray-400">ouvidoria@bytebank.com.br</span>
            </div>
            <div className="flex flex-col items-center mobile:items-start gap-4 mobile:gap-3">
              <strong className="text-sm mobile:text-xs font-semibold text-green uppercase tracking-wide">Desenvolvido por Alura</strong>
              <div className="flex items-center gap-4 mobile:justify-between mobile:w-full">
                <Image
                  alt="Texto escrito Bytebank"
                  height={28}
                  src="/logo-white.png"
                  priority
                  width={128}
                  className="mobile:h-5 mobile:w-auto"
                />
                <div className="flex gap-3 mobile:gap-2">
                  <Image
                    alt=""
                    height={20}
                    src="/icons/instagram.svg"
                    width={20}
                    className="mobile:h-4 mobile:w-4 opacity-70 hover:opacity-100 transition-opacity cursor-pointer"
                  />
                  <Image
                    alt=""
                    height={20}
                    src="/icons/whatsapp.svg"
                    width={20}
                    className="mobile:h-4 mobile:w-4 opacity-70 hover:opacity-100 transition-opacity cursor-pointer"
                  />
                  <Image alt="" height={20} src="/icons/youtube.svg" width={20} className="mobile:h-4 mobile:w-4 opacity-70 hover:opacity-100 transition-opacity cursor-pointer" />
                </div>
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
