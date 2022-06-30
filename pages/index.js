import Head from 'next/head'
import styles from '../styles/Home.module.css'
import ToGroup from '../components/ToGroup'
import { Text, List, ListIcon, ListItem } from '@chakra-ui/react'
import {CheckCircleIcon} from '@chakra-ui/icons';
import BoxDemo from '../components/BoxDemo';

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>I was late</title>
        <meta name="description" content="I was late app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.mainWrapper}>
      <main className={styles.main}>
        <h1 className={styles.title}>
        I was late
        </h1>

        <p className={styles.description}>
          Create your group
        </p>
        <ToGroup />
      </main>
      </div>
      <div className={styles.scrollBox}>
      <div className={styles.scrollBoxText}>
      <List spacing={4}>
        <Text fontSize='xl'>The perfect tool for making team members show up on time</Text>
        <ListItem>
          <ListIcon as={CheckCircleIcon} color='green.500' />
            Create your group
          </ListItem>
          <ListItem>
          <ListIcon as={CheckCircleIcon} color='green.500' />
            Share your group URL
          </ListItem>
          <ListItem>
          <ListIcon as={CheckCircleIcon} color='green.500' />
          Register late arrivals
          </ListItem>
        </List>
      </div>
      </div>
      <div className={styles.demo}>
      <BoxDemo />
      </div>
    </div>
  )
}
