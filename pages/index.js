import Head from 'next/head'
import styles from '../styles/Home.module.css'

import { useCallback, useEffect } from 'react'
import { useWeb3React } from '@web3-react/core'
import { connector } from '../config/web3'


export default function Home() {
  const {
    activate,
    active,
    deactivate,
    account,
    chainId,
    error
  } = useWeb3React()

  const connect = useCallback(() => {
    activate(connector)
    localStorage.setItem('previouslyConnected', true)
  }, [activate])

  const disconnect = () => {
    deactivate()
    localStorage.removeItem('previouslyConnected')
  }

  useEffect(() => {
    if (localStorage.getItem('previouslyConnected') === 'true') {
      connect()
    }
  }, [connect])

  if (error) {
    return <p>Se ha roto algo: {error.message}</p>
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1>web3 demo app</h1>
      {
        active
          ? <>
            <button onClick={disconnect}>Disconnect Wallet</button>
            <p>
              You are connected to {chainId} network.<br/>
              Yout account is: {account}
            </p>
            </>
          : <button onClick={connect}>Connect Wallet</button>
      }
    </div>
  )
}
