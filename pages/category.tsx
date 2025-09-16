// pages/category.tsx
import { useMemo } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Head from "next/head";
import { getAllVideos } from "../utils/getVideo";
import { slugify } from "../utils/slugify";

// Helper convert detik -> menit
function formatDuration(seconds?: string) {
  const s = parseInt(String(seconds || "0"), 10) || 0;
  const mins = Math.floor(s / 60);
  return `${mins} min`;
}

export default function CategoryPage() {
  const router = useRouter();

  // Ambil query kategori
  const categoryParam = Array.isArray(router.query.name)
    ? router.query.name[0]
    : router.query.name || "";

  // Ambil query page
  const pageQuery =
    Array.isArray(router.query.page) ? router.query.page[0] : router.query.page;
  const pageParam = parseInt((pageQuery as string) || "1", 10);

  const videos = getAllVideos() || [];

  // Filter video berdasarkan kategori
  const filteredVideos = videos.filter((v: any) =>
    String(v.categories || "")
      .split(",")
      .map((c) => c.trim().toLowerCase())
      .includes(categoryParam.toLowerCase())
  );

  const perPage = 50;
  const totalPages = Math.max(1, Math.ceil(filteredVideos.length / perPage));
  const currentPage = Math.min(
    Math.max(Number.isNaN(pageParam) ? 1 : pageParam, 1),
    totalPages
  );

  // Slice video sesuai halaman
  const startIndex = (currentPage - 1) * perPage;
  const videosPage = filteredVideos.slice(startIndex, startIndex + perPage);

  // Ambil kategori unik
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
          {categoryParam
            ? `${categoryParam} Videos - DOMAIN`
            : "Category Videos - DOMAIN"}
        </title>
        <meta
          name="description"
          content={`Watch ${categoryParam} porn videos in HD quality. Explore sorted categories on DOMAIN.`}
        />
      </Head>

      <div className="container">
        {/* Judul */}
        <h1 className="title-bar h2">
          {categoryParam ? categoryParam : "Category"} Videos
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
                  >
                    <a className="thumb-link">
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
                    </a>
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <p>No videos found in this category.</p>
          )}
        </div>

        {/* Pagination */}
        {filteredVideos.length > 0 && (
          <div className="pagination">
            {currentPage > 1 ? (
              <Link
                href={`/category?name=${encodeURIComponent(
                  categoryParam
                )}&page=${currentPage - 1}`}
              >
                <a>&larr;&nbsp;prev</a>
              </Link>
            ) : (
              <span className="disabled">&larr;&nbsp;prev</span>
            )}

            {currentPage < totalPages ? (
              <Link
                href={`/category?name=${encodeURIComponent(
                  categoryParam
                )}&page=${currentPage + 1}`}
              >
                <a>next&nbsp;&rarr;</a>
              </Link>
            ) : (
              <span className="disabled">next&nbsp;&rarr;</span>
            )}
          </div>
        )}

        {/* Total video */}
        <div className="total-video center">
          <p>
            Total Videos in {categoryParam}:{" "}
            <strong>{filteredVideos.length}</strong>
          </p>
        </div>

        <br />
        <br />

        {/* Category random */}
        <div className="title-bar h2 po h2">Category</div>
        <div className="trends">
          <div className="kategori-wrap">
            {randomCategories.map((cat) => (
              <Link key={cat} href={`/category?name=${encodeURIComponent(cat)}`}>
                <a className="kategori-item">{cat}</a>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
