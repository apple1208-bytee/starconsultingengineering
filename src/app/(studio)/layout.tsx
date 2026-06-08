export const metadata = {
  title: 'Next.js Sanity Studio',
  description: 'Sanity Studio embedded in Next.js',
}

export default function StudioLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
