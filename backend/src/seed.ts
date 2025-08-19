import PageModel from './pages/model.js';

function getPublicUrl(): string {
  // Prefer PUBLIC_URL (publicly reachable), fall back to SITE_URL, then localhost
  return process.env.PUBLIC_URL || process.env.SITE_URL || 'http://localhost:3000';
}

export async function seedIfEmpty() {
  const count = await PageModel.countDocuments();
  if (count > 0) return;

  const base = getPublicUrl();

  const pages = [
    {
      slug: 'home',
      title: 'Inspiring Creativity — WebXNep',
      description: 'Digital agency crafting websites, branding, and experiences. Since 2017.',
      body: 'Welcome to WebXNep. Inspiring Creativity since 2017.',
      canonicalUrl: `${base}/page/home`,
      openGraph: {
        title: 'Inspiring Creativity — WebXNep',
        description: 'Digital agency crafting websites, branding, and experiences. Since 2017.',
        type: 'website',
        url: `${base}/page/home`,
        image: `${base}/api/og?title=${encodeURIComponent('Inspiring Creativity — WebXNep')}&description=${encodeURIComponent('Digital agency crafting websites, branding, and experiences. Since 2017.')}`
      },
      twitter: { card: 'summary_large_image', site: '@webxnep', creator: '@webxnep' }
    },
    {
      slug: 'services',
      title: 'Services — WebXNep',
      description: 'Web design, development, branding, and digital solutions tailored to your needs.',
      body: 'Explore our services.',
      canonicalUrl: `${base}/page/services`,
      openGraph: {
        title: 'Services — WebXNep',
        description: 'Web design, development, branding, and digital solutions tailored to your needs.',
        type: 'website',
        url: `${base}/page/services`,
        image: `${base}/api/og?title=${encodeURIComponent('Services — WebXNep')}&description=${encodeURIComponent('Web design, development, branding, and digital solutions tailored to your needs.')}`
      },
      twitter: { card: 'summary_large_image', site: '@webxnep', creator: '@webxnep' }
    },
    {
      slug: 'work',
      title: 'Work — WebXNep',
      description: 'Selected projects and case studies demonstrating our craft.',
      body: 'Our portfolio.',
      canonicalUrl: `${base}/page/work`,
      openGraph: {
        title: 'Work — WebXNep',
        description: 'Selected projects and case studies demonstrating our craft.',
        type: 'website',
        url: `${base}/page/work`,
        image: `${base}/api/og?title=${encodeURIComponent('Work — WebXNep')}&description=${encodeURIComponent('Selected projects and case studies demonstrating our craft.')}`
      },
      twitter: { card: 'summary_large_image', site: '@webxnep', creator: '@webxnep' }
    },
    {
      slug: 'team',
      title: 'Team — WebXNep',
      description: 'Meet the team behind WebXNep.',
      body: 'Our team.',
      canonicalUrl: `${base}/page/team`,
      openGraph: {
        title: 'Team — WebXNep',
        description: 'Meet the team behind WebXNep.',
        type: 'website',
        url: `${base}/page/team`,
        image: `${base}/api/og?title=${encodeURIComponent('Team — WebXNep')}&description=${encodeURIComponent('Meet the team behind WebXNep.')}`
      },
      twitter: { card: 'summary_large_image', site: '@webxnep', creator: '@webxnep' }
    },
    {
      slug: 'blogs',
      title: 'Blogs — WebXNep',
      description: 'Insights, stories, and updates from our studio.',
      body: 'Our blog posts.',
      canonicalUrl: `${base}/page/blogs`,
      openGraph: {
        title: 'Blogs — WebXNep',
        description: 'Insights, stories, and updates from our studio.',
        type: 'website',
        url: `${base}/page/blogs`,
        image: `${base}/api/og?title=${encodeURIComponent('Blogs — WebXNep')}&description=${encodeURIComponent('Insights, stories, and updates from our studio.')}`
      },
      twitter: { card: 'summary_large_image', site: '@webxnep', creator: '@webxnep' }
    },
    {
      slug: 'contact',
      title: 'Contact — WebXNep',
      description: 'Get in touch with our team for collaborations and inquiries.',
      body: 'Contact us.',
      canonicalUrl: `${base}/page/contact`,
      openGraph: {
        title: 'Contact — WebXNep',
        description: 'Get in touch with our team for collaborations and inquiries.',
        type: 'website',
        url: `${base}/page/contact`,
        image: `${base}/api/og?title=${encodeURIComponent('Contact — WebXNep')}&description=${encodeURIComponent('Get in touch with our team for collaborations and inquiries.')}`
      },
      twitter: { card: 'summary_large_image', site: '@webxnep', creator: '@webxnep' }
    },
    {
      slug: 'sample-image',
      title: 'Sample Image — WebXNep',
      description: 'This page demonstrates using a custom sample image for OpenGraph sharing. Optimized 1200×630 poster for rich link previews across platforms and devices.',
      body: 'This page uses the sample.jpg file as the OpenGraph image.',
      canonicalUrl: `${base}/page/sample-image`,
      openGraph: {
        title: 'Sample Image — WebXNep',
        description: 'This page demonstrates using a custom sample image for OpenGraph sharing. Optimized 1200×630 poster for rich link previews across platforms and devices.',
        type: 'website',
        url: `${base}/page/sample-image`,
        image: `${base}/sample.jpg`
      },
      twitter: { card: 'summary_large_image', site: '@webxnep', creator: '@webxnep' }
    },
    {
      slug: 'sample-video',
      title: 'Sample Video — WebXNep',
      description: 'This page showcases a video with a high‑impact Open Graph poster. Social platforms use the 1200×630 image to render an attractive card; visitors who click through see the embedded video playing on the page.',
      body: 'Video demo with poster image for social previews.',
      canonicalUrl: `${base}/page/sample-video`,
      openGraph: {
        title: 'Sample Video — WebXNep',
        description: 'This page showcases a video with a high‑impact Open Graph poster. Social platforms use the 1200×630 image to render an attractive card; visitors who click through see the embedded video playing on the page.',
        type: 'video.other',
        url: `${base}/page/sample-video`,
        image: `${base}/sample.jpg`,
        video: `${base}/sampleVideo.mp4`,
        videoType: 'video/mp4',
        videoWidth: 1280,
        videoHeight: 720
      },
      twitter: { card: 'summary_large_image', site: '@webxnep', creator: '@webxnep' }
    }
  ];

  await PageModel.insertMany(pages);
  console.log('Seeded default pages');
}


