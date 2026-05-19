import type { Metadata } from 'next'
import '@/styles/themes.css'

export const metadata: Metadata = {
  title: 'The Architect — Visual Atelier',
  description:
    'A precision-engineered brand experience rooted in Swiss design principles — where geometry, order, and clarity converge.',
}

export default function ArchitectLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div data-theme="architect" className="antialiased" style={{ backgroundColor: 'var(--bg-primary)', color: 'var(--text-primary)' }}>
      {children}
    </div>
  )
}
