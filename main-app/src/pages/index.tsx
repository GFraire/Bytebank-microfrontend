import Head from 'next/head'
import dynamic from 'next/dynamic'
import Link from 'next/link'

const HomeComponent = dynamic(import('home/Home'), { ssr: false })

export default function Home() {
  return (
    <Head>
      <title>Teste</title>
    </Head>
  )
}
