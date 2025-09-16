import { getAllVideos } from "../utils/getVideo";
import { slugify } from "../utils/slugify";
import Link from "next/link";
import Head from "next/head";

export default function Home() {
  const videos = getAllVideos();

  return (
    <>
      <Head>
        <title>Video Tube</title>
        <meta name="description" content="Daftar video terbaru" />
      </Head>
      <div>
        <h1>Daftar Video</h1>
        <ul>
          {videos.map((video) => (
            <li key={video.id_video}>
              <Link
                href={`/tube/${video.id_video}/${slugify(video.title)}.html`}
              >
                {video.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
