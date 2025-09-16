import Link from "next/link";

export default function Header() {
  return (
    <div className="header">
      <div className="container">
        <Link href="/" className="logo">
          {process.env.SITE_NAME}
        </Link>

        <div className="search">
          <form id="searchform" method="get" action="/search" target="_self">
            <input
              type="search"
              className="sf"
              name="q"
              placeholder="Search"
              autoCapitalize="off"
              autoCorrect="off"
            />
          </form>
        </div>
      </div>
    </div>
  );
}
