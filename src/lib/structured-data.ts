import type { Article, Faq, Procedure, Profile } from '@/content'
import { absoluteUrl, routes, siteUrl } from './site'

const CONTEXT = 'https://schema.org'
const personId = `${siteUrl}/#dokter`

export function personSchema(profile: Profile) {
  return {
    '@context': CONTEXT,
    '@type': 'Person',
    '@id': personId,
    name: profile.name,
    jobTitle: profile.title,
    description: profile.summary,
    url: absoluteUrl(routes.home),
    image: absoluteUrl(profile.photo.src),
    knowsAbout: profile.expertise,
    sameAs: profile.socials.map((social) => social.url),
    worksFor: profile.practices.map((practice) => ({
      '@type': 'MedicalOrganization',
      name: practice.name,
      address: `${practice.address}, ${practice.city}`,
    })),
  }
}

export function procedureSchema(procedure: Procedure) {
  const url = absoluteUrl(routes.procedure(procedure.slug))
  return {
    '@context': CONTEXT,
    '@type': 'MedicalWebPage',
    url,
    name: procedure.title,
    description: procedure.summary,
    author: { '@id': personId },
    about: { '@type': 'MedicalProcedure', name: procedure.title, description: procedure.summary },
  }
}

export function articleSchema(article: Article, profile: Profile) {
  return {
    '@context': CONTEXT,
    '@type': 'Article',
    headline: article.title,
    description: article.summary,
    url: absoluteUrl(routes.article(article.slug)),
    image: absoluteUrl(article.image.src),
    datePublished: article.publishedAt,
    dateModified: article.updatedAt ?? article.publishedAt,
    author: { '@type': 'Person', '@id': personId, name: profile.name },
  }
}

export function faqSchema(faqs: Faq[]) {
  return {
    '@context': CONTEXT,
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
  }
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    '@context': CONTEXT,
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  }
}
