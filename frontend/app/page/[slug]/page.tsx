import type { Metadata } from 'next';
import Link from 'next/link';

type PageData = {
  slug: string;
  title: string;
  description: string;
  body?: string;
  canonicalUrl?: string;
  openGraph: {
    title: string;
    description: string;
    image?: string;
    video?: string;
    videoType?: string;
    videoWidth?: number;
    videoHeight?: number;
    type?: string;
    url?: string;
  };
  twitter?: { card?: string; site?: string; creator?: string };
};

function makeAbsoluteHttps(base: string, maybeUrl?: string): string | undefined {
  if (!maybeUrl) return undefined;
  // Root-relative path → same-origin absolute URL
  if (maybeUrl.startsWith('/')) return `${base}${maybeUrl}`;
  try {
    const baseUrl = new URL(base);
    const url = new URL(maybeUrl);
    // Upgrade protocol to https
    if (url.protocol === 'http:') url.protocol = 'https:';
    // If pointing to localhost/127.0.0.1, rewrite to current site origin
    if (url.hostname === 'localhost' || url.hostname === '127.0.0.1') {
      url.protocol = baseUrl.protocol;
      url.host = baseUrl.host;
    }
    return url.toString();
  } catch {
    // Unknown format → return as-is
    return maybeUrl;
  }
}

async function getPage(slug: string): Promise<PageData | null> {
  const res = await fetch(`${process.env.BACKEND_URL}/api/pages/${slug}`, { next: { revalidate: 30 } });
  if (res.status === 404) return null;
  if (!res.ok) throw new Error('Failed to fetch page');
  return res.json();
}

function publicUrl() {
  return process.env.NEXT_PUBLIC_SITE_URL || process.env.PUBLIC_URL || 'http://localhost:3000';
}

export async function generateMetadata(props: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await props.params;
  const data = await getPage(slug);
  if (!data) return { title: 'Not found', description: 'The page was not found', robots: { index: false } };

  const base = publicUrl();
  const hasVideo = Boolean(data.openGraph.video);
  const poster = makeAbsoluteHttps(base, data.openGraph.image) || (hasVideo ? `${base}/sample.jpg` : `${base}/api/og?title=${encodeURIComponent(data.openGraph.title)}&description=${encodeURIComponent(data.openGraph.description)}`);
  const videoUrl = makeAbsoluteHttps(base, data.openGraph.video);
  const url = makeAbsoluteHttps(base, data.openGraph.url || `${base}/page/${slug}`)!;

  return {
    title: data.openGraph.title ?? data.title,
    description: data.openGraph.description ?? data.description,
    openGraph: {
      title: data.openGraph.title,
      description: data.openGraph.description,
      type: (data.openGraph.type as any) || 'website',
      url,
      images: [{ url: poster, width: 1200, height: 630, alt: data.openGraph.title }],
      videos: videoUrl
        ? [{ url: videoUrl, width: data.openGraph.videoWidth || 1200, height: data.openGraph.videoHeight || 630, type: data.openGraph.videoType || 'video/mp4' }]
        : undefined,
    },
    twitter: { card: (data.twitter?.card as any) || 'summary_large_image', title: data.openGraph.title, description: data.openGraph.description, images: [poster] },
  } satisfies Metadata;
}

export default async function Page(props: { params: Promise<{ slug: string }> }) {
  const { slug } = await props.params;
  const data = await getPage(slug);
  if (!data) return <div className="card">Page not found. <Link href="/">Go back</Link></div>;

  const base = publicUrl();
  const hasVideo = Boolean(data.openGraph.video);
  const poster = makeAbsoluteHttps(base, data.openGraph.image) || (hasVideo ? `${base}/sample.jpg` : `${base}/api/og?title=${encodeURIComponent(data.openGraph.title)}&description=${encodeURIComponent(data.openGraph.description)}`);
  const videoUrl = makeAbsoluteHttps(base, data.openGraph.video);

  return (
    <div>
      <nav className="nav"><Link href="/">Home</Link></nav>
      <div className="card">
        <h2>{data.title}</h2>
        {videoUrl ? (
          <video controls playsInline preload="metadata" poster={poster} style={{ width: '100%', maxWidth: 800, margin: '16px auto', display: 'block', borderRadius: 8 }}>
            <source src={videoUrl} type={data.openGraph.videoType || 'video/mp4'} />
          </video>
        ) : (
          <img src={poster} alt={data.openGraph.title} style={{ width: '100%', maxWidth: 800, margin: '16px auto', display: 'block', borderRadius: 8 }} />
        )}
        <p>{data.description}</p>
        {data.body && <p>{data.body}</p>}
      </div>
    </div>
  );
}
