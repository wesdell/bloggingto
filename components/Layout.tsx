import { type ReactNode } from 'react';

import Head from 'next/head';

import { Header } from './';

interface Props {
  children: ReactNode
  title: string
  description: string
}

export function Layout({ children, title, description }: Props) {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.png" />
        <meta name="og:title" content={title} />
        <meta name="og:description" content={description} />
      </Head>
      <Header />
      <main>
        {children}
      </main>
    </>
  );
}
