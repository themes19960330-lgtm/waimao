import type { Metadata } from 'next'
import '@/styles/themes.css'

export const metadata: Metadata = {
  title: 'The Curator — Visual Atelier',
  description:
    'An exquisite gallery-like brand experience — where every detail feels like turning the page of a luxury art monograph.',
}

export default function CuratorLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div data-theme="curator">{children}</div>
  )
}
