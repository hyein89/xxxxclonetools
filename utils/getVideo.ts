import raw from "../public/videos.json";

export function getAllVideos() {
  return (raw as any[]).map((v) => ({
    ...v,
    id: v.id_video, // normalisasi id_video → id
  }));
}

export function getVideoById(id: string) {
  return getAllVideos().find((v) => v.id === id);
}

