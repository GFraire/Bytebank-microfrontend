import dynamic from "next/dynamic";
import Head from "next/head";
import React from "react";
import "../../../design-system/globals.css";
// import "../../styles/globals.css";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Home</title>
      </Head>

      <h1 className="text">Home OK</h1>
    </div>
  );
}

export async function getStaticProps() {
  return {
    props: {},
  };
}
