import Head from 'next/head'
import styles from '../styles/Home.module.css'
import ToGroup from '../components/toGroup'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>I was late again</title>
        <meta name="description" content="I was late app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
        I was late again
        </h1>

        <p className={styles.description}>
          Create your group
        </p>
        <ToGroup />
      </main>
    </div>
  )
}
