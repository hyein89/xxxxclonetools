import { getAllVideos } from "../utils/getVideo";
import { slugify } from "../utils/slugify";
import Link from "next/link";

export default function Category() {
  const videos = getAllVideos();

  // Ambil kategori unik
  const categories = Array.from(
    new Set(videos.flatMap((v) => v.categories.split(",")))
  );

  return (
    <div>
      <h1>Kategori</h1>
      <ul>
        {categories.map((cat) => (
          <li key={cat}>
            <h2>{cat}</h2>
            <ul>
              {videos
                .filter((v) => v.categories.includes(cat))
                .map((video) => (
                  <li key={video.id_video}>
                    <Link
                      href={`/tube/${video.id_video}/${slugify(video.title)}.html`}
                    >
                      {video.title}
                    </Link>
                  </li>
                ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
}
