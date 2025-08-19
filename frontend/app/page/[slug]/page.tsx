import type { Metadata } from 'next';
import Link from 'next/link';

// Shape of the Page API response
type PageData = {
  slug: string;
  title: string;
  description: string;
  body?: string;
  canonicalUrl?: string;
  openGraph: {
    title: string;
    description: string;
    image?: string;          // poster image used for previews
    video?: string;          // optional video url
    videoType?: string;      // e.g. video/mp4
    videoWidth?: number;     // display hint only
    videoHeight?: number;    // display hint only
    type?: string;           // e.g. website, video.other
    url?: string;            // canonical og:url
  };
  twitter?: {
    card?: string;
    site?: string;
    creator?: string;
  };
};

async function getPage(slug: string): Promise<PageData | null> {
  const res = await fetch(`${process.env.BACKEND_URL}/api/pages/${slug}`, { next: { revalidate: 30 } });
  if (res.status === 404) return null;
  if (!res.ok) throw new Error('Failed to fetch page');
  return res.json();
}

// Small helper so beginners can see where the site url comes from
function getPublicUrl(): string {
  return process.env.NEXT_PUBLIC_SITE_URL || process.env.PUBLIC_URL || 'http://localhost:3000';
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const data = await getPage(params.slug);
  if (!data) {
    return { title: 'Not found', description: 'The page was not found', robots: { index: false } };
  }

  const publicUrl = getPublicUrl();
  const currentUrl = data.openGraph.url || `${publicUrl}/page/${params.slug}`;

  // Always provide a strong 1200×630 poster image. If a video exists, keep the poster
  // so platforms that do not play video still render a great card.
  const imageUrl = data.openGraph.image
    ? data.openGraph.image
    : `${publicUrl}/api/og?title=${encodeURIComponent(data.openGraph.title)}&description=${encodeURIComponent(data.openGraph.description)}`;

  return {
    title: data.openGraph.title ?? data.title,
    description: data.openGraph.description ?? data.description,
    alternates: data.canonicalUrl ? { canonical: data.canonicalUrl } : undefined,
    openGraph: {
      title: data.openGraph.title,
      description: data.openGraph.description,
      type: (data.openGraph.type as any) || 'website',
      url: currentUrl,
      images: [
        { url: imageUrl, width: 1200, height: 630, alt: data.openGraph.title, type: 'image/jpeg' }
      ],
      videos: data.openGraph.video
        ? [
            {
              url: data.openGraph.video,
              width: data.openGraph.videoWidth || 1200,
              height: data.openGraph.videoHeight || 630,
              type: data.openGraph.videoType || 'video/mp4',
            },
          ]
        : undefined,
    },
    twitter: {
      card: (data.twitter?.card as any) || 'summary_large_image',
      site: data.twitter?.site,
      creator: data.twitter?.creator,
      title: data.openGraph.title,
      description: data.openGraph.description,
      images: [imageUrl],
    },
  } satisfies Metadata;
}

export async function generateStaticParams() {
  const res = await fetch(`${process.env.BACKEND_URL}/api/pages`, { next: { revalidate: 60 } });
  const pages = res.ok ? await res.json() : [];
  return pages.map((p: any) => ({ slug: p.slug }));
}

export default async function Page({ params }: { params: { slug: string } }) {
  const data = await getPage(params.slug);
  if (!data) {
    return (
      <div className="card">Page not found. <Link href="/">Go back</Link></div>
    );
  }

  return (
    <div>
      <nav className="nav">
        <Link href="/">Home</Link>
      </nav>

      <div className="card">
        {/* Title on top */}
        <h2>{data.title}</h2>

        {/* Media in the middle: prefer video when present, otherwise image */}
        {data.openGraph.video ? (
          <video
            controls
            playsInline
            preload="metadata"
            poster={data.openGraph.image}
            style={{ width: '100%', maxWidth: 800, margin: '16px auto', borderRadius: 8, display: 'block' }}
          >
            <source src={data.openGraph.video} type={data.openGraph.videoType || 'video/mp4'} />
          </video>
        ) : (
          <img
            src={data.openGraph.image || getPublicUrl() + `/api/og?title=${encodeURIComponent(data.openGraph.title)}&description=${encodeURIComponent(data.openGraph.description)}`}
            alt={data.openGraph.title}
            style={{ width: '100%', maxWidth: 800, margin: '16px auto', borderRadius: 8, display: 'block' }}
          />
        )}

        {/* Text at the bottom */}
        <p>{data.description}</p>
        {data.body && <p>{data.body}</p>}
      </div>
    </div>
  );
}


