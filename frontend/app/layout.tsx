import type { Metadata } from 'next';
import './globals.css';

// Default site metadata. Page-level metadata will override these.
export const metadata: Metadata = {
  title: { default: 'WebXNep — Digital Agency', template: '%s | WebXNep' },
  description: 'Digital agency crafting websites, branding, and experiences. Since 2017.',
  keywords: ['web design', 'development', 'branding', 'digital agency', 'Nepal'],
  authors: [{ name: 'WebXNep' }],
  creator: 'WebXNep',
  publisher: 'WebXNep',
  formatDetection: { email: false, address: false, telephone: false },
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || process.env.PUBLIC_URL || 'http://localhost:3000'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '/',
    siteName: 'WebXNep',
    title: 'WebXNep — Digital Agency',
    description: 'Digital agency crafting websites, branding, and experiences. Since 2017.',
    images: [{ url: '/api/og?title=WebXNep — Digital Agency&description=Digital agency crafting websites, branding, and experiences. Since 2017.', width: 1200, height: 630, alt: 'WebXNep — Digital Agency' }],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@webxnep',
    creator: '@webxnep',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <main style={{ maxWidth: 860, margin: '0 auto', padding: 24 }}>
          <h1 style={{ fontSize: 24 }}>WebXNep Open Graph Demo</h1>
          {children}
        </main>
      </body>
    </html>
  );
}


