'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import Image from 'next/image';
import {
  Search, Shield, Swords, Brain, Sparkles, Trophy, X, ChevronRight,
  Zap, Target, Lightbulb, MessageCircle, Quote, Users, Send, ThumbsUp,
  Plus, Hash, Clock, ArrowRight,
} from 'lucide-react';
import { TOP_LANE_POOL, TOP_MATCHUPS, championIcon } from '../lib/toplane';

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

type RiotChampion = { id: string; name: string; title: string };
type RiotChampionResponse = { version: string; champions: RiotChampion[] };
type RunePage = { primaryTree: string; primaryKeystones: string[]; secondaryTree: string; secondaryRunes: string[]; shards: string[] };
type ItemSet = { start: string[]; core: string[]; boots: string[]; situational: string[] };
type CounterEntry = { id: string; score: number; reason: string; winCondition: string; tips: string[]; runes: RunePage; items: ItemSet };
type MatchupMap = Record<string, { counters: CounterEntry[] }>;
type RuneIconMap = Record<string, string>;
type ItemIconMap = Record<string, string>;
type DetailTab = 'overview' | 'runes' | 'items' | 'ai';
type PageView = 'tool' | 'community' | 'quotes';

type ForumReply = { id: string; author: string; content: string; timestamp: number; likes: number };
type ForumPost = { id: string; author: string; title: string; content: string; tag: string; timestamp: number; likes: number; replies: ForumReply[] };
type MemberQuote = { id: string; author: string; role: string; text: string; likes: number };
type CommunityTip = { id: string; author: string; champId: string; tip: string; likes: number };

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

function normalizeName(name: string) {
  return name.replace(/\u2019/g, "'").replace(/'/g, "'").trim().toLowerCase();
}

function timeAgo(ts: number) {
  const diff = Date.now() - ts;
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return 'just now';
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  return `${days}d ago`;
}

function genId() { return Math.random().toString(36).slice(2, 10); }

const RANK_STYLES = [
  { badge: 'bg-amber-400/90 text-black', ring: 'ring-amber-400/40', label: 'Best' },
  { badge: 'bg-zinc-300/90 text-black', ring: 'ring-zinc-300/30', label: 'Strong' },
  { badge: 'bg-orange-400/80 text-black', ring: 'ring-orange-400/30', label: 'Solid' },
];

/* ------------------------------------------------------------------ */
/*  Sample community data                                              */
/* ------------------------------------------------------------------ */

const SAMPLE_POSTS: ForumPost[] = [
  {
    id: '1', author: 'Skullcrusher', title: 'How do you deal with ranged tops as Darius?',
    content: 'I keep getting poked out by Quinn and Vayne players. Even with Doran\'s Shield and Second Wind I feel like I can\'t get close enough to stack passive. Any tips?',
    tag: 'Darius', timestamp: Date.now() - 3600000 * 2, likes: 7,
    replies: [
      { id: 'r1', author: 'TopDiff', content: 'Take Ghost + Flash and run them down at level 6. Before that, give up some CS and freeze near your tower. They will push and your jungler can gank.', timestamp: Date.now() - 3600000, likes: 4 },
      { id: 'r2', author: 'IronWill', content: 'Bush control is key. Sit in the river bush or lane bushes, they can\'t auto you if they can\'t see you. Walk out, E pull, full combo.', timestamp: Date.now() - 1800000, likes: 3 },
    ],
  },
  {
    id: '2', author: 'BladeOfQE', title: 'Fiora vs Aatrox: Riposte timing guide',
    content: 'For those struggling with this matchup — the key is to NOT riposte his Q1 or Q2. Always save it for Q3 or his W chain. Q3 has a longer windup so it\'s easier to react to. If you riposte the W pull, you get a guaranteed stun + vital proc.',
    tag: 'Fiora', timestamp: Date.now() - 3600000 * 8, likes: 12,
    replies: [
      { id: 'r3', author: 'Skullcrusher', content: 'Great tip! I\'ve been wasting riposte on Q1 like an idiot. Will practice this in customs.', timestamp: Date.now() - 3600000 * 6, likes: 2 },
    ],
  },
  {
    id: '3', author: 'JungleGap', title: 'Wave management fundamentals for top lane',
    content: 'Can someone explain when to freeze vs slow push vs fast push? I always just auto the wave and hope for the best lol.',
    tag: 'General', timestamp: Date.now() - 3600000 * 24, likes: 5,
    replies: [],
  },
];

const SAMPLE_QUOTES: MemberQuote[] = [
  { id: 'q1', author: 'Skullcrusher', role: 'Top Laner', text: 'Top lane is an island. You either become the king of it, or you drown.', likes: 15 },
  { id: 'q2', author: 'BladeOfQE', role: 'Team Captain', text: 'Every lost lane is a lesson. Every won lane is proof you learned.', likes: 22 },
  { id: 'q3', author: 'TopDiff', role: 'Analyst', text: 'The best counter pick is the champion you have 500 games on.', likes: 18 },
  { id: 'q4', author: 'IronWill', role: 'Coach', text: 'Don\'t play to not lose. Play to win. There\'s a massive difference.', likes: 11 },
  { id: 'q5', author: 'QEForge', role: 'Founder', text: 'We don\'t just play together — we improve together. That\'s what Quantum Enigma is about.', likes: 30 },
];

const SAMPLE_TIPS: CommunityTip[] = [
  { id: 't1', author: 'BladeOfQE', champId: 'Fiora', tip: 'Always auto-reset with E after Q for faster vital procs.', likes: 8 },
  { id: 't2', author: 'Skullcrusher', champId: 'Darius', tip: 'Ghost is better than Ignite in 90% of matchups. The sticking power is insane.', likes: 14 },
  { id: 't3', author: 'TopDiff', champId: 'Gwen', tip: 'Stack 4 autos on minions before trading with Q — center Q does way more damage.', likes: 6 },
  { id: 't4', author: 'IronWill', champId: 'Jax', tip: 'Don\'t use E preemptively. Wait for the enemy to commit, THEN activate Counter Strike.', likes: 10 },
  { id: 't5', author: 'JungleGap', champId: 'Mordekaiser', tip: 'Ult the enemy carry in teamfights, not the tank. Even if you die, removing their ADC wins the fight.', likes: 9 },
];

/* ------------------------------------------------------------------ */
/*  Sub-components                                                     */
/* ------------------------------------------------------------------ */

function SectionHeader({ icon: Icon, title, subtitle }: {
  icon: React.ComponentType<{ className?: string }>; title: string; subtitle?: string;
}) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-lime-400/10 text-lime-400">
        <Icon className="h-4 w-4" />
      </div>
      <div className="min-w-0">
        <h2 className="text-sm font-semibold tracking-tight text-white">{title}</h2>
        {subtitle && <p className="truncate text-[11px] text-zinc-500">{subtitle}</p>}
      </div>
    </div>
  );
}

