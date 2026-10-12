import { getCollection, type CollectionEntry } from 'astro:content';
import type { Lang } from '.';

type ProjectData = CollectionEntry<'projects'>['data'];

export type Project = {
  id: string;
  data: ProjectData;
  /** The entry whose body to render: the translation when there is one. */
  entry: CollectionEntry<'projects'> | CollectionEntry<'projectsEl'>;
  translated: boolean;
};

/** Projects in folio order, with Greek words laid over the shared English data. */
export async function getProjects(lang: Lang): Promise<Project[]> {
  const projects = (await getCollection('projects')).sort((a, b) => a.data.folio - b.data.folio);
  if (lang === 'en') return projects.map((p) => ({ id: p.id, data: p.data, entry: p, translated: true }));

  const greek = new Map((await getCollection('projectsEl')).map((g) => [g.id, g]));
  return projects.map((p) => {
    const g = greek.get(p.id);
    if (!g) return { id: p.id, data: p.data, entry: p, translated: false };
    return {
      id: p.id,
      entry: g,
      translated: true,
      data: {
        ...p.data,
        title: g.data.title ?? p.data.title,
        summary: g.data.summary,
        role: g.data.role,
        years: g.data.years ?? p.data.years,
        stack: g.data.stack ?? p.data.stack,
        note: g.data.note,
        plan: g.data.plan ?? p.data.plan,
      },
    };
  });
}

export type Article = {
  id: string;
  data: CollectionEntry<'articles'>['data'];
  entry: CollectionEntry<'articles'> | CollectionEntry<'articlesEl'>;
  translated: boolean;
};

/** Articles, newest first. A Greek page falls back to the English text until it's translated. */
export async function getArticles(lang: Lang): Promise<Article[]> {
  const articles = (await getCollection('articles')).sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
  const greek = lang === 'el' ? new Map((await getCollection('articlesEl')).map((g) => [g.id, g])) : null;
  return articles.map((a) => {
    const g = greek?.get(a.id);
    return g
      ? { id: a.id, data: g.data, entry: g, translated: true }
      : { id: a.id, data: a.data, entry: a, translated: lang === 'en' };
  });
}
