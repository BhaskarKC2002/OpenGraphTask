import { headers } from 'next/headers';

// Returns the public base URL for building absolute links.
// Priority: NEXT_PUBLIC_SITE_URL → PUBLIC_URL → request headers → localhost
export function getPublicBaseUrl(): string {
  const envUrl = process.env.NEXT_PUBLIC_SITE_URL || process.env.PUBLIC_URL;
  if (envUrl) return envUrl;
  try {
    const h = (headers() as unknown as { get(name: string): string | null });
    const proto = h.get('x-forwarded-proto') || 'https';
    const host = h.get('x-forwarded-host') || h.get('host');
    if (host) return `${proto}://${host}`;
  } catch {
    // no-op: headers() not available in some contexts
  }
  return 'http://localhost:3000';
}

// Ensures a URL is absolute and https; also rewrites localhost to the current site origin
export function ensureAbsoluteHttps(base: string, maybeUrl?: string): string | undefined {
  if (!maybeUrl) return undefined;
  if (maybeUrl.startsWith('/')) return `${base}${maybeUrl}`;
  try {
    const baseUrl = new URL(base);
    const url = new URL(maybeUrl);
    if (url.protocol === 'http:') url.protocol = 'https:';
    if (url.hostname === 'localhost' || url.hostname === '127.0.0.1') {
      url.protocol = baseUrl.protocol;
      url.hostname = baseUrl.hostname;
      url.port = baseUrl.port;
    }
    if (url.hostname === baseUrl.hostname && baseUrl.port === '' && url.port) {
      url.port = '';
    }
    return url.toString();
  } catch {
    return maybeUrl;
  }
}

// A short version string added to media URLs to nudge social scrapers after each deploy
export function getVersionSuffix(): string {
  const version = process.env.VERCEL_GIT_COMMIT_SHA || process.env.VERCEL_DEPLOYMENT_ID || '';
  return version ? `?v=${version.slice(0, 8)}` : '';
}

export function buildPosterUrls(params: {
  base: string;
  image?: string;
  hasVideo: boolean;
  title: string;
  description: string;
}): { poster: string; twitterPoster: string } {
  const { base, image, hasVideo, title, description } = params;
  const v = getVersionSuffix();
  const fallback = hasVideo
    ? `${base}/sample.jpg`
    : `${base}/api/og?title=${encodeURIComponent(title)}&description=${encodeURIComponent(description)}`;
  const normalized = ensureAbsoluteHttps(base, image) || fallback;
  const poster = `${normalized}${v}`;
  const twitterPoster = normalized.includes('/api/og') ? `${base}/sample.jpg${v}` : poster;
  return { poster, twitterPoster };
}

export function buildVideoUrl(base: string, video?: string): string | undefined {
  const v = getVersionSuffix();
  return ensureAbsoluteHttps(base, video ? `${video}${v}` : undefined);
}

export function clamp(text: string, max: number): string {
  return text.length > max ? `${text.slice(0, max - 1)}…` : text;
}

export function buildTwitterMeta(params: {
  hasVideo: boolean;
  title: string;
  description: string;
  image: string;
}): { card: 'summary' | 'summary_large_image'; title: string; description: string; images: string[] } {
  const { hasVideo, title, description, image } = params;
  const clampedTitle = clamp(title, 70);
  const clampedDesc = clamp(description, 200);
  const card: 'summary' | 'summary_large_image' = hasVideo ? 'summary_large_image' : (clampedDesc.length > 120 ? 'summary' : 'summary_large_image');
  return { card, title: clampedTitle, description: clampedDesc, images: [image] };
}


