'use client'

import { useState } from 'react'
import { Play } from 'lucide-react'
import styles from './VideoGrid.module.css'

type LiteYouTubeProps = { youtubeId: string; title: string }

/** Menampilkan thumbnail saja. Pemutar YouTube baru dimuat setelah diklik agar halaman ringan. */
export function LiteYouTube({ youtubeId, title }: LiteYouTubeProps) {
  const [isPlaying, setIsPlaying] = useState(false)

  if (isPlaying) {
    return (
      <iframe
        className={styles.media}
        src={`https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1`}
        title={title}
        allow="accelerometer; autoplay; encrypted-media; picture-in-picture"
        allowFullScreen
      />
    )
  }

  return (
    <button type="button" className={styles.media} onClick={() => setIsPlaying(true)}>
      <img
        src={`https://i.ytimg.com/vi/${youtubeId}/hqdefault.jpg`}
        alt=""
        width={480}
        height={360}
        loading="lazy"
      />
      <span className={styles.play}>
        <Play aria-hidden="true" />
      </span>
      <span className="visually-hidden">Putar video: {title}</span>
    </button>
  )
}
