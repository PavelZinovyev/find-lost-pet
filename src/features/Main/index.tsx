'use client';

import dynamic from 'next/dynamic';
import styles from './styles.module.scss';

const Map = dynamic(() => import('../../features/Map'), { ssr: false });

const Main = () => {
  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <h1>Find Lost Pet</h1>
      </header>
      <section className={styles.mapSection}>{/* <Map /> */}</section>
    </main>
  );
};
export default Main;
