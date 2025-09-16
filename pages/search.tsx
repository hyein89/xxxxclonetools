import { useState } from "react";
import { getAllVideos } from "../utils/getVideo";
import { slugify } from "../utils/slugify";
import Link from "next/link";

export default function Search() {
  const [query, setQuery] = useState("");
  const videos = getAllVideos();

  const filtered = videos.filter((v) =>
    v.title.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div>
      <h1>Pencarian Video</h1>
      <input
        type="text"
        placeholder="Cari video..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <ul>
        {filtered.map((video) => (
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
  );
}
