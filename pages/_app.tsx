// pages/_app.tsx
import type { AppProps } from "next/app";
import Layout from "../components/Layout";
import "../styles/globals.css";
import Script from "next/script";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      {/* Google Analytics - ganti G-XXXXXXX dengan GA Measurement ID kamu */}
      <Script
        strategy="afterInteractive"
        src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXX"
      />
      <Script
        id="ga-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-XXXXXXX');
          `,
        }}
      />

      {/* Histats - ganti ID sesuai akunmu */}
      <Script
        id="histats"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            var _Hasync= _Hasync|| [];
            _Hasync.push(['Histats.start', '1,4828760,4,0,0,0,00000000']);
            _Hasync.push(['Histats.fasi', '1']);
            _Hasync.push(['Histats.track_hits', '']);
            (function() {
              var hs = document.createElement('script'); hs.type = 'text/javascript'; hs.async = true;
              hs.src = ('https://s10.histats.com/js15_as.js');
              (document.head || document.body).appendChild(hs);
            })();
          `,
        }}
      />

      {/* App layout */}
      <Layout>
        <Component {...pageProps} />
      </Layout>

      {/* Histats noscript fallback (gambar tanpa border via style) */}
      <noscript>
        <a href="https://www.histats.com" target="_blank" rel="noreferrer">
          <img
            src="https://sstatic1.histats.com/0.gif?4828760&101"
            alt="histats"
            style={{ border: 0 }}
          />
        </a>
      </noscript>
    </>
  );
}
