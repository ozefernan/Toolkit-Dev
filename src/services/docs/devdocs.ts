import axios from 'axios';
import type { Language, DocIndex, DocContent, DocEntry } from '../../types';

// CORS proxy fallback
const CORS_PROXY = 'https://corsproxy.io/?';

async function fetchWithFallback(url: string, options: any = {}) {
  try {
    // Try direct fetch first
    const response = await axios.get(url, options);
    return response;
  } catch (error) {
    // If CORS error, try with proxy
    console.log('Direct fetch failed, trying with CORS proxy...');
    const proxiedUrl = CORS_PROXY + encodeURIComponent(url);
    return await axios.get(proxiedUrl, options);
  }
}

// List of popular languages/frameworks available in DevDocs
export const AVAILABLE_LANGUAGES: Language[] = [
  {
    name: 'JavaScript',
    slug: 'javascript',
    type: 'language',
    links: { home: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript' },
  },
  {
    name: 'TypeScript',
    slug: 'typescript',
    type: 'language',
    links: { home: 'https://www.typescriptlang.org' },
  },
  {
    name: 'React',
    slug: 'react',
    type: 'framework',
    links: { home: 'https://react.dev' },
  },
  {
    name: 'Node.js',
    slug: 'node',
    type: 'runtime',
    links: { home: 'https://nodejs.org' },
  },
  {
    name: 'Python',
    slug: 'python~3.12',
    type: 'language',
    version: '3.12',
    links: { home: 'https://www.python.org' },
  },
  {
    name: 'Go',
    slug: 'go',
    type: 'language',
    links: { home: 'https://go.dev' },
  },
  {
    name: 'Rust',
    slug: 'rust',
    type: 'language',
    links: { home: 'https://www.rust-lang.org' },
  },
  {
    name: 'CSS',
    slug: 'css',
    type: 'language',
    links: { home: 'https://developer.mozilla.org/en-US/docs/Web/CSS' },
  },
  {
    name: 'HTML',
    slug: 'html',
    type: 'language',
    links: { home: 'https://developer.mozilla.org/en-US/docs/Web/HTML' },
  },
  {
    name: 'Vue.js',
    slug: 'vue~3',
    type: 'framework',
    version: '3',
    links: { home: 'https://vuejs.org' },
  },
  {
    name: 'Angular',
    slug: 'angular',
    type: 'framework',
    links: { home: 'https://angular.io' },
  },
  {
    name: 'Next.js',
    slug: 'nextjs',
    type: 'framework',
    links: { home: 'https://nextjs.org' },
  },
  {
    name: 'Express',
    slug: 'express',
    type: 'framework',
    links: { home: 'https://expressjs.com' },
  },
  {
    name: 'Django',
    slug: 'django~5.0',
    type: 'framework',
    version: '5.0',
    links: { home: 'https://www.djangoproject.com' },
  },
  {
    name: 'Flask',
    slug: 'flask',
    type: 'framework',
    links: { home: 'https://flask.palletsprojects.com' },
  },
];

/**
 * Fetches the documentation index for a specific language/framework
 */
export async function fetchDocIndex(slug: string): Promise<DocIndex> {
  try {
    const url = `https://devdocs.io/docs/${slug}/index.json`;
    console.log(`Fetching doc index for ${slug} from ${url}`);

    const response = await fetchWithFallback(url, {
      timeout: 20000,
      headers: {
        'Accept': 'application/json',
      },
    });

    const data = response.data;
    console.log(`Successfully fetched ${data.entries?.length || 0} entries for ${slug}`);

    return {
      entries: data.entries || [],
    };
  } catch (error) {
    console.error(`Error fetching doc index for ${slug}:`, error);
    if (axios.isAxiosError(error)) {
      throw new Error(`Failed to fetch documentation: ${error.message}`);
    }
    throw error;
  }
}

/**
 * Fetches the documentation database (db.json) for a language
 * This contains all documentation content for the language
 */
export async function fetchDocDatabase(slug: string): Promise<Record<string, string>> {
  try {
    const url = `https://documents.devdocs.io/${slug}/db.json`;
    console.log('========================================');
    console.log('FETCHING DOC DATABASE');
    console.log('Slug:', slug);
    console.log('URL:', url);
    console.log('========================================');

    const response = await axios.get(url, {
      timeout: 60000, // 60 seconds for large files
      headers: {
        'Accept': 'application/json',
      },
    });

    console.log('Response status:', response.status);
    console.log('Database size:', Object.keys(response.data).length, 'entries');
    console.log('========================================');

    return response.data;
  } catch (error) {
    console.error(`Error fetching doc database for ${slug}:`, error);
    if (axios.isAxiosError(error)) {
      throw new Error(`Failed to fetch documentation database: ${error.message}`);
    }
    throw error;
  }
}

/**
 * Fetches the full documentation content for a specific path
 * Uses the pre-loaded database instead of individual requests
 */
export async function fetchDocContent(
  slug: string,
  path: string,
  database?: Record<string, string>
): Promise<DocContent> {
  try {
    // Remove fragment identifier (e.g., #section-name) from path
    const cleanPath = path.split('#')[0];

    console.log('========================================');
    console.log('FETCHING DOC CONTENT');
    console.log('Slug:', slug);
    console.log('Path:', path);
    console.log('Clean Path:', cleanPath);
    console.log('Has database:', !!database);
    console.log('========================================');

    // If no database provided, fetch it
    if (!database) {
      console.log('No database provided, fetching...');
      database = await fetchDocDatabase(slug);
    }

    // Get HTML from database
    const html = database[cleanPath];

    if (!html) {
      throw new Error(`Documentation not found for path: ${cleanPath}`);
    }

    console.log('Raw HTML from database, length:', html.length);
    console.log('Raw HTML preview (first 300 chars):', html.substring(0, 300));

    // Extract title BEFORE sanitizing (which removes the H1)
    const title = extractTitle(html) || path;
    console.log('Extracted title:', title);

    const sanitizedHtml = sanitizeHtml(html);
    console.log('Sanitized HTML length:', sanitizedHtml.length);
    console.log('Sanitized HTML preview (first 300 chars):', sanitizedHtml.substring(0, 300));
    console.log('========================================');

    return {
      title,
      html: sanitizedHtml,
      path,
    };
  } catch (error) {
    console.error(`Error fetching doc content for ${slug}/${path}:`, error);
    if (axios.isAxiosError(error)) {
      throw new Error(`Failed to fetch content: ${error.message}`);
    }
    throw error;
  }
}

/**
 * Searches for documentation entries across a specific language
 */
export function searchDocs(
  entries: DocEntry[],
  query: string,
  limit: number = 20
): DocEntry[] {
  if (!query.trim()) return [];

  const searchTerms = query.toLowerCase().split(' ');

  const scored = entries.map((entry) => {
    const nameLower = entry.name.toLowerCase();
    const pathLower = entry.path.toLowerCase();

    let score = 0;

    // Exact match
    if (nameLower === query.toLowerCase()) score += 100;

    // Starts with query
    if (nameLower.startsWith(query.toLowerCase())) score += 50;

    // Contains all search terms
    const containsAll = searchTerms.every(
      (term) => nameLower.includes(term) || pathLower.includes(term)
    );
    if (containsAll) score += 20;

    // Contains any search term
    searchTerms.forEach((term) => {
      if (nameLower.includes(term)) score += 5;
      if (pathLower.includes(term)) score += 2;
    });

    return { entry, score };
  });

  return scored
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(({ entry }) => entry);
}

/**
 * Extracts title from HTML content
 */
function extractTitle(html: string): string | null {
  const match = html.match(/<h1[^>]*>(.*?)<\/h1>/i);
  if (match) {
    // Remove HTML tags from title
    return match[1].replace(/<[^>]*>/g, '').trim();
  }
  return null;
}

/**
 * The db.json already contains clean HTML content, no extraction needed
 * This function is kept for backward compatibility
 */
function extractDocContent(html: string): string {
  // HTML from db.json is already clean, just return it
  return html;
}

/**
 * Sanitizes HTML content for safe rendering
 * Makes the documentation cleaner and more focused
 */
function sanitizeHtml(html: string): string {
  let content = html;

  // Remove all links - keep only the text
  content = content.replace(/<a[^>]*>(.*?)<\/a>/gi, '$1');

  // Remove images (keep alt text if present)
  content = content.replace(/<img[^>]*alt="([^"]*)"[^>]*>/gi, '[$1]');
  content = content.replace(/<img[^>]*>/gi, '');

  // Remove navigation elements
  content = content.replace(/<nav[^>]*>.*?<\/nav>/gis, '');

  // Remove aside elements (usually contain extra info)
  content = content.replace(/<aside[^>]*>.*?<\/aside>/gis, '');

  // Remove script and style tags
  content = content.replace(/<script[^>]*>.*?<\/script>/gis, '');
  content = content.replace(/<style[^>]*>.*?<\/style>/gis, '');

  // Remove comments
  content = content.replace(/<!--.*?-->/gs, '');

  // Remove the first H1 to avoid duplicate titles (we show it in the breadcrumb)
  content = content.replace(/<h1[^>]*>.*?<\/h1>/i, '');

  // Remove data attributes and classes that are not needed
  content = content.replace(/\s+data-[a-z-]+="[^"]*"/gi, '');

  // Clean up multiple consecutive whitespace
  content = content.replace(/\s+/g, ' ');
  content = content.replace(/>\s+</g, '><');

  return content.trim();
}

/**
 * Get language info by slug
 */
export function getLanguageBySlug(slug: string): Language | undefined {
  return AVAILABLE_LANGUAGES.find((lang) => lang.slug === slug);
}
