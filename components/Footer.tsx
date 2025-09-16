import { useEffect } from "react";

export default function Footer() {
  useEffect(() => {
    let user_out = true;

function userout() {
  if (user_out) {
    user_out = false;
    setTimeout(() => {
      const url = process.env.NEXT_PUBLIC_LINKOFFER || "https://default-offer.com";
      window.location.replace(url);
    }, 1000);
  }
}


    // optional: attach ke window biar bisa dipanggil global
    (window as any).userout = userout;
  }, []);

  return (
    <>
      {/* Slot iklan */}
      <div className="ads-banner">{/* isi slot iklan */}</div>

      <div className="footer">
        <div className="container">
          <p>
            All models were 18 years of age or older at the time of depiction.
            {process.env.SITE_NAME} has a zero-tolerance policy against illegal pornography.
          </p>
          <p>
            {process.env.SITE_NAME} uses the{" "}
            <a
              href="http://www.rtalabel.org/index.php?content=parents"
              target="_blank"
              rel="noopener noreferrer"
            >
              &quot;Restricted To Adults&quot; (RTA)
            </a>{" "}
            website label to better enable parental filtering.
          </p>
          <p>
            <a target="_blank" href="/info" rel="noopener noreferrer">
              Abuse / DMCA / Contacts
            </a>
          </p>
        </div>
      </div>

      {/* Bubble link */}
      <a
        id="bubble"
        href="/"
        target="_blank"
        rel="nofollow noopener"
      >
        LIVE SEX CAMS
      </a>

      {/* Topline */}
      <div className="topline"></div>
    </>
  );
}