function CounterCard({ counter, version, rank, active, onClick }: {
  counter: CounterEntry; version: string; rank: number; active: boolean; onClick: () => void;
}) {
  const style = RANK_STYLES[rank] || RANK_STYLES[2];
  return (
    <button onClick={onClick}
      className={`group relative flex w-full items-center gap-3 rounded-xl border p-2.5 text-left transition-all duration-200 ${
        active ? 'border-lime-400/40 bg-lime-400/[0.07]' : 'border-white/[0.06] bg-white/[0.02] hover:border-white/10 hover:bg-white/[0.04]'
      }`}>
      <div className="absolute -top-1.5 -left-1.5 z-10">
        <div className={`flex h-5 w-5 items-center justify-center rounded-md text-[10px] font-bold shadow ${style.badge}`}>{rank + 1}</div>
      </div>
      <div className={`relative shrink-0 overflow-hidden rounded-lg ring-2 ${active ? 'ring-lime-400/50' : style.ring}`}>
        <img src={championIcon(version, counter.id)} alt={counter.id} width={44} height={44} className="h-11 w-11 object-cover" />
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-1.5">
          <span className="text-xs font-semibold text-white">{counter.id}</span>
          <span className="rounded bg-white/[0.06] px-1 py-0.5 text-[9px] text-zinc-500">{style.label}</span>
        </div>
        <p className="mt-0.5 line-clamp-1 text-[11px] leading-snug text-zinc-500">{counter.reason}</p>
      </div>
      <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-xs font-bold ${
        active ? 'bg-lime-400/20 text-lime-300' : 'bg-white/[0.04] text-zinc-400'
      }`}>{counter.score}</div>
    </button>
  );
}

function IconTile({ src, alt, title }: { src?: string; alt: string; title: string }) {
  return (
    <div title={title} className="group/tile relative">
      <div className="h-9 w-9 overflow-hidden rounded-lg border border-white/[0.08] bg-zinc-900 transition group-hover/tile:border-white/20">
        {src ? <img src={src} alt={alt} width={36} height={36} className="h-full w-full object-cover" />
          : <div className="flex h-full w-full items-center justify-center text-[9px] text-zinc-600">?</div>}
      </div>
      <div className="pointer-events-none absolute -top-7 left-1/2 z-30 -translate-x-1/2 whitespace-nowrap rounded-md bg-zinc-800 px-2 py-0.5 text-[10px] text-zinc-300 opacity-0 shadow-lg transition group-hover/tile:opacity-100">
        {title}
      </div>
    </div>
  );
}

function DetailCard({ title, icon: Icon, children }: {
  title: string; icon?: React.ComponentType<{ className?: string }>; children: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">
      <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wider text-lime-400/80">
        {Icon && <Icon className="h-3.5 w-3.5" />}{title}
      </div>
      <div className="mt-3">{children}</div>
    </div>
  );
}

function TabBtn({ active, onClick, icon: Icon, label }: {
  active: boolean; onClick: () => void; icon: React.ComponentType<{ className?: string }>; label: string;
}) {
  return (
    <button onClick={onClick}
      className={`flex items-center gap-1.5 whitespace-nowrap rounded-lg px-3 py-1.5 text-xs font-medium transition-all ${
        active ? 'bg-lime-400/15 text-lime-300' : 'text-zinc-500 hover:bg-white/[0.04] hover:text-zinc-300'
      }`}>
      <Icon className="h-3.5 w-3.5" />{label}
    </button>
  );
}

function NavBtn({ active, onClick, icon: Icon, label }: {
  active: boolean; onClick: () => void; icon: React.ComponentType<{ className?: string }>; label: string;
}) {
  return (
    <button onClick={onClick}
      className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-all ${
        active ? 'bg-lime-400 text-black' : 'text-zinc-400 hover:bg-white/[0.04] hover:text-white'
      }`}>
      <Icon className="h-4 w-4" />{label}
    </button>
  );
}

function LikeButton({ count, onLike }: { count: number; onLike: () => void }) {
  return (
    <button onClick={onLike} className="flex items-center gap-1 rounded-md px-2 py-1 text-[11px] text-zinc-500 transition hover:bg-lime-400/10 hover:text-lime-400">
      <ThumbsUp className="h-3 w-3" />{count}
    </button>
  );
}

