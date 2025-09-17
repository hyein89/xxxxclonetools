// pages/sitemap.xml.ts
import { GetServerSideProps } from "next";
import { getAllVideos } from "../utils/getVideo";
import { slugify } from "../utils/slugify";

function generateSiteMap(videos: any[]) {
  const baseUrl = process.env.SITE_DOMAIN || "https://example.com";

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${baseUrl}</loc>
    <priority>1.0</priority>
  </url>
  ${videos
    .map((video) => {
      const url = `${baseUrl}/tube/${video.id}/${
        video.slug ?? slugify(video.title)
      }.html`;
      return `
      <url>
        <loc>${url}</loc>
        <priority>0.8</priority>
      </url>
    `;
    })
    .join("")}
</urlset>`;
}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const videos = getAllVideos();

  const sitemap = generateSiteMap(videos);

  res.setHeader("Content-Type", "text/xml");
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
};

export default function SiteMap() {
  return null;
}
