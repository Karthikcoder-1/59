import { create } from 'zustand';

export const useStore = create((set, get) => ({
  currentUser: {
    name: 'Eleanor Sterling',
    role: 'Editor-in-Chief', // 'Editor-in-Chief' | 'Staff Writer' | 'SEO Analyst'
  },

  articles: [
    {
      id: 'art-1',
      title: 'The Silicon Renaissance: Urban Microgrids Reshaping Modern Cities',
      slug: 'silicon-renaissance-urban-microgrids',
      author: 'Eleanor Sterling',
      status: 'published', // 'draft' | 'in_review' | 'published'
      publishDate: '2026-09-26',
      readTime: '6 min read',
      seo: {
        metaTitle: 'The Silicon Renaissance: Urban Microgrids 2026',
        metaDescription: 'An investigative report into municipal solar microgrids transforming decentralized energy independence.',
        keywords: 'microgrids, clean energy, municipal infrastructure, urban planning'
      },
      blocks: [
        { id: 'b-1', type: 'headline', content: 'The Silicon Renaissance: Urban Microgrids Reshaping Modern Cities' },
        { id: 'b-2', type: 'lead', content: 'Across twenty metropolitan districts, decentralized battery clusters and solar microgrid installations are decoupling city districts from centralized vulnerability.' },
        { id: 'b-3', type: 'quote', content: '“Decentralized energy isn’t merely an environmental ideal; it is the fundamental prerequisite of resilient civic governance.”', author: 'Dr. Marcus Brody' },
        { id: 'b-4', type: 'text', content: 'Field analysis indicates a 44% reduction in peak-hour transmission latency. Communities operate autonomous load balancers during peak solar production periods.' }
      ],
      versions: [
        { version: 'v2.0', date: '2026-09-26 10:00 AM', author: 'Eleanor Sterling', note: 'Final editorial polish & legal clearance' },
        { version: 'v1.2', date: '2026-09-25 04:30 PM', author: 'Marcus Brody', note: 'Added engineering quotes' },
        { version: 'v1.0', date: '2026-09-24 09:15 AM', author: 'Eleanor Sterling', note: 'Initial manuscript draft' }
      ],
      analytics: {
        totalViews: 48290,
        uniqueVisitors: 36120,
        avgReadTime: '4m 32s',
        bounceRate: '28.4%'
      }
    },
    {
      id: 'art-2',
      title: 'Cryptographic Sovereignty: The New Digital Civil Rights Frontier',
      slug: 'cryptographic-sovereignty-digital-rights',
      author: 'Alexander Vance',
      status: 'in_review',
      publishDate: '2026-09-28',
      readTime: '8 min read',
      seo: {
        metaTitle: 'Cryptographic Sovereignty and Civil Rights | The Gazette',
        metaDescription: 'How zero-knowledge proofs and decentralized identity keys protect electoral integrity.',
        keywords: 'cryptography, privacy, zero knowledge proofs, voting'
      },
      blocks: [
        { id: 'b-1', type: 'headline', content: 'Cryptographic Sovereignty: The New Digital Civil Rights Frontier' },
        { id: 'b-2', type: 'lead', content: 'When citizen records and ballots can be verified without disclosing personal credentials, democratic institutions achieve tamper-evident trust.' },
        { id: 'b-3', type: 'text', content: 'The implementation of SHA-256 state machines in municipal voting is now tested in three major metropolitan districts.' }
      ],
      versions: [
        { version: 'v1.0', date: '2026-09-27 11:00 AM', author: 'Alexander Vance', note: 'Submitted for editorial board review' }
      ],
      analytics: {
        totalViews: 1240,
        uniqueVisitors: 890,
        avgReadTime: '5m 10s',
        bounceRate: '22.1%'
      }
    }
  ],

  selectedArticleId: 'art-1',

  // Actions
  selectArticle: (id) => set({ selectedArticleId: id }),

  updateArticleStatus: (id, status) => set((state) => ({
    articles: state.articles.map((art) => art.id === id ? { ...art, status } : art)
  })),

  updateSEO: (id, seoData) => set((state) => ({
    articles: state.articles.map((art) => art.id === id ? { ...art, seo: { ...art.seo, ...seoData } } : art)
  })),

  addContentBlock: (articleId, blockType) => set((state) => {
    const defaultContents = {
      headline: 'New Sub-Headline Section',
      lead: 'Enter an editorial introduction paragraph here...',
      quote: '“Insert an authoritative quote from a subject-matter specialist here.”',
      text: 'Compose analytical multi-column text analyzing the civic impact of this development...'
    };

    const newBlock = {
      id: `b-${Date.now()}`,
      type: blockType,
      content: defaultContents[blockType] || 'New editorial block content.'
    };

    return {
      articles: state.articles.map((art) =>
        art.id === articleId ? { ...art, blocks: [...art.blocks, newBlock] } : art
      )
    };
  }),

  createArticle: (title) => set((state) => {
    const newArt = {
      id: `art-${Date.now()}`,
      title: title || 'Untitled Investigation',
      slug: (title || 'untitled-investigation').toLowerCase().replace(/\s+/g, '-'),
      author: state.currentUser.name,
      status: 'draft',
      publishDate: new Date().toISOString().slice(0, 10),
      readTime: '4 min read',
      seo: {
        metaTitle: title || 'Untitled Investigation',
        metaDescription: 'Draft article description for SEO crawl bots.',
        keywords: 'investigation, news, journalism'
      },
      blocks: [
        { id: `b-${Date.now()}-1`, type: 'headline', content: title || 'Untitled Investigation' },
        { id: `b-${Date.now()}-2`, type: 'lead', content: 'Lead paragraph for this developing news story...' },
        { id: `b-${Date.now()}-3`, type: 'text', content: 'Body copy and journalistic analysis...' }
      ],
      versions: [
        { version: 'v1.0', date: new Date().toISOString().slice(0, 10), author: state.currentUser.name, note: 'Initial draft creation' }
      ],
      analytics: {
        totalViews: 0,
        uniqueVisitors: 0,
        avgReadTime: '0m 00s',
        bounceRate: '0%'
      }
    };
    return {
      articles: [newArt, ...state.articles],
      selectedArticleId: newArt.id
    };
  })
}));
