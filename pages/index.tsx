import Layout from "../components/Layout";

export default function Home() {
  // ...kode kamu

  return (
    <Layout>
      <Head>
        <title>Full High Definition Videos - DOMAIN</title>
        <meta
          name="description"
          content="Welcome! Enjoy Our Mobile Porn Sex Videos Now! Watch HD Sex Movies and Sorted By 100+ Porn Categories."
        />
      </Head>

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
                  <div className="len">{formatDuration(video.duration)}</div>
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
        {randomCategories.map((cat) => (
          <div className="kategori-wrap" key={cat}>
            <Link
              href={`/category?name=${encodeURIComponent(cat)}`}
              className="kategori-item"
            >
              {cat}
            </Link>
          </div>
        ))}
      </div>
    </Layout>
  );
}
