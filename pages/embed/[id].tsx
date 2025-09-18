import { useRouter } from "next/router";
import Head from "next/head";
import { getVideoById } from "../../utils/getVideo";

type Video = {
  id: string;
  title: string;
  embed: string;
  thumbnail?: string;
};

export default function EmbedPage() {
  const router = useRouter();
  const { id } = router.query;

  if (!router.isReady) return null;

  const video: Video | null =
    typeof id === "string" ? (getVideoById(id) as Video | null) : null;

  if (!video) {
    return <div>Video not found</div>;
  }

  return (
    <>
      <Head>
        <title>{video.title} - Embed</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      <div style={{ margin: 0, padding: 0 }}>
        <iframe
          src={video.embed}
          width="100%"
          height="480"
          allow="autoplay; fullscreen"
          allowFullScreen
          frameBorder={0}
        />
      </div>
    </>
  );
}
