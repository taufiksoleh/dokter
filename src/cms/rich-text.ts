import {
  BoldFeature,
  convertLexicalToMarkdown,
  convertMarkdownToLexical,
  editorConfigFactory,
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  ItalicFeature,
  LinkFeature,
  OrderedListFeature,
  ParagraphFeature,
  UnorderedListFeature,
} from '@payloadcms/richtext-lexical'
import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'
import type { SanitizedConfig } from 'payload'

/**
 * Format yang tersedia di editor sengaja dibatasi pada yang bisa ditulis sebagai Markdown,
 * karena isi halaman dirender dari Markdown oleh komponen Prose.
 */
export const richTextFeatures = [
  ParagraphFeature(),
  HeadingFeature({ enabledHeadingSizes: ['h2', 'h3'] }),
  BoldFeature(),
  ItalicFeature(),
  UnorderedListFeature(),
  OrderedListFeature(),
  LinkFeature({ enabledCollections: [] }),
  FixedToolbarFeature(),
  InlineToolbarFeature(),
]

const getEditorConfig = (config: SanitizedConfig) =>
  editorConfigFactory.fromFeatures({ config, features: richTextFeatures })

export async function richTextToMarkdown(
  data: SerializedEditorState | null | undefined,
  config: SanitizedConfig,
) {
  if (!data) return ''
  return convertLexicalToMarkdown({ data, editorConfig: await getEditorConfig(config) }).trim()
}

export async function markdownToRichText(markdown: string, config: SanitizedConfig) {
  return convertMarkdownToLexical({ markdown, editorConfig: await getEditorConfig(config) })
}
