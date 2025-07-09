import dynamic from "next/dynamic";
import Head from "next/head";
import React from "react";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Home</title>
      </Head>

      <h1 className="text">Home</h1>
    </div>
  );
}

export async function getStaticProps() {
  return {
    props: {},
  };
}
