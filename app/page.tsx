'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import Image from 'next/image';
import {
  Search, Shield, Swords, Brain, Sparkles, Trophy, X, ChevronRight,
  Zap, Target, Lightbulb, MessageCircle, Quote, Users, Send, ThumbsUp,
  Plus, Hash, Clock, BookOpen, Waves, Crosshair, Map, Eye, Timer,
  ArrowUpDown, Flame,
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
type PageView = 'tool' | 'community' | 'fundamentals';

type ForumReply = { id: string; author: string; content: string; timestamp: number; likes: number };
type ForumPost = { id: string; author: string; title: string; content: string; tag: string; timestamp: number; likes: number; replies: ForumReply[] };

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
  return `${Math.floor(hrs / 24)}d ago`;
}

function genId() { return Math.random().toString(36).slice(2, 10); }

const RANK_STYLES = [
  { badge: 'bg-amber-400/90 text-black', ring: 'ring-amber-400/40', label: 'Best' },
  { badge: 'bg-zinc-300/90 text-black', ring: 'ring-zinc-300/30', label: 'Strong' },
  { badge: 'bg-orange-400/80 text-black', ring: 'ring-orange-400/30', label: 'Solid' },
];

/* ------------------------------------------------------------------ */
/*  Quotes — shown randomly throughout the site                        */
/* ------------------------------------------------------------------ */

const MEMBER_QUOTES = [
  { author: 'Skullcrusher', text: 'Top lane is an island. You either become the king of it, or you drown.' },
  { author: 'BladeOfQE', text: 'Every lost lane is a lesson. Every won lane is proof you learned.' },
  { author: 'TopDiff', text: 'The best counter pick is the champion you have 500 games on.' },
  { author: 'IronWill', text: 'Don\'t play to not lose. Play to win. There\'s a massive difference.' },
  { author: 'QEForge', text: 'We don\'t just play together — we improve together. That\'s what Quantum Enigma is about.' },
  { author: 'Skullcrusher', text: 'If you\'re not tracking the enemy jungler, you\'re flipping a coin every 3 minutes.' },
  { author: 'BladeOfQE', text: 'Wave management wins more lanes than mechanics ever will.' },
];