/* ------------------------------------------------------------------ */
/*  Main page                                                          */
/* ------------------------------------------------------------------ */

export default function Page() {
  const [data, setData] = useState<RiotChampionResponse | null>(null);
  const [loading, setLoading] = useState(true);

  // Tool state
  const [search, setSearch] = useState('');
  const [pickerOpen, setPickerOpen] = useState(false);
  const [selectedEnemyId, setSelectedEnemyId] = useState('');
  const [selectedCounterId, setSelectedCounterId] = useState('');
  const [activeTab, setActiveTab] = useState<DetailTab>('overview');
  const [question, setQuestion] = useState('How should I play this matchup from level 1 to level 6?');
  const [aiAnswer, setAiAnswer] = useState('');
  const [aiLoading, setAiLoading] = useState(false);
  const [runeIconMap, setRuneIconMap] = useState<RuneIconMap>({});
  const [itemIconMap, setItemIconMap] = useState<ItemIconMap>({});

  // Page navigation
  const [pageView, setPageView] = useState<PageView>('tool');

  // Community state
  const [forumPosts, setForumPosts] = useState<ForumPost[]>(SAMPLE_POSTS);
  const [newPostTitle, setNewPostTitle] = useState('');
  const [newPostContent, setNewPostContent] = useState('');
  const [newPostTag, setNewPostTag] = useState('General');
  const [showNewPost, setShowNewPost] = useState(false);
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyContent, setReplyContent] = useState('');
  const [communityTips, setCommunityTips] = useState<CommunityTip[]>(SAMPLE_TIPS);

  // Quotes state
  const [quotes, setQuotes] = useState<MemberQuote[]>(SAMPLE_QUOTES);
  const [newQuoteText, setNewQuoteText] = useState('');
  const [newQuoteAuthor, setNewQuoteAuthor] = useState('');
  const [showNewQuote, setShowNewQuote] = useState(false);

  const pickerRef = useRef<HTMLDivElement | null>(null);
  const searchInputRef = useRef<HTMLInputElement | null>(null);
  const detailsRef = useRef<HTMLDivElement | null>(null);

  /* ----- data loading ----- */

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        const versionsRes = await fetch('https://ddragon.leagueoflegends.com/api/versions.json');
        const versions = await versionsRes.json();
        const version = versions[0];
        const [champsRes, runesRes, itemsRes] = await Promise.all([
          fetch(`https://ddragon.leagueoflegends.com/cdn/${version}/data/en_US/champion.json`),
          fetch(`https://ddragon.leagueoflegends.com/cdn/${version}/data/en_US/runesReforged.json`),
          fetch(`https://ddragon.leagueoflegends.com/cdn/${version}/data/en_US/item.json`),
        ]);
        const champsJson = await champsRes.json();
        const runesJson = await runesRes.json();
        const itemsJson = await itemsRes.json();
        const champions: RiotChampion[] = Object.values(champsJson.data)
          .map((c: any) => ({ id: c.id, name: c.name, title: c.title }))
          .filter((c) => TOP_LANE_POOL.includes(c.id as any))
          .sort((a, b) => a.name.localeCompare(b.name));
        const nextRuneMap: RuneIconMap = {};
        for (const style of runesJson) {
          if (style.name && style.icon) nextRuneMap[normalizeName(style.name)] = `https://ddragon.leagueoflegends.com/cdn/img/${style.icon}`;
          for (const slot of style.slots || []) for (const rune of slot.runes || []) if (rune.name && rune.icon) nextRuneMap[normalizeName(rune.name)] = `https://ddragon.leagueoflegends.com/cdn/img/${rune.icon}`;
        }
        const nextItemMap: ItemIconMap = {};
        for (const [itemId, item] of Object.entries(itemsJson.data)) {
          const t = item as any;
          if (t.name) nextItemMap[normalizeName(t.name)] = `https://ddragon.leagueoflegends.com/cdn/${version}/img/item/${itemId}.png`;
        }
        setData({ version, champions });
        setRuneIconMap(nextRuneMap);
        setItemIconMap(nextItemMap);
        if (champions.length > 0) {
          setSelectedEnemyId(champions[0].id);
          setSelectedCounterId((TOP_MATCHUPS as MatchupMap)[champions[0].id]?.counters?.[0]?.id || '');
        }
      } catch (e) { console.error('Failed to load Riot data:', e); }
      finally { setLoading(false); }
    }
    loadData();
  }, []);

  useEffect(() => {
    function h(e: MouseEvent) { if (pickerRef.current && !pickerRef.current.contains(e.target as Node)) setPickerOpen(false); }
    document.addEventListener('mousedown', h);
    return () => document.removeEventListener('mousedown', h);
  }, []);

  /* ----- derived state ----- */

  const filteredChampions = useMemo(() => {
    if (!data) return [];
    const q = search.toLowerCase().trim();
    if (!q) return data.champions;
    return data.champions.filter((c) => c.name.toLowerCase().includes(q) || c.id.toLowerCase().includes(q));
  }, [data, search]);

  const selectedEnemy = useMemo(() => data?.champions.find((c) => c.id === selectedEnemyId) || null, [data, selectedEnemyId]);
  const matchup = selectedEnemyId ? (TOP_MATCHUPS as MatchupMap)[selectedEnemyId] : undefined;
  const selectedCounterData = matchup?.counters.find((c) => c.id === selectedCounterId) || null;
  const selectedCounter = useMemo(() => data?.champions.find((c) => c.id === selectedCounterId) || null, [data, selectedCounterId]);

  // Relevant community tips for current matchup
  const relevantTips = useMemo(() => {
    if (!selectedCounterId && !selectedEnemyId) return communityTips;
    return communityTips.filter(t => t.champId === selectedCounterId || t.champId === selectedEnemyId);
  }, [communityTips, selectedCounterId, selectedEnemyId]);

  /* ----- actions ----- */

  function selectChampion(champion: RiotChampion) {
    setSelectedEnemyId(champion.id);
    setSelectedCounterId((TOP_MATCHUPS as MatchupMap)[champion.id]?.counters?.[0]?.id || '');
    setSearch(''); setPickerOpen(false); setAiAnswer(''); setActiveTab('overview');
    setTimeout(() => detailsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100);
  }

  async function askAi() {
    if (!selectedEnemy || !selectedCounterData) return;
    try {
      setAiLoading(true); setAiAnswer('');
      const res = await fetch('/api/ai', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          enemyChampion: selectedEnemy.name, counterChampion: selectedCounterData.id,
          matchupReason: selectedCounterData.reason, winCondition: selectedCounterData.winCondition,
          matchupTips: selectedCounterData.tips, runes: selectedCounterData.runes,
          items: selectedCounterData.items, question,
        }),
      });
      const json = await res.json();
      setAiAnswer(json.answer || 'No AI answer received.');
    } catch { setAiAnswer('Something went wrong while calling the AI route.'); }
    finally { setAiLoading(false); }
  }

  function submitForumPost() {
    if (!newPostTitle.trim() || !newPostContent.trim()) return;
    const post: ForumPost = {
      id: genId(), author: 'You', title: newPostTitle, content: newPostContent,
      tag: newPostTag, timestamp: Date.now(), likes: 0, replies: [],
    };
    setForumPosts([post, ...forumPosts]);
    setNewPostTitle(''); setNewPostContent(''); setNewPostTag('General'); setShowNewPost(false);
  }

  function submitReply(postId: string) {
    if (!replyContent.trim()) return;
    const reply: ForumReply = { id: genId(), author: 'You', content: replyContent, timestamp: Date.now(), likes: 0 };
    setForumPosts(forumPosts.map(p => p.id === postId ? { ...p, replies: [...p.replies, reply] } : p));
    setReplyContent(''); setReplyingTo(null);
  }

  function submitQuote() {
    if (!newQuoteText.trim() || !newQuoteAuthor.trim()) return;
    const q: MemberQuote = { id: genId(), author: newQuoteAuthor, role: 'Member', text: newQuoteText, likes: 0 };
    setQuotes([q, ...quotes]);
    setNewQuoteText(''); setNewQuoteAuthor(''); setShowNewQuote(false);
  }

  const getRuneIcon = (name: string) => runeIconMap[normalizeName(name)];
  const getItemIcon = (name: string) => itemIconMap[normalizeName(name)];

  /* ------------------------------------------------------------------ */
  /*  Render                                                             */
  /* ------------------------------------------------------------------ */

  return (
    <main className="min-h-screen bg-[#08080b] text-white">
      <div className="mx-auto max-w-5xl px-4 py-4 sm:px-6">

        {/* HEADER */}
        <header className="rounded-xl border border-white/[0.06] bg-white/[0.02] px-4 py-3">
          <div className="flex items-center gap-3">
            <Image src="/qe-logo.png" alt="Quantum Enigma" width={44} height={44}
              className="rounded-lg border border-white/[0.08] bg-black object-cover" priority />
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-lime-400">Quantum Enigma</span>
                <span className="rounded bg-lime-400/10 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-lime-400">Top</span>
              </div>
              <h1 className="text-base font-semibold tracking-tight sm:text-lg">Top Lane Hub</h1>
            </div>
          </div>
          {/* Navigation */}
          <nav className="mt-3 flex gap-1 border-t border-white/[0.04] pt-3">
            <NavBtn active={pageView === 'tool'} onClick={() => setPageView('tool')} icon={Swords} label="Matchup Tool" />
            <NavBtn active={pageView === 'community'} onClick={() => setPageView('community')} icon={Users} label="Community" />
            <NavBtn active={pageView === 'quotes'} onClick={() => setPageView('quotes')} icon={Quote} label="Quotes" />
          </nav>
        </header>

        {/* ============================================================ */}
        {/* MATCHUP TOOL VIEW                                             */}
        {/* ============================================================ */}

        {pageView === 'tool' && (
          <div className="mt-4 space-y-4">

            {/* Community tips banner for selected matchup */}
            {relevantTips.length > 0 && selectedEnemyId && (
              <div className="rounded-xl border border-lime-400/10 bg-lime-400/[0.03] p-3">
                <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wider text-lime-400/70">
                  <Users className="h-3.5 w-3.5" /> Community tips
                </div>
                <div className="mt-2 flex gap-3 overflow-x-auto pb-1">
                  {relevantTips.map(tip => (
                    <div key={tip.id} className="flex-none rounded-lg border border-white/[0.06] bg-white/[0.02] px-3 py-2 text-xs text-zinc-400" style={{ maxWidth: 280 }}>
                      <span className="font-medium text-lime-300">{tip.author}</span> on {tip.champId}: {tip.tip}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* STEP 1 — SELECT ENEMY */}
            <section className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">
              <SectionHeader icon={Search} title="Select the enemy top laner" />
              <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-start">
                <div ref={pickerRef} className="relative flex-1">
                  <div className="flex items-center gap-2 rounded-lg border border-white/[0.08] bg-black/40 px-3 py-2">
                    <Search className="h-3.5 w-3.5 shrink-0 text-zinc-600" />
                    <input ref={searchInputRef} value={search}
                      onFocus={() => setPickerOpen(true)}
                      onChange={(e) => { setSearch(e.target.value); setPickerOpen(true); }}
                      placeholder="Search champion..."
                      className="w-full bg-transparent text-sm text-white outline-none placeholder:text-zinc-600" />
                    {search && (
                      <button onClick={() => { setSearch(''); searchInputRef.current?.focus(); }} className="text-zinc-600 hover:text-zinc-400">
                        <X className="h-3.5 w-3.5" />
                      </button>
                    )}
                  </div>
                  {pickerOpen && (
                    <div className="absolute left-0 right-0 z-50 mt-2 rounded-xl border border-white/[0.08] bg-[#0c0c10] p-2 shadow-2xl shadow-black/60 sm:right-auto sm:w-[480px]">
                      {loading ? <div className="py-6 text-center text-xs text-zinc-500">Loading champions...</div>
                      : filteredChampions.length > 0 ? (
                        <div className="grid max-h-[260px] grid-cols-8 gap-1 overflow-y-auto sm:grid-cols-10">
                          {filteredChampions.map((champ) => (
                            <button key={champ.id} onClick={() => selectChampion(champ)} title={champ.name}
                              className={`group relative aspect-square overflow-hidden rounded-lg border transition-all ${
                                champ.id === selectedEnemyId ? 'border-lime-400/50 ring-1 ring-lime-400/30' : 'border-transparent hover:border-white/20'
                              }`}>
                              <img src={championIcon(data!.version, champ.id)} alt={champ.name} width={40} height={40} className="h-full w-full object-cover" />
                              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent pb-0.5 pt-2">
                                <div className="truncate text-center text-[6px] font-medium text-zinc-300">{champ.name}</div>
                              </div>
                            </button>
                          ))}
                        </div>
                      ) : <div className="py-6 text-center text-xs text-zinc-500">No champions found</div>}
                    </div>
                  )}
                </div>
                {selectedEnemy && data && (
                  <div className="flex items-center gap-3 rounded-lg border border-lime-400/20 bg-lime-400/[0.06] px-3 py-2">
                    <img src={championIcon(data.version, selectedEnemy.id)} alt={selectedEnemy.name} width={36} height={36} className="h-9 w-9 rounded-lg border border-white/10" />
                    <div>
                      <div className="text-[9px] uppercase tracking-[0.15em] text-lime-300/60">Enemy</div>
                      <div className="text-sm font-semibold text-white">{selectedEnemy.name}</div>
                    </div>
                  </div>
                )}
              </div>
            </section>

            {/* STEP 2 — COUNTER PICKS */}
            {matchup && data && (
              <section className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">
                <SectionHeader icon={Shield} title="Counter picks" subtitle="Choose your answer to the matchup" />
                <div className="mt-3 grid gap-3 sm:grid-cols-3">
                  {matchup.counters.map((counter, i) => (
                    <CounterCard key={counter.id} counter={counter} version={data.version} rank={i}
                      active={counter.id === selectedCounterId}
                      onClick={() => { setSelectedCounterId(counter.id); setAiAnswer(''); setActiveTab('overview'); }} />
                  ))}
                </div>
              </section>
            )}

            {/* STEP 3 — MATCHUP DETAILS */}
            <div ref={detailsRef} className="scroll-mt-4">
              {selectedCounterData && selectedEnemy && selectedCounter && data ? (
                <div className="space-y-3">
                  {/* Banner */}
                  <div className="flex flex-wrap items-center gap-4 rounded-xl border border-white/[0.06] bg-white/[0.02] px-4 py-3">
                    <div className="flex items-center gap-2">
                      <img src={championIcon(data.version, selectedCounter.id)} alt={selectedCounter.name} width={44} height={44} className="h-11 w-11 rounded-lg border-2 border-lime-400/30" />
                      <ChevronRight className="h-4 w-4 text-zinc-600" />
                      <img src={championIcon(data.version, selectedEnemy.id)} alt={selectedEnemy.name} width={44} height={44} className="h-11 w-11 rounded-lg border border-white/10 opacity-60" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-[10px] uppercase tracking-[0.15em] text-zinc-500">Active matchup</div>
                      <h3 className="text-base font-semibold tracking-tight text-white sm:text-lg">
                        {selectedCounter.name} <span className="font-normal text-zinc-500">into</span> {selectedEnemy.name}
                      </h3>
                    </div>
                    <div className="ml-auto rounded-lg bg-lime-400/15 px-2.5 py-1 text-xs font-bold text-lime-300">
                      {selectedCounterData.score}/10
                    </div>
                  </div>

                  {/* Tabs */}
                  <div className="flex gap-1 overflow-x-auto rounded-lg border border-white/[0.06] bg-white/[0.02] p-1">
                    <TabBtn active={activeTab === 'overview'} onClick={() => setActiveTab('overview')} icon={Target} label="Overview" />
                    <TabBtn active={activeTab === 'runes'} onClick={() => setActiveTab('runes')} icon={Sparkles} label="Runes" />
                    <TabBtn active={activeTab === 'items'} onClick={() => setActiveTab('items')} icon={Swords} label="Items" />
                    <TabBtn active={activeTab === 'ai'} onClick={() => setActiveTab('ai')} icon={Brain} label="AI Coach" />
                  </div>

                  {/* Content */}
                  <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5">

                    {activeTab === 'overview' && (
                      <div className="space-y-4">
                        <DetailCard title="Why it works" icon={Zap}>
                          <p className="text-[13px] leading-relaxed text-zinc-300">{selectedCounterData.reason}</p>
                        </DetailCard>
                        <DetailCard title="Win condition" icon={Trophy}>
                          <p className="text-[13px] leading-relaxed text-zinc-300">{selectedCounterData.winCondition}</p>
                        </DetailCard>
                        <DetailCard title="Key tips" icon={Lightbulb}>
                          <div className="space-y-2">
                            {selectedCounterData.tips.map((tip, i) => (
                              <div key={i} className="flex gap-3 rounded-lg border border-white/[0.05] bg-black/20 p-3">
                                <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded bg-lime-400/10 text-[10px] font-bold text-lime-400">{i + 1}</div>
                                <p className="text-[13px] leading-relaxed text-zinc-400">{tip}</p>
                              </div>
                            ))}
                          </div>
                        </DetailCard>
                      </div>
                    )}

                    {activeTab === 'runes' && (
                      <div className="space-y-5">
                        {[
                          { label: 'Primary', tree: selectedCounterData.runes.primaryTree, runes: selectedCounterData.runes.primaryKeystones },
                          { label: 'Secondary', tree: selectedCounterData.runes.secondaryTree, runes: selectedCounterData.runes.secondaryRunes },
                        ].map(({ label, tree, runes }) => (
                          <div key={label}>
                            <div className="mb-3 flex items-center gap-2 text-[11px] font-medium uppercase tracking-wider text-zinc-500">
                              <div className="h-px flex-1 bg-white/[0.06]" />{label} — {tree}<div className="h-px flex-1 bg-white/[0.06]" />
                            </div>
                            <div className="flex flex-wrap items-center gap-2">
                              <IconTile src={getRuneIcon(tree)} alt={tree} title={tree} />
                              <ChevronRight className="h-3 w-3 text-zinc-700" />
                              {runes.map((r) => <IconTile key={r} src={getRuneIcon(r)} alt={r} title={r} />)}
                            </div>
                          </div>
                        ))}
                        <div>
                          <div className="mb-3 flex items-center gap-2 text-[11px] font-medium uppercase tracking-wider text-zinc-500">
                            <div className="h-px flex-1 bg-white/[0.06]" />Shards<div className="h-px flex-1 bg-white/[0.06]" />
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {selectedCounterData.runes.shards.map((s) => (
                              <span key={s} className="rounded-md bg-white/[0.04] px-2.5 py-1 text-xs text-zinc-400">{s}</span>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}

                    {activeTab === 'items' && (
                      <div className="space-y-5">
                        {([['Start', selectedCounterData.items.start], ['Core', selectedCounterData.items.core],
                          ['Boots', selectedCounterData.items.boots], ['Situational', selectedCounterData.items.situational]] as [string, string[]][]).map(([label, items]) => (
                          <div key={label}>
                            <div className="mb-3 flex items-center gap-2 text-[11px] font-medium uppercase tracking-wider text-zinc-500">
                              <div className="h-px flex-1 bg-white/[0.06]" />{label}<div className="h-px flex-1 bg-white/[0.06]" />
                            </div>
                            <div className="flex flex-wrap gap-2">{items.map((item) => <IconTile key={item} src={getItemIcon(item)} alt={item} title={item} />)}</div>
                          </div>
                        ))}
                      </div>
                    )}

                    {activeTab === 'ai' && (
                      <div className="space-y-4">
                        <div className="flex flex-wrap gap-1.5">
                          {['What is the wave plan for levels 1 to 3?', 'When is my first all-in window?',
                            'What is the biggest mistake in this matchup?', 'How should I play after level 6?'].map((q) => (
                            <button key={q} onClick={() => setQuestion(q)}
                              className={`rounded-md border px-2 py-1 text-[11px] transition ${
                                question === q ? 'border-lime-400/30 bg-lime-400/10 text-lime-300' : 'border-white/[0.06] text-zinc-500 hover:border-white/10 hover:text-zinc-300'
                              }`}>{q}</button>
                          ))}
                        </div>
                        <div className="rounded-lg border border-white/[0.08] bg-black/30 p-3">
                          <div className="mb-1.5 flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider text-lime-400/70">
                            <Sparkles className="h-3 w-3" />Your question
                          </div>
                          <textarea value={question} onChange={(e) => setQuestion(e.target.value)} rows={2}
                            className="w-full resize-none bg-transparent text-sm leading-relaxed text-white outline-none placeholder:text-zinc-600"
                            placeholder="E.g., how should I play wave 1 to 3?" />
                        </div>
                        <button onClick={askAi} disabled={aiLoading || !selectedEnemy || !selectedCounterData}
                          className="inline-flex items-center gap-2 rounded-lg bg-lime-400 px-4 py-2 text-sm font-semibold text-black transition hover:bg-lime-300 disabled:cursor-not-allowed disabled:opacity-40">
                          <Brain className="h-4 w-4" />{aiLoading ? 'Analyzing...' : 'Ask AI'}
                        </button>
                        {(aiAnswer || aiLoading) && (
                          <div className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-4">
                            <div className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-lime-400/70">AI Answer</div>
                            <div className="whitespace-pre-wrap text-[13px] leading-relaxed text-zinc-300">{aiLoading ? 'Analyzing the matchup...' : aiAnswer}</div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="mt-4 flex h-32 items-center justify-center rounded-xl border border-dashed border-white/[0.08] text-sm text-zinc-600">
                  Select an enemy and counter to view matchup details.
                </div>
              )}
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* COMMUNITY VIEW                                                */}
        {/* ============================================================ */}

        {pageView === 'community' && (
          <div className="mt-4 space-y-4">

            {/* Community header */}
            <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-semibold text-white">Community Forum</h2>
                  <p className="mt-0.5 text-[13px] text-zinc-500">Ask questions, share knowledge, and help each other climb.</p>
                </div>
                <button onClick={() => setShowNewPost(!showNewPost)}
                  className="flex items-center gap-2 rounded-lg bg-lime-400 px-4 py-2 text-sm font-semibold text-black transition hover:bg-lime-300">
                  <Plus className="h-4 w-4" />New Post
                </button>
              </div>

              {/* New post form */}
              {showNewPost && (
                <div className="mt-4 space-y-3 rounded-lg border border-lime-400/20 bg-lime-400/[0.03] p-4">
                  <input value={newPostTitle} onChange={(e) => setNewPostTitle(e.target.value)}
                    placeholder="Post title..."
                    className="w-full rounded-lg border border-white/[0.08] bg-black/40 px-3 py-2 text-sm text-white outline-none placeholder:text-zinc-600" />
                  <textarea value={newPostContent} onChange={(e) => setNewPostContent(e.target.value)}
                    placeholder="What's on your mind?" rows={3}
                    className="w-full resize-none rounded-lg border border-white/[0.08] bg-black/40 px-3 py-2 text-sm text-white outline-none placeholder:text-zinc-600" />
                  <div className="flex items-center gap-3">
                    <select value={newPostTag} onChange={(e) => setNewPostTag(e.target.value)}
                      className="rounded-lg border border-white/[0.08] bg-black/40 px-3 py-2 text-sm text-white outline-none">
                      <option value="General">General</option>
                      {data?.champions.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                    </select>
                    <button onClick={submitForumPost}
                      className="flex items-center gap-2 rounded-lg bg-lime-400 px-4 py-2 text-sm font-semibold text-black transition hover:bg-lime-300">
                      <Send className="h-3.5 w-3.5" />Post
                    </button>
                    <button onClick={() => setShowNewPost(false)} className="text-sm text-zinc-500 hover:text-zinc-300">Cancel</button>
                  </div>
                </div>
              )}
            </div>

            {/* Posts */}
            <div className="space-y-3">
              {forumPosts.map(post => (
                <div key={post.id} className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">
                  {/* Post header */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <h3 className="text-[15px] font-semibold text-white">{post.title}</h3>
                      <div className="mt-1 flex flex-wrap items-center gap-2 text-[11px] text-zinc-500">
                        <span className="font-medium text-lime-400">{post.author}</span>
                        <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{timeAgo(post.timestamp)}</span>
                        <span className="flex items-center gap-1 rounded bg-white/[0.06] px-1.5 py-0.5"><Hash className="h-3 w-3" />{post.tag}</span>
                      </div>
                    </div>
                    <LikeButton count={post.likes} onLike={() => setForumPosts(forumPosts.map(p => p.id === post.id ? { ...p, likes: p.likes + 1 } : p))} />
                  </div>

                  {/* Post content */}
                  <p className="mt-3 text-[13px] leading-relaxed text-zinc-300">{post.content}</p>

                  {/* Replies */}
                  {post.replies.length > 0 && (
                    <div className="mt-4 space-y-2 border-t border-white/[0.04] pt-3">
                      {post.replies.map(reply => (
                        <div key={reply.id} className="flex gap-3 rounded-lg bg-white/[0.02] p-3">
                          <div className="h-6 w-6 shrink-0 rounded-full bg-lime-400/10 text-center text-[10px] font-bold leading-6 text-lime-400">
                            {reply.author[0]}
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center gap-2 text-[11px]">
                              <span className="font-medium text-lime-300">{reply.author}</span>
                              <span className="text-zinc-600">{timeAgo(reply.timestamp)}</span>
                            </div>
                            <p className="mt-1 text-[13px] leading-relaxed text-zinc-400">{reply.content}</p>
                          </div>
                          <LikeButton count={reply.likes} onLike={() => {
                            setForumPosts(forumPosts.map(p => p.id === post.id ? {
                              ...p, replies: p.replies.map(r => r.id === reply.id ? { ...r, likes: r.likes + 1 } : r)
                            } : p));
                          }} />
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Reply input */}
                  {replyingTo === post.id ? (
                    <div className="mt-3 flex gap-2">
                      <input value={replyContent} onChange={(e) => setReplyContent(e.target.value)}
                        placeholder="Write a reply..." autoFocus
                        onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); submitReply(post.id); } }}
                        className="flex-1 rounded-lg border border-white/[0.08] bg-black/40 px-3 py-2 text-sm text-white outline-none placeholder:text-zinc-600" />
                      <button onClick={() => submitReply(post.id)}
                        className="rounded-lg bg-lime-400 px-3 py-2 text-sm font-semibold text-black transition hover:bg-lime-300">
                        <Send className="h-3.5 w-3.5" />
                      </button>
                      <button onClick={() => { setReplyingTo(null); setReplyContent(''); }} className="text-sm text-zinc-500 hover:text-zinc-300">Cancel</button>
                    </div>
                  ) : (
                    <button onClick={() => setReplyingTo(post.id)}
                      className="mt-3 flex items-center gap-1.5 text-[12px] text-zinc-500 transition hover:text-lime-400">
                      <MessageCircle className="h-3.5 w-3.5" />Reply · {post.replies.length} {post.replies.length === 1 ? 'reply' : 'replies'}
                    </button>
                  )}
                </div>
              ))}
            </div>

            {/* Member tips section */}
            <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">
              <SectionHeader icon={Lightbulb} title="Member Tips & Tricks" subtitle="Quick tips from the Quantum Enigma community" />
              <div className="mt-3 grid gap-2 sm:grid-cols-2">
                {communityTips.map(tip => (
                  <div key={tip.id} className="flex items-start gap-3 rounded-lg border border-white/[0.06] bg-white/[0.02] p-3">
                    <div className="h-7 w-7 shrink-0 rounded-lg bg-lime-400/10 text-center text-[10px] font-bold leading-7 text-lime-400">
                      {tip.author[0]}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 text-[11px]">
                        <span className="font-medium text-lime-300">{tip.author}</span>
                        <span className="rounded bg-white/[0.06] px-1.5 py-0.5 text-zinc-500">{tip.champId}</span>
                      </div>
                      <p className="mt-1 text-[13px] leading-relaxed text-zinc-400">{tip.tip}</p>
                    </div>
                    <LikeButton count={tip.likes} onLike={() => setCommunityTips(communityTips.map(t => t.id === tip.id ? { ...t, likes: t.likes + 1 } : t))} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* QUOTES VIEW                                                   */}
        {/* ============================================================ */}

        {pageView === 'quotes' && (
          <div className="mt-4 space-y-4">

            {/* Quotes header */}
            <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-semibold text-white">Wall of Quotes</h2>
                  <p className="mt-0.5 text-[13px] text-zinc-500">Words of wisdom, motivation, and tilt-prevention from our members.</p>
                </div>
                <button onClick={() => setShowNewQuote(!showNewQuote)}
                  className="flex items-center gap-2 rounded-lg bg-lime-400 px-4 py-2 text-sm font-semibold text-black transition hover:bg-lime-300">
                  <Plus className="h-4 w-4" />Add Quote
                </button>
              </div>

              {showNewQuote && (
                <div className="mt-4 space-y-3 rounded-lg border border-lime-400/20 bg-lime-400/[0.03] p-4">
                  <input value={newQuoteAuthor} onChange={(e) => setNewQuoteAuthor(e.target.value)}
                    placeholder="Your name..."
                    className="w-full rounded-lg border border-white/[0.08] bg-black/40 px-3 py-2 text-sm text-white outline-none placeholder:text-zinc-600" />
                  <textarea value={newQuoteText} onChange={(e) => setNewQuoteText(e.target.value)}
                    placeholder="Your quote..." rows={2}
                    className="w-full resize-none rounded-lg border border-white/[0.08] bg-black/40 px-3 py-2 text-sm text-white outline-none placeholder:text-zinc-600" />
                  <div className="flex items-center gap-3">
                    <button onClick={submitQuote}
                      className="flex items-center gap-2 rounded-lg bg-lime-400 px-4 py-2 text-sm font-semibold text-black transition hover:bg-lime-300">
                      <Send className="h-3.5 w-3.5" />Submit
                    </button>
                    <button onClick={() => setShowNewQuote(false)} className="text-sm text-zinc-500 hover:text-zinc-300">Cancel</button>
                  </div>
                </div>
              )}
            </div>

            {/* Featured quote */}
            {quotes.length > 0 && (
              <div className="relative overflow-hidden rounded-xl border border-lime-400/20 bg-gradient-to-br from-lime-400/[0.06] to-transparent p-6">
                <Quote className="absolute top-4 right-4 h-16 w-16 text-lime-400/[0.08]" />
                <blockquote className="relative">
                  <p className="text-xl font-medium leading-relaxed text-white">
                    &ldquo;{quotes[0].text}&rdquo;
                  </p>
                  <footer className="mt-4 flex items-center gap-2">
                    <div className="h-8 w-8 rounded-full bg-lime-400/20 text-center text-sm font-bold leading-8 text-lime-400">
                      {quotes[0].author[0]}
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-white">{quotes[0].author}</div>
                      <div className="text-[11px] text-zinc-500">{quotes[0].role}</div>
                    </div>
                    <div className="ml-auto">
                      <LikeButton count={quotes[0].likes} onLike={() => setQuotes(quotes.map((q, i) => i === 0 ? { ...q, likes: q.likes + 1 } : q))} />
                    </div>
                  </footer>
                </blockquote>
              </div>
            )}

            {/* All quotes grid */}
            <div className="grid gap-3 sm:grid-cols-2">
              {quotes.slice(1).map((q, idx) => (
                <div key={q.id} className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">
                  <div className="flex items-start gap-3">
                    <Quote className="mt-0.5 h-4 w-4 shrink-0 text-lime-400/40" />
                    <div className="min-w-0 flex-1">
                      <p className="text-[13px] leading-relaxed text-zinc-300">
                        &ldquo;{q.text}&rdquo;
                      </p>
                      <div className="mt-3 flex items-center gap-2">
                        <div className="h-6 w-6 rounded-full bg-lime-400/10 text-center text-[10px] font-bold leading-6 text-lime-400">
                          {q.author[0]}
                        </div>
                        <div>
                          <div className="text-xs font-medium text-white">{q.author}</div>
                          <div className="text-[10px] text-zinc-500">{q.role}</div>
                        </div>
                        <div className="ml-auto">
                          <LikeButton count={q.likes} onLike={() => setQuotes(quotes.map(qo => qo.id === q.id ? { ...qo, likes: qo.likes + 1 } : qo))} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Footer */}
        <footer className="mt-6 border-t border-white/[0.04] px-1 py-3">
          <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] text-zinc-600">
            <span>Quantum Enigma Top Lane Hub · Built for fast draft decisions</span>
            <span className="flex items-center gap-1"><Users className="h-3 w-3" /> Join our Discord for more</span>
          </div>
        </footer>
      </div>
    </main>
  );
}
