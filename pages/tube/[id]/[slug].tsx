import { useRouter } from "next/router";
import { getVideoById } from "../../../utils/getVideo";
import Head from "next/head";

export default function VideoDetail() {
  const router = useRouter();
  const { id } = router.query;
  const video = id ? getVideoById(id as string) : null;

  if (!video) {
    if (typeof window !== "undefined") {
      router.push("/404");
    }
    return null;
  }

  return (
    <>
      <Head>
        <title>{video.title}</title>
        <meta name="description" content={`Watch ${video.title}`} />
        <meta property="og:title" content={video.title} />
        <meta property="og:description" content={`Watch ${video.title}`} />
        <meta property="og:image" content={video.thumbnail} />
      </Head>

      <div>
        <h1>{video.title}</h1>
        <iframe
          src={video.embed}
          width="100%"
          height="480"
          allowFullScreen
        ></iframe>
      </div>
    </>
  );
}
