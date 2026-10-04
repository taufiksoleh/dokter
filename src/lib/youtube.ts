import type { Video } from '@/content'

const FEED_URL = 'https://www.youtube.com/feeds/videos.xml?channel_id='

function decodeEntities(value: string) {
  return value
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
}

/** Mengambil daftar video dari RSS channel YouTube. Tidak memerlukan API key. */
export function parseYouTubeFeed(xml: string): Video[] {
  return [...xml.matchAll(/<entry>([\s\S]*?)<\/entry>/g)].flatMap(([, entry]) => {
    const youtubeId = entry.match(/<yt:videoId>([^<]+)<\/yt:videoId>/)?.[1]
    const title = entry.match(/<title>([^<]+)<\/title>/)?.[1]
    if (!youtubeId || !title) return []
    return [
      {
        title: decodeEntities(title),
        youtubeId,
        url: `https://www.youtube.com/watch?v=${youtubeId}`,
      },
    ]
  })
}

/**
 * Video terbaru dari channel, diambil saat build. Bila channel belum diisi atau YouTube tidak
 * dapat dihubungi, daftar video pilihan di konten profil dipakai sebagai gantinya.
 */
export async function getLatestVideos(
  channelId: string | undefined,
  fallback: Video[],
  limit = 3,
): Promise<Video[]> {
  if (!channelId) return fallback.slice(0, limit)
  try {
    const response = await fetch(`${FEED_URL}${encodeURIComponent(channelId)}`)
    if (!response.ok) return fallback.slice(0, limit)
    const videos = parseYouTubeFeed(await response.text())
    return (videos.length ? videos : fallback).slice(0, limit)
  } catch {
    return fallback.slice(0, limit)
  }
}
