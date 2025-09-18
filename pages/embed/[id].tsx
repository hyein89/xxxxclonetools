import { useRouter } from "next/router";
import Head from "next/head";
import { getVideoById } from "../../utils/getVideo";

type Video = {
  id: string;
  title: string;
  embed: string;
  slug?: string;
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

      {/* render full template langsung */}
      <div
        dangerouslySetInnerHTML={{
          __html: `
<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<title>Embed Video - ${video.id}</title>
<style>
    /* Reset minimal */
    *{box-sizing:border-box;margin:0;padding:0}
    html,body{height:100%}

    /* Full-bleed, no "box" — clean centered layout */
    body{
      display:flex;
      align-items:center;
      justify-content:center;
      background:linear-gradient(180deg, #0f172a 0%, #071032 100%);
      color: #e6eef8;
      font-family: Inter, ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial;
      -webkit-font-smoothing:antialiased;
      -moz-osx-font-smoothing:grayscale;
      padding:clamp(12px, 3vw, 32px);
      gap:clamp(12px, 2vh, 24px);
      min-height:100vh;
    }

    /* Container is only for layout alignment (not a boxed card) */
    .wrap{
      width:min(1000px, 96vw);
      display:flex;
      flex-direction:column;
      align-items:center;
      gap:clamp(12px, 2.5vh, 20px);
    }

    h1{
      font-size:clamp(1.05rem, 2.2vw, 1.6rem);
      font-weight:600;
      letter-spacing:0.2px;
    }
    p.lead{
      font-size:clamp(.85rem, 1.6vw, 1.05rem);
      opacity:0.85;
      text-align:center;
      max-width:60ch;
    }

    /* Progress bar (full-width, thin, modern) */
    .progress-wrap{
      width:100%;
      display:flex;
      flex-direction:column;
      gap:clamp(8px, 1.6vh, 12px);
      align-items:center;\    }

    .bar-outer{
      width:100%;
      height:clamp(10px, 1.8vh, 18px);
      background:linear-gradient(90deg, rgba(255,255,255,0.06), rgba(255,255,255,0.03));
      border-radius:999px;
      overflow:hidden;
      position:relative;
    }

    .bar-inner{
      height:100%;
      width:0%;
      border-radius:999px;
      background:linear-gradient(90deg,#6EE7B7 0%, #3B82F6 50%, #7C3AED 100%);
      box-shadow:0 6px 18px rgba(59,130,246,0.18) inset;
      transition:width 200ms linear;
    }

    /* Percentage text overlay — responsive */
    .percent{
      position:relative;
      font-weight:600;
      font-size:clamp(.9rem, 2.2vw, 1.35rem);
      letter-spacing:0.4px;
      display:flex;
      gap:12px;
      align-items:center;
      justify-content:center;
      width:100%;
      color: #e6eef8;
    }

    /* Buttons: hidden until complete */
    .controls{
      display:flex;
      gap:clamp(8px,1.6vh,14px);
      align-items:center;
      justify-content:center;
      margin-top:6px;
      opacity:0;
      transform:translateY(6px);
      transition:opacity 280ms ease, transform 280ms ease;
      pointer-events:none;
    }
    .controls.visible{opacity:1;transform:none;pointer-events:auto}

    button{
      -webkit-tap-highlight-color:transparent;
      border:0;
      padding:clamp(8px,1.6vh,12px) clamp(14px,3vw,18px);
      font-size:clamp(.85rem,1.8vw,1rem);
      border-radius:999px;
      cursor:pointer;
      font-weight:600;
      box-shadow:0 6px 18px rgba(2,6,23,0.6);
    }
    .btn-continue{
      background:linear-gradient(90deg,#10b981,#3b82f6);
      color:white;
    }
    .btn-back{
      background:transparent;
      color:#cfe9ff;
      border:1px solid rgba(255,255,255,0.06);
      backdrop-filter: blur(4px);
    }

    /* Small helpful note for mobile */
    .hint{font-size:.82rem;opacity:0.8}

    /* Make sure everything scales down nicely on very small screens */
    @media (max-width:420px){
      .percent{font-size:1rem}
      button{padding:.6rem 1rem}
    }
      
.sticky-ads{ 
position: fixed; 
bottom: 0; left: 0; 
width: 100%; min-height: 70px; max-height: 200px; 
padding: 5px 0; 
box-shadow: 0 -6px 18px 0 rgba(9,32,76,.1); 
-webkit-transition: all .1s ease-in; transition: all .1s ease-in; 
display: flex; 
align-items: center; 
justify-content: center; 
background-color: #fefefe; z-index: 20; } 

.sticky-ads-close { 
width: 30px; height: 30px; 
display: flex; 
align-items: center; 
justify-content: center; 
border-radius: 12px 0 0; 
position: absolute; right: 0; top: -30px; 
background-color: #fefefe; 
box-shadow: 0 -6px 18px 0 rgba(9,32,76,.08); } 

.sticky-ads .sticky-ads-close svg { width: 22px; height: 22px; fill: #000; } .sticky-ads .sticky-ads-content { overflow: hidden; display: block; position: relative; height: 70px; width: 100%; margin-right: 10px; margin-left: 10px; }
      
body {
  padding-bottom: 260px; /* sesuaikan dengan tinggi iklan mobile (250px) */
}
@media (min-width: 768px) {
  body {
    padding-bottom: 100px; /* sesuaikan dengan tinggi iklan desktop (90px) */
  }
}
.ellipsis {
  display: inline-block;      /* atau block, tergantung kebutuhan */
  max-width: 200px;           /* atur lebar maksimal */
  white-space: nowrap;        /* biar teks tetap satu baris */
  overflow: hidden;           /* sembunyikan yang kelebihan */
  text-overflow: ellipsis;    /* tambahkan "..." di ujung */
  vertical-align: middle;     /* biar sejajar rapi */
}
</style>
</head>
<body>
  <div class="wrap" aria-live="polite">
    <h1 id="title">Loading... Please wait</h1>
    <p class="lead">Please Click <strong>Continue</strong> to proceed to the destination page. <br> <strong>Watch Video <i class="ellipsis">SIMPAN TITLE DISINI</i>
    </strong></p>

    <div class="progress-wrap" role="group" aria-labelledby="title">
      <div class="bar-outer" aria-hidden="false">
        <div class="bar-inner" id="bar" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="0"></div>
      </div>

      <div class="percent" id="percentText">0%</div>
      <div id="statusMsg"></div>

      <div class="controls" id="controls">
        <button class="btn-back" id="btnBack" type="button">Back</button>
        <button class="btn-continue" id="btnContinue" type="button">Continue</button>
      </div>

     <div class="hint">Press <kbd>Esc</kbd> to cancel or <kbd>Enter</kbd> to continue (keyboard access available).</div>
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
      });

      btnBack.addEventListener('click', ()=>{
      statusMsg.textContent = "You choose Back";
      });
 
      // CONFIG: durasi simulasi loading (ms). Kamu bisa ubah sesuai kebutuhan.
      const DURATION = 4200; // 4.2 detik
      // Jika ingin loading yang bergantung pada resource, ganti dengan event dari resource tersebut.

      let start = null;
      let progress = 0;
      let cancelled = false;

      function easeOutCubic(t){ return 1 - Math.pow(1 - t, 3); } // easing yang halus

      function step(timestamp){
        if (cancelled) return finishEarly();
        if (!start) start = timestamp;
        const elapsed = timestamp - start;
        const raw = Math.min(elapsed / DURATION, 1);
        const eased = easeOutCubic(raw);
        progress = Math.floor(eased * 100);

        // update UI
        bar.style.width = progress + '%';
        bar.setAttribute('aria-valuenow', String(progress));
        percentText.textContent = progress + '%';

        if (raw < 1){
          requestAnimationFrame(step);
        } else {
          onComplete();
        }
      }

      function onComplete(){
        title.textContent = 'Finished!';
        // tampilkan controls
        controls.classList.add('visible');
        // fokus ke continue untuk akses keyboard
        btnContinue.focus();
      }

      function finishEarly(){
        title.textContent = 'Canceled';
        controls.classList.add('visible');
        percentText.textContent = '0%';
        bar.style.width = '0%';
      }

      // Tombol actions
      btnContinue.addEventListener('click', ()=>{
        // contoh aksi: redirect, panggil fungsi, dll. Di sini kita tunjukkan notifikasi kecil.
       window.open("https://www.nextsxyphim.eu.org/tube/getid/slug title.html", "_blank");

      });

      btnBack.addEventListener('click', ()=>{
        window.history.back();
      });

      // Keyboard: Enter = continue, Esc = cancel/back
      window.addEventListener('keydown', (e)=>{
        if (e.key === 'Enter' && controls.classList.contains('visible')){
          btnContinue.click();
        }
        if (e.key === 'Escape'){
          cancelled = true;
        }
      });

      // Mulai animasi (langsung) — karena Anda minta layout progres loading
      requestAnimationFrame(step);

      // OPTIONAL: jika Anda ingin memulai ulang dengan klik progress area
      document.querySelector('.progress-wrap').addEventListener('click', ()=>{
        if (controls.classList.contains('visible')){
          // reset dan mulai lagi
          controls.classList.remove('visible');
          start = null; progress = 0; cancelled = false;
          bar.style.width = '0%';
          percentText.textContent = '0%';
          title.textContent = 'Loading... Please wait';
          requestAnimationFrame(step);
        }
      });

    })();
  </script>
    
<div class='sticky-ads' id='sticky-ads'>
<div class='sticky-ads-close' onclick='document.getElementById(&quot;sticky-ads&quot;).style.display=&quot;none&quot;'><svg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'><path d='M278.6 256l68.2-68.2c6.2-6.2 6.2-16.4 0-22.6-6.2-6.2-16.4-6.2-22.6 0L256 233.4l-68.2-68.2c-6.2-6.2-16.4-6.2-22.6 0-3.1 3.1-4.7 7.2-4.7 11.3 0 4.1 1.6 8.2 4.7 11.3l68.2 68.2-68.2 68.2c-3.1 3.1-4.7 7.2-4.7 11.3 0 4.1 1.6 8.2 4.7 11.3 6.2 6.2 16.4 6.2 22.6 0l68.2-68.2 68.2 68.2c6.2 6.2 16.4 6.2 22.6 0 6.2-6.2 6.2-16.4 0-22.6L278.6 256z'/></svg></div>
    
<div class="sticky-ads-content" id="adsArea" style="text-align:center"></div>


<script>
  const adsArea = document.getElementById("adsArea");

  function loadAds() {
    const isMobile = window.matchMedia("(max-width: 767px)").matches;

    // kosongkan dulu isi ads area
    adsArea.innerHTML = "";

    // buat <script> pertama (atOptions)
    const configScript = document.createElement("script");
    configScript.type = "text/javascript";

    if (isMobile) {
      configScript.text = `
        atOptions = {
          'key' : 'ae89121b36c2d2e51cdd80e22c8a9094',
          'format' : 'iframe',
          'height' : 50,
          'width' : 320,
          'params' : {}
        };
      `;
      document.body.style.paddingBottom = "80px"; // sesuai tinggi iklan mobile
      // buat <script> kedua (src)
      const invokeScript = document.createElement("script");
      invokeScript.type = "text/javascript";
      invokeScript.src = "//difficultywithhold.com/ae89121b36c2d2e51cdd80e22c8a9094/invoke.js";
      adsArea.appendChild(configScript);
      adsArea.appendChild(invokeScript);

    } else {
      configScript.text = `
        atOptions = {
          'key' : '7ba438d3cd8bc146fcee8e85b0da8e87',
          'format' : 'iframe',
          'height' : 90,
          'width' : 728,
          'params' : {}
        };
      `;
      document.body.style.paddingBottom = "120px"; // sesuai tinggi iklan desktop
      const invokeScript = document.createElement("script");
      invokeScript.type = "text/javascript";
      invokeScript.src = "//difficultywithhold.com/7ba438d3cd8bc146fcee8e85b0da8e87/invoke.js";
      adsArea.appendChild(configScript);
      adsArea.appendChild(invokeScript);
    }
  }

  // Jalankan sekali saat halaman load
  loadAds();

  // Reload jika ukuran layar berubah
  window.addEventListener("resize", loadAds);
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
