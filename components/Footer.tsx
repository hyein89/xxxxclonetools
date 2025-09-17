export default function Footer() {
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