function RandomQuote() {
  const [quote] = useState(() => MEMBER_QUOTES[Math.floor(Math.random() * MEMBER_QUOTES.length)]);
  return (
    <div className="flex items-start gap-3 rounded-xl border border-white/[0.04] bg-white/[0.015] px-4 py-3">
      <Quote className="mt-0.5 h-4 w-4 shrink-0 text-lime-400/30" />
      <div>
        <p className="text-[13px] leading-relaxed text-zinc-400 italic">&ldquo;{quote.text}&rdquo;</p>
        <p className="mt-1 text-[11px] font-medium text-lime-400/60">— {quote.author}</p>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Fundamentals content                                               */
/* ------------------------------------------------------------------ */

const FUNDAMENTALS = [
  {
    id: 'wave',
    icon: Waves,
    title: 'Wave Management',
    subtitle: 'Control the wave, control the lane',
    sections: [
      {
        heading: 'Freezing',
        content: 'A freeze happens when you keep the enemy minion wave just outside your tower range. To set it up, let 3-4 extra enemy casters stay alive. Only last-hit, never use abilities on the wave. This zones the enemy from CS and makes them vulnerable to ganks. Break the freeze only when you want to recall, roam, or dive.',
      },
      {
        heading: 'Slow Push',
        content: 'Kill the enemy caster minions first but leave the melees alive. Your wave will slowly stack up into a big wave over 2-3 waves. Use slow pushes before recalling (so you don\'t lose CS to tower), before roaming (the big wave crashes and denies CS), or to set up a dive with your jungler.',
      },
      {
        heading: 'Fast Push',
        content: 'Use all your abilities to kill the wave as fast as possible. Do this when you need to reset quickly, when the enemy just recalled, or when you want to get plates. Fast pushing after a kill lets you deny the most CS.',
      },
      {
        heading: 'The Bounce-Back',
        content: 'After crashing a big wave into the enemy tower, the wave will naturally push back toward you. This is called a bounce. It\'s the easiest way to set up a freeze — crash a big wave, then let it come back to you.',
      },
    ],
  },
  {
    id: 'trading',
    icon: Crosshair,
    title: 'Trading Patterns',
    subtitle: 'Win trades without losing HP',
    sections: [
      {
        heading: 'Short Trades vs Extended Trades',
        content: 'Short trades are 1-2 ability combos followed by an immediate disengage. Extended trades last 5+ seconds with continuous fighting. Know which type your champion excels at. Renekton loves short trades (E-W-Q-E out). Darius wants extended trades to stack passive. Playing the wrong trade pattern is the most common mistake in top lane.',
      },
      {
        heading: 'The Minion Rule',
        content: 'Early game, minions deal massive damage. Never trade into a large enemy minion wave — you will lose even if you land all your abilities. The ideal trade happens when the enemy walks up to last-hit and you have more minions than them.',
      },
      {
        heading: 'Cooldown Punishing',
        content: 'Track the enemy\'s key ability cooldowns. If Darius misses his E pull (24 second cooldown level 1), you have a massive window to trade for free. If Fiora wastes Riposte, she\'s defenseless for 24 seconds. Every champion has one ability that defines their lane — punish when it\'s down.',
      },
      {
        heading: 'Level Spikes',
        content: 'Levels 2, 3, and 6 are the biggest power spikes. If you hit level 2 first (the first full wave + 1 melee minion of wave 2), you have a free trade or kill window. Level 6 is the biggest spike for most champions — always track your XP bar and look for all-ins the moment you hit it.',
      },
    ],
  },
  {
    id: 'tp',
    icon: Map,
    title: 'Teleport Usage',
    subtitle: 'When and where to TP',
    sections: [
      {
        heading: 'TP Timing',
        content: 'Before 14 minutes, Teleport can only target towers. Use it to get back to lane quickly after a bad recall or to not lose a huge wave to tower. After 14 minutes it unlocks for minions and wards — this is when you can make cross-map plays.',
      },
      {
        heading: 'Flank Teleports',
        content: 'The best TPs are behind the enemy team. Look for a ward or minion behind their backline during a dragon or baron fight. Flanking with TP often wins the fight on its own because the enemy has to split attention.',
      },
      {
        heading: 'When NOT to TP',
        content: 'Don\'t TP to a fight your team is already losing 4v5. Don\'t TP when you have a massive wave crashing into your tower (you lose 2-3 waves of gold and XP). Don\'t TP to a fight without R — you\'ll arrive weak. The best play is often to split push and force the enemy to match you.',
      },
    ],
  },
  {
    id: 'vision',
    icon: Eye,
    title: 'Vision & Map Awareness',
    subtitle: 'See the gank before it happens',
    sections: [
      {
        heading: 'Warding Spots',
        content: 'Place your ward in the river bush or tri-bush depending on which side you\'re playing. If you\'re on red side, the tri-bush ward is more important. If you\'re on blue side, the river bush covers most gank paths. At level 1, ward at 1:15 to spot early invades or cheese ganks.',
      },
      {
        heading: 'Tracking the Jungler',
        content: 'If the enemy jungler shows bot side, you have roughly 30-40 seconds to play aggressively. Watch the minimap every 3 seconds. If the enemy jungler started bot side (you can tell by which laner leashed), they\'ll likely be top side around 3:00-3:30 for their first gank.',
      },
      {
        heading: 'Playing Without Vision',
        content: 'If your ward is down and you don\'t know where the jungler is, play toward the side of the lane closest to your tower. Don\'t push past the halfway point. Treat no information as dangerous information.',
      },
    ],
  },
  {
    id: 'matchup',
    icon: ArrowUpDown,
    title: 'Matchup Phases',
    subtitle: 'How the lane evolves over time',
    sections: [
      {
        heading: 'Levels 1-3: The Foundation',
        content: 'These levels determine the lane. Focus on getting level 2 first, establishing wave control, and chunking the enemy with favorable trades. Most first bloods happen at level 2 or 3. Know your champion\'s strongest early level and play around it.',
      },
      {
        heading: 'Levels 4-5: The Setup',
        content: 'This is where you set up for the level 6 fight. Build a health and CS advantage through trades. Get the wave in a favorable position. Recall at the right time to pick up a component item before the level 6 fight.',
      },
      {
        heading: 'Level 6: The Spike',
        content: 'Most top laners have game-changing ultimates. Irelia, Darius, Riven, Fiora — all spike hard at 6. Track both XP bars. If you hit 6 first with a health advantage, look for the all-in immediately. If the enemy hits 6 first, back off and wait for your own spike.',
      },
      {
        heading: 'Post-6 to Mid Game',
        content: 'After the first tower falls, the laning phase transitions. The top laner who lost tower should group or freeze under their second tower. The winner should pressure the advantage by taking plates, roaming, or setting up herald. Don\'t overstay and throw your lead.',
      },
    ],
  },
  {
    id: 'backs',
    icon: Timer,
    title: 'Recall Timing',
    subtitle: 'When to back without losing anything',
    sections: [
      {
        heading: 'The Cannon Wave Rule',
        content: 'Cannon waves are the safest time to recall because they take longer to kill under tower, meaning you lose fewer minions. After crashing a cannon wave into the enemy tower, immediately recall. You\'ll get back to lane before you miss much.',
      },
      {
        heading: 'Cheater Recalls',
        content: 'The cheater recall is a powerful early strategy: slow push wave 1 and 2, crash the big wave 3 into tower, then immediately recall. You come back to lane with an item advantage (usually a Long Sword or Doran\'s item) while the enemy is stuck in lane with no items. This works best when starting blue side.',
      },
      {
        heading: 'Buy Thresholds',
        content: 'Know your champion\'s key buy thresholds. For most fighters, 450g (Long Sword) or 1100g (Recurve Bow / Pickaxe) are the breakpoints. Don\'t recall with an awkward gold amount like 800g where you can\'t buy anything meaningful. Sometimes staying in lane for one more wave gets you to the next threshold.',
      },
    ],
  },
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

  const [pageView, setPageView] = useState<PageView>('tool');

  // Community
  const [forumPosts, setForumPosts] = useState<ForumPost[]>([]);
  const [newPostTitle, setNewPostTitle] = useState('');
  const [newPostContent, setNewPostContent] = useState('');
  const [newPostTag, setNewPostTag] = useState('General');
  const [showNewPost, setShowNewPost] = useState(false);
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyContent, setReplyContent] = useState('');

  // Fundamentals
  const [expandedFundamental, setExpandedFundamental] = useState<string | null>(FUNDAMENTALS[0].id);

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

  /* ----- derived ----- */

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
    setForumPosts([{
      id: genId(), author: 'You', title: newPostTitle, content: newPostContent,
      tag: newPostTag, timestamp: Date.now(), likes: 0, replies: [],
    }, ...forumPosts]);
    setNewPostTitle(''); setNewPostContent(''); setNewPostTag('General'); setShowNewPost(false);
  }

  function submitReply(postId: string) {
    if (!replyContent.trim()) return;
    setForumPosts(forumPosts.map(p => p.id === postId
      ? { ...p, replies: [...p.replies, { id: genId(), author: 'You', content: replyContent, timestamp: Date.now(), likes: 0 }] }
      : p));
    setReplyContent(''); setReplyingTo(null);
  }

  const getRuneIcon = (name: string) => runeIconMap[normalizeName(name)];
  const getItemIcon = (name: string) => itemIconMap[normalizeName(name)];

  /* ------------------------------------------------------------------ */
  /*  Render                                                             */
  /* ------------------------------------------------------------------ */

  return (
    <main className="min-h-screen bg-[#08080b] text-white">
      <div className="mx-auto max-w-5xl px-4 py-4 sm:px-6">

        {/* HEADER + NAV */}
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
          <nav className="mt-3 flex gap-1 border-t border-white/[0.04] pt-3 overflow-x-auto">
            <NavBtn active={pageView === 'tool'} onClick={() => setPageView('tool')} icon={Swords} label="Matchup Tool" />
            <NavBtn active={pageView === 'fundamentals'} onClick={() => setPageView('fundamentals')} icon={BookOpen} label="Fundamentals" />
            <NavBtn active={pageView === 'community'} onClick={() => setPageView('community')} icon={Users} label="Community" />
          </nav>
        </header>

        {/* ============================================================ */}
        {/* MATCHUP TOOL                                                  */}
        {/* ============================================================ */}

        {pageView === 'tool' && (
          <div className="mt-4 space-y-4">

            {/* STEP 1 */}
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

            {/* STEP 2 */}
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

            {/* Random quote between sections */}
            <RandomQuote />

            {/* STEP 3 */}
            <div ref={detailsRef} className="scroll-mt-4">
              {selectedCounterData && selectedEnemy && selectedCounter && data ? (
                <div className="space-y-3">
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
                    <div className="ml-auto rounded-lg bg-lime-400/15 px-2.5 py-1 text-xs font-bold text-lime-300">{selectedCounterData.score}/10</div>
                  </div>

                  <div className="flex gap-1 overflow-x-auto rounded-lg border border-white/[0.06] bg-white/[0.02] p-1">
                    <TabBtn active={activeTab === 'overview'} onClick={() => setActiveTab('overview')} icon={Target} label="Overview" />
                    <TabBtn active={activeTab === 'runes'} onClick={() => setActiveTab('runes')} icon={Sparkles} label="Runes" />
                    <TabBtn active={activeTab === 'items'} onClick={() => setActiveTab('items')} icon={Swords} label="Items" />
                    <TabBtn active={activeTab === 'ai'} onClick={() => setActiveTab('ai')} icon={Brain} label="AI Coach" />
                  </div>

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
                        {[{ label: 'Primary', tree: selectedCounterData.runes.primaryTree, runes: selectedCounterData.runes.primaryKeystones },
                          { label: 'Secondary', tree: selectedCounterData.runes.secondaryTree, runes: selectedCounterData.runes.secondaryRunes }].map(({ label, tree, runes }) => (
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
                            {selectedCounterData.runes.shards.map((s) => <span key={s} className="rounded-md bg-white/[0.04] px-2.5 py-1 text-xs text-zinc-400">{s}</span>)}
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
        {/* FUNDAMENTALS                                                  */}
        {/* ============================================================ */}

        {pageView === 'fundamentals' && (
          <div className="mt-4 space-y-4">

            {/* Intro */}
            <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-5">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-lime-400/10 text-lime-400">
                  <BookOpen className="h-6 w-6" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-white">Top Lane Fundamentals</h2>
                  <p className="mt-1 text-[13px] leading-relaxed text-zinc-400">
                    Master the core concepts of top lane before worrying about matchups.
                    These fundamentals apply to every champion and every game.
                    Click any topic to expand.
                  </p>
                </div>
              </div>
            </div>

            {/* Quote */}
            <RandomQuote />

            {/* Topics */}
            <div className="space-y-3">
              {FUNDAMENTALS.map((topic) => {
                const isExpanded = expandedFundamental === topic.id;
                const Icon = topic.icon;
                return (
                  <div key={topic.id} className="rounded-xl border border-white/[0.06] bg-white/[0.02] overflow-hidden">
                    {/* Topic header — clickable */}
                    <button
                      onClick={() => setExpandedFundamental(isExpanded ? null : topic.id)}
                      className="flex w-full items-center gap-3 p-4 text-left transition hover:bg-white/[0.02]"
                    >
                      <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg transition ${
                        isExpanded ? 'bg-lime-400/20 text-lime-400' : 'bg-white/[0.04] text-zinc-500'
                      }`}>
                        <Icon className="h-5 w-5" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h3 className={`text-[15px] font-semibold transition ${isExpanded ? 'text-lime-300' : 'text-white'}`}>
                          {topic.title}
                        </h3>
                        <p className="text-[12px] text-zinc-500">{topic.subtitle}</p>
                      </div>
                      <ChevronRight className={`h-4 w-4 shrink-0 text-zinc-600 transition-transform duration-200 ${isExpanded ? 'rotate-90' : ''}`} />
                    </button>

                    {/* Expanded content */}
                    {isExpanded && (
                      <div className="border-t border-white/[0.04] px-4 pb-4 pt-3">
                        <div className="space-y-4">
                          {topic.sections.map((section, i) => (
                            <div key={i}>
                              <div className="flex items-center gap-2 mb-2">
                                <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded bg-lime-400/10 text-[10px] font-bold text-lime-400">
                                  {i + 1}
                                </div>
                                <h4 className="text-sm font-semibold text-white">{section.heading}</h4>
                              </div>
                              <p className="ml-7 text-[13px] leading-[1.7] text-zinc-400">
                                {section.content}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Another quote at bottom */}
            <RandomQuote />
          </div>
        )}

        {/* ============================================================ */}
        {/* COMMUNITY                                                     */}
        {/* ============================================================ */}

        {pageView === 'community' && (
          <div className="mt-4 space-y-4">

            {/* Header + new post */}
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

              {showNewPost && (
                <div className="mt-4 space-y-3 rounded-lg border border-lime-400/20 bg-lime-400/[0.03] p-4">
                  <input value={newPostTitle} onChange={(e) => setNewPostTitle(e.target.value)}
                    placeholder="Post title..."
                    className="w-full rounded-lg border border-white/[0.08] bg-black/40 px-3 py-2 text-sm text-white outline-none placeholder:text-zinc-600" />
                  <textarea value={newPostContent} onChange={(e) => setNewPostContent(e.target.value)}
                    placeholder="What's on your mind?" rows={3}
                    className="w-full resize-none rounded-lg border border-white/[0.08] bg-black/40 px-3 py-2 text-sm text-white outline-none placeholder:text-zinc-600" />
                  <div className="flex flex-wrap items-center gap-3">
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

            {/* Quote */}
            <RandomQuote />

            {/* Posts or empty state */}
            {forumPosts.length === 0 ? (
              <div className="rounded-xl border border-dashed border-white/[0.08] py-16 text-center">
                <MessageCircle className="mx-auto h-10 w-10 text-zinc-700" />
                <p className="mt-3 text-sm text-zinc-500">No posts yet. Be the first to start a discussion!</p>
                <button onClick={() => setShowNewPost(true)}
                  className="mt-4 inline-flex items-center gap-2 rounded-lg bg-lime-400 px-4 py-2 text-sm font-semibold text-black transition hover:bg-lime-300">
                  <Plus className="h-4 w-4" />Create First Post
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                {forumPosts.map(post => (
                  <div key={post.id} className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">
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
                    <p className="mt-3 text-[13px] leading-relaxed text-zinc-300">{post.content}</p>

                    {post.replies.length > 0 && (
                      <div className="mt-4 space-y-2 border-t border-white/[0.04] pt-3">
                        {post.replies.map(reply => (
                          <div key={reply.id} className="flex gap-3 rounded-lg bg-white/[0.02] p-3">
                            <div className="h-6 w-6 shrink-0 rounded-full bg-lime-400/10 text-center text-[10px] font-bold leading-6 text-lime-400">{reply.author[0]}</div>
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
            )}
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
