'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import Image from 'next/image';
import {
  Search,
  Shield,
  Swords,
  Brain,
  Sparkles,
  Trophy,
  X,
  ChevronRight,
  Zap,
  Target,
  Lightbulb,
} from 'lucide-react';
import { TOP_LANE_POOL, TOP_MATCHUPS, championIcon } from '../lib/toplane';

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

type RiotChampion = {
  id: string;
  name: string;
  title: string;
};

type RiotChampionResponse = {
  version: string;
  champions: RiotChampion[];
};

type RunePage = {
  primaryTree: string;
  primaryKeystones: string[];
  secondaryTree: string;
  secondaryRunes: string[];
  shards: string[];
};

type ItemSet = {
  start: string[];
  core: string[];
  boots: string[];
  situational: string[];
};

type CounterEntry = {
  id: string;
  score: number;
  reason: string;
  winCondition: string;
  tips: string[];
  runes: RunePage;
  items: ItemSet;
};

type MatchupMap = Record<string, { counters: CounterEntry[] }>;
type RuneIconMap = Record<string, string>;
type ItemIconMap = Record<string, string>;

type DetailTab = 'overview' | 'runes' | 'items' | 'ai';

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

function normalizeName(name: string) {
  return name.replace(/'/g, "'").trim().toLowerCase();
}

const RANK_STYLES = [
  { badge: 'bg-amber-400/90 text-black', ring: 'ring-amber-400/40', label: 'Best pick' },
  { badge: 'bg-zinc-300/90 text-black', ring: 'ring-zinc-300/30', label: 'Strong pick' },
  { badge: 'bg-orange-400/80 text-black', ring: 'ring-orange-400/30', label: 'Solid pick' },
];

/* ------------------------------------------------------------------ */
/*  Sub-components                                                     */
/* ------------------------------------------------------------------ */

function SectionHeader({
  icon: Icon,
  title,
  subtitle,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-lime-400/10 text-lime-400">
        <Icon className="h-4 w-4" />
      </div>
      <div className="min-w-0">
        <h2 className="text-[15px] font-semibold tracking-tight text-white">{title}</h2>
        {subtitle && (
          <p className="truncate text-xs text-zinc-500">{subtitle}</p>
        )}
      </div>
    </div>
  );
}

function CounterCard({
  counter,
  version,
  rank,
  active,
  onClick,
}: {
  counter: CounterEntry;
  version: string;
  rank: number;
  active: boolean;
  onClick: () => void;
}) {
  const style = RANK_STYLES[rank] || RANK_STYLES[2];

  return (
    <button
      onClick={onClick}
      className={`group relative flex w-full items-center gap-4 rounded-2xl border p-3 text-left transition-all duration-200 ${
        active
          ? 'border-lime-400/40 bg-lime-400/[0.07] shadow-[0_0_24px_-6px_rgba(163,230,53,0.15)]'
          : 'border-white/[0.06] bg-white/[0.02] hover:border-white/10 hover:bg-white/[0.04]'
      }`}
    >
      {/* Rank badge */}
      <div className="absolute -top-2 -left-2 z-10">
        <div
          className={`flex h-6 w-6 items-center justify-center rounded-lg text-xs font-bold shadow-lg ${style.badge}`}
        >
          {rank + 1}
        </div>
      </div>

      {/* Champion portrait */}
      <div className={`relative shrink-0 overflow-hidden rounded-xl ring-2 ${active ? 'ring-lime-400/50' : style.ring}`}>
        <img
          src={championIcon(version, counter.id)}
          alt={counter.id}
          className="h-14 w-14 object-cover"
        />
      </div>

      {/* Info */}
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold text-white">{counter.id}</span>
          <span className="text-[10px] uppercase tracking-wider text-zinc-600">
            {style.label}
          </span>
        </div>
        <p className="mt-0.5 line-clamp-2 text-xs leading-relaxed text-zinc-500">
          {counter.reason}
        </p>
      </div>

      {/* Score */}
      <div
        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-sm font-bold ${
          active
            ? 'bg-lime-400/20 text-lime-300'
            : 'bg-white/[0.04] text-zinc-400 group-hover:text-zinc-300'
        }`}
      >
        {counter.score}
      </div>
    </button>
  );
}

function IconTile({ src, alt, title }: { src?: string; alt: string; title: string }) {
  return (
    <div title={title} className="group/tile relative">
      <div className="h-10 w-10 overflow-hidden rounded-xl border border-white/[0.08] bg-zinc-900 transition group-hover/tile:border-white/20">
        {src ? (
          <img src={src} alt={alt} className="h-full w-full object-cover" />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-[9px] text-zinc-600">
            ?
          </div>
        )}
      </div>
      {/* Tooltip */}
      <div className="pointer-events-none absolute -top-8 left-1/2 z-30 -translate-x-1/2 whitespace-nowrap rounded-lg bg-zinc-800 px-2 py-1 text-[10px] text-zinc-300 opacity-0 shadow-lg transition group-hover/tile:opacity-100">
        {title}
      </div>
    </div>
  );
}

function DetailCard({
  title,
  icon: Icon,
  children,
}: {
  title: string;
  icon?: React.ComponentType<{ className?: string }>;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-4">
      <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-lime-400/80">
        {Icon && <Icon className="h-3.5 w-3.5" />}
        {title}
      </div>
      <div className="mt-3">{children}</div>
    </div>
  );
}

function TabButton({
  active,
  onClick,
  icon: Icon,
  label,
}: {
  active: boolean;
  onClick: () => void;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-1.5 rounded-xl px-3 py-2 text-xs font-medium transition-all ${
        active
          ? 'bg-lime-400/15 text-lime-300 shadow-[0_0_12px_-3px_rgba(163,230,53,0.2)]'
          : 'text-zinc-500 hover:bg-white/[0.04] hover:text-zinc-300'
      }`}
    >
      <Icon className="h-3.5 w-3.5" />
      {label}
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

  const [question, setQuestion] = useState(
    'How should I play this matchup from level 1 to level 6?'
  );
  const [aiAnswer, setAiAnswer] = useState('');
  const [aiLoading, setAiLoading] = useState(false);

  const [runeIconMap, setRuneIconMap] = useState<RuneIconMap>({});
  const [itemIconMap, setItemIconMap] = useState<ItemIconMap>({});

  const pickerRef = useRef<HTMLDivElement | null>(null);
  const searchInputRef = useRef<HTMLInputElement | null>(null);

  /* ----- data loading ----- */

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);

        const versionsRes = await fetch(
          'https://ddragon.leagueoflegends.com/api/versions.json'
        );
        const versions = await versionsRes.json();
        const version = versions[0];

        const [champsRes, runesRes, itemsRes] = await Promise.all([
          fetch(
            `https://ddragon.leagueoflegends.com/cdn/${version}/data/en_US/champion.json`
          ),
          fetch(
            `https://ddragon.leagueoflegends.com/cdn/${version}/data/en_US/runesReforged.json`
          ),
          fetch(
            `https://ddragon.leagueoflegends.com/cdn/${version}/data/en_US/item.json`
          ),
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
          if (style.name && style.icon) {
            nextRuneMap[normalizeName(style.name)] =
              `https://ddragon.leagueoflegends.com/cdn/img/${style.icon}`;
          }
          for (const slot of style.slots || []) {
            for (const rune of slot.runes || []) {
              if (rune.name && rune.icon) {
                nextRuneMap[normalizeName(rune.name)] =
                  `https://ddragon.leagueoflegends.com/cdn/img/${rune.icon}`;
              }
            }
          }
        }

        const nextItemMap: ItemIconMap = {};
        for (const [itemId, item] of Object.entries(itemsJson.data)) {
          const typedItem = item as any;
          if (typedItem.name) {
            nextItemMap[normalizeName(typedItem.name)] =
              `https://ddragon.leagueoflegends.com/cdn/${version}/img/item/${itemId}.png`;
          }
        }

        setData({ version, champions });
        setRuneIconMap(nextRuneMap);
        setItemIconMap(nextItemMap);

        if (champions.length > 0) {
          const firstEnemy = champions[0].id;
          setSelectedEnemyId(firstEnemy);
          setSearch('');
          setSelectedCounterId(
            (TOP_MATCHUPS as MatchupMap)[firstEnemy]?.counters?.[0]?.id || ''
          );
        }
      } catch (error) {
        console.error('Failed to load Riot data:', error);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  /* ----- click outside picker ----- */

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (pickerRef.current && !pickerRef.current.contains(e.target as Node)) {
        setPickerOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  /* ----- derived state ----- */

  const filteredChampions = useMemo(() => {
    if (!data) return [];
    const q = search.toLowerCase().trim();
    if (!q) return data.champions;
    return data.champions.filter(
      (c) =>
        c.name.toLowerCase().includes(q) || c.id.toLowerCase().includes(q)
    );
  }, [data, search]);

  const selectedEnemy = useMemo(
    () => data?.champions.find((c) => c.id === selectedEnemyId) || null,
    [data, selectedEnemyId]
  );

  const matchup = selectedEnemyId
    ? (TOP_MATCHUPS as MatchupMap)[selectedEnemyId]
    : undefined;

  const selectedCounterData =
    matchup?.counters.find((c) => c.id === selectedCounterId) || null;

  const selectedCounter = useMemo(
    () => data?.champions.find((c) => c.id === selectedCounterId) || null,
    [data, selectedCounterId]
  );

  /* ----- actions ----- */

  function selectChampion(champion: RiotChampion) {
    setSelectedEnemyId(champion.id);
    setSelectedCounterId(
      (TOP_MATCHUPS as MatchupMap)[champion.id]?.counters?.[0]?.id || ''
    );
    setSearch('');
    setPickerOpen(false);
    setAiAnswer('');
    setActiveTab('overview');
  }

  async function askAi() {
    if (!selectedEnemy || !selectedCounterData) return;
    try {
      setAiLoading(true);
      setAiAnswer('');
      const res = await fetch('/api/ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          enemyChampion: selectedEnemy.name,
          counterChampion: selectedCounterData.id,
          matchupReason: selectedCounterData.reason,
          winCondition: selectedCounterData.winCondition,
          matchupTips: selectedCounterData.tips,
          runes: selectedCounterData.runes,
          items: selectedCounterData.items,
          question,
        }),
      });
      const json = await res.json();
      setAiAnswer(json.answer || 'No AI answer received.');
    } catch {
      setAiAnswer('Something went wrong while calling the AI route.');
    } finally {
      setAiLoading(false);
    }
  }

  const getRuneIcon = (name: string) => runeIconMap[normalizeName(name)];
  const getItemIcon = (name: string) => itemIconMap[normalizeName(name)];

  /* ------------------------------------------------------------------ */
  /*  Render                                                             */
  /* ------------------------------------------------------------------ */

  return (
    <main className="relative min-h-screen bg-[#070709] text-white selection:bg-lime-400/30">
      {/* Ambient background glow */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-[40%] left-1/2 h-[800px] w-[800px] -translate-x-1/2 rounded-full bg-lime-400/[0.03] blur-[120px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-[1400px] px-4 py-5 sm:px-6 lg:px-8">
        {/* ============================================================ */}
        {/* HEADER                                                        */}
        {/* ============================================================ */}

        <header className="flex items-center gap-4 rounded-2xl border border-white/[0.06] bg-white/[0.02] px-5 py-4 backdrop-blur-sm">
          <Image
            src="/qe-logo.png"
            alt="Quantum Enigma"
            width={56}
            height={56}
            className="rounded-xl border border-white/[0.08] bg-black object-cover"
            priority
          />
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-lime-400">
                Quantum Enigma
              </span>
              <span className="rounded-md bg-lime-400/10 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-lime-400">
                Top
              </span>
            </div>
            <h1 className="mt-0.5 text-lg font-semibold tracking-tight sm:text-xl">
              Matchup Hub
            </h1>
          </div>
          <p className="hidden max-w-xs text-right text-xs leading-relaxed text-zinc-500 lg:block">
            Enemy top selecteren, beste counters zien en direct de win&nbsp;condition,
            runes, items en AI&nbsp;coaching bekijken.
          </p>
        </header>

        {/* ============================================================ */}
        {/* MAIN GRID                                                     */}
        {/* ============================================================ */}

        <div className="mt-5 grid gap-5 lg:grid-cols-[320px,1fr]">
          {/* ---------------------------------------------------------- */}
          {/* LEFT SIDEBAR — Champion picker                              */}
          {/* ---------------------------------------------------------- */}

          <aside className="lg:sticky lg:top-5 lg:self-start">
            <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-4 backdrop-blur-sm">
              <SectionHeader
                icon={Search}
                title="Enemy champion"
                subtitle="Kies de vijandelijke top laner"
              />

              {/* Search + Picker */}
              <div ref={pickerRef} className="relative mt-4">
                <div className="flex items-center gap-2 rounded-xl border border-white/[0.08] bg-black/40 px-3 py-2.5">
                  <Search className="h-3.5 w-3.5 shrink-0 text-zinc-600" />
                  <input
                    ref={searchInputRef}
                    value={search}
                    onFocus={() => setPickerOpen(true)}
                    onChange={(e) => {
                      setSearch(e.target.value);
                      setPickerOpen(true);
                    }}
                    placeholder="Zoek champion..."
                    className="w-full bg-transparent text-sm text-white outline-none placeholder:text-zinc-600"
                  />
                  {search && (
                    <button
                      onClick={() => {
                        setSearch('');
                        searchInputRef.current?.focus();
                      }}
                      className="text-zinc-600 hover:text-zinc-400"
                    >
                      <X className="h-3.5 w-3.5" />
                    </button>
                  )}
                </div>

                {/* Champion grid dropdown */}
                {pickerOpen && (
                  <div className="absolute z-20 mt-2 w-full rounded-2xl border border-white/[0.08] bg-[#0c0c10] p-3 shadow-2xl shadow-black/50">
                    {loading ? (
                      <div className="py-6 text-center text-xs text-zinc-500">
                        Champions laden...
                      </div>
                    ) : filteredChampions.length > 0 ? (
                      <div className="grid max-h-[320px] grid-cols-5 gap-1.5 overflow-y-auto pr-1">
                        {filteredChampions.map((champ) => (
                          <button
                            key={champ.id}
                            onClick={() => selectChampion(champ)}
                            title={champ.name}
                            className={`group relative overflow-hidden rounded-xl border transition-all ${
                              champ.id === selectedEnemyId
                                ? 'border-lime-400/50 ring-1 ring-lime-400/30'
                                : 'border-transparent hover:border-white/20'
                            }`}
                          >
                            <img
                              src={championIcon(data!.version, champ.id)}
                              alt={champ.name}
                              className="aspect-square w-full object-cover"
                            />
                            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent px-0.5 pb-0.5 pt-3">
                              <div className="truncate text-center text-[8px] font-medium leading-tight text-zinc-300">
                                {champ.name}
                              </div>
                            </div>
                          </button>
                        ))}
                      </div>
                    ) : (
                      <div className="py-6 text-center text-xs text-zinc-500">
                        Geen champions gevonden
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Selected enemy display */}
              {selectedEnemy && data && (
                <div className="mt-4 overflow-hidden rounded-xl border border-lime-400/20 bg-lime-400/[0.06]">
                  <div className="flex items-center gap-3 p-3">
                    <img
                      src={championIcon(data.version, selectedEnemy.id)}
                      alt={selectedEnemy.name}
                      className="h-11 w-11 rounded-lg border border-white/10"
                    />
                    <div className="min-w-0">
                      <div className="text-[10px] uppercase tracking-[0.2em] text-lime-300/60">
                        Geselecteerde vijand
                      </div>
                      <div className="truncate text-sm font-semibold text-white">
                        {selectedEnemy.name}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Counter picks list */}
            {matchup && data && (
              <div className="mt-4 rounded-2xl border border-white/[0.06] bg-white/[0.02] p-4 backdrop-blur-sm">
                <SectionHeader
                  icon={Shield}
                  title="Counter picks"
                  subtitle="Kies je antwoord op de matchup"
                />
                <div className="mt-4 space-y-3">
                  {matchup.counters.map((counter, i) => (
                    <CounterCard
                      key={counter.id}
                      counter={counter}
                      version={data.version}
                      rank={i}
                      active={counter.id === selectedCounterId}
                      onClick={() => {
                        setSelectedCounterId(counter.id);
                        setAiAnswer('');
                        setActiveTab('overview');
                      }}
                    />
                  ))}
                </div>
              </div>
            )}
          </aside>

          {/* ---------------------------------------------------------- */}
          {/* RIGHT MAIN CONTENT                                          */}
          {/* ---------------------------------------------------------- */}

          <div className="min-w-0 space-y-5">
            {/* Matchup banner */}
            {selectedCounterData && selectedEnemy && selectedCounter && data && (
              <div className="relative overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5 backdrop-blur-sm">
                {/* Decorative background */}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-lime-400/[0.03] via-transparent to-transparent" />

                <div className="relative flex flex-wrap items-center gap-5">
                  <div className="flex items-center gap-3">
                    <img
                      src={championIcon(data.version, selectedCounter.id)}
                      alt={selectedCounter.name}
                      className="h-16 w-16 rounded-xl border-2 border-lime-400/30 shadow-lg shadow-lime-400/10"
                    />
                    <div className="flex flex-col items-center gap-1">
                      <ChevronRight className="h-4 w-4 text-zinc-600" />
                      <span className="text-[9px] uppercase tracking-wider text-zinc-600">
                        vs
                      </span>
                    </div>
                    <img
                      src={championIcon(data.version, selectedEnemy.id)}
                      alt={selectedEnemy.name}
                      className="h-16 w-16 rounded-xl border border-white/10 opacity-60"
                    />
                  </div>
                  <div className="min-w-0">
                    <div className="text-[10px] uppercase tracking-[0.2em] text-zinc-500">
                      Actieve matchup
                    </div>
                    <h3 className="text-xl font-semibold tracking-tight text-white">
                      {selectedCounter.name}{' '}
                      <span className="font-normal text-zinc-500">into</span>{' '}
                      {selectedEnemy.name}
                    </h3>
                    <div className="mt-1 flex items-center gap-2">
                      <div className="rounded-lg bg-lime-400/15 px-2 py-0.5 text-xs font-bold text-lime-300">
                        Score {selectedCounterData.score}/10
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Tabs */}
            {selectedCounterData && (
              <div className="flex gap-1 rounded-xl border border-white/[0.06] bg-white/[0.02] p-1.5">
                <TabButton
                  active={activeTab === 'overview'}
                  onClick={() => setActiveTab('overview')}
                  icon={Target}
                  label="Overview"
                />
                <TabButton
                  active={activeTab === 'runes'}
                  onClick={() => setActiveTab('runes')}
                  icon={Sparkles}
                  label="Runes"
                />
                <TabButton
                  active={activeTab === 'items'}
                  onClick={() => setActiveTab('items')}
                  icon={Swords}
                  label="Items"
                />
                <TabButton
                  active={activeTab === 'ai'}
                  onClick={() => setActiveTab('ai')}
                  icon={Brain}
                  label="AI Coach"
                />
              </div>
            )}

            {/* Tab content */}
            {selectedCounterData && selectedEnemy && selectedCounter ? (
              <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5 backdrop-blur-sm">
                {/* ---- OVERVIEW TAB ---- */}
                {activeTab === 'overview' && (
                  <div className="space-y-4">
                    <DetailCard title="Why it works" icon={Zap}>
                      <p className="text-sm leading-relaxed text-zinc-300">
                        {selectedCounterData.reason}
                      </p>
                    </DetailCard>

                    <DetailCard title="Win condition" icon={Trophy}>
                      <p className="text-sm leading-relaxed text-zinc-300">
                        {selectedCounterData.winCondition}
                      </p>
                    </DetailCard>

                    <DetailCard title="Key tips" icon={Lightbulb}>
                      <div className="space-y-2">
                        {selectedCounterData.tips.map((tip, i) => (
                          <div
                            key={i}
                            className="flex gap-3 rounded-xl border border-white/[0.05] bg-black/20 p-3"
                          >
                            <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-lime-400/10 text-[10px] font-bold text-lime-400">
                              {i + 1}
                            </div>
                            <p className="text-sm leading-relaxed text-zinc-400">
                              {tip}
                            </p>
                          </div>
                        ))}
                      </div>
                    </DetailCard>
                  </div>
                )}

                {/* ---- RUNES TAB ---- */}
                {activeTab === 'runes' && (
                  <div className="space-y-5">
                    <div>
                      <div className="mb-3 flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-zinc-500">
                        <div className="h-px flex-1 bg-white/[0.06]" />
                        Primary — {selectedCounterData.runes.primaryTree}
                        <div className="h-px flex-1 bg-white/[0.06]" />
                      </div>
                      <div className="flex flex-wrap items-center gap-3">
                        <IconTile
                          src={getRuneIcon(selectedCounterData.runes.primaryTree)}
                          alt={selectedCounterData.runes.primaryTree}
                          title={selectedCounterData.runes.primaryTree}
                        />
                        <ChevronRight className="h-3 w-3 text-zinc-700" />
                        {selectedCounterData.runes.primaryKeystones.map(
                          (rune) => (
                            <IconTile
                              key={rune}
                              src={getRuneIcon(rune)}
                              alt={rune}
                              title={rune}
                            />
                          )
                        )}
                      </div>
                    </div>

                    <div>
                      <div className="mb-3 flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-zinc-500">
                        <div className="h-px flex-1 bg-white/[0.06]" />
                        Secondary — {selectedCounterData.runes.secondaryTree}
                        <div className="h-px flex-1 bg-white/[0.06]" />
                      </div>
                      <div className="flex flex-wrap items-center gap-3">
                        <IconTile
                          src={getRuneIcon(selectedCounterData.runes.secondaryTree)}
                          alt={selectedCounterData.runes.secondaryTree}
                          title={selectedCounterData.runes.secondaryTree}
                        />
                        <ChevronRight className="h-3 w-3 text-zinc-700" />
                        {selectedCounterData.runes.secondaryRunes.map(
                          (rune) => (
                            <IconTile
                              key={rune}
                              src={getRuneIcon(rune)}
                              alt={rune}
                              title={rune}
                            />
                          )
                        )}
                      </div>
                    </div>

                    <div>
                      <div className="mb-3 flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-zinc-500">
                        <div className="h-px flex-1 bg-white/[0.06]" />
                        Shards
                        <div className="h-px flex-1 bg-white/[0.06]" />
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {selectedCounterData.runes.shards.map((shard) => (
                          <span
                            key={shard}
                            className="rounded-lg bg-white/[0.04] px-3 py-1.5 text-xs text-zinc-400"
                          >
                            {shard}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* ---- ITEMS TAB ---- */}
                {activeTab === 'items' && (
                  <div className="space-y-5">
                    {(
                      [
                        ['Start', selectedCounterData.items.start],
                        ['Core', selectedCounterData.items.core],
                        ['Boots', selectedCounterData.items.boots],
                        ['Situational', selectedCounterData.items.situational],
                      ] as [string, string[]][]
                    ).map(([label, items]) => (
                      <div key={label}>
                        <div className="mb-3 flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-zinc-500">
                          <div className="h-px flex-1 bg-white/[0.06]" />
                          {label}
                          <div className="h-px flex-1 bg-white/[0.06]" />
                        </div>
                        <div className="flex flex-wrap gap-3">
                          {items.map((item) => (
                            <IconTile
                              key={item}
                              src={getItemIcon(item)}
                              alt={item}
                              title={item}
                            />
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* ---- AI COACH TAB ---- */}
                {activeTab === 'ai' && (
                  <div className="space-y-4">
                    {/* Quick questions */}
                    <div className="flex flex-wrap gap-1.5">
                      {[
                        'What is the wave plan for levels 1 to 3?',
                        'When is my first real all-in window?',
                        'What is the biggest mistake in this matchup?',
                        'How should I play after level 6?',
                      ].map((q) => (
                        <button
                          key={q}
                          onClick={() => setQuestion(q)}
                          className={`rounded-lg border px-2.5 py-1.5 text-[11px] transition ${
                            question === q
                              ? 'border-lime-400/30 bg-lime-400/10 text-lime-300'
                              : 'border-white/[0.06] text-zinc-500 hover:border-white/10 hover:text-zinc-300'
                          }`}
                        >
                          {q}
                        </button>
                      ))}
                    </div>

                    {/* Question input */}
                    <div className="rounded-xl border border-white/[0.08] bg-black/30 p-3">
                      <div className="mb-2 flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider text-lime-400/70">
                        <Sparkles className="h-3 w-3" />
                        Jouw vraag
                      </div>
                      <textarea
                        value={question}
                        onChange={(e) => setQuestion(e.target.value)}
                        rows={3}
                        className="w-full resize-none bg-transparent text-sm leading-relaxed text-white outline-none placeholder:text-zinc-600"
                        placeholder="Bijv: hoe speel ik wave 1 tot 3 in deze matchup?"
                      />
                    </div>

                    <button
                      onClick={askAi}
                      disabled={
                        aiLoading || !selectedEnemy || !selectedCounterData
                      }
                      className="inline-flex items-center gap-2 rounded-xl bg-lime-400 px-5 py-2.5 text-sm font-semibold text-black transition hover:bg-lime-300 disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      <Brain className="h-4 w-4" />
                      {aiLoading ? 'AI analyseert...' : 'Ask AI'}
                    </button>

                    {/* Answer */}
                    <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">
                      <div className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-lime-400/70">
                        AI antwoord
                      </div>
                      <div className="whitespace-pre-wrap text-sm leading-relaxed text-zinc-300">
                        {aiAnswer ||
                          'Nog geen antwoord. Selecteer een matchup en stel een vraag.'}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex h-64 items-center justify-center rounded-2xl border border-dashed border-white/[0.08] text-sm text-zinc-600">
                Selecteer een vijand en een counter om de details te zien.
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-8 border-t border-white/[0.04] px-1 py-4">
          <div className="text-[11px] text-zinc-600">
            Quantum Enigma Top Lane Hub · Snel counter preppen · Gebouwd voor
            snelle draft decisions
          </div>
        </footer>
      </div>
    </main>
  );
}
