import type { AppProps } from "next/app";
import Layout from "../components/Layout"; // sesuaikan path

import "../styles/globals.css"; // css global lu

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
