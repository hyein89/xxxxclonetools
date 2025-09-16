// pages/index.tsx
import { useMemo } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Head from "next/head";
import { getAllVideos } from "../utils/getVideo";
import { slugify } from "../utils/slugify";

// Helper convert detik -> menit
function formatDuration(seconds?: string | number) {
  const s =
    typeof seconds === "number"
      ? seconds
      : parseInt(String(seconds || "0"), 10) || 0;
  const mins = Math.floor(s / 60);
  return `${mins} min`;
}

export default function SearchPage() {
  const router = useRouter();
  const q = router.query.q;
  const query = Array.isArray(q) ? q[0] : (q as string) || "";

  const pageQuery = router.query.page;
  const pageParam = parseInt(
    (Array.isArray(pageQuery) ? pageQuery[0] : (pageQuery as string)) || "1",
    10
  );

  const videos = getAllVideos() || [];

  // Filter video berdasarkan title / categories yang mengandung query
  const filteredVideos = videos.filter((video: any) => {
    const title = String(video.title || "").toLowerCase();
    const cats = String(video.categories || "").toLowerCase();
    const qLower = String(query || "").toLowerCase();
    return title.includes(qLower) || cats.includes(qLower);
  });

  // Pagination
  const perPage = 50;
  const totalPages = Math.max(1, Math.ceil(filteredVideos.length / perPage));
  const currentPage = Math.min(
    Math.max(Number.isNaN(pageParam) ? 1 : pageParam, 1),
    totalPages
  );

  const startIndex = (currentPage - 1) * perPage;
  const videosPage = filteredVideos.slice(startIndex, startIndex + perPage);

  // Ambil kategori unik dan trim spasi
  const categories = useMemo(
    () =>
      Array.from(
        new Set(
          videos.flatMap((v: any) =>
            String(v.categories || "")
              .split(",")
              .map((c) => c.trim())
              .filter(Boolean)
          )
        )
      ),
    [videos]
  );

  // Random 25 kategori
  const randomCategories = useMemo(() => {
    const copy = [...categories];
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy.slice(0, 25);
  }, [categories]);

  return (
    <>
      <Head>
        <title>
          {process.env.SITE_NAME} - Full High Definition Videos
        </title>
        <meta
          name="description"
          content={process.env.SITE_NAME} Enjoy free HD videos sorted by categories and tags 
        />
      </Head>

      <div className="container">
        {/* Judul */}
        <h1 className="title-bar h2">
         Free PRON Videos
        </h1>

        {/* Daftar video */}
        <div className="thumbs">
          {videosPage.length > 0 ? (
            videosPage.map((video: any) => (
              <div className="thumb" key={video.id_video}>
                <div className="thumb-in">
                  <Link
                    href={`/tube/${video.id_video}/${slugify(
                      String(video.title || "")
                    )}.html`}
                    className="thumb-link"
                  >
                    <div className="img-wrap">
                      <img
                        className="img"
                        src={video.thumbnail}
                        alt={video.title}
                        loading="lazy"
                      />
                      <div className="len">{formatDuration(video.duration)}</div>
                    </div>
                    <p className="thumb-title">{video.title}</p>
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <p>No videos found for .</p>
          )}
        </div>

        {/* Pagination */}
        {filteredVideos.length > 0 && (
          <div className="pagination">
            {currentPage > 1 ? (
              <Link
                href={`/search?q=${encodeURIComponent(
                  String(query)
                )}&page=${currentPage - 1}`}
              >
                &larr;&nbsp;prev
              </Link>
            ) : (
              <span className="disabled">&larr;&nbsp;prev</span>
            )}

            {currentPage < totalPages ? (
              <Link
                href={`/search?q=${encodeURIComponent(
                  String(query)
                )}&page=${currentPage + 1}`}
              >
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

        {/* Category */}
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
    </>
  );
}
