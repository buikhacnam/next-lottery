import type { NextPage } from 'next'
import Head from 'next/head'
import Header from '../components/Header'
import LotteryEntrance from '../components/LotteryEntrance'
import ManualHeader from '../components/ManualHeader'

const Home: NextPage = () => {
  return (
    <>
    <Head>
      <title>Smart Contract Lottery</title>
      <link rel="icon" href="/favicon.ico" />
      <meta name="description" content="Smart Contract Lottery" />
    </Head>
    {/* <ManualHeader /> */}
    <Header />
    <LotteryEntrance />
    </>
  )
}

export default Home
