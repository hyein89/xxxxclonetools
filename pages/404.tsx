import React from "react";
import Link from "next/link";
import Head from "next/head"; // ⬅️ WAJIB
import styles from "../styles/404.module.css";

export default function NotFound() {
  return (
    <>
      <Head>
        <title>404 Not Found</title>
        <meta name="robots" content="noarchive" />
        <link rel="icon" type="image/png" sizes="32x32" href="/16343308.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/16343308.png" />
        <link rel="apple-touch-icon" href="/16343308.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/16343308.png" />
        <link rel="apple-touch-icon" sizes="120x120" href="/16343308.png" />
        <link rel="apple-touch-icon" sizes="60x60" href="/16343308.png" />
      </Head>

      <div className={styles.notFound}>
        <div className={styles.glitchWrapper}>
          <h1 className={styles.glitch} data-text="404">404</h1>
          <p className={styles.subText}>
            Oops! The video you’re looking for is missing.
          </p>
          <Link href="/" className={styles.homeBtn}>
            Go Back Home
          </Link>
        </div>
      </div>
    </>
  );
}
