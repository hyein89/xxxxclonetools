import React from "react";
import Link from "next/link";
import styles from "../styles/module.css";

export default function NotFound() {
  return (
    <div className={styles.notFound}>
      <div className={styles.glitchWrapper}>
        <h1 className={styles.glitch} data-text="404">404</h1>
        <p className={styles.subText}>Oops! The video you’re looking for is missing.</p>
      </div>

      <div className={styles.actions}>
        <Link href="/">
          <a className={styles.homeBtn}>⬅ Back to Homepage</a>
        </Link>
      </div>

      <div className={styles.bgVideo} />
    </div>
  );
}
