import { Link2 } from 'lucide-react'
import type { SocialLink } from '@/content'

const strokeProps = {
  viewBox: '0 0 24 24',
  width: 24,
  height: 24,
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': true,
} as const

export const socialLabels: Record<SocialLink['platform'], string> = {
  instagram: 'Instagram',
  youtube: 'YouTube',
  tiktok: 'TikTok',
  facebook: 'Facebook',
  linkedin: 'LinkedIn',
}

export function SocialIcon({ platform }: { platform: SocialLink['platform'] }) {
  if (platform === 'instagram') {
    return (
      <svg {...strokeProps}>
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <path d="M17.5 6.5h.01" />
      </svg>
    )
  }
  if (platform === 'youtube') {
    return (
      <svg {...strokeProps}>
        <rect x="2" y="5" width="20" height="14" rx="4" />
        <path d="m10 9 5 3-5 3z" />
      </svg>
    )
  }
  return <Link2 aria-hidden="true" />
}
