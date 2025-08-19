# OpenGraph Task - Dynamic Meta Tags Implementation

This project demonstrates a complete implementation of dynamic OpenGraph meta tags that work perfectly when sharing links on social media platforms.

## 🚀 Features

- **Dynamic OpenGraph Tags**: Each page has unique, dynamically generated OpenGraph meta tags
- **Automatic Image Generation**: Creates beautiful OpenGraph images on-the-fly using Next.js ImageResponse
- **Custom Image & Video Support**: Use your own images and videos for social media sharing
- **Social Media Ready**: Optimized for Facebook, Twitter, LinkedIn, and other social platforms
- **SEO Optimized**: Includes proper canonical URLs, meta descriptions, and structured data
- **Real-time Updates**: Meta tags update automatically when content changes in the database
- **Flexible Configuration**: Works with localhost, ngrok, and production URLs

## 🏗️ Architecture

### Backend (Express + MongoDB)
- **API Endpoints**: RESTful API for managing page content
- **Database Schema**: MongoDB schema with OpenGraph-specific fields
- **Validation**: Zod schema validation for data integrity
- **Flexible URLs**: Environment variable configuration for different deployment scenarios

### Frontend (Next.js 14)
- **Dynamic Metadata**: Server-side metadata generation per page
- **OpenGraph Images**: Edge runtime API for generating dynamic images
- **Static Generation**: Pre-rendered pages for optimal performance
- **Environment Aware**: Automatically adapts to localhost, ngrok, or production URLs

## 📁 Project Structure

```
OpenGraphTask/
├── backend/
│   ├── src/
│   │   ├── index.ts          # Express server setup
│   │   ├── pages/
│   │   │   ├── model.ts      # MongoDB schema with OpenGraph fields
│   │   │   └── router.ts     # API routes for CRUD operations
│   │   └── seed.ts           # Sample data with OpenGraph metadata
│   ├── env-example.txt       # Environment variable examples
│   └── package.json
├── frontend/
│   ├── app/
│   │   ├── api/og/
│   │   │   └── route.tsx     # Dynamic OpenGraph image generator
│   │   ├── page/[slug]/
│   │   │   └── page.tsx      # Dynamic page with metadata generation
│   │   ├── layout.tsx        # Root layout with default metadata
│   │   ├── page.tsx          # Home page
│   │   └── public/           # Static files (images, videos)
│   └── package.json
└── README.md
```

## 🛠️ Setup Instructions

### 1. Backend Setup
```bash
cd backend
npm install
npm run dev
```

### 2. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

### 3. Environment Variables Configuration

#### **Backend (.env file)**
Choose one of these configurations:

**Option 1: Local Development**
```env
SITE_URL=http://localhost:3000
PUBLIC_URL=http://localhost:3000
MONGO_URI=mongodb://127.0.0.1:27017/opengraph_task
```

**Option 2: With ngrok for Social Media Testing**
```env
SITE_URL=http://localhost:3000
PUBLIC_URL=https://your-ngrok-url.ngrok-free.app
MONGO_URI=mongodb://127.0.0.1:27017/opengraph_task
```

**Option 3: Production Deployment**
```env
SITE_URL=https://your-domain.com
PUBLIC_URL=https://your-domain.com
MONGO_URI=mongodb://your-production-mongo-uri
```

#### **Frontend (.env.local file)**
```env
# For local development
NEXT_PUBLIC_SITE_URL=http://localhost:3000
BACKEND_URL=http://localhost:4000

# For ngrok testing
# NEXT_PUBLIC_SITE_URL=https://your-ngrok-url.ngrok-free.app
# BACKEND_URL=http://localhost:4000

# For production
# NEXT_PUBLIC_SITE_URL=https://your-domain.com
# BACKEND_URL=https://your-api-domain.com
```

## 🎯 How OpenGraph Works

### 1. Database Schema
Each page stores OpenGraph metadata:
```typescript
const OpenGraphSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: false },
  video: { type: String, required: false },
  videoType: { type: String, required: false, default: 'video/mp4' },
  videoWidth: { type: Number, required: false, default: 1200 },
  videoHeight: { type: Number, required: false, default: 630 },
  type: { type: String, required: false, default: 'website' },
  url: { type: String, required: false }
});
```

