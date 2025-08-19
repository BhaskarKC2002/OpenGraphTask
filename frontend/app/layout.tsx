import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: { default: 'WebXNep — Open Graph Demo', template: '%s | WebXNep' },
  description: 'Demo app that generates dynamic Open Graph meta tags for each page.',
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
