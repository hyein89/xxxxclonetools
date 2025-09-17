// pages/_document.tsx ads popunder
import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* Contoh iklan/head script */}
        <script
          type="text/javascript"
          src="//difficultywithhold.com/4d/ee/fc/4deefc500d18b077c20b3d33e0dccb80.js"
        ></script>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
