import type { Profile } from '@/content'
import styles from './InstagramGrid.module.css'

/** Unggahan pilihan yang dipasang manual. Setiap gambar menaut ke unggahan aslinya. */
export function InstagramGrid({ posts }: { posts: Profile['instagram'] }) {
  return (
    <ul className={styles.grid}>
      {posts.map((post) => (
        <li key={post.image.src}>
          <a className={styles.tile} href={post.url} target="_blank" rel="noopener noreferrer">
            <img
              src={post.image.src}
              alt={post.image.alt}
              width={post.image.width}
              height={post.image.height}
              loading="lazy"
            />
          </a>
        </li>
      ))}
    </ul>
  )
}