### 2. Dynamic Metadata Generation
Next.js generates metadata server-side for each page:
```typescript
export async function generateMetadata({ params }): Promise<Metadata> {
  const data = await getPage(params.slug);
  
  // Use environment variables with fallbacks
  const publicUrl = process.env.NEXT_PUBLIC_SITE_URL || 
                   process.env.PUBLIC_URL || 
                   'https://d3455aaedee5.ngrok-free.app';
  
  return {
    title: data.openGraph.title,
    description: data.openGraph.description,
    openGraph: {
      title: data.openGraph.title,
      description: data.openGraph.description,
      type: data.openGraph.type || 'website',
      url: currentUrl,
      images: [/* dynamic image URLs */],
      videos: data.openGraph.video ? [/* video metadata */] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: data.openGraph.title,
      description: data.openGraph.description,
      images: [/* dynamic image URLs */],
    }
  };
}
```

### 3. Dynamic Image Generation
The `/api/og` endpoint creates beautiful images:
```typescript
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get('title');
  const description = searchParams.get('description');
  
  return new ImageResponse(
    <div style={{/* beautiful styling */}}>
      <h1>{title}</h1>
      <p>{description}</p>
    </div>,
    { width: 1200, height: 630 }
  );
}
```

## 🔗 Testing OpenGraph Tags

### 1. View Source
Visit any page (e.g., `http://localhost:3000/page/services`) and view page source to see the meta tags.

### 2. Social Media Testing Tools
- **Facebook**: https://developers.facebook.com/tools/debug/
- **Twitter**: https://cards-dev.twitter.com/validator
- **LinkedIn**: https://www.linkedin.com/post-inspector/

### 3. Browser Developer Tools
Open DevTools → Elements → `<head>` section to see all meta tags.

## 📱 Social Media Preview

When you share a link, social platforms will display:
- **Title**: Dynamic page title
- **Description**: Dynamic page description  
- **Image**: Beautifully generated 1200x630 image or your custom image
- **Video**: Auto-playing video preview (if video is provided)
- **URL**: Canonical page URL

## 🎨 Customization

### Adding Custom Images
Update the database with custom image URLs:
```javascript
openGraph: {
  title: "Your Title",
  description: "Your Description",
  image: "https://your-domain.com/custom-image.jpg"
}
```

### Adding Custom Videos
Update the database with custom video URLs:
```javascript
openGraph: {
  title: "Your Title",
  description: "Your Description",
  type: "video.other",
  video: "https://your-domain.com/custom-video.mp4",
  videoType: "video/mp4",
  videoWidth: 1280,
  videoHeight: 720
}
```

### Modifying Image Design
Edit `frontend/app/api/og/route.tsx` to change the image styling, colors, fonts, etc.

### Adding New Pages
1. Add page data to the database via API
2. The OpenGraph tags will be generated automatically
3. Images will be created on-demand

## 🚀 Deployment

### Production Environment Variables
```env
# Backend
SITE_URL=https://your-domain.com
PUBLIC_URL=https://your-domain.com
MONGO_URI=your-production-mongo-uri

# Frontend
NEXT_PUBLIC_SITE_URL=https://your-domain.com
BACKEND_URL=https://your-api-domain.com
```

### Vercel Deployment
The frontend is optimized for Vercel deployment with edge runtime support.

## 📊 Performance

- **Static Generation**: Pages are pre-rendered for fast loading
- **Edge Runtime**: OpenGraph images generated at the edge
- **Caching**: Images and metadata are cached appropriately
- **SEO**: Proper canonical URLs and meta tags for search engines

## 🔍 SEO Benefits

- **Rich Snippets**: Enhanced search result appearance
- **Social Sharing**: Beautiful previews on all platforms
- **Click-through Rates**: Higher engagement due to rich previews
- **Brand Consistency**: Professional appearance across platforms

## 🌐 URL Configuration Scenarios

### **Local Development**
- Backend: `http://localhost:4000`
- Frontend: `http://localhost:3000`
- OpenGraph: Works locally, but social media tools can't access

### **ngrok Testing**
- Backend: `http://localhost:4000`
- Frontend: `http://localhost:3000`
- Public URL: `https://your-ngrok-url.ngrok-free.app`
- OpenGraph: Fully accessible for social media testing

### **Production**
- Backend: `https://your-api-domain.com`
- Frontend: `https://your-domain.com`
- Public URL: `https://your-domain.com`
- OpenGraph: Production-ready with real domain

This implementation ensures that every page shared on social media will display beautifully with dynamic, relevant content, regardless of your deployment environment!
