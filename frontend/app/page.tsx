import Link from 'next/link';

async function fetchPages() {
  const res = await fetch(`${process.env.BACKEND_URL}/api/pages`, { next: { revalidate: 60 } });
  if (!res.ok) throw new Error('Failed to fetch pages');
  return res.json();
}

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
        <p><strong>🎥 New:</strong> Video sharing support! Try the demo pages below to see videos in social media previews.</p>
        <p><strong>🖼️ New:</strong> Custom image and video support! Check out the sample pages using your own files.</p>
      </div>
      <div className="card">
        <h3>Available pages</h3>
        <ul>
          {pages.map((p: any) => (
            <li key={p.slug}>
              <Link href={`/page/${p.slug}`}>
                {p.title}
                {p.openGraph.video && <span style={{color: 'red', marginLeft: '8px'}}>🎥</span>}
                {p.openGraph.image && !p.openGraph.video && p.openGraph.image.includes('sample.jpg') && <span style={{color: 'blue', marginLeft: '8px'}}>🖼️</span>}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="card">
        <h3>🖼️ Sample Image Page</h3>
        <p>This page uses your custom sample.jpg file as the OpenGraph image:</p>
        <ul>
          <li><Link href="/page/sample-image">Sample Image — WebXNep</Link> <span style={{color: 'blue'}}>🖼️</span></li>
        </ul>
      </div>
      <div className="card">
        <h3>🎥 Sample Video Page</h3>
        <p>This page uses your custom sampleVideo.mp4 file for video sharing:</p>
        <ul>
          <li><Link href="/page/sample-video">Sample Video — WebXNep</Link> <span style={{color: 'red'}}>🎥</span></li>
        </ul>
      </div>
      <div className="card">
        <h3>🎥 Demo Video Pages</h3>
        <p>These pages include video content that will play when shared on social media:</p>
        <ul>
          <li><Link href="/page/demo-video">Demo Video — WebXNep</Link> <span style={{color: 'red'}}>🎥</span></li>
          <li><Link href="/page/showcase">Project Showcase — WebXNep</Link> <span style={{color: 'red'}}>🎥</span></li>
        </ul>
      </div>
    </div>
  );
}


