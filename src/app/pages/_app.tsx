"use client"
import { ClerkProvider } from '@clerk/nextjs';
import { AppProps } from 'next/app';
import '../styles/globals.css';
import HomePage from '.';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ClerkProvider>
      <HomePage/>
      <Component {...pageProps} />
    </ClerkProvider>
  );
}

export default MyApp;