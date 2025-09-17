// pages/_document.tsx ads popunder
import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* Contoh iklan/head script */}
        <script
          type="text/javascript"
          src="//difficultywithhold.com/a7/0c/53/a70c53ec64dade158b084af93e2acf60.js"
        ></script>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
