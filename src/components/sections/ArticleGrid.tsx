import Link from 'next/link'
import type { Article } from '@/content'
import { formatDate } from '@/lib/format'
import { routes } from '@/lib/site'
import styles from './ArticleGrid.module.css'

type ArticleGridProps = {
  articles: Article[]
  headingLevel?: 'h2' | 'h3'
}

export function ArticleGrid({ articles, headingLevel: Heading = 'h3' }: ArticleGridProps) {
  return (
    <ul className={styles.grid}>
      {articles.map((article) => (
        <li key={article.slug}>
          <Link href={routes.article(article.slug)} className={styles.card}>
            <div className={styles.cover}>
              <img
                src={article.image.src}
                alt={article.image.alt}
                width={article.image.width}
                height={article.image.height}
                loading="lazy"
              />
            </div>
            <p className={styles.meta}>
              <time dateTime={article.publishedAt}>{formatDate(article.publishedAt)}</time>
              <span>{article.readingMinutes} menit baca</span>
            </p>
            <Heading className={styles.title}>{article.title}</Heading>
            <p className={styles.summary}>{article.summary}</p>
          </Link>
        </li>
      ))}
    </ul>
  )
}
