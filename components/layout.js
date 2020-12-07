import Header from '../components/header'
import Head from 'next/head'

export default function Layout ({children}) {
  return (
    <>
    <Head>
        <title>Bare Bones</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Header/>
      <main>
        {children}
      </main>
    </>
  )
}