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

export default function Home() {
  const router = useRouter();
  const pageParam = parseInt((router.query.page as string) || "1", 10);

  const videos = getAllVideos();
  const perPage = 50;
  const totalPages = Math.ceil(videos.length / perPage);
  const currentPage = Math.min(Math.max(pageParam, 1), totalPages);

  // Slice video sesuai halaman
  const startIndex = (currentPage - 1) * perPage;
  const endIndex = startIndex + perPage;
  const videosPage = videos.slice(startIndex, endIndex);

  // Ambil kategori unik
  const categories = Array.from(
    new Set(videos.flatMap((v) => v.categories.split(",")))
  );

  // Random 25 kategori
  const randomCategories = categories
    .sort(() => Math.random() - 0.5)
    .slice(0, 25);

  return (
    <>
      <Head>
        <title>Full High Definition Videos - DOMAIN</title>
        <meta
          name="description"
          content="Welcome! Enjoy Our Mobile Porn Sex Videos Now! Watch HD Sex Movies and Sorted By 100+ Porn Categories."
        />
      </Head>

      <div className="container">
        {/* Judul */}
        <h1 className="title-bar h2">Movie Populer</h1>

        {/* Daftar video */}
        <div className="thumbs">
          {videosPage.map((video) => (
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
          ))}
        </div>

        {/* Pagination */}
        <div className="pagination">
          {currentPage > 1 ? (
            <Link href={`/?page=${currentPage - 1}`}>&larr;&nbsp;prev</Link>
          ) : (
            <span className="disabled">&larr;&nbsp;prev</span>
          )}

          {currentPage < totalPages ? (
            <Link href={`/?page=${currentPage + 1}`}>next&nbsp;&rarr;</Link>
          ) : (
            <span className="disabled">next&nbsp;&rarr;</span>
          )}
        </div>

        {/* Total video */}
        <div className="total-video">
          <p>
            Total Videos: <strong>{videos.length}</strong>
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

    </>
  );
}
