'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import Image from 'next/image';
import { Search, Shield, Swords, Brain, Sparkles } from 'lucide-react';
import { TOP_LANE_POOL, TOP_MATCHUPS, championIcon } from '../lib/toplane';

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

function normalizeName(name: string) {
  return name.replace(/’/g, "'").trim().toLowerCase();
}

function SectionTitle({
  icon: Icon,
  title,
  subtitle
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="flex items-start gap-3">
      <div className="rounded-2xl border border-lime-400/20 bg-lime-400/10 p-2 text-lime-300">
        <Icon className="h-5 w-5" />
      </div>
      <div>
        <h2 className="text-lg font-semibold text-white">{title}</h2>
        {subtitle ? <p className="text-sm text-zinc-400">{subtitle}</p> : null}
      </div>
    </div>
  );
}

function CounterCard({
  counter,
  version,
  active,
  onClick
}: {
  counter: CounterEntry;
  version: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`rounded-3xl border p-4 text-left transition ${
        active
          ? 'border-lime-400/50 bg-lime-400/10'
          : 'border-white/10 bg-white/[0.03] hover:border-lime-400/20 hover:bg-white/[0.05]'
      }`}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <img
            src={championIcon(version, counter.id)}
            alt={counter.id}
            className="h-14 w-14 rounded-2xl border border-white/10"
          />
          <div>
            <div className="text-lg font-semibold text-white">{counter.id}</div>
            <div className="mt-1 line-clamp-3 text-sm text-zinc-400">{counter.reason}</div>
          </div>
        </div>

        <div className="rounded-2xl border border-lime-400/20 bg-lime-400/10 px-3 py-2 text-lg font-bold text-lime-200">
          {counter.score}
        </div>
      </div>
    </button>
  );
}

function IconTile({
  src,
  alt,
  title
}: {
  src?: string;
  alt: string;
  title: string;
}) {
  return (
    <div title={title}>
      <div className="h-12 w-12 overflow-hidden rounded-2xl border border-white/10 bg-zinc-900">
        {src ? (
          <img src={src} alt={alt} className="h-full w-full object-cover" />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-[10px] text-zinc-500">
            ?
          </div>
        )}
      </div>
    </div>
  );
}

function InfoCard({
  title,
  children
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-4">
      <div className="text-sm font-medium text-lime-300">{title}</div>
      <div className="mt-3">{children}</div>
    </div>
  );
}

