import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';

// Run at the edge for low latency when social bots request images
export const runtime = 'edge';

// GET /api/og?title=...&description=...
// Generates a 1200×630 PNG on the fly. This is used as a fallback poster
// when a page does not provide a custom image.
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get('title') || 'WebXNep';
  const description = searchParams.get('description') || 'Digital agency crafting websites, branding, and experiences';

  return new ImageResponse(
    (
      // Simple card UI — tweak colors, fonts, or layout to match your brand
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#1a1a1a',
          backgroundImage: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          padding: '40px',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
            borderRadius: '20px',
            padding: '60px 40px',
            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
            maxWidth: '800px',
            textAlign: 'center',
          }}
        >
          <div
            style={{
              fontSize: '48px',
              fontWeight: 'bold',
              color: '#1a1a1a',
              marginBottom: '20px',
              lineHeight: '1.2',
            }}
          >
            {title}
          </div>
          <div
            style={{
              fontSize: '24px',
              color: '#666',
              lineHeight: '1.4',
              maxWidth: '600px',
            }}
          >
            {description}
          </div>
          <div
            style={{
              fontSize: '18px',
              color: '#667eea',
              fontWeight: 'bold',
              marginTop: '30px',
            }}
          >
            WebXNep
          </div>
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
