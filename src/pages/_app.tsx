import type { AppProps } from 'next/app';
import Head from 'next/head';
import 'maplibre-gl/dist/maplibre-gl.css';
import '../styles/globals.css';

import { QueryProvider } from '@/shared/providers/QueryProvider';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Помощь потерявшимся питомцам</title>
      </Head>
      <QueryProvider>
        <Component {...pageProps} />
      </QueryProvider>
    </>
  );
}
