import React, { useMemo } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Link from "next/link";
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

export default function VideoDetailPage() {
  const router = useRouter();
  const { id } = router.query;

  if (!router.isReady) return null;

  const video: Video | null =
    typeof id === "string" ? (getVideoById(id) as Video | null) : null;

  if (!video) {
    if (typeof window !== "undefined") {
      router.push("/404");
    }
    return null;
  }

  const allVideos: Video[] = getAllVideos() as Video[];

  const slugify = (s = "") =>
    s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

 const videoHref = (v: Video) =>
  `/tube/${v.id}/${v.slug ?? slugify(v.title)}.html`;


  const durationToMin = (duration?: string | number) => {
    const sec = Number(duration) || 0;
    const m = Math.ceil(sec / 60);
    return `${m} min`;
  };

  const categories: string[] = useMemo(() => {
    const c = video.categories;
    if (!c) return [];
    if (Array.isArray(c)) return c.map((x) => String(x).trim()).filter(Boolean);
    return String(c)
      .split(/[,|]/)
      .map((x) => x.trim())
      .filter(Boolean);
  }, [video.categories]);

  const recommended: Video[] = useMemo(() => {
    const pool = allVideos.filter((v) => v.id !== video.id);
    for (let i = pool.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [pool[i], pool[j]] = [pool[j], pool[i]];
    }
    return pool.slice(0, 30);
  }, [allVideos, video.id]);

  const randomCategories: string[] = useMemo(() => {
    const set = new Set<string>();
    allVideos.forEach((v) => {
      if (Array.isArray(v.categories)) {
        v.categories.forEach((c) => set.add(String(c).trim()));
      } else if (typeof v.categories === "string") {
        v.categories
          .split(/[,|]/)
          .map((x) => x.trim())
          .forEach((c) => c && set.add(c));
      }
    });
    const allCats = Array.from(set);
    for (let i = allCats.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [allCats[i], allCats[j]] = [allCats[j], allCats[i]];
    }
    return allCats.slice(0, 30);
  }, [allVideos]);

  return (
    <>
<Head>
  <title>{video.title} - {process.env.SITE_NAME}</title>
  <meta name="description" content={`Watch ${video.title} in HD for free on ${process.env.SITE_NAME}.`} />

  {/* Open Graph (Facebook, WhatsApp, LinkedIn) */}
  <meta property="og:type" content="video.other" />
  <meta property="og:title" content={video.title} />
  <meta property="og:description" content={`Watch ${video.title} in HD for free on ${process.env.SITE_NAME}.`} />
  <meta property="og:image" content={`${process.env.SITE_DOMAIN}${video.thumbnail}`} />
  <meta
  property="og:url"
  content={`${process.env.SITE_DOMAIN}/tube/${video.id}/${video.slug}`}
/>


  {/* Twitter */}
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content={video.title} />
  <meta name="twitter:description" content={`Watch ${video.title} in HD on ${process.env.SITE_NAME}.`} />
  <meta name="twitter:image" content={`${process.env.SITE_DOMAIN}${video.thumbnail}`} />

  {/* Favicon / App Icons */}
  <link rel="icon" type="image/png" sizes="32x32" href="/16343308.png" />
  <link rel="icon" type="image/png" sizes="16x16" href="/16343308.png" />
  <link rel="apple-touch-icon" href="/16343308.png" />
   <link
    rel="canonical"
    href={`${process.env.SITE_DOMAIN}/tube/${video.id}/${video.slug}`}
/>
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
                      <img onClick={popunder}
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