export default function Page() {
  const [data, setData] = useState<RiotChampionResponse | null>(null);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState('');
  const [pickerOpen, setPickerOpen] = useState(false);
  const [selectedEnemyId, setSelectedEnemyId] = useState('');
  const [selectedCounterId, setSelectedCounterId] = useState('');

  const [question, setQuestion] = useState(
    'How should I play this matchup from level 1 to level 6?'
  );
  const [aiAnswer, setAiAnswer] = useState('');
  const [aiLoading, setAiLoading] = useState(false);

  const [runeIconMap, setRuneIconMap] = useState<RuneIconMap>({});
  const [itemIconMap, setItemIconMap] = useState<ItemIconMap>({});

  const pickerRef = useRef<HTMLDivElement | null>(null);

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
          fetch(`https://ddragon.leagueoflegends.com/cdn/${version}/data/en_US/item.json`)
        ]);

        const champsJson = await champsRes.json();
        const runesJson = await runesRes.json();
        const itemsJson = await itemsRes.json();

        const champions: RiotChampion[] = Object.values(champsJson.data)
          .map((c: any) => ({
            id: c.id,
            name: c.name,
            title: c.title
          }))
          .filter((c) => TOP_LANE_POOL.includes(c.id))
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
          setSearch(champions[0].name);
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

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (pickerRef.current && !pickerRef.current.contains(event.target as Node)) {
        setPickerOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredChampions = useMemo(() => {
    if (!data) return [];
    const q = search.toLowerCase().trim();
    if (!q) return data.champions.slice(0, 8);
    return data.champions
      .filter(
        (champ) =>
          champ.name.toLowerCase().includes(q) ||
          champ.id.toLowerCase().includes(q)
      )
      .slice(0, 8);
  }, [data, search]);

  const selectedEnemy = useMemo(() => {
    return data?.champions.find((c) => c.id === selectedEnemyId) || null;
  }, [data, selectedEnemyId]);

  const matchup = selectedEnemyId
    ? (TOP_MATCHUPS as MatchupMap)[selectedEnemyId]
    : undefined;

  const selectedCounterData =
    matchup?.counters.find((c) => c.id === selectedCounterId) || null;

  const selectedCounter = useMemo(() => {
    return data?.champions.find((c) => c.id === selectedCounterId) || null;
  }, [data, selectedCounterId]);

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
          question
        })
      });

      const json = await res.json();
      setAiAnswer(json.answer || 'No AI answer received.');
    } catch (error) {
      console.error(error);
      setAiAnswer('Something went wrong while calling the AI route.');
    } finally {
      setAiLoading(false);
    }
  }

  function selectChampion(champion: RiotChampion) {
    setSelectedEnemyId(champion.id);
    setSelectedCounterId(
      (TOP_MATCHUPS as MatchupMap)[champion.id]?.counters?.[0]?.id || ''
    );
    setSearch(champion.name);
    setPickerOpen(false);
    setAiAnswer('');
  }

  const getRuneIcon = (name: string) => runeIconMap[normalizeName(name)];
  const getItemIcon = (name: string) => itemIconMap[normalizeName(name)];

  return (
    <main className="min-h-screen bg-black text-white">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <header className="rounded-[28px] border border-white/10 bg-zinc-950/90 p-6 shadow-2xl">
          <div className="flex items-center gap-4">
            <Image
              src="/qe-logo.png"
              alt="Quantum Enigma"
              width={84}
              height={84}
              className="rounded-2xl border border-white/10 bg-black object-cover"
              priority
            />
            <div>
              <div className="text-xs uppercase tracking-[0.35em] text-lime-300">
                Quantum Enigma
              </div>
              <h1 className="mt-2 text-3xl font-semibold sm:text-4xl">
                Top Lane Matchup Hub
              </h1>
              <p className="mt-2 max-w-2xl text-sm text-zinc-400">
                Enemy top selecteren, beste counters zien en daarna direct de win condition,
                runes, items en AI coaching bekijken.
              </p>
            </div>
          </div>
        </header>

        <div className="mt-6 grid gap-6 xl:grid-cols-[360px,1fr]">
          <section className="rounded-[28px] border border-white/10 bg-zinc-950/90 p-5">
            <SectionTitle
              icon={Search}
              title="Enemy champion"
              subtitle="Search and select a champion quickly."
            />

            <div ref={pickerRef} className="relative mt-4">
              <div className="rounded-2xl border border-white/10 bg-black/40 px-4 py-3">
                <input
                  value={search}
                  onFocus={() => setPickerOpen(true)}
                  onChange={(e) => {
                    setSearch(e.target.value);
                    setPickerOpen(true);
                  }}
                  placeholder="Search top lane champion..."
                  className="w-full bg-transparent text-sm text-white outline-none placeholder:text-zinc-500"
                />
              </div>

              {pickerOpen && (
                <div className="absolute z-20 mt-2 w-full rounded-2xl border border-white/10 bg-zinc-950 p-2 shadow-2xl">
                  {loading ? (
                    <div className="px-3 py-3 text-sm text-zinc-400">Loading champions...</div>
                  ) : filteredChampions.length > 0 ? (
                    <div className="max-h-80 space-y-2 overflow-y-auto pr-1">
                      {filteredChampions.map((champ) => (
                        <button
                          key={champ.id}
                          onClick={() => selectChampion(champ)}
                          className="w-full rounded-2xl border border-white/10 bg-white/[0.03] px-3 py-2.5 text-left transition hover:border-lime-400/20 hover:bg-white/[0.05]"
                        >
                          <div className="flex items-center gap-3">
                            <img
                              src={championIcon(data!.version, champ.id)}
                              alt={champ.name}
                              className="h-10 w-10 rounded-xl border border-white/10"
                            />
                            <div className="min-w-0">
                              <div className="truncate font-medium text-white">{champ.name}</div>
                              <div className="truncate text-xs text-zinc-500">{champ.title}</div>
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  ) : (
                    <div className="px-3 py-3 text-sm text-zinc-400">No champions found.</div>
                  )}
                </div>
              )}
            </div>

            {selectedEnemy && data && (
              <div className="mt-4 rounded-2xl border border-lime-400/20 bg-lime-400/10 p-4">
                <div className="flex items-center gap-3">
                  <img
                    src={championIcon(data.version, selectedEnemy.id)}
                    alt={selectedEnemy.name}
                    className="h-12 w-12 rounded-xl border border-white/10"
                  />
                  <div>
                    <div className="text-xs uppercase tracking-[0.2em] text-lime-200/80">
                      Selected enemy
                    </div>
                    <div className="font-semibold text-white">{selectedEnemy.name}</div>
                  </div>
                </div>
              </div>
            )}
          </section>

          <section className="rounded-[28px] border border-white/10 bg-zinc-950/90 p-5">
            <SectionTitle
              icon={Shield}
              title="Best counters"
              subtitle="Select the best answer for the matchup."
            />

            {!matchup ? (
              <div className="mt-4 text-sm text-zinc-400">
                No matchup data available for this champion yet.
              </div>
            ) : (
              <div className="mt-5 grid gap-4 lg:grid-cols-3">
                {data &&
                  matchup.counters.map((counter) => (
                    <CounterCard
                      key={counter.id}
                      counter={counter}
                      version={data.version}
                      active={counter.id === selectedCounterId}
                      onClick={() => {
                        setSelectedCounterId(counter.id);
                        setAiAnswer('');
                      }}
                    />
                  ))}
              </div>
            )}
          </section>
        </div>

        <div className="mt-6 grid gap-6 xl:grid-cols-[1fr,1fr]">
          <section className="rounded-[28px] border border-white/10 bg-zinc-950/90 p-5">
            <SectionTitle
              icon={Swords}
              title="Runes and items"
              subtitle="Quick visual setup for the selected counter."
            />

            {selectedCounterData && selectedEnemy && selectedCounter ? (
              <>
                <div className="mt-5 flex items-center gap-4 rounded-3xl border border-white/10 bg-black/30 p-4">
                  {data && (
                    <>
                      <img
                        src={championIcon(data.version, selectedEnemy.id)}
                        alt={selectedEnemy.name}
                        className="h-16 w-16 rounded-2xl border border-white/10"
                      />
                      <span className="text-sm text-zinc-500">vs</span>
                      <img
                        src={championIcon(data.version, selectedCounter.id)}
                        alt={selectedCounter.name}
                        className="h-16 w-16 rounded-2xl border border-white/10"
                      />
                    </>
                  )}
                  <div>
                    <div className="text-xs uppercase tracking-[0.2em] text-zinc-500">
                      Selected matchup
                    </div>
                    <div className="text-2xl font-semibold text-white">
                      {selectedCounter.name} into {selectedEnemy.name}
                    </div>
                  </div>
                </div>

                <div className="mt-5 space-y-5">
                  <InfoCard title="Runes">
                    <div className="space-y-4">
                      <div>
                        <div className="mb-3 text-xs uppercase tracking-[0.2em] text-zinc-500">
                          Primary
                        </div>
                        <div className="flex flex-wrap gap-3">
                          <IconTile
                            src={getRuneIcon(selectedCounterData.runes.primaryTree)}
                            alt={selectedCounterData.runes.primaryTree}
                            title={selectedCounterData.runes.primaryTree}
                          />
                          {selectedCounterData.runes.primaryKeystones.map((rune) => (
                            <IconTile
                              key={rune}
                              src={getRuneIcon(rune)}
                              alt={rune}
                              title={rune}
                            />
                          ))}
                        </div>
                      </div>

                      <div>
                        <div className="mb-3 text-xs uppercase tracking-[0.2em] text-zinc-500">
                          Secondary
                        </div>
                        <div className="flex flex-wrap gap-3">
                          <IconTile
                            src={getRuneIcon(selectedCounterData.runes.secondaryTree)}
                            alt={selectedCounterData.runes.secondaryTree}
                            title={selectedCounterData.runes.secondaryTree}
                          />
                          {selectedCounterData.runes.secondaryRunes.map((rune) => (
                            <IconTile
                              key={rune}
                              src={getRuneIcon(rune)}
                              alt={rune}
                              title={rune}
                            />
                          ))}
                        </div>
                      </div>

                      <div>
                        <div className="mb-2 text-xs uppercase tracking-[0.2em] text-zinc-500">
                          Shards
                        </div>
                        <div className="text-sm text-zinc-400">
                          {selectedCounterData.runes.shards.join(' • ')}
                        </div>
                      </div>
                    </div>
                  </InfoCard>

                  <InfoCard title="Items">
                    <div className="space-y-4">
                      <div>
                        <div className="mb-3 text-xs uppercase tracking-[0.2em] text-zinc-500">
                          Start
                        </div>
                        <div className="flex flex-wrap gap-3">
                          {selectedCounterData.items.start.map((item) => (
                            <IconTile
                              key={item}
                              src={getItemIcon(item)}
                              alt={item}
                              title={item}
                            />
                          ))}
                        </div>
                      </div>

                      <div>
                        <div className="mb-3 text-xs uppercase tracking-[0.2em] text-zinc-500">
                          Core
                        </div>
                        <div className="flex flex-wrap gap-3">
                          {selectedCounterData.items.core.map((item) => (
                            <IconTile
                              key={item}
                              src={getItemIcon(item)}
                              alt={item}
                              title={item}
                            />
                          ))}
                        </div>
                      </div>

                      <div>
                        <div className="mb-3 text-xs uppercase tracking-[0.2em] text-zinc-500">
                          Boots
                        </div>
                        <div className="flex flex-wrap gap-3">
                          {selectedCounterData.items.boots.map((item) => (
                            <IconTile
                              key={item}
                              src={getItemIcon(item)}
                              alt={item}
                              title={item}
                            />
                          ))}
                        </div>
                      </div>

                      <div>
                        <div className="mb-3 text-xs uppercase tracking-[0.2em] text-zinc-500">
                          Situational
                        </div>
                        <div className="flex flex-wrap gap-3">
                          {selectedCounterData.items.situational.map((item) => (
                            <IconTile
                              key={item}
                              src={getItemIcon(item)}
                              alt={item}
                              title={item}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  </InfoCard>
                </div>
              </>
            ) : (
              <div className="mt-4 text-sm text-zinc-400">
                Select a champion and a counter first.
              </div>
            )}
          </section>

          <div className="space-y-6">
            <section className="rounded-[28px] border border-white/10 bg-zinc-950/90 p-5">
              <SectionTitle
                icon={Shield}
                title="Matchup tips"
                subtitle="The most important information for the lane."
              />

              {selectedCounterData ? (
                <div className="mt-5 space-y-5">
                  <InfoCard title="Why it works">
                    <p className="text-sm leading-6 text-zinc-300">
                      {selectedCounterData.reason}
                    </p>
                  </InfoCard>

                  <InfoCard title="Win condition">
                    <p className="text-sm leading-6 text-zinc-300">
                      {selectedCounterData.winCondition}
                    </p>
                  </InfoCard>

                  <InfoCard title="Key tips">
                    <div className="grid gap-2">
                      {selectedCounterData.tips.map((tip) => (
                        <div
                          key={tip}
                          className="rounded-2xl border border-white/10 bg-black/30 p-3 text-sm text-zinc-300"
                        >
                          {tip}
                        </div>
                      ))}
                    </div>
                  </InfoCard>
                </div>
              ) : (
                <div className="mt-4 text-sm text-zinc-400">
                  Select a counter to see the key matchup advice.
                </div>
              )}
            </section>

            <section className="rounded-[28px] border border-white/10 bg-zinc-950/90 p-5">
              <SectionTitle
                icon={Brain}
                title="AI coach"
                subtitle="Ask one precise top-lane question."
              />

              <div className="mt-5 grid gap-5">
                <div className="flex flex-wrap gap-2">
                  {[
                    'What is the wave plan for levels 1 to 3?',
                    'When is my first real all-in window?',
                    'What is the biggest mistake in this matchup?',
                    'How should I play after level 6?'
                  ].map((q) => (
                    <button
                      key={q}
                      onClick={() => setQuestion(q)}
                      className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-2 text-xs text-zinc-300 transition hover:border-lime-400/20 hover:text-white"
                    >
                      {q}
                    </button>
                  ))}
                </div>

                <div className="rounded-3xl border border-white/10 bg-black/30 p-4">
                  <div className="mb-2 flex items-center gap-2 text-sm font-medium text-lime-300">
                    <Sparkles className="h-4 w-4" />
                    Your question
                  </div>
                  <textarea
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    rows={5}
                    className="w-full resize-none bg-transparent text-sm text-white outline-none placeholder:text-zinc-500"
                    placeholder="Example: how should I play wave 1 to 3 in this matchup?"
                  />
                </div>

                <button
                  onClick={askAi}
                  disabled={aiLoading || !selectedEnemy || !selectedCounterData}
                  className="w-fit rounded-2xl bg-lime-400 px-5 py-3 text-sm font-semibold text-black transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {aiLoading ? 'AI is analysing...' : 'Ask AI'}
                </button>

                <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-4">
                  <div className="text-sm font-medium text-lime-300">AI answer</div>
                  <p className="mt-3 whitespace-pre-wrap text-sm leading-6 text-zinc-300">
                    {aiAnswer || 'No answer yet. Select a matchup and ask a question.'}
                  </p>
                </div>
              </div>
            </section>
          </div>
        </div>

        <footer className="mt-8 rounded-[28px] border border-white/10 bg-zinc-950/90 p-5">
          <div className="text-sm text-zinc-400">
            Quantum Enigma Top Lane Hub • Fast counter prep • Built for quick draft decisions
          </div>
        </footer>
      </div>
    </main>
  );
}