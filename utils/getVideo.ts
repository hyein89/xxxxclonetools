import data from "../public/videos.json";

export function getVideoById(id: string) {
  return (data as any[]).find((v) => v.id_video === id);
}

export function getAllVideos() {
  return data as any[];
}
