import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { domains, statuses, type Domain } from './data/codex';

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      /** Italian folio caption, e.g. "Il torchio digitale". */
      motto: z.string(),
      domain: z.enum(Object.keys(domains) as [Domain, ...Domain[]]),
      status: z.enum(Object.keys(statuses) as [keyof typeof statuses, ...(keyof typeof statuses)[]]),
      /** Folio number: sets order on the index and prev/next navigation. */
      folio: z.number().int().positive(),
      summary: z.string(),
      role: z.string(),
      years: z.string().optional(),
      stack: z.array(z.string()),
      links: z
        .object({ live: z.url().optional(), repo: z.url().optional() })
        .default({}),
      logo: image().optional(),
      /** Key of the sketch component in src/components/sketches. */
      sketch: z.string(),
      /** Centre of the sketch on the 2400×1600 desk. */
      desk: z.object({ x: z.number(), y: z.number(), size: z.number().default(220) }),
      related: z.array(z.string()).default([]),
      /** Margin note, rendered in mirror writing. */
      note: z.string(),
      /** Workshop plan for unfinished pieces. */
      plan: z.array(z.string()).default([]),
      capolavoro: z.boolean().default(false),
      size: z.enum(['small', 'medium', 'large']).optional(),
    }),
});

const articles = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/articles' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    summary: z.string(),
  }),
});

export const collections = { projects, articles };
