import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Blog - igaray',
  description: 'Blog posts',
}

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
} 