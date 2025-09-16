// pages/tube/[id]/[slug].tsx
import React from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Link from "next/link";
import { getVideoById, getAllVideos } from "../../../utils/getVideo";

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

  const video: Video | null =
    typeof id === "string" ? (getVideoById(id) as Video | null) : null;

  React.useEffect(() => {
    if (router.isReady && !video) {
      router.push("/404");
    }
  }, [router, video]);

  if (!video) return null;

  const allVideos: Video[] =
    typeof getAllVideos === "function" ? (getAllVideos() as Video[]) : [];

  const slugify = (s = "") =>
    s
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

  const videoHref = (v: Video) => `/tube/${v.id}/${v.slug ?? slugify(v.title)}`;

  const durationToMin = (duration?: string | number) => {
    const sec = Number(duration) || 0;
    if (!sec) return "0 min";
    const m = Math.ceil(sec / 60);
    return `${m} min`;
  };

  const categories: string[] = React.useMemo(() => {
    const c = video.categories;
    if (!c) return [];
    if (Array.isArray(c)) return c.map((x) => String(x).trim()).filter(Boolean);
    return String(c)
      .split(/[,|]/)
      .map((x) => x.trim())
      .filter(Boolean);
  }, [video.categories]);

  const recommended = React.useMemo(() => {
    const pool = allVideos.filter((v) => v.id !== video.id);
    for (let i = pool.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [pool[i], pool[j]] = [pool[j], pool[i]];
    }
    return pool.slice(0, 30);
  }, [allVideos, video.id]);

  // 🔹 ambil semua kategori unik, pilih random 10
  const randomCategories = React.useMemo(() => {
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
    return allCats.slice(0, 10);
  }, [allVideos]);

  return (
    <>
      <Head>
        <title>{video.title}</title>
        <meta name="description" content={`Watch ${video.title}`} />
        <meta property="og:title" content={video.title} />
        <meta property="og:description" content={`Watch ${video.title}`} />
        <meta property="og:image" content={video.thumbnail} />
      </Head>

      <div className="container">
        <div className="player-wrap">
          <h1 className="title-bar h2">{video.title}</h1>

          <div className="player">
            <div className="video-wrap">
              <iframe
                src={video.embed}
                width="100%"
                height="480"
                allowFullScreen
                title={video.title}
                frameBorder={0}
              />
            </div>
          </div>

          <div className="info">
            <p className="tags">
              {categories.length > 0 ? (
                categories.map((cat) => (
                  <Link key={cat} href={`/category/${encodeURIComponent(cat)}`}>
                    <a>{cat}</a>
                  </Link>
                ))
              ) : (
                <Link href="/category/uncategorized">
                  <a>uncategorized</a>
                </Link>
              )}
            </p>

            <p>
              {video.description ? video.description : `Watch: ${video.title}`}
            </p>
          </div>
        </div>

        <h4 className="title-bar h2">Recommended</h4>

        <div className="thumbs">
          {recommended.map((v) => (
            <div className="thumb" key={v.id}>
              <div className="thumb-in">
                <Link href={videoHref(v)}>
                  <a>
                    <div className="img-wrap">
                      <img
                        className="img"
                        src={v.thumbnail || "/placeholder.png"}
                        alt={v.title}
                        loading="lazy"
                      />
                      <div className="len">{durationToMin(v.duration)}</div>
                    </div>
                    <p className="thumb-title">{v.title}</p>
                  </a>
                </Link>
              </div>
            </div>
          ))}
          {recommended.length === 0 && <p>No recommendations available.</p>}
        </div>

        {/* 🔹 Category Section */}
        <div className="title-bar h2 po h2">Category</div>
        <div className="trends">
          <div className="kategori-wrap">
            {randomCategories.map((cat) => (
              <Link
                key={cat}
                href={`/category/${encodeURIComponent(cat)}`}
              >
                <a className="kategori-item">{cat}</a>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
