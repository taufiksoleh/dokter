import { Play } from 'lucide-react'
import type { Video } from '@/content'
import { LiteYouTube } from './LiteYouTube'
import styles from './VideoGrid.module.css'

export function VideoGrid({ videos }: { videos: Video[] }) {
  return (
    <ul className={styles.grid}>
      {videos.map((video) => (
        <li key={video.title} className={styles.card}>
          {video.youtubeId ? (
            <LiteYouTube youtubeId={video.youtubeId} title={video.title} />
          ) : (
            <a className={styles.media} href={video.url} target="_blank" rel="noopener noreferrer">
              {video.poster && (
                <img
                  src={video.poster.src}
                  alt={video.poster.alt}
                  width={video.poster.width}
                  height={video.poster.height}
                  loading="lazy"
                />
              )}
              <span className={styles.play}>
                <Play aria-hidden="true" />
              </span>
              {video.duration && <span className={styles.duration}>{video.duration}</span>}
              <span className="visually-hidden">Tonton di YouTube: {video.title}</span>
            </a>
          )}
          <h3 className={styles.title}>{video.title}</h3>
        </li>
      ))}
    </ul>
  )
}
