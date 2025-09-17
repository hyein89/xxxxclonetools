import Head from "next/head";
import Link from "next/link";
import { GetServerSideProps } from "next";
import { getVideoById, getAllVideos } from "../../../utils/getVideo";
import { popunder } from "../../../utils/popunder";

type Video = {
  id: string;
  slug?: string;
  title: string;
  embed: string;
  thumbnail?: string;
  duration?: string | number;
  categories?: string[] | string;
  description?: string;
};

type Props = {
  video: Video | null;
  allVideos: Video[];
};

export default function VideoDetailPage({ video, allVideos }: Props) {
  if (!video) {
    return <h1>404 Video Not Found</h1>;
  }

  const slugify = (s = "") =>
    s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

  const videoHref = (v: Video) =>
    `/tube/${v.id}/${v.slug ?? slugify(v.title)}.html`;

  const durationToMin = (duration?: string | number) => {
    const sec = Number(duration) || 0;
    const m = Math.ceil(sec / 60);
    return `${m} min`;
  };

  const categories: string[] = (() => {
    const c = video.categories;
    if (!c) return [];
    if (Array.isArray(c)) return c.map((x) => String(x).trim()).filter(Boolean);
    return String(c)
      .split(/[,|]/)
      .map((x) => x.trim())
      .filter(Boolean);
  })();

  const recommended: Video[] = (() => {
    const pool = allVideos.filter((v) => v.id !== video.id);
    for (let i = pool.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [pool[i], pool[j]] = [pool[j], pool[i]];
    }
    return pool.slice(0, 30);
  })();

  return (
    <>
      <Head>
        <title>{video.title} - {process.env.SITE_NAME}</title>
        <meta name="description" content={`Watch ${video.title} in HD for free on ${process.env.SITE_NAME}.`} />

        {/* Open Graph */}
        <meta property="og:type" content="video.other" />
        <meta property="og:title" content={video.title} />
        <meta property="og:description" content={`Watch ${video.title} in HD for free on ${process.env.SITE_NAME}.`} />
        <meta property="og:image" content={video.thumbnail || "/placeholder.png"} />
        <meta property="og:url" content={`${process.env.SITE_DOMAIN}${videoHref(video)}`} />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={video.title} />
        <meta name="twitter:description" content={`Watch ${video.title} in HD on ${process.env.SITE_NAME}.`} />
        <meta name="twitter:image" content={video.thumbnail || "/placeholder.png"} />

        <link rel="icon" type="image/png" sizes="32x32" href="/16343308.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/16343308.png" />
        <link rel="apple-touch-icon" href="/16343308.png" />
        <link rel="canonical" href={`${process.env.SITE_DOMAIN}${videoHref(video)}`} />
      </Head>

      <div className="container">
        <div className="player-wrap">
          <h1 className="title-bar h2">{video.title}</h1>

          <div className="player">
            <div className="video-wrap">
              <iframe
                className="video"
                src={video.embed}
                title={video.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                frameBorder={0}
              />
            </div>
          </div>

          <div className="info">
            <p className="tags">
              {categories.length > 0 ? (
                categories.map((cat) => (
                  <Link key={cat} href={`/category?name=${encodeURIComponent(cat)}`}>
                    {cat}
                  </Link>
                ))
              ) : (
                <Link href="/category/uncategorized">uncategorized</Link>
              )}
            </p>
            <p>{video.description || `Watch: ${video.title}`}</p>
          </div>
        </div>

        <h4 className="title-bar h2">Recommended</h4>
        <div className="thumbs">
          {recommended.map((v) => (
            <div className="thumb" key={v.id}>
              <div className="thumb-in">
                <Link href={videoHref(v)}>
                  <div>
                    <div className="img-wrap">
                      <img
                        onClick={popunder}
                        className="img"
                        src={v.thumbnail || "/placeholder.png"}
                        alt={v.title}
                        loading="lazy"
                      />
                      <div className="len">{durationToMin(v.duration)}</div>
                    </div>
                    <p onClick={popunder} className="thumb-title">{v.title}</p>
                  </div>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export const getServerSideProps: GetServerSideProps<Props> = async (context) => {
  const { id } = context.params as { id: string };
  const video = getVideoById(id) as Video | null;
  const allVideos = getAllVideos() as Video[];

  return {
    props: {
      video,
      allVideos,
    },
  };
};
