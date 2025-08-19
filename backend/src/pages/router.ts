import { Router } from 'express';
import PageModel from './model.js';
import { z } from 'zod';

const router = Router();

// Validate client payloads using zod to keep our database clean and predictable
const upsertSchema = z.object({
  slug: z.string().min(1),
  title: z.string().min(1),
  description: z.string().min(1),
  body: z.string().optional(),
  canonicalUrl: z.string().url().optional(),
  openGraph: z.object({
    title: z.string().min(1),
    description: z.string().min(1),
    image: z.string().url().optional(),
    video: z.string().url().optional(),
    videoType: z.string().optional(),
    videoWidth: z.number().optional(),
    videoHeight: z.number().optional(),
    type: z.string().optional(),
    url: z.string().url().optional()
  }),
  twitter: z.object({
    card: z.string().optional(),
    site: z.string().optional(),
    creator: z.string().optional()
  }).optional()
});

// GET /api/pages — list all pages (useful for generateStaticParams)
router.get('/', async (_req, res) => {
  const pages = await PageModel.find({}, { __v: 0 }).lean();
  res.json(pages);
});

// GET /api/pages/:slug — fetch a single page by slug
router.get('/:slug', async (req, res) => {
  const page = await PageModel.findOne({ slug: req.params.slug }, { __v: 0 }).lean();
  if (!page) return res.status(404).json({ message: 'Not found' });
  res.json(page);
});

// POST /api/pages — create or update a page in one call (idempotent)
router.post('/', async (req, res) => {
  const parsed = upsertSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ message: 'Invalid payload', errors: parsed.error.flatten() });
  }
  const data = parsed.data;
  const page = await PageModel.findOneAndUpdate(
    { slug: data.slug },
    data,
    { upsert: true, new: true, setDefaultsOnInsert: true }
  ).lean();
  res.status(201).json(page);
});

export default router;


