import { useRouter } from "next/router";
import Head from "next/head";
import { getVideoById } from "../../utils/getVideo";

type Video = {
  id: string;
  title: string;
  embed: string;
};

export default function EmbedPage() {
  const router = useRouter();
  const { id } = router.query;

  if (!router.isReady) return null;

  const video: Video | null =
    typeof id === "string" ? (getVideoById(id) as Video | null) : null;

  if (!video) {
    return <div>Video not found</div>;
  }

  return (
    <>
      <Head>
        <title>{video.title} - Embed</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      <div
        dangerouslySetInnerHTML={{
          __html: `
<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<title>${video.title} - ${video.id}</title>
<style>
${/* ⬇️ Copy semua CSS lo ke sini */ ""}
${require("fs").readFileSync("public/embed.css", "utf8")}
</style>
</head>
<body>
  <div class="wrap" aria-live="polite">
    <h1 id="title">Loading... Please wait</h1>
    <p class="lead">
      Please Click <strong>Continue</strong> to proceed to the destination page. <br>
      <strong>Watch Video <i class="ellipsis">${video.title}</i></strong>
    </p>

    <div class="progress-wrap" role="group" aria-labelledby="title">
      <div class="bar-outer" aria-hidden="false">
        <div class="bar-inner" id="bar" role="progressbar"
          aria-valuemin="0" aria-valuemax="100" aria-valuenow="0"></div>
      </div>

      <div class="percent" id="percentText">0%</div>
      <div id="statusMsg"></div>

      <div class="controls" id="controls">
        <button class="btn-back" id="btnBack" type="button">Back</button>
        <button class="btn-continue" id="btnContinue" type="button">Continue</button>
      </div>

      <div class="hint">Press <kbd>Esc</kbd> to cancel or <kbd>Enter</kbd> to continue.</div>
    </div>
  </div>

  <script>
  (function(){
    const bar = document.getElementById('bar');
    const percentText = document.getElementById('percentText');
    const controls = document.getElementById('controls');
    const btnContinue = document.getElementById('btnContinue');
    const btnBack = document.getElementById('btnBack');
    const title = document.getElementById('title');
    const statusMsg = document.getElementById('statusMsg');

    btnContinue.addEventListener('click', ()=>{
      statusMsg.textContent = "You select Continue";
      window.open("${video.embed}", "_blank");
    });

    btnBack.addEventListener('click', ()=>{
      statusMsg.textContent = "You choose Back";
      window.history.back();
    });

    const DURATION = 4200;
    let start = null;
    let cancelled = false;

    function easeOutCubic(t){ return 1 - Math.pow(1 - t, 3); }

    function step(timestamp){
      if (cancelled) return;
      if (!start) start = timestamp;
      const elapsed = timestamp - start;
      const raw = Math.min(elapsed / DURATION, 1);
      const eased = easeOutCubic(raw);
      const progress = Math.floor(eased * 100);

      bar.style.width = progress + '%';
      bar.setAttribute('aria-valuenow', String(progress));
      percentText.textContent = progress + '%';

      if (raw < 1){
        requestAnimationFrame(step);
      } else {
        title.textContent = 'Finished!';
        controls.classList.add('visible');
        btnContinue.focus();
      }
    }

    window.addEventListener('keydown', (e)=>{
      if (e.key === 'Enter' && controls.classList.contains('visible')){
        btnContinue.click();
      }
      if (e.key === 'Escape'){
        cancelled = true;
      }
    });

    requestAnimationFrame(step);
  })();
  </script>

  <div class="sticky-ads" id="sticky-ads">
    <div class="sticky-ads-close"
      onclick="document.getElementById('sticky-ads').style.display='none'">
      <svg viewBox="0 0 512 512"><path d="M278.6 256l68.2-68.2c6.2-6.2..."/></svg>
    </div>
    <div class="sticky-ads-content" id="adsArea"></div>
    <script>
      (function(){
        const adsArea = document.getElementById("adsArea");
        function loadAds() {
          const isMobile = window.matchMedia("(max-width: 767px)").matches;
          adsArea.innerHTML = "";
          const configScript = document.createElement("script");
          configScript.type = "text/javascript";
          if (isMobile) {
            configScript.text = \`
              atOptions = {
                'key' : 'ae89121b36c2d2e51cdd80e22c8a9094',
                'format' : 'iframe',
                'height' : 50,
                'width' : 320,
                'params' : {}
              };
            \`;
            const invokeScript = document.createElement("script");
            invokeScript.src = "//difficultywithhold.com/ae89121b36c2d2e51cdd80e22c8a9094/invoke.js";
            adsArea.appendChild(configScript);
            adsArea.appendChild(invokeScript);
          } else {
            configScript.text = \`
              atOptions = {
                'key' : '7ba438d3cd8bc146fcee8e85b0da8e87',
                'format' : 'iframe',
                'height' : 90,
                'width' : 728,
                'params' : {}
              };
            \`;
            const invokeScript = document.createElement("script");
            invokeScript.src = "//difficultywithhold.com/7ba438d3cd8bc146fcee8e85b0da8e87/invoke.js";
            adsArea.appendChild(configScript);
            adsArea.appendChild(invokeScript);
          }
        }
        loadAds();
        window.addEventListener("resize", loadAds);
      })();
    </script>
  </div>
</body>
</html>
          `,
        }}
      />
    </>
  );
}
