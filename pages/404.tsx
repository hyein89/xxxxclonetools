import React from "react";
import Link from "next/link";
import styles from "../styles/404.module.css"; // ⬅️ penting!

export default function NotFound() {
  return (
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
  );
}
