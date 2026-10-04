import { isValidElement, type ReactNode } from 'react'
import Markdown from 'react-markdown'
import { slugify } from '@/lib/seo'
import styles from './Prose.module.css'

function textOf(node: ReactNode): string {
  if (typeof node === 'string' || typeof node === 'number') return String(node)
  if (Array.isArray(node)) return node.map(textOf).join('')
  if (isValidElement<{ children?: ReactNode }>(node)) return textOf(node.props.children)
  return ''
}

/** Merender isi Markdown. Subjudul diberi id yang sama dengan hasil `extractHeadings`. */
export function Prose({ markdown }: { markdown: string }) {
  return (
    <div className={styles.prose}>
      <Markdown
        components={{
          h2: ({ children }) => <h2 id={slugify(textOf(children))}>{children}</h2>,
        }}
      >
        {markdown}
      </Markdown>
    </div>
  )
}
