// pages/search.tsx
import { useMemo } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Head from "next/head";
import { getAllVideos } from "../utils/getVideo";
import { slugify } from "../utils/slugify";

// Helper convert detik -> menit
function formatDuration(seconds: string) {
  const mins = Math.floor(parseInt(seconds, 10) / 60);
  return `${mins} min`;
}

export default function SearchPage() {
  const router = useRouter();
  const { q } = router.query;
  const query = (q as string) || "";

  const pageParam = parseInt((router.query.page as string) || "1", 10);

  // Ambil semua video
  const videos = getAllVideos();

  // Filter video berdasarkan title / categories yang mengandung query
  const filteredVideos = videos.filter((video) => {
    const titleMatch = video.title.toLowerCase().includes(query.toLowerCase());
    const categoryMatch = video.categories
      .toLowerCase()
      .includes(query.toLowerCase());
    return titleMatch || categoryMatch;
  });

  // Pagination
  const perPage = 50;
  const totalPages = Math.ceil(filteredVideos.length / perPage);
  const currentPage = Math.min(Math.max(pageParam, 1), totalPages || 1);

  const startIndex = (currentPage - 1) * perPage;
  const endIndex = startIndex + perPage;
  const videosPage = filteredVideos.slice(startIndex, endIndex);

  // Ambil kategori unik
  const categories = Array.from(
    new Set(videos.flatMap((v) => v.categories.split(",")))
  );

  // Random 25 kategori
  const randomCategories = categories
    .sort(() => Math.random() - 0.5)
    .slice(0, 25);

  const siteDomain = process.env.NEXT_PUBLIC_SITE_DOMAIN || "https://example.com";

  // bikin canonical URL sesuai query
  const canonicalUrl = q
    ? `${siteDomain}/search?q=${encodeURIComponent(String(q))}`
    : `${siteDomain}/search`;
  
  return (
    <div className="container">
      <Head>
        <title>
          {query
            ? `Search results for "${query}" - DOMAIN`
            : "Search Videos - DOMAIN"}
        </title>
        <meta
          name="description"
          content={`Search results for "${query}". Enjoy free HD porn videos sorted by categories and tags.`}
        />

      <meta name="robots" content="noarchive"/>
        
      <meta name="robots" content="noarchive" />
      <meta itemProp="image" content="/6211226844449800700.jpg" />
      <meta property="og:image" content="/6211226844449800700.jpg" />
      <meta property="twitter:image:src" content="/6211226844449800700.jpg" />

      <link rel="icon" type="image/png" sizes="32x32" href="/16343308.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/16343308.png" />  
      <link rel="apple-touch-icon" href="/16343308.png" />
      <link rel="apple-touch-icon" sizes="180x180" href="/16343308.png" />
      <link rel="apple-touch-icon" sizes="120x120" href="/16343308.png" />
      <link rel="apple-touch-icon" sizes="60x60" href="/16343308.png" />


      <link rel="canonical" href={canonicalUrl} />  
      </Head>

      {/* Judul */}
      <h1 className="title-bar h2">
        {query ? `Search results for: ${query}` : "Search Videos"}
      </h1>

      {/* Daftar video */}
      <div className="thumbs">
        {videosPage.length > 0 ? (
          videosPage.map((video) => (
            <div className="thumb" key={video.id_video}>
              <div className="thumb-in">
                <Link
                  href={`/tube/${video.id_video}/${slugify(video.title)}.html`}
                  className="thumb-link"
                >
                  <div className="img-wrap">
                    <img
                      className="img"
                      src={video.thumbnail}
                      alt={video.title}
                      loading="lazy"
                    />
                    <div className="len">
                      {formatDuration(video.duration)}
                    </div>
                  </div>
                  <p className="thumb-title">{video.title}</p>
                </Link>
              </div>
            </div>
          ))
        ) : (
          <p>No videos found for "{query}".</p>
        )}
      </div>

      {/* Pagination */}
      {filteredVideos.length > 0 && (
        <div className="pagination">
          {currentPage > 1 ? (
            <Link href={`/search?q=${query}&page=${currentPage - 1}`}>
              &larr;&nbsp;prev
            </Link>
          ) : (
            <span className="disabled">&larr;&nbsp;prev</span>
          )}

          {currentPage < totalPages ? (
            <Link href={`/search?q=${query}&page=${currentPage + 1}`}>
              next&nbsp;&rarr;
            </Link>
          ) : (
            <span className="disabled">next&nbsp;&rarr;</span>
          )}
        </div>
      )}

      {/* Total video hasil pencarian */}
      <div className="total-video">
        <p>
          Total Videos found: <strong>{filteredVideos.length}</strong>
        </p>
      </div>

      <br />
      <br />

      {/* Category (satu .kategori-wrap, banyak <a> di dalam) */}
      <div className="title-bar h2 po h2">Category</div>
      <div className="trends">
        <div className="kategori-wrap">
          {randomCategories.map((cat) => (
            <Link
              key={cat}
              href={`/category?name=${encodeURIComponent(cat)}`}
              className="kategori-item"
            >
              {cat}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
