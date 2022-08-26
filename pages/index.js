import Head  from 'next/head'
// import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Header from '../components/Header'
import List from '../components/List'
import Map from '../components/Map'


export default function Home() {

  return (
    <div className={styles.container}>
      <Head>
        <title>Airbnb Clone</title>
        <meta name="description" content="Airbnb clone created with NextJS" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main  className={styles.main}>
        <Header></Header>
        <List></List>
        {/* <Map /> */}
      </main>

    </div>
  )
}
