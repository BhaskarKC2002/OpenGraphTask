import Link from 'next/link';

// Fetch all pages to show in the list (and for quick navigation)
async function fetchPages() {
  const res = await fetch(`${process.env.BACKEND_URL}/api/pages`, { next: { revalidate: 60 } });
  if (!res.ok) throw new Error('Failed to fetch pages');
  return res.json();
}

// Simple home that explains what the demo does and links to each page
export default async function Home() {
  const pages = await fetchPages();
  return (
    <div>
      <nav className="nav">
        <Link href="/page/home">Home</Link>
        <Link href="/page/services">Services</Link>
        <Link href="/page/work">Work</Link>
        <Link href="/page/team">Team</Link>
        <Link href="/page/blogs">Blogs</Link>
        <Link href="/page/contact">Contact</Link>
      </nav>

      <div className="card">
        <h2>Dynamic Open Graph Demo</h2>
        <p>This app fetches page content from an Express + MongoDB backend and generates Open Graph/Twitter meta tags per slug.</p>
        <p><strong>🎥 Video support:</strong> Try the sample video page to see a poster in previews and a video on the page.</p>
        <p><strong>🖼️ Custom poster:</strong> The sample image page uses your own image file for social cards.</p>
      </div>

      <div className="card">
        <h3>Available pages</h3>
        <ul>
          {pages.map((p: any) => (
            <li key={p.slug}>
              <Link href={`/page/${p.slug}`}>
                {p.title}
                {p.openGraph?.video && <span style={{color: 'red', marginLeft: 8}}>🎥</span>}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="card">
        <h3>Quick demos</h3>
        <ul>
          <li><Link href="/page/sample-image">Sample Image — WebXNep</Link> <span style={{color: 'blue'}}>🖼️</span></li>
          <li><Link href="/page/sample-video">Sample Video — WebXNep</Link> <span style={{color: 'red'}}>🎥</span></li>
        </ul>
      </div>
    </div>
  );
}


