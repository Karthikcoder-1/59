import React, { useState } from 'react';
import {
  Newspaper,
  Feather,
  CheckCircle2,
  Clock,
  Globe,
  Share2,
  PlusCircle,
  History,
  TrendingUp,
  FileText,
  Sliders,
  Send,
  Eye,
  Layers,
  Sparkles,
  Quote,
  Heading,
  AlignLeft,
  ChevronRight
} from 'lucide-react';
import { useStore } from './store/useStore';

export default function App() {
  const {
    currentUser,
    articles,
    selectedArticleId,
    selectArticle,
    updateArticleStatus,
    updateSEO,
    addContentBlock,
    createArticle
  } = useStore();

  const [activeTab, setActiveTab] = useState('editor'); // 'editor' | 'pipeline' | 'seo' | 'history' | 'analytics'
  const [newArticleTitle, setNewArticleTitle] = useState('');
  const [showNewModal, setShowNewModal] = useState(false);

  const activeArticle = articles.find((a) => a.id === selectedArticleId) || articles[0];

  const handleCreate = (e) => {
    e.preventDefault();
    if (!newArticleTitle) return;
    createArticle(newArticleTitle);
    setNewArticleTitle('');
    setShowNewModal(false);
    setActiveTab('editor');
  };

  return (
    <div className="min-h-screen bg-[#fcfbf9] text-[#141414] flex flex-col font-sans">
      {/* Formal Masthead & Editorial Header */}
      <header className="border-b border-[#222222] bg-[#f6f4ee]">
        <div className="max-w-7xl mx-auto px-6 pt-4 pb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#e8e5db]">
          <div className="flex items-center gap-3">
            <Newspaper className="w-6 h-6 text-[#990000]" />
            <div>
              <span className="font-serif font-black text-2xl tracking-tighter text-[#141414] block leading-none">
                THE GAZETTE CMS
              </span>
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#777777] font-bold">
                Editorial Publishing Engine & Archival Press
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs font-mono">
            <span className="text-[#666666]">
              Editor: <b className="text-[#141414]">{currentUser.name}</b> ({currentUser.role})
            </span>
            <button
              onClick={() => setShowNewModal(true)}
              className="px-3.5 py-1.5 bg-[#990000] hover:bg-[#7f1d1d] text-white rounded font-bold transition flex items-center gap-1.5 shadow-sm"
            >
              <PlusCircle className="w-3.5 h-3.5" /> New Story
            </button>
          </div>
        </div>

        {/* The Characteristic Editorial Blood-Red Rule Line */}
        <div className="h-[3px] bg-[#990000] w-full" />

        {/* Secondary Navigation */}
        <div className="max-w-7xl mx-auto px-6 py-2 flex flex-wrap items-center justify-between gap-4 text-xs font-serif font-bold">
          <div className="flex items-center gap-4">
            {[
              { id: 'editor', label: 'Story Builder & Layout', icon: Feather },
              { id: 'pipeline', label: 'Publishing Queue', icon: Layers },
              { id: 'seo', label: 'SEO & Metadata', icon: Globe },
              { id: 'history', label: 'Version Ledger', icon: History },
              { id: 'analytics', label: 'Readership Metrics', icon: TrendingUp }
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-1 flex items-center gap-1.5 border-b-2 transition ${
                    activeTab === tab.id
                      ? 'border-[#990000] text-[#990000]'
                      : 'border-transparent text-[#555555] hover:text-[#141414]'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Active Article Selector */}
          <div className="flex items-center gap-2 font-mono text-xs">
            <span className="text-[#777777]">Article:</span>
            <select
              value={selectedArticleId}
              onChange={(e) => selectArticle(e.target.value)}
              className="bg-[#fcfbf9] border border-[#d5d0c3] rounded px-2 py-1 text-xs font-bold text-[#141414] focus:outline-none focus:border-[#990000]"
            >
              {articles.map((art) => (
                <option key={art.id} value={art.id}>
                  {art.title.slice(0, 40)}... ({art.status.toUpperCase()})
                </option>
              ))}
            </select>
          </div>
        </div>
      </header>

      {/* Main Editorial Workspace */}
      <main className="max-w-6xl mx-auto px-6 py-8 w-full flex-1 space-y-8">
        {/* VIEW 1: STORY BUILDER & NEWSPAPER LAYOUT */}
        {activeTab === 'editor' && (
          <div className="space-y-6">
            {/* Status & Action Bar */}
            <div className="bg-[#f6f4ee] border border-[#e8e5db] p-4 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className={`px-2.5 py-0.5 rounded text-[10px] font-mono font-bold uppercase tracking-wider ${
                  activeArticle.status === 'published'
                    ? 'bg-emerald-900 text-emerald-100'
                    : activeArticle.status === 'in_review'
                    ? 'bg-amber-900 text-amber-100'
                    : 'bg-zinc-800 text-zinc-100'
                }`}>
                  ● {activeArticle.status.replace('_', ' ')}
                </span>
                <span className="text-xs text-[#666666] font-mono">
                  Slug: /{activeArticle.slug} • {activeArticle.readTime}
                </span>
              </div>

              <div className="flex items-center gap-2 font-mono text-xs">
                {activeArticle.status !== 'published' && (
                  <button
                    onClick={() => updateArticleStatus(activeArticle.id, 'published')}
                    className="px-3.5 py-1.5 bg-[#990000] hover:bg-[#7f1d1d] text-white rounded font-bold transition flex items-center gap-1.5"
                  >
                    <Send className="w-3.5 h-3.5" /> Publish to Print
                  </button>
                )}
                {activeArticle.status === 'draft' && (
                  <button
                    onClick={() => updateArticleStatus(activeArticle.id, 'in_review')}
                    className="px-3.5 py-1.5 bg-[#141414] hover:bg-[#333333] text-white rounded font-bold transition"
                  >
                    Submit for Review
                  </button>
                )}
              </div>
            </div>

            {/* Newspaper Styled Column Article Card */}
            <div className="bg-white border-2 border-[#141414] p-8 md:p-12 shadow-2xl space-y-6">
              <div className="text-center space-y-3 border-b-2 border-[#141414] pb-6">
                <span className="text-[11px] font-mono uppercase tracking-widest text-[#990000] font-black">
                  Special Investigative Dispatches
                </span>
                <h1 className="font-serif text-3xl md:text-5xl font-black text-[#141414] leading-tight max-w-4xl mx-auto">
                  {activeArticle.title}
                </h1>
                <div className="text-xs font-mono text-[#666666] pt-1">
                  BY <b className="text-[#141414] uppercase">{activeArticle.author}</b> • PUBLISHED {activeArticle.publishDate}
                </div>
              </div>

              {/* Dynamic Content Blocks Rendering */}
              <div className="space-y-6 text-base leading-relaxed text-[#222222]">
                {activeArticle.blocks.map((block) => (
                  <div key={block.id} className="group relative">
                    {block.type === 'headline' && (
                      <h2 className="font-serif text-2xl font-bold text-[#141414] border-b border-[#e8e5db] pb-2 mt-4">
                        {block.content}
                      </h2>
                    )}
                    {block.type === 'lead' && (
                      <p className="font-serif text-lg italic text-[#444444] leading-relaxed pl-4 border-l-4 border-[#990000]">
                        {block.content}
                      </p>
                    )}
                    {block.type === 'quote' && (
                      <blockquote className="my-6 p-6 bg-[#fcfbf9] border-y-2 border-[#141414] text-center space-y-2">
                        <p className="font-serif text-xl italic font-bold text-[#141414]">{block.content}</p>
                        {block.author && (
                          <cite className="text-xs font-mono uppercase tracking-wider text-[#990000] block">
                            — {block.author}
                          </cite>
                        )}
                      </blockquote>
                    )}
                    {block.type === 'text' && (
                      <p className="text-justify font-sans text-base leading-relaxed text-[#333333]">
                        {block.content}
                      </p>
                    )}
                  </div>
                ))}
              </div>

              {/* Add Content Block Inserter Bar */}
              <div className="border-t-2 border-[#141414] pt-6 flex flex-wrap items-center justify-between gap-4 bg-[#f6f4ee] p-4 rounded-xl">
                <span className="text-xs font-mono font-bold uppercase text-[#555555]">
                  Insert Reusable Block:
                </span>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => addContentBlock(activeArticle.id, 'headline')}
                    className="px-3 py-1.5 bg-white border border-[#222222] hover:bg-[#141414] hover:text-white rounded text-xs font-serif font-bold transition flex items-center gap-1.5"
                  >
                    <Heading className="w-3.5 h-3.5" /> Subhead
                  </button>
                  <button
                    onClick={() => addContentBlock(activeArticle.id, 'lead')}
                    className="px-3 py-1.5 bg-white border border-[#222222] hover:bg-[#141414] hover:text-white rounded text-xs font-serif font-bold transition flex items-center gap-1.5"
                  >
                    <Feather className="w-3.5 h-3.5" /> Lead Callout
                  </button>
                  <button
                    onClick={() => addContentBlock(activeArticle.id, 'quote')}
                    className="px-3 py-1.5 bg-white border border-[#222222] hover:bg-[#141414] hover:text-white rounded text-xs font-serif font-bold transition flex items-center gap-1.5"
                  >
                    <Quote className="w-3.5 h-3.5" /> Pull Quote
                  </button>
                  <button
                    onClick={() => addContentBlock(activeArticle.id, 'text')}
                    className="px-3 py-1.5 bg-white border border-[#222222] hover:bg-[#141414] hover:text-white rounded text-xs font-serif font-bold transition flex items-center gap-1.5"
                  >
                    <AlignLeft className="w-3.5 h-3.5" /> Body Paragraph
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* VIEW 2: PUBLISHING QUEUE */}
        {activeTab === 'pipeline' && (
          <div className="space-y-6">
            <div className="bg-[#f6f4ee] border border-[#e8e5db] p-6 rounded-2xl space-y-4">
              <h2 className="font-serif text-2xl font-bold text-[#141414]">Editorial Workflow Pipeline</h2>
              <p className="text-xs text-[#666666] font-mono">Stage progression across reporter drafts, editorial review, and live syndication</p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
                {/* Drafts */}
                <div className="space-y-3">
                  <div className="font-mono text-xs uppercase font-black text-[#555555] border-b-2 border-[#141414] pb-2">
                    1. Drafts ({articles.filter((a) => a.status === 'draft').length})
                  </div>
                  {articles.filter((a) => a.status === 'draft').map((art) => (
                    <div key={art.id} className="p-4 bg-white border border-[#d5d0c3] rounded-xl shadow-sm space-y-2">
                      <h4 className="font-serif font-bold text-sm text-[#141414]">{art.title}</h4>
                      <p className="text-[11px] font-mono text-[#777777]">By {art.author}</p>
                      <button
                        onClick={() => {
                          selectArticle(art.id);
                          setActiveTab('editor');
                        }}
                        className="text-xs text-[#990000] font-bold hover:underline block"
                      >
                        Edit Story →
                      </button>
                    </div>
                  ))}
                </div>

                {/* In Review */}
                <div className="space-y-3">
                  <div className="font-mono text-xs uppercase font-black text-amber-800 border-b-2 border-amber-800 pb-2">
                    2. In Editorial Review ({articles.filter((a) => a.status === 'in_review').length})
                  </div>
                  {articles.filter((a) => a.status === 'in_review').map((art) => (
                    <div key={art.id} className="p-4 bg-white border border-[#d5d0c3] rounded-xl shadow-sm space-y-2">
                      <h4 className="font-serif font-bold text-sm text-[#141414]">{art.title}</h4>
                      <p className="text-[11px] font-mono text-[#777777]">By {art.author}</p>
                      <button
                        onClick={() => updateArticleStatus(art.id, 'published')}
                        className="px-3 py-1 bg-[#990000] text-white rounded text-xs font-bold"
                      >
                        Approve & Publish
                      </button>
                    </div>
                  ))}
                </div>

                {/* Published */}
                <div className="space-y-3">
                  <div className="font-mono text-xs uppercase font-black text-emerald-800 border-b-2 border-emerald-800 pb-2">
                    3. Published Live ({articles.filter((a) => a.status === 'published').length})
                  </div>
                  {articles.filter((a) => a.status === 'published').map((art) => (
                    <div key={art.id} className="p-4 bg-white border border-[#d5d0c3] rounded-xl shadow-sm space-y-2">
                      <h4 className="font-serif font-bold text-sm text-[#141414]">{art.title}</h4>
                      <p className="text-[11px] font-mono text-[#777777]">Views: {art.analytics.totalViews.toLocaleString()}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* VIEW 3: SEO & METADATA */}
        {activeTab === 'seo' && (
          <div className="space-y-6">
            <div className="bg-[#f6f4ee] border border-[#e8e5db] p-8 rounded-2xl space-y-6">
              <div>
                <h2 className="font-serif text-2xl font-bold text-[#141414]">Search Engine Optimization & Social Graph</h2>
                <p className="text-xs text-[#666666] font-mono">Fine-tune canonical slugs, SERP snippets, and crawler indexing instructions</p>
              </div>

              <div className="space-y-4 max-w-2xl">
                <div>
                  <label className="text-xs font-mono uppercase font-bold text-[#555555] block mb-1">Meta Title</label>
                  <input
                    type="text"
                    value={activeArticle.seo.metaTitle}
                    onChange={(e) => updateSEO(activeArticle.id, { metaTitle: e.target.value })}
                    className="w-full bg-white border border-[#d5d0c3] rounded px-3.5 py-2 text-sm text-[#141414] focus:outline-none focus:border-[#990000]"
                  />
                </div>

                <div>
                  <label className="text-xs font-mono uppercase font-bold text-[#555555] block mb-1">Meta Description (160 char max)</label>
                  <textarea
                    rows={3}
                    value={activeArticle.seo.metaDescription}
                    onChange={(e) => updateSEO(activeArticle.id, { metaDescription: e.target.value })}
                    className="w-full bg-white border border-[#d5d0c3] rounded px-3.5 py-2 text-sm text-[#141414] focus:outline-none focus:border-[#990000]"
                  />
                </div>

                {/* Live Google Search Preview Card */}
                <div className="p-4 bg-white border border-[#d5d0c3] rounded-xl space-y-1">
                  <span className="text-[10px] font-mono uppercase text-[#777777] font-bold">Google SERP Preview</span>
                  <div className="text-sm font-bold text-[#1a0dab] hover:underline cursor-pointer">
                    {activeArticle.seo.metaTitle}
                  </div>
                  <div className="text-xs text-emerald-800 font-mono">https://gazette.press/{activeArticle.slug}</div>
                  <div className="text-xs text-[#4d5156] leading-relaxed">{activeArticle.seo.metaDescription}</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* VIEW 4: VERSION HISTORY */}
        {activeTab === 'history' && (
          <div className="space-y-6">
            <div className="bg-[#f6f4ee] border border-[#e8e5db] p-8 rounded-2xl space-y-6">
              <div>
                <h2 className="font-serif text-2xl font-bold text-[#141414]">Editorial Version History & Rollbacks</h2>
                <p className="text-xs text-[#666666] font-mono">Immutable revision timestamps and changelog records for {activeArticle.title}</p>
              </div>

              <div className="space-y-3 font-mono text-xs">
                {activeArticle.versions.map((ver, idx) => (
                  <div key={idx} className="p-4 bg-white rounded-xl border border-[#d5d0c3] flex items-center justify-between">
                    <div>
                      <div className="font-bold text-[#990000]">{ver.version} • {ver.note}</div>
                      <div className="text-[#777777] text-[11px]">Author: {ver.author} • {ver.date}</div>
                    </div>
                    <button className="px-3 py-1 bg-[#141414] hover:bg-[#333333] text-white rounded text-[11px] font-bold">
                      Restore Revision
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* VIEW 5: READERSHIP ANALYTICS */}
        {activeTab === 'analytics' && (
          <div className="space-y-6">
            <div className="bg-[#f6f4ee] border border-[#e8e5db] p-8 rounded-2xl space-y-6">
              <div>
                <h2 className="font-serif text-2xl font-bold text-[#141414]">Readership Telemetry & Circulation</h2>
                <p className="text-xs text-[#666666] font-mono">Engagement metrics for "{activeArticle.title}"</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                <div className="p-4 bg-white rounded-xl border border-[#d5d0c3]">
                  <span className="text-[10px] font-mono text-[#777777] uppercase">Total Impressions</span>
                  <div className="text-2xl font-serif font-black text-[#141414] mt-1">
                    {activeArticle.analytics.totalViews.toLocaleString()}
                  </div>
                </div>
                <div className="p-4 bg-white rounded-xl border border-[#d5d0c3]">
                  <span className="text-[10px] font-mono text-[#777777] uppercase">Unique Readers</span>
                  <div className="text-2xl font-serif font-black text-[#990000] mt-1">
                    {activeArticle.analytics.uniqueVisitors.toLocaleString()}
                  </div>
                </div>
                <div className="p-4 bg-white rounded-xl border border-[#d5d0c3]">
                  <span className="text-[10px] font-mono text-[#777777] uppercase">Average Read Time</span>
                  <div className="text-2xl font-serif font-black text-[#141414] mt-1">
                    {activeArticle.analytics.avgReadTime}
                  </div>
                </div>
                <div className="p-4 bg-white rounded-xl border border-[#d5d0c3]">
                  <span className="text-[10px] font-mono text-[#777777] uppercase">Reader Retention</span>
                  <div className="text-2xl font-serif font-black text-emerald-800 mt-1">
                    71.6%
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* MODAL: CREATE STORY */}
      {showNewModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#fcfbf9] border-2 border-[#141414] rounded-2xl p-6 max-w-md w-full shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-[#222222] pb-3">
              <h3 className="font-serif text-xl font-bold text-[#141414]">Create New Story</h3>
              <button onClick={() => setShowNewModal(false)} className="text-[#777777] hover:text-[#141414]">✕</button>
            </div>

            <form onSubmit={handleCreate} className="space-y-4">
              <div>
                <label className="text-xs font-mono uppercase font-bold text-[#555555] block mb-1">Headline</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Investigation: Municipal Broadband Overhaul"
                  value={newArticleTitle}
                  onChange={(e) => setNewArticleTitle(e.target.value)}
                  className="w-full bg-white border border-[#d5d0c3] rounded px-3.5 py-2 text-sm text-[#141414] focus:outline-none focus:border-[#990000]"
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowNewModal(false)}
                  className="w-1/2 py-2 bg-[#e8e5db] text-[#333333] rounded text-xs font-bold font-mono"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-1/2 py-2 bg-[#990000] text-white rounded text-xs font-bold font-mono shadow"
                >
                  Initialize Draft
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="border-t border-[#d5d0c3] bg-[#f6f4ee] py-6 text-center text-xs text-[#777777] font-mono">
        © 2026 THE GAZETTE CONTENT MANAGEMENT SYSTEMS. EDITORIAL REVISION REPOSITORY.
      </footer>
    </div>
  );
}
