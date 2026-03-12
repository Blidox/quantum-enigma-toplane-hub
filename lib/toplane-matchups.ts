/**
 * Quantum Enigma — Top Lane Matchup Data
 * Every champion in the pool gets three counter-picks with runes, items,
 * win-conditions and coaching tips.
 *
 * Rune / item names must match the ddragon JSON keys (case-insensitive
 * after normalisation) so the icon lookup works automatically.
 */

const matchups: Record<
  string,
  {
    counters: {
      id: string;
      score: number;
      reason: string;
      winCondition: string;
      tips: string[];
      runes: {
        primaryTree: string;
        primaryKeystones: string[];
        secondaryTree: string;
        secondaryRunes: string[];
        shards: string[];
      };
      items: {
        start: string[];
        core: string[];
        boots: string[];
        situational: string[];
      };
    }[];
  }
> = {

  /* ================================================================ */
  /*  AATROX                                                          */
  /* ================================================================ */
  Aatrox: {
    counters: [
      {
        id: 'Fiora',
        score: 9,
        reason:
          'Fiora can parry every Aatrox Q sweet-spot and proc vitals during his long cast animations. She out-scales him in side lane with ease.',
        winCondition:
          'Riposte his W or Q3 for a guaranteed stun, then run him down with vitals. After two items you win every all-in.',
        tips: [
          'Save Riposte for his Q3 or W pull — never waste it on Q1.',
          'Short trade with Q-auto-E to proc vitals, then disengage.',
          'Buy Executioner\'s Calling early if he rushes heavy sustain.',
        ],
        runes: {
          primaryTree: 'Precision',
          primaryKeystones: ['Conqueror', 'Triumph', 'Legend: Alacrity', 'Last Stand'],
          secondaryTree: 'Resolve',
          secondaryRunes: ['Bone Plating', 'Overgrowth'],
          shards: ['Adaptive Force', 'Adaptive Force', 'Health'],
        },
        items: {
          start: ["Doran's Blade", 'Health Potion'],
          core: ['Trinity Force', 'Ravenous Hydra', "Sterak's Gage"],
          boots: ['Plated Steelcaps'],
          situational: ["Death's Dance", 'Maw of Malmortius', 'Guardian Angel'],
        },
      },
      {
        id: 'Irelia',
        score: 8,
        reason:
          'Irelia can dash through Aatrox Q sweet-spots with her own Q resets and sustain through his poke with passive healing.',
        winCondition:
          'Stack passive on minions, then all-in when you have 4-5 stacks. Dodge his Qs by dashing to nearby minions.',
        tips: [
          'Build up passive stacks before fighting — never engage with zero stacks.',
          'Q to a low-health caster minion next to him to dodge Q sweet-spots.',
          'Blade of the Ruined King rush gives you huge kill pressure at level 6.',
        ],
        runes: {
          primaryTree: 'Precision',
          primaryKeystones: ['Conqueror', 'Triumph', 'Legend: Alacrity', 'Last Stand'],
          secondaryTree: 'Resolve',
          secondaryRunes: ['Second Wind', 'Unflinching'],
          shards: ['Attack Speed', 'Adaptive Force', 'Health'],
        },
        items: {
          start: ["Doran's Blade", 'Health Potion'],
          core: ['Blade of the Ruined King', 'Trinity Force', "Sterak's Gage"],
          boots: ['Plated Steelcaps'],
          situational: ["Death's Dance", "Wit's End", 'Guardian Angel'],
        },
      },
      {
        id: 'Riven',
        score: 7,
        reason:
          'Riven can weave in and out of Aatrox Q sweet-spots with her many dashes and short-trade him between cooldowns.',
        winCondition:
          'Bait his Q combo by dashing in on Q1, trading, then E-ing out before Q3 lands. All-in at level 6 with ignite.',
        tips: [
          'Trade aggressively when his Q is on cooldown (12-10 s early).',
          'Use E to absorb his Q3 damage if you cannot dodge it.',
          'After level 6 your execute with R2 can finish him through his healing.',
        ],
        runes: {
          primaryTree: 'Precision',
          primaryKeystones: ['Conqueror', 'Triumph', 'Legend: Alacrity', 'Last Stand'],
          secondaryTree: 'Resolve',
          secondaryRunes: ['Bone Plating', 'Unflinching'],
          shards: ['Adaptive Force', 'Adaptive Force', 'Health'],
        },
        items: {
          start: ["Doran's Blade", 'Health Potion'],
          core: ['Black Cleaver', 'Ravenous Hydra', "Death's Dance"],
          boots: ['Ionian Boots of Lucidity'],
          situational: ["Sterak's Gage", 'Maw of Malmortius', 'Guardian Angel'],
        },
      },
    ],
  },

  /* ================================================================ */
  /*  AKALI                                                           */
  /* ================================================================ */
  Akali: {
    counters: [
      {
        id: 'Garen',
        score: 8,
        reason:
          'Garen shrugs off Akali poke with passive regen, silences her combo with Q, and can all-in with R execute even inside her shroud.',
        winCondition:
          'Q-silence her when she dashes in, spin inside her shroud, then R to execute. Your sustain wins the attrition war.',
        tips: [
          'Your Q silence prevents her from using E or R for 1.5 seconds — time it when she engages.',
          'Spin inside her shroud even if you cannot see her — it still deals damage.',
          'Rush Spectre\'s Cowl if you struggle early; it hard-counters her poke pattern.',
        ],
        runes: {
          primaryTree: 'Precision',
          primaryKeystones: ['Conqueror', 'Triumph', 'Legend: Tenacity', 'Last Stand'],
          secondaryTree: 'Resolve',
          secondaryRunes: ['Second Wind', 'Overgrowth'],
          shards: ['Adaptive Force', 'Adaptive Force', 'Magic Resist'],
        },
        items: {
          start: ["Doran's Shield", 'Health Potion'],
          core: ['Stridebreaker', 'Black Cleaver', "Death's Dance"],
          boots: ['Mercury\'s Treads'],
          situational: ['Force of Nature', 'Maw of Malmortius', "Sterak's Gage"],
        },
      },
      {
        id: 'Pantheon',
        score: 8,
        reason:
          'Pantheon point-and-click stun and empowered W combo burst Akali before she can shroud. His early base damage is overwhelming.',
        winCondition:
          'W-stun into emp-Q whenever she walks up to farm. Zone her off CS levels 1-5 and snowball with roams post-6.',
        tips: [
          'Save empowered W for when she uses E aggressively — she cannot escape the stun.',
          'E blocks her R damage entirely if timed correctly.',
          'Push and roam after level 6 since she outscales you in a pure 1v1 eventually.',
        ],
        runes: {
          primaryTree: 'Precision',
          primaryKeystones: ['Press the Attack', 'Triumph', 'Legend: Tenacity', 'Last Stand'],
          secondaryTree: 'Domination',
          secondaryRunes: ['Sudden Impact', 'Treasure Hunter'],
          shards: ['Adaptive Force', 'Adaptive Force', 'Magic Resist'],
        },
        items: {
          start: ["Doran's Blade", 'Health Potion'],
          core: ['Eclipse', 'Black Cleaver', "Death's Dance"],
          boots: ['Mercury\'s Treads'],
          situational: ['Maw of Malmortius', 'Guardian Angel', 'Hullbreaker'],
        },
      },
      {
        id: 'Malphite',
        score: 7,
        reason:
          'Malphite can stack MR, poke with Q from range, and his R engage is devastating against Akali in team fights.',
        winCondition:
          'Play safe, spam Q to whittle her down, and scale into a team-fight monster. You win by not losing lane.',
        tips: [
          'Start Doran\'s Ring for Q spam mana sustain.',
          'Max Q and poke her every time she walks up — your passive shield absorbs her return trade.',
          'After 6 your R is a far better team-fight tool than hers.',
        ],
        runes: {
          primaryTree: 'Resolve',
          primaryKeystones: ['Grasp of the Undying', 'Shield Bash', 'Second Wind', 'Overgrowth'],
          secondaryTree: 'Sorcery',
          secondaryRunes: ['Manaflow Band', 'Scorch'],
          shards: ['Ability Haste', 'Adaptive Force', 'Magic Resist'],
        },
        items: {
          start: ["Doran's Ring", 'Health Potion', 'Health Potion'],
          core: ['Hollow Radiance', 'Thornmail', 'Force of Nature'],
          boots: ['Mercury\'s Treads'],
          situational: ["Randuin's Omen", 'Spirit Visage', "Jak'Sho, the Protean"],
        },
      },
    ],
  },

  /* ================================================================ */
  /*  AMBESSA                                                         */
  /* ================================================================ */
  Ambessa: {
    counters: [
      {
        id: 'Jax',
        score: 8,
        reason:
          'Jax Counter Strike blocks Ambessa\'s auto-attack weave pattern and his scaling outpaces hers after two items.',
        winCondition:
          'Short trade with E active, stun, then walk away. After Blade of the Ruined King you can duel her freely.',
        tips: [
          'Activate Counter Strike before she dashes into you to block her empowered autos.',
          'Q onto her when she uses her dash offensively — she has no escape left.',
          'Be patient levels 1-3, you outscale hard.',
        ],
        runes: {
          primaryTree: 'Precision',
          primaryKeystones: ['Conqueror', 'Triumph', 'Legend: Alacrity', 'Last Stand'],
          secondaryTree: 'Resolve',
          secondaryRunes: ['Bone Plating', 'Overgrowth'],
          shards: ['Attack Speed', 'Adaptive Force', 'Health'],
        },
        items: {
          start: ["Doran's Blade", 'Health Potion'],
          core: ['Trinity Force', 'Blade of the Ruined King', "Sterak's Gage"],
          boots: ['Plated Steelcaps'],
          situational: ["Death's Dance", "Wit's End", 'Guardian Angel'],
        },
      },
      {
        id: 'Volibear',
        score: 7,
        reason:
          'Volibear can match Ambessa\'s aggression with his own all-in and passive stacking auto-attack DPS, plus he has great sustain.',
        winCondition:
          'Run at her with Q, stack passive, and use W bite twice for huge damage. Your base stats out-trade hers early.',
        tips: [
          'Save E for after she commits to a trade — the shield helps win the extended fight.',
          'W twice in every all-in for the enhanced bite heal.',
          'Your R turret-disable lets you dive her easily with jungler.',
        ],
        runes: {
          primaryTree: 'Precision',
          primaryKeystones: ['Conqueror', 'Triumph', 'Legend: Alacrity', 'Last Stand'],
          secondaryTree: 'Resolve',
          secondaryRunes: ['Second Wind', 'Unflinching'],
          shards: ['Attack Speed', 'Adaptive Force', 'Health'],
        },
        items: {
          start: ["Doran's Blade", 'Health Potion'],
          core: ['Blade of the Ruined King', 'Trinity Force', "Death's Dance"],
          boots: ['Plated Steelcaps'],
          situational: ["Sterak's Gage", "Wit's End", 'Spirit Visage'],
        },
      },
      {
        id: 'Gwen',
        score: 7,
        reason:
          'Gwen\'s W makes her untargetable to Ambessa\'s abilities, and her sustained damage with center-Q shreds Ambessa in longer fights.',
        winCondition:
          'Use W to dodge her burst combo, then out-DPS her with Q center hits and Riftmaker sustain.',
        tips: [
          'Time W when she dashes in with her combo — it negates most of her burst.',
          'Stack Q on minions, then trade with a full-stack center Q.',
          'Riftmaker gives you the sustain to survive her combos.',
        ],
        runes: {
          primaryTree: 'Precision',
          primaryKeystones: ['Conqueror', 'Triumph', 'Legend: Alacrity', 'Last Stand'],
          secondaryTree: 'Resolve',
          secondaryRunes: ['Bone Plating', 'Overgrowth'],
          shards: ['Attack Speed', 'Adaptive Force', 'Health'],
        },
        items: {
          start: ["Doran's Blade", 'Health Potion'],
          core: ['Riftmaker', "Nashor's Tooth", 'Cosmic Drive'],
          boots: ['Plated Steelcaps'],
          situational: ["Zhonya's Hourglass", "Rabadon's Deathcap", 'Morellonomicon'],
        },
      },
    ],
  },

  /* ================================================================ */
  /*  AURORA                                                          */
  /* ================================================================ */
  Aurora: {
    counters: [
      {
        id: 'Irelia',
        score: 8,
        reason:
          'Irelia can dash to Aurora constantly, negating her kiting advantage. Aurora cannot escape a fully-stacked Irelia all-in.',
        winCondition:
          'Stack passive on minions, then Q-dash chain onto Aurora. She lacks the burst to kill you before you heal.',
        tips: [
          'Wait for her to use abilities on the wave, then dash in with stacked passive.',
          'Your W sustain lets you heal back any poke she lands.',
          'Mercury\'s Treads reduce her CC duration significantly.',
        ],
        runes: {
          primaryTree: 'Precision',
          primaryKeystones: ['Conqueror', 'Triumph', 'Legend: Tenacity', 'Last Stand'],
          secondaryTree: 'Resolve',
          secondaryRunes: ['Second Wind', 'Unflinching'],
          shards: ['Attack Speed', 'Adaptive Force', 'Magic Resist'],
        },
        items: {
          start: ["Doran's Blade", 'Health Potion'],
          core: ['Blade of the Ruined King', "Wit's End", "Sterak's Gage"],
          boots: ['Mercury\'s Treads'],
          situational: ["Death's Dance", 'Maw of Malmortius', 'Guardian Angel'],
        },
      },
      {
        id: 'Yasuo',
        score: 7,
        reason:
          'Yasuo Windwall blocks Aurora projectiles and he can E-dash through minions to stick to her.',
        winCondition:
          'Windwall her key abilities, then E-dash through wave to gap close and knock her up for a full combo.',
        tips: [
          'Save Windwall for her main poke ability — do not waste it.',
          'E through minions aggressively to close the gap.',
          'After Blade of the Ruined King your sustained DPS beats hers.',
        ],
        runes: {
          primaryTree: 'Precision',
          primaryKeystones: ['Conqueror', 'Triumph', 'Legend: Alacrity', 'Last Stand'],
          secondaryTree: 'Resolve',
          secondaryRunes: ['Second Wind', 'Overgrowth'],
          shards: ['Attack Speed', 'Adaptive Force', 'Magic Resist'],
        },
        items: {
          start: ["Doran's Shield", 'Health Potion'],
          core: ['Blade of the Ruined King', 'Infinity Edge', "Death's Dance"],
          boots: ['Mercury\'s Treads'],
          situational: ["Sterak's Gage", 'Maw of Malmortius', "Wit's End"],
        },
      },
      {
        id: 'Sylas',
        score: 7,
        reason:
          'Sylas can steal Aurora\'s ultimate for devastating team fights and his burst combo with E engage is hard for her to escape.',
        winCondition:
          'E1-E2 engage into W heal sustain trade. Stealing her R gives you an incredible team-fight tool.',
        tips: [
          'Your E2 dash is an excellent gap closer — Aurora struggles vs melee all-in.',
          'W heal sustain lets you survive her poke pattern.',
          'Stealing her R in team fights is extremely powerful.',
        ],
        runes: {
          primaryTree: 'Precision',
          primaryKeystones: ['Conqueror', 'Triumph', 'Legend: Tenacity', 'Last Stand'],
          secondaryTree: 'Resolve',
          secondaryRunes: ['Second Wind', 'Overgrowth'],
          shards: ['Adaptive Force', 'Adaptive Force', 'Magic Resist'],
        },
        items: {
          start: ["Doran's Ring", 'Health Potion', 'Health Potion'],
          core: ['Iceborn Gauntlet', 'Frozen Heart', "Zhonya's Hourglass"],
          boots: ['Mercury\'s Treads'],
          situational: ['Banshee\'s Veil', 'Cosmic Drive', 'Morellonomicon'],
        },
      },
    ],
  },

  /* ================================================================ */
  /*  CAMILLE                                                         */
  /* ================================================================ */
  Camille: {
    counters: [
      {
        id: 'Jax',
        score: 9,
        reason:
          'Jax Counter Strike blocks Camille\'s empowered auto attacks and his E stun makes short trades impossible for her.',
        winCondition:
          'Activate E when she goes for an empowered Q2 trade. You auto-win every short trade and outscale her.',
        tips: [
          'Counter Strike completely negates her Q2 true damage — always save it for that.',
          'After Trinity Force you stat-check her in side lane.',
          'Jump on her when her E hookshot is on cooldown.',
        ],
        runes: {
          primaryTree: 'Precision',
          primaryKeystones: ['Conqueror', 'Triumph', 'Legend: Alacrity', 'Last Stand'],
          secondaryTree: 'Resolve',
          secondaryRunes: ['Bone Plating', 'Overgrowth'],
          shards: ['Attack Speed', 'Adaptive Force', 'Health'],
        },
        items: {
          start: ["Doran's Blade", 'Health Potion'],
          core: ['Trinity Force', 'Blade of the Ruined King', "Sterak's Gage"],
          boots: ['Plated Steelcaps'],
          situational: ["Death's Dance", "Wit's End", 'Guardian Angel'],
        },
      },
      {
        id: 'Renekton',
        score: 8,
        reason:
          'Renekton\'s empowered W stun and burst combo trade is devastating against Camille, and he can dash in before she reacts.',
        winCondition:
          'E in, W-stun, Q, E out. She cannot trade back through the stun. Zone her off CS and build a lead early.',
        tips: [
          'Empowered W goes through her passive shield — always use fury W.',
          'E through minions to close the gap, then combo and E out.',
          'You fall off late, so press your early advantage hard.',
        ],
        runes: {
          primaryTree: 'Precision',
          primaryKeystones: ['Conqueror', 'Triumph', 'Legend: Tenacity', 'Last Stand'],
          secondaryTree: 'Resolve',
          secondaryRunes: ['Bone Plating', 'Unflinching'],
          shards: ['Adaptive Force', 'Adaptive Force', 'Health'],
        },
        items: {
          start: ["Doran's Blade", 'Health Potion'],
          core: ['Blade of the Ruined King', 'Black Cleaver', "Sterak's Gage"],
          boots: ['Plated Steelcaps'],
          situational: ["Death's Dance", 'Guardian Angel', 'Hullbreaker'],
        },
      },
      {
        id: 'Darius',
        score: 7,
        reason:
          'Darius can punish Camille\'s E engage with his own E pull and stack passive bleed to all-in her.',
        winCondition:
          'If she hookshots in, E-pull her, stack passive, and all-in with R. She cannot out-trade you in extended fights.',
        tips: [
          'Use E pull when she dashes at you with hookshot — she lands right on top of you.',
          'W slow prevents her from disengaging after a short trade.',
          'Ghost is essential to stick to her in all-ins.',
        ],
        runes: {
          primaryTree: 'Precision',
          primaryKeystones: ['Conqueror', 'Triumph', 'Legend: Tenacity', 'Last Stand'],
          secondaryTree: 'Resolve',
          secondaryRunes: ['Bone Plating', 'Unflinching'],
          shards: ['Adaptive Force', 'Adaptive Force', 'Health'],
        },
        items: {
          start: ["Doran's Blade", 'Health Potion'],
          core: ['Trinity Force', "Sterak's Gage", "Death's Dance"],
          boots: ['Plated Steelcaps'],
          situational: ['Black Cleaver', 'Hullbreaker', 'Guardian Angel'],
        },
      },
    ],
  },

  /* ================================================================ */
  /*  CHO'GATH                                                        */
  /* ================================================================ */
  ChoGath: {
    counters: [
      {
        id: 'Fiora',
        score: 9,
        reason:
          'Fiora shreds Cho\'Gath\'s massive HP pool with vital procs and can Riposte his knock-up or silence for a free stun.',
        winCondition:
          'Parry his Q knock-up for a stun, then all-in with vitals. His huge hitbox makes proccing all four R vitals easy.',
        tips: [
          'Save Riposte for his Q (knock-up) — it is easy to predict the animation.',
          'His large model makes hitting all four ult vitals very easy.',
          'Buy anti-heal to reduce his passive sustain from minions.',
        ],
        runes: {
          primaryTree: 'Precision',
          primaryKeystones: ['Conqueror', 'Triumph', 'Legend: Alacrity', 'Last Stand'],
          secondaryTree: 'Resolve',
          secondaryRunes: ['Second Wind', 'Overgrowth'],
          shards: ['Adaptive Force', 'Adaptive Force', 'Health'],
        },
        items: {
          start: ["Doran's Blade", 'Health Potion'],
          core: ['Trinity Force', 'Ravenous Hydra', "Sterak's Gage"],
          boots: ['Mercury\'s Treads'],
          situational: ["Death's Dance", 'Maw of Malmortius', 'Guardian Angel'],
        },
      },
      {
        id: 'Vayne',
        score: 8,
        reason:
          'Vayne\'s Silver Bolts deal percent max HP true damage, melting Cho\'Gath\'s stacked health pool incredibly fast.',
        winCondition:
          'Kite with Q tumble, proc Silver Bolts, and condemn him into a wall if he walks at you. He can never reach you.',
        tips: [
          'Dodge his Q with your tumble — it is slow and predictable.',
          'Condemn him away if he ever gets close.',
          'Every three autos deal a huge chunk of his HP thanks to Silver Bolts.',
        ],
        runes: {
          primaryTree: 'Precision',
          primaryKeystones: ['Press the Attack', 'Triumph', 'Legend: Alacrity', 'Cut Down'],
          secondaryTree: 'Resolve',
          secondaryRunes: ['Bone Plating', 'Overgrowth'],
          shards: ['Attack Speed', 'Adaptive Force', 'Health'],
        },
        items: {
          start: ["Doran's Blade", 'Health Potion'],
          core: ['Blade of the Ruined King', 'Guinsoo\'s Rageblade', 'Phantom Dancer'],
          boots: ['Plated Steelcaps'],
          situational: ["Wit's End", 'Guardian Angel', 'Mortal Reminder'],
        },
      },
      {
        id: 'Gwen',
        score: 7,
        reason:
          'Gwen deals percent HP magic damage with center Q and her W makes her immune to Cho\'Gath\'s abilities from outside.',
        winCondition:
          'Stack Q on minions, trade with center Q for massive HP shred, and use W to avoid his Q knock-up.',
        tips: [
          'Center Q hits deal percent HP damage that shreds his bonus health from ult stacks.',
          'W makes you immune to his Q and W from outside the mist.',
          'Riftmaker sustain matches his passive healing in lane.',
        ],
        runes: {
          primaryTree: 'Precision',
          primaryKeystones: ['Conqueror', 'Triumph', 'Legend: Alacrity', 'Last Stand'],
          secondaryTree: 'Resolve',
          secondaryRunes: ['Second Wind', 'Overgrowth'],
          shards: ['Attack Speed', 'Adaptive Force', 'Magic Resist'],
        },
        items: {
          start: ["Doran's Blade", 'Health Potion'],
          core: ['Riftmaker', "Nashor's Tooth", 'Cosmic Drive'],
          boots: ['Mercury\'s Treads'],
          situational: ["Zhonya's Hourglass", "Rabadon's Deathcap", 'Morellonomicon'],
        },
      },
    ],
  },

  /* ================================================================ */
  /*  DARIUS                                                          */
  /* ================================================================ */
  Darius: {
    counters: [
      {
        id: 'Quinn',
        score: 9,
        reason:
          'Quinn\'s range, E vault disengage, and blind make it nearly impossible for Darius to reach her and stack his passive.',
        winCondition:
          'Harass with autos, vault away when he E-pulls, and blind him to negate his auto attacks. Freeze and zone.',
        tips: [
          'Always save E vault for after he uses his E pull — it is your key escape.',
          'Blind him with Q during his auto-attack trades to negate his damage.',
          'Freeze near your tower and harass him whenever he walks up.',
        ],
        runes: {
          primaryTree: 'Precision',
          primaryKeystones: ['Press the Attack', 'Triumph', 'Legend: Alacrity', 'Cut Down'],
          secondaryTree: 'Resolve',
          secondaryRunes: ['Bone Plating', 'Overgrowth'],
          shards: ['Attack Speed', 'Adaptive Force', 'Health'],
        },
        items: {
          start: ["Doran's Blade", 'Health Potion'],
          core: ['Blade of the Ruined King', 'Phantom Dancer', 'Infinity Edge'],
          boots: ['Boots of Swiftness'],
          situational: ['Guardian Angel', 'Mortal Reminder', "Lord Dominik's Regards"],
        },
      },
      {
        id: 'Vayne',
        score: 8,
        reason:
          'Vayne kites Darius with tumble and condemn and shreds his health bar with Silver Bolts true damage.',
        winCondition:
          'Kite backwards, tumble his Q outer ring, and condemn him into a wall when he uses Ghost to run at you.',
        tips: [
          'Condemn him away the moment he pops Ghost — it is your life saver.',
          'Tumble sideways to dodge his Q outer ring healing.',
          'Freeze near your tower so he cannot run you down the lane.',
        ],
        runes: {
          primaryTree: 'Precision',
          primaryKeystones: ['Press the Attack', 'Triumph', 'Legend: Alacrity', 'Cut Down'],
          secondaryTree: 'Resolve',
          secondaryRunes: ['Bone Plating', 'Overgrowth'],
          shards: ['Attack Speed', 'Adaptive Force', 'Health'],
        },
        items: {
          start: ["Doran's Blade", 'Health Potion'],
          core: ['Blade of the Ruined King', 'Phantom Dancer', 'Infinity Edge'],
          boots: ['Plated Steelcaps'],
          situational: ['Guardian Angel', 'Mortal Reminder', "Wit's End"],
        },
      },
      {
        id: 'Kennen',
        score: 7,
        reason:
          'Kennen harasses Darius from range with auto-empowered W and can stun-disengage with his full combo if Darius engages.',
        winCondition:
          'Poke with W-empowered auto, Q, then E away if he pulls you. Your team-fight R is far more impactful than his.',
        tips: [
          'E lightning rush away immediately if he lands his E pull.',
          'Space correctly — stand just outside his E range and poke.',
          'Your team-fight presence with R is much stronger, so do not need to kill him in lane.',
        ],
        runes: {
          primaryTree: 'Sorcery',
          primaryKeystones: ['Summon Aery', 'Manaflow Band', 'Transcendence', 'Gathering Storm'],
          secondaryTree: 'Resolve',
          secondaryRunes: ['Bone Plating', 'Overgrowth'],
          shards: ['Adaptive Force', 'Adaptive Force', 'Health'],
        },
        items: {
          start: ["Doran's Blade", 'Health Potion'],
          core: ['Blade of the Ruined King', "Nashor's Tooth", "Zhonya's Hourglass"],
          boots: ['Plated Steelcaps'],
          situational: ['Banshee\'s Veil', "Rabadon's Deathcap", 'Morellonomicon'],
        },
      },
    ],
  },

  /* ================================================================ */
  /*  DR. MUNDO                                                       */
  /* ================================================================ */
  DrMundo: {
    counters: [
      {
        id: 'Vayne',
        score: 9,
        reason:
          'Vayne melts Mundo\'s health pool with percent max HP true damage from Silver Bolts and he can never reach her.',
        winCondition:
          'Kite endlessly, proc Silver Bolts, and condemn him away. His healing is meaningless when you shred HP this fast.',
        tips: [
          'Tumble his Q cleavers — they are his only ranged slow.',
          'Condemn into wall for huge burst if he walks at you.',
          'Cut Down rune amplifies your damage against his massive HP.',
        ],
        runes: {
          primaryTree: 'Precision',
          primaryKeystones: ['Press the Attack', 'Triumph', 'Legend: Alacrity', 'Cut Down'],
          secondaryTree: 'Resolve',
          secondaryRunes: ['Second Wind', 'Overgrowth'],
          shards: ['Attack Speed', 'Adaptive Force', 'Health'],
        },
        items: {
          start: ["Doran's Blade", 'Health Potion'],
          core: ['Blade of the Ruined King', 'Guinsoo\'s Rageblade', 'Phantom Dancer'],
          boots: ['Boots of Swiftness'],
          situational: ['Mortal Reminder', 'Guardian Angel', "Wit's End"],
        },
      },
      {
        id: 'Fiora',
        score: 8,
        reason:
          'Fiora\'s vitals deal percent max HP true damage, ignoring Mundo\'s armor and health stacking. Riposte blocks his Q slow.',
        winCondition:
          'Proc vitals consistently, Riposte his Q to stun, and all-in once you have two items. He cannot duel you.',
        tips: [
          'Parry his Q cleaver for a free stun and an easy vital proc.',
          'His large hitbox makes hitting four ult vitals very reliable.',
          'Anti-heal is essential to reduce his R and passive healing.',
        ],
        runes: {
          primaryTree: 'Precision',
          primaryKeystones: ['Conqueror', 'Triumph', 'Legend: Alacrity', 'Last Stand'],
          secondaryTree: 'Resolve',
          secondaryRunes: ['Second Wind', 'Overgrowth'],
          shards: ['Adaptive Force', 'Adaptive Force', 'Health'],
        },
        items: {
          start: ["Doran's Blade", 'Health Potion'],
          core: ['Trinity Force', 'Ravenous Hydra', "Sterak's Gage"],
          boots: ['Plated Steelcaps'],
          situational: ["Death's Dance", 'Mortal Reminder', 'Guardian Angel'],
        },
      },
      {
        id: 'Gwen',
        score: 7,
        reason:
          'Gwen center Q deals percent HP magic damage that shreds Mundo, and her W blocks his cleavers from outside.',
        winCondition:
          'Farm safely, trade with stacked center Q for huge chunks, and outscale with Riftmaker sustain.',
        tips: [
          'W blocks his Q cleavers when he throws them from outside the mist.',
          'Center Q damage scales with his HP — the more he stacks, the harder you hit.',
          'Riftmaker healing keeps you even with his passive sustain.',
        ],
        runes: {
          primaryTree: 'Precision',
          primaryKeystones: ['Conqueror', 'Triumph', 'Legend: Alacrity', 'Last Stand'],
          secondaryTree: 'Resolve',
          secondaryRunes: ['Second Wind', 'Overgrowth'],
          shards: ['Attack Speed', 'Adaptive Force', 'Health'],
        },
        items: {
          start: ["Doran's Blade", 'Health Potion'],
          core: ['Riftmaker', "Nashor's Tooth", 'Cosmic Drive'],
          boots: ['Mercury\'s Treads'],
          situational: ["Zhonya's Hourglass", "Rabadon's Deathcap", 'Morellonomicon'],
        },
      },
    ],
  },

  /* ================================================================ */
  /*  FIORA                                                           */
  /* ================================================================ */
  Fiora: {
    counters: [
      {
        id: 'Malphite',
        score: 8,
        reason:
          'Malphite\'s armor stacking, attack speed slow on E, and ranged Q poke make Fiora\'s auto-attack-reliant trading miserable.',
        winCondition:
          'Stack armor, poke with Q, and slow her auto attacks with E. She cannot proc vitals efficiently against you.',
        tips: [
          'E attack speed slow cripples her ability to proc vitals quickly.',
          'Q poke whittles her down — she has no sustain early without hitting vitals.',
          'You do not need to kill her; just survive lane and be more useful in team fights.',
        ],
        runes: {
          primaryTree: 'Resolve',
          primaryKeystones: ['Grasp of the Undying', 'Shield Bash', 'Conditioning', 'Overgrowth'],
          secondaryTree: 'Sorcery',
          secondaryRunes: ['Manaflow Band', 'Scorch'],
          shards: ['Ability Haste', 'Adaptive Force', 'Armor'],
        },
        items: {
          start: ["Doran's Ring", 'Health Potion', 'Health Potion'],
          core: ['Hollow Radiance', 'Thornmail', "Randuin's Omen"],
          boots: ['Plated Steelcaps'],
          situational: ['Spirit Visage', "Jak'Sho, the Protean", 'Force of Nature'],
        },
      },
      {
        id: 'Kennen',
        score: 7,
        reason:
          'Kennen harasses Fiora from range and can stun-disengage whenever she tries to engage with Q.',
        winCondition:
          'Poke from range, E away if she lunges, and contribute more in team fights. She cannot catch you.',
        tips: [
          'Auto-W poke from range is safe because she cannot reach you easily.',
          'E lightning rush instantly if she Q-lunges toward you.',
          'Your team-fight R is massively more impactful than hers.',
        ],
        runes: {
          primaryTree: 'Sorcery',
          primaryKeystones: ['Summon Aery', 'Manaflow Band', 'Transcendence', 'Gathering Storm'],
          secondaryTree: 'Resolve',
          secondaryRunes: ['Bone Plating', 'Overgrowth'],
          shards: ['Adaptive Force', 'Adaptive Force', 'Health'],
        },
        items: {
          start: ["Doran's Blade", 'Health Potion'],
          core: ['Blade of the Ruined King', "Nashor's Tooth", "Zhonya's Hourglass"],
          boots: ['Plated Steelcaps'],
          situational: ['Banshee\'s Veil', "Rabadon's Deathcap", 'Morellonomicon'],
        },
      },
      {
        id: 'Quinn',
        score: 7,
        reason:
          'Quinn\'s range advantage, blind, and vault keep Fiora at arms length. Fiora struggles to reach Quinn without getting kited.',
        winCondition:
          'Poke with autos, blind her when she engages, and vault away from her Q lunge. Roam with R to spread your lead.',
        tips: [
          'Save E vault for after she Q-lunges — it knocks her back and creates distance.',
          'Q blind prevents her from auto-attacking for vitals.',
          'Freeze near your tower and harass; she cannot all-in you there.',
        ],
        runes: {
          primaryTree: 'Precision',
          primaryKeystones: ['Press the Attack', 'Triumph', 'Legend: Alacrity', 'Cut Down'],
          secondaryTree: 'Resolve',
          secondaryRunes: ['Bone Plating', 'Overgrowth'],
          shards: ['Attack Speed', 'Adaptive Force', 'Health'],
        },
        items: {
          start: ["Doran's Blade", 'Health Potion'],
          core: ['Blade of the Ruined King', 'Phantom Dancer', 'Infinity Edge'],
          boots: ['Boots of Swiftness'],
          situational: ['Guardian Angel', 'Mortal Reminder', "Lord Dominik's Regards"],
        },
      },
    ],
  },

  /* ================================================================ */
  /*  GANGPLANK                                                       */
  /* ================================================================ */
  Gangplank: {
    counters: [
      {
        id: 'Irelia',
        score: 9,
        reason:
          'Irelia dashes onto Gangplank and out-trades him in melee. His barrels are too slow against her mobility.',
        winCondition:
          'Stack passive on minions, then Q-dash onto GP. He loses every melee fight, and his barrels are easy to dodge with dashes.',
        tips: [
          'Q to a minion near him to gap close, then auto with stacked passive.',
          'His W cleanse cannot save him if you have full passive stacks and commit.',
          'Dash to his barrels to destroy them before he detonates.',
        ],
        runes: {
          primaryTree: 'Precision',
          primaryKeystones: ['Conqueror', 'Triumph', 'Legend: Alacrity', 'Last Stand'],
          secondaryTree: 'Resolve',
          secondaryRunes: ['Bone Plating', 'Overgrowth'],
          shards: ['Attack Speed', 'Adaptive Force', 'Health'],
        },
        items: {
          start: ["Doran's Blade", 'Health Potion'],
          core: ['Blade of the Ruined King', 'Trinity Force', "Sterak's Gage"],
          boots: ['Plated Steelcaps'],
          situational: ["Death's Dance", "Wit's End", 'Guardian Angel'],
        },
      },
      {
        id: 'Camille',
        score: 8,
        reason:
          'Camille can hookshot onto GP and trap him with Hextech Ultimatum, forcing the melee fight he desperately wants to avoid.',
        winCondition:
          'E hookshot in, trade with Q1-Q2 empowered auto, and ult to lock him down. He cannot kite inside your R.',
        tips: [
          'Hookshot range lets you engage from outside his barrel zone.',
          'Your R locks him in melee range where he is weakest.',
          'His W orange cleanse removes your E stun, but not your R — save ult for the kill.',
        ],
        runes: {
          primaryTree: 'Precision',
          primaryKeystones: ['Conqueror', 'Triumph', 'Legend: Alacrity', 'Last Stand'],
          secondaryTree: 'Resolve',
          secondaryRunes: ['Bone Plating', 'Overgrowth'],
          shards: ['Adaptive Force', 'Adaptive Force', 'Health'],
        },
        items: {
          start: ["Doran's Blade", 'Health Potion'],
          core: ['Trinity Force', 'Ravenous Hydra', "Sterak's Gage"],
          boots: ['Plated Steelcaps'],
          situational: ["Death's Dance", 'Guardian Angel', 'Hullbreaker'],
        },
      },
      {
        id: 'Riven',
        score: 7,
        reason:
          'Riven\'s multiple dashes let her dodge barrels and get on top of GP for devastating combos.',
        winCondition:
          'Dash through his barrels, stun with W, and burst with full combo. He has no escape once you are on top of him.',
        tips: [
          'Use E to dash through barrel chains to close the gap.',
          'His W cleanse has a long cooldown — bait it out, then re-engage.',
          'Short trade with Q-W-auto-E out, then all-in when his cooldowns are down.',
        ],
        runes: {
          primaryTree: 'Precision',
          primaryKeystones: ['Conqueror', 'Triumph', 'Legend: Alacrity', 'Last Stand'],
          secondaryTree: 'Resolve',
          secondaryRunes: ['Bone Plating', 'Unflinching'],
          shards: ['Adaptive Force', 'Adaptive Force', 'Health'],
        },
        items: {
          start: ["Doran's Blade", 'Health Potion'],
          core: ['Black Cleaver', 'Ravenous Hydra', "Death's Dance"],
          boots: ['Ionian Boots of Lucidity'],
          situational: ["Sterak's Gage", 'Maw of Malmortius', 'Guardian Angel'],
        },
      },
    ],
  },

  /* ================================================================ */
  /*  GAREN                                                           */
  /* ================================================================ */
  Garen: {
    counters: [
      {
        id: 'Vayne',
        score: 8,
        reason:
          'Vayne kites Garen endlessly with tumble and Silver Bolts shred him. He has no gap closer to reach her.',
        winCondition:
          'Stay at max range, proc Silver Bolts, and condemn him away whenever he tries to Q-run at you.',
        tips: [
          'Tumble sideways to dodge his Q approach — he needs to be in melee.',
          'Condemn him into a wall for a massive burst window.',
          'Freeze near tower so he can never run you down.',
        ],
        runes: {
          primaryTree: 'Precision',
          primaryKeystones: ['Press the Attack', 'Triumph', 'Legend: Alacrity', 'Cut Down'],
          secondaryTree: 'Resolve',
          secondaryRunes: ['Bone Plating', 'Overgrowth'],
          shards: ['Attack Speed', 'Adaptive Force', 'Health'],
        },
        items: {
          start: ["Doran's Blade", 'Health Potion'],
          core: ['Blade of the Ruined King', 'Phantom Dancer', 'Infinity Edge'],
          boots: ['Boots of Swiftness'],
          situational: ['Guardian Angel', 'Mortal Reminder', "Wit's End"],
        },
      },
      {
        id: 'Quinn',
        score: 8,
        reason:
          'Quinn blinds Garen, negating his auto-based Q damage, and vaults away whenever he runs at her.',
        winCondition:
          'Poke from range, blind when he Qs, and vault away. He can never touch you in a proper lane.',
        tips: [
          'Blind his Q with your own Q for a huge damage denial.',
          'E vault resets your spacing every time he tries to run at you.',
          'After Blade of the Ruined King you can even duel him in melee if needed.',
        ],
        runes: {
          primaryTree: 'Precision',
          primaryKeystones: ['Press the Attack', 'Triumph', 'Legend: Alacrity', 'Cut Down'],
          secondaryTree: 'Resolve',
          secondaryRunes: ['Bone Plating', 'Overgrowth'],
          shards: ['Attack Speed', 'Adaptive Force', 'Health'],
        },
        items: {
          start: ["Doran's Blade", 'Health Potion'],
          core: ['Blade of the Ruined King', 'Phantom Dancer', 'Infinity Edge'],
          boots: ['Boots of Swiftness'],
          situational: ['Guardian Angel', 'Mortal Reminder', "Lord Dominik's Regards"],
        },
      },
      {
        id: 'Kayle',
        score: 7,
        reason:
          'Kayle outscales Garen massively and can kite him at level 6+ with ranged autos. He falls off while she ascends.',
        winCondition:
          'Survive early with W heal and farming. At level 6 you become ranged and can kite him. At 16 you hard carry.',
        tips: [
          'Use W movement speed to dodge his Q approach.',
          'Play very safe levels 1-5 — he can kill you easily in melee range.',
          'At level 11+ you outscale him so hard the lane becomes free.',
        ],
        runes: {
          primaryTree: 'Precision',
          primaryKeystones: ['Fleet Footwork', 'Triumph', 'Legend: Alacrity', 'Last Stand'],
          secondaryTree: 'Resolve',
          secondaryRunes: ['Second Wind', 'Overgrowth'],
          shards: ['Attack Speed', 'Adaptive Force', 'Armor'],
        },
        items: {
          start: ["Doran's Blade", 'Health Potion'],
          core: ["Nashor's Tooth", 'Riftmaker', "Rabadon's Deathcap"],
          boots: ['Boots of Swiftness'],
          situational: ["Zhonya's Hourglass", 'Shadowflame', "Wit's End"],
        },
      },
    ],
  },

  /* ================================================================ */
  /*  GNAR                                                            */
  /* ================================================================ */
  Gnar: {
    counters: [
      {
        id: 'Irelia',
        score: 8,
        reason:
          'Irelia can dash onto Mini Gnar through minions and all-in him. His kiting is meaningless against her resets.',
        winCondition:
          'Stack passive, Q to a minion near Gnar, then all-in. He has no tools to escape a fully-stacked Irelia.',
        tips: [
          'Engage on him when he is in Mini Gnar form — he is squishy and you burst him.',
          'Track his rage bar and do not fight him in Mega form.',
          'Blade of the Ruined King gives you the damage to kill him quickly.',
        ],
        runes: {
          primaryTree: 'Precision',
          primaryKeystones: ['Conqueror', 'Triumph', 'Legend: Alacrity', 'Last Stand'],
          secondaryTree: 'Resolve',
          secondaryRunes: ['Second Wind', 'Unflinching'],
          shards: ['Attack Speed', 'Adaptive Force', 'Health'],
        },
        items: {
          start: ["Doran's Blade", 'Health Potion'],
          core: ['Blade of the Ruined King', 'Trinity Force', "Sterak's Gage"],
          boots: ['Mercury\'s Treads'],
          situational: ["Death's Dance", "Wit's End", 'Guardian Angel'],
        },
      },
      {
        id: 'Camille',
        score: 7,
        reason:
          'Camille hookshot reaches Gnar from outside his auto range, and her Q2 true damage bursts Mini Gnar down quickly.',
        winCondition:
          'Hookshot onto Mini Gnar, trade with Q1-Q2, then back off. At level 6 your all-in is lethal.',
        tips: [
          'Engage with E when he is Mini form — Mega Gnar can interrupt your hookshot.',
          'Q2 true damage ignores his armor stacking in Mega form.',
          'Trade around his boomerang cooldown.',
        ],
        runes: {
          primaryTree: 'Precision',
          primaryKeystones: ['Conqueror', 'Triumph', 'Legend: Alacrity', 'Last Stand'],
          secondaryTree: 'Resolve',
          secondaryRunes: ['Bone Plating', 'Overgrowth'],
          shards: ['Adaptive Force', 'Adaptive Force', 'Health'],
        },
        items: {
          start: ["Doran's Blade", 'Health Potion'],
          core: ['Trinity Force', 'Ravenous Hydra', "Sterak's Gage"],
          boots: ['Plated Steelcaps'],
          situational: ["Death's Dance", 'Guardian Angel', 'Hullbreaker'],
        },
      },
      {
        id: 'Yasuo',
        score: 7,
        reason:
          'Yasuo Windwall blocks Gnar boomerang and he dashes through the wave to stay on top of Mini Gnar.',
        winCondition:
          'Windwall his Q, dash through minions to gap-close, and trade in melee where Mini Gnar is weak.',
        tips: [
          'Windwall blocks both his Q boomerang and Mega Gnar boulder.',
          'E through the wave aggressively when he is Mini form.',
          'Avoid fighting Mega Gnar — back off when his rage is high.',
        ],
        runes: {
          primaryTree: 'Precision',
          primaryKeystones: ['Conqueror', 'Triumph', 'Legend: Alacrity', 'Last Stand'],
          secondaryTree: 'Resolve',
          secondaryRunes: ['Second Wind', 'Overgrowth'],
          shards: ['Attack Speed', 'Adaptive Force', 'Health'],
        },
        items: {
          start: ["Doran's Shield", 'Health Potion'],
          core: ['Blade of the Ruined King', 'Infinity Edge', "Death's Dance"],
          boots: ['Mercury\'s Treads'],
          situational: ["Sterak's Gage", 'Guardian Angel', 'Mortal Reminder'],
        },
      },
    ],
  },

  /* ================================================================ */
  /*  GRAGAS                                                          */
  /* ================================================================ */
  Gragas: {
    counters: [
      {
        id: 'Mordekaiser',
        score: 8,
        reason:
          'Mordekaiser traps Gragas in Death Realm where he cannot escape with E bodyslam. Morde\'s sustained damage wins the 1v1.',
        winCondition:
          'Poke with Q, pull with E, then R him into Death Realm for an isolated 1v1 he cannot win.',
        tips: [
          'His E bodyslam is predictable — dodge it, then pull him with your E.',
          'In Death Realm he has no team to help and your passive shreds him.',
          'Riftmaker sustain keeps you healthy through his barrel poke.',
        ],
        runes: {
          primaryTree: 'Precision',
          primaryKeystones: ['Conqueror', 'Triumph', 'Legend: Tenacity', 'Last Stand'],
          secondaryTree: 'Resolve',
          secondaryRunes: ['Second Wind', 'Overgrowth'],
          shards: ['Adaptive Force', 'Adaptive Force', 'Health'],
        },
        items: {
          start: ["Doran's Shield", 'Health Potion'],
          core: ['Riftmaker', "Rylai's Crystal Scepter", "Zhonya's Hourglass"],
          boots: ['Mercury\'s Treads'],
          situational: ['Morellonomicon', "Rabadon's Deathcap", 'Cosmic Drive'],
        },
      },
      {
        id: 'Yone',
        score: 7,
        reason:
          'Yone can dodge Gragas abilities with E snap-back and out-DPS him in extended trades with Lethal Tempo.',
        winCondition:
          'E forward to trade, snap back to safety. After two items your sustained damage beats his burst.',
        tips: [
          'E in for trades then snap back before he can bodyslam you.',
          'Your Q3 knock-up sets up a full combo he cannot escape.',
          'Blade of the Ruined King shreds his health in extended fights.',
        ],
        runes: {
          primaryTree: 'Precision',
          primaryKeystones: ['Lethal Tempo', 'Triumph', 'Legend: Alacrity', 'Last Stand'],
          secondaryTree: 'Resolve',
          secondaryRunes: ['Second Wind', 'Overgrowth'],
          shards: ['Attack Speed', 'Adaptive Force', 'Magic Resist'],
        },
        items: {
          start: ["Doran's Blade", 'Health Potion'],
          core: ['Blade of the Ruined King', 'Infinity Edge', "Death's Dance"],
          boots: ['Mercury\'s Treads'],
          situational: ["Sterak's Gage", 'Maw of Malmortius', "Wit's End"],
        },
      },
      {
        id: 'Gwen',
        score: 7,
        reason:
          'Gwen W blocks all of Gragas abilities from outside, and her center Q shreds his HP.',
        winCondition:
          'W his barrel Q, then trade with center Q. Riftmaker sustain wins the war of attrition.',
        tips: [
          'W makes his Q barrels useless from range — he has to walk into your mist.',
          'Stack Q on minions then trade with full-stack center Q for huge damage.',
          'You outscale him hard in side lane.',
        ],
        runes: {
          primaryTree: 'Precision',
          primaryKeystones: ['Conqueror', 'Triumph', 'Legend: Alacrity', 'Last Stand'],
          secondaryTree: 'Resolve',
          secondaryRunes: ['Second Wind', 'Overgrowth'],
          shards: ['Attack Speed', 'Adaptive Force', 'Magic Resist'],
        },
        items: {
          start: ["Doran's Blade", 'Health Potion'],
          core: ['Riftmaker', "Nashor's Tooth", 'Cosmic Drive'],
          boots: ['Mercury\'s Treads'],
          situational: ["Zhonya's Hourglass", "Rabadon's Deathcap", 'Morellonomicon'],
        },
      },
    ],
  },

  /* ================================================================ */
  /*  GWEN                                                            */
  /* ================================================================ */
  Gwen: {
    counters: [
      {
        id: 'Irelia',
        score: 8,
        reason:
          'Irelia can all-in Gwen early before she scales and dash through her W mist to negate its protection.',
        winCondition:
          'Stack passive on minions, dash into her mist, and all-in. She is weak early and you burst her before she can stack Q.',
        tips: [
          'Engage early — Gwen needs items to come online.',
          'Dash into her W mist with Q so her protection is useless.',
          'Blade of the Ruined King rush gives you overwhelming early DPS.',
        ],
        runes: {
          primaryTree: 'Precision',
          primaryKeystones: ['Conqueror', 'Triumph', 'Legend: Alacrity', 'Last Stand'],
          secondaryTree: 'Resolve',
          secondaryRunes: ['Bone Plating', 'Overgrowth'],
          shards: ['Attack Speed', 'Adaptive Force', 'Health'],
        },
        items: {
          start: ["Doran's Blade", 'Health Potion'],
          core: ['Blade of the Ruined King', 'Trinity Force', "Sterak's Gage"],
          boots: ['Mercury\'s Treads'],
          situational: ["Death's Dance", "Wit's End", 'Guardian Angel'],
        },
      },
      {
        id: 'Jax',
        score: 7,
        reason:
          'Jax Counter Strike dodges Gwen\'s auto attacks and his scaling matches hers. He wins extended duels with passive stacking.',
        winCondition:
          'Activate E to block her autos, stun, trade, then back off. You outscale and split-push better.',
        tips: [
          'Counter Strike blocks her auto-attack-based damage in trades.',
          'Jump onto her when her Q is on cooldown.',
          'After Trinity Force you can duel her at any point.',
        ],
        runes: {
          primaryTree: 'Precision',
          primaryKeystones: ['Conqueror', 'Triumph', 'Legend: Alacrity', 'Last Stand'],
          secondaryTree: 'Resolve',
          secondaryRunes: ['Bone Plating', 'Overgrowth'],
          shards: ['Attack Speed', 'Adaptive Force', 'Health'],
        },
        items: {
          start: ["Doran's Blade", 'Health Potion'],
          core: ['Trinity Force', 'Blade of the Ruined King', "Sterak's Gage"],
          boots: ['Mercury\'s Treads'],
          situational: ["Death's Dance", "Wit's End", 'Guardian Angel'],
        },
      },
      {
        id: 'Camille',
        score: 7,
        reason:
          'Camille Q2 true damage ignores Gwen\'s armor and MR, and hookshot lets her engage on her own terms.',
        winCondition:
          'Short trade with Q1-auto-Q2 then disengage. After level 6, R locks her down for a kill.',
        tips: [
          'Your Q2 true damage is the key — Gwen stacks no defensive stats early.',
          'Hookshot into her, trade, then E out before she can full-stack Q.',
          'R locks her inside with you where your burst wins.',
        ],
        runes: {
          primaryTree: 'Precision',
          primaryKeystones: ['Conqueror', 'Triumph', 'Legend: Alacrity', 'Last Stand'],
          secondaryTree: 'Resolve',
          secondaryRunes: ['Bone Plating', 'Overgrowth'],
          shards: ['Adaptive Force', 'Adaptive Force', 'Health'],
        },
        items: {
          start: ["Doran's Blade", 'Health Potion'],
          core: ['Trinity Force', 'Ravenous Hydra', "Sterak's Gage"],
          boots: ['Mercury\'s Treads'],
          situational: ["Death's Dance", 'Guardian Angel', 'Hullbreaker'],
        },
      },
    ],
  },

  /* ================================================================ */
  /*  HEIMERDINGER                                                    */
  /* ================================================================ */
  Heimerdinger: {
    counters: [
      {
        id: 'Irelia',
        score: 9,
        reason:
          'Irelia Q resets on Heimerdinger turrets, giving her free dashes to gap close and kill him.',
        winCondition:
          'Q through his turrets to stack passive and close the gap. Each turret kill gives a Q reset.',
        tips: [
          'His turrets give you free Q resets — use them as stepping stones.',
          'Once you dash in with full stacks, he dies instantly.',
          'Buy early Hexdrinker if you struggle with his poke.',
        ],
        runes: {
          primaryTree: 'Precision',
          primaryKeystones: ['Conqueror', 'Triumph', 'Legend: Tenacity', 'Last Stand'],
          secondaryTree: 'Resolve',
          secondaryRunes: ['Second Wind', 'Unflinching'],
          shards: ['Attack Speed', 'Adaptive Force', 'Magic Resist'],
        },
        items: {
          start: ["Doran's Shield", 'Health Potion'],
          core: ['Blade of the Ruined King', "Wit's End", "Sterak's Gage"],
          boots: ['Mercury\'s Treads'],
          situational: ['Maw of Malmortius', "Death's Dance", 'Guardian Angel'],
        },
      },
      {
        id: 'Yasuo',
        score: 8,
        reason:
          'Yasuo Windwall blocks Heimer rockets and his E dashes let him navigate through turrets to reach Heimer.',
        winCondition:
          'Windwall his W rockets, dash through turrets with E, and all-in with knock-up combo.',
        tips: [
          'Windwall blocks his W rocket barrage entirely.',
          'E dash through his turrets to close distance.',
          'His turrets give you E dash targets to be hyper-mobile in lane.',
        ],
        runes: {
          primaryTree: 'Precision',
          primaryKeystones: ['Conqueror', 'Triumph', 'Legend: Tenacity', 'Last Stand'],
          secondaryTree: 'Resolve',
          secondaryRunes: ['Second Wind', 'Overgrowth'],
          shards: ['Attack Speed', 'Adaptive Force', 'Magic Resist'],
        },
        items: {
          start: ["Doran's Shield", 'Health Potion'],
          core: ['Blade of the Ruined King', 'Infinity Edge', "Death's Dance"],
          boots: ['Mercury\'s Treads'],
          situational: ['Maw of Malmortius', "Sterak's Gage", "Wit's End"],
        },
      },
      {
        id: 'Sion',
        score: 7,
        reason:
          'Sion can clear Heimer turrets with Q and E, scales into a tank that ignores his damage, and has great roaming.',
        winCondition:
          'Clear his turrets with Q, push wave with E, and outscale. You are far more useful in team fights.',
        tips: [
          'E the minion wave through his turrets to clear them.',
          'Charged Q destroys his turrets and zones him.',
          'Build MR early and his damage becomes irrelevant.',
        ],
        runes: {
          primaryTree: 'Resolve',
          primaryKeystones: ['Grasp of the Undying', 'Demolish', 'Second Wind', 'Overgrowth'],
          secondaryTree: 'Sorcery',
          secondaryRunes: ['Manaflow Band', 'Scorch'],
          shards: ['Ability Haste', 'Adaptive Force', 'Magic Resist'],
        },
        items: {
          start: ["Doran's Shield", 'Health Potion'],
          core: ['Hollow Radiance', 'Force of Nature', 'Titanic Hydra'],
          boots: ['Mercury\'s Treads'],
          situational: ['Spirit Visage', "Randuin's Omen", 'Thornmail'],
        },
      },
    ],
  },

  /* ================================================================ */
  /*  ILLAOI                                                          */
  /* ================================================================ */
  Illaoi: {
    counters: [
      {
        id: 'Mordekaiser',
        score: 9,
        reason:
          'Mordekaiser R pulls Illaoi into Death Realm without her tentacles. She loses her entire kit in the shadow realm.',
        winCondition:
          'Ult her into Death Realm after she uses her R. Without tentacles she is completely helpless.',
        tips: [
          'Wait for her to R, then immediately R her — her tentacles stay in the real world.',
          'She has zero damage without tentacles in Death Realm.',
          'Dodge her E soul grab — if she hits it, disengage until the debuff expires.',
        ],
        runes: {
          primaryTree: 'Precision',
          primaryKeystones: ['Conqueror', 'Triumph', 'Legend: Tenacity', 'Last Stand'],
          secondaryTree: 'Resolve',
          secondaryRunes: ['Second Wind', 'Overgrowth'],
          shards: ['Adaptive Force', 'Adaptive Force', 'Health'],
        },
        items: {
          start: ["Doran's Shield", 'Health Potion'],
          core: ['Riftmaker', "Rylai's Crystal Scepter", "Zhonya's Hourglass"],
          boots: ['Mercury\'s Treads'],
          situational: ['Morellonomicon', "Rabadon's Deathcap", 'Cosmic Drive'],
        },
      },
      {
        id: 'Vayne',
        score: 8,
        reason:
          'Vayne kites Illaoi, dodges tentacles with tumble, and condemns her away if she ever gets close.',
        winCondition:
          'Tumble sideways to dodge tentacles, proc Silver Bolts, and condemn her if she walks at you. Never stand near walls.',
        tips: [
          'Tumble dodges both her Q and tentacle slams easily.',
          'Stay away from walls to avoid getting E pulled into a bad position.',
          'Her R is useless if you just walk away — she needs you in melee.',
        ],
        runes: {
          primaryTree: 'Precision',
          primaryKeystones: ['Press the Attack', 'Triumph', 'Legend: Alacrity', 'Cut Down'],
          secondaryTree: 'Resolve',
          secondaryRunes: ['Bone Plating', 'Overgrowth'],
          shards: ['Attack Speed', 'Adaptive Force', 'Health'],
        },
        items: {
          start: ["Doran's Blade", 'Health Potion'],
          core: ['Blade of the Ruined King', 'Phantom Dancer', 'Infinity Edge'],
          boots: ['Boots of Swiftness'],
          situational: ['Mortal Reminder', 'Guardian Angel', "Wit's End"],
        },
      },
      {
        id: 'Gnar',
        score: 7,
        reason:
          'Gnar pokes Illaoi from range in Mini form and can hop away from tentacles. He outscales in team fights.',
        winCondition:
          'Poke from range as Mini Gnar, dodge her E with your hop, and team fight better with Mega Gnar R.',
        tips: [
          'Your hop dodges her E grab — save it for that.',
          'Never fight her in melee as Mini Gnar inside her tentacles.',
          'Mega Gnar R is far better in team fights than her kit.',
        ],
        runes: {
          primaryTree: 'Precision',
          primaryKeystones: ['Fleet Footwork', 'Triumph', 'Legend: Alacrity', 'Last Stand'],
          secondaryTree: 'Resolve',
          secondaryRunes: ['Second Wind', 'Overgrowth'],
          shards: ['Attack Speed', 'Adaptive Force', 'Health'],
        },
        items: {
          start: ["Doran's Blade", 'Health Potion'],
          core: ['Trinity Force', 'Black Cleaver', "Sterak's Gage"],
          boots: ['Plated Steelcaps'],
          situational: ["Death's Dance", 'Maw of Malmortius', 'Guardian Angel'],
        },
      },
    ],
  },

  /* ================================================================ */
  /*  IRELIA                                                          */
  /* ================================================================ */
  Irelia: {
    counters: [
      {
        id: 'Jax',
        score: 8,
        reason:
          'Jax Counter Strike blocks Irelia\'s auto-attack-reliant damage and his stun wins every short trade.',
        winCondition:
          'E when she dashes in, stun, trade, disengage. After Trinity Force you beat her at every stage.',
        tips: [
          'Counter Strike blocks her empowered auto attacks from passive stacking.',
          'Wait for her to use Q aggressively then jump on her with no escape.',
          'You outscale her in split push — be patient.',
        ],
        runes: {
          primaryTree: 'Precision',
          primaryKeystones: ['Conqueror', 'Triumph', 'Legend: Alacrity', 'Last Stand'],
          secondaryTree: 'Resolve',
          secondaryRunes: ['Bone Plating', 'Overgrowth'],
          shards: ['Attack Speed', 'Adaptive Force', 'Health'],
        },
        items: {
          start: ["Doran's Blade", 'Health Potion'],
          core: ['Trinity Force', 'Blade of the Ruined King', "Sterak's Gage"],
          boots: ['Plated Steelcaps'],
          situational: ["Death's Dance", "Wit's End", 'Guardian Angel'],
        },
      },
      {
        id: 'Volibear',
        score: 8,
        reason:
          'Volibear out-trades Irelia with raw base stats and his passive stacking. His E shield absorbs her burst.',
        winCondition:
          'Run at her with Q, auto-stack passive, bite twice with W. She cannot match your raw stats early.',
        tips: [
          'Your passive stacking DPS matches or exceeds hers.',
          'E shield absorbs a significant chunk of her all-in damage.',
          'W second bite heals you substantially in the all-in.',
        ],
        runes: {
          primaryTree: 'Precision',
          primaryKeystones: ['Conqueror', 'Triumph', 'Legend: Alacrity', 'Last Stand'],
          secondaryTree: 'Resolve',
          secondaryRunes: ['Bone Plating', 'Unflinching'],
          shards: ['Attack Speed', 'Adaptive Force', 'Health'],
        },
        items: {
          start: ["Doran's Blade", 'Health Potion'],
          core: ['Blade of the Ruined King', 'Trinity Force', "Death's Dance"],
          boots: ['Plated Steelcaps'],
          situational: ["Sterak's Gage", "Wit's End", 'Spirit Visage'],
        },
      },
      {
        id: 'Tryndamere',
        score: 7,
        reason:
          'Tryndamere can out-sustain Irelia in extended trades and his R makes her unable to finish him off in all-ins.',
        winCondition:
          'Build fury, all-in with crits, and R when low to keep fighting. She cannot burst through your ult.',
        tips: [
          'Build up fury before engaging for crit chance.',
          'Your R lets you keep fighting when she would otherwise kill you.',
          'E away if she has full passive stacks and you have no fury.',
        ],
        runes: {
          primaryTree: 'Precision',
          primaryKeystones: ['Lethal Tempo', 'Triumph', 'Legend: Alacrity', 'Last Stand'],
          secondaryTree: 'Resolve',
          secondaryRunes: ['Bone Plating', 'Unflinching'],
          shards: ['Attack Speed', 'Adaptive Force', 'Health'],
        },
        items: {
          start: ["Doran's Blade", 'Health Potion'],
          core: ['Blade of the Ruined King', 'Infinity Edge', 'Phantom Dancer'],
          boots: ['Plated Steelcaps'],
          situational: ['Ravenous Hydra', "Death's Dance", 'Hullbreaker'],
        },
      },
    ],
  },

  /* ================================================================ */
  /*  JAX                                                             */
  /* ================================================================ */
  Jax: {
    counters: [
      {
        id: 'Malphite',
        score: 8,
        reason:
          'Malphite stacks armor, slows Jax attack speed with E, and pokes with Q from range. Jax cannot auto-attack effectively.',
        winCondition:
          'Stack armor, E his autos, Q poke from range. He is useless against your armor stacking and team-fight R.',
        tips: [
          'E attack speed slow makes his auto-attack DPS meaningless.',
          'Q poke chunks him and he cannot trade back from range.',
          'You outperform him massively in team fights with R engage.',
        ],
        runes: {
          primaryTree: 'Resolve',
          primaryKeystones: ['Grasp of the Undying', 'Shield Bash', 'Conditioning', 'Overgrowth'],
          secondaryTree: 'Sorcery',
          secondaryRunes: ['Manaflow Band', 'Scorch'],
          shards: ['Ability Haste', 'Adaptive Force', 'Armor'],
        },
        items: {
          start: ["Doran's Ring", 'Health Potion', 'Health Potion'],
          core: ['Hollow Radiance', 'Thornmail', "Randuin's Omen"],
          boots: ['Plated Steelcaps'],
          situational: ["Jak'Sho, the Protean", 'Spirit Visage', 'Force of Nature'],
        },
      },
      {
        id: 'Garen',
        score: 7,
        reason:
          'Garen silences Jax before he can activate Counter Strike and spins through his E duration.',
        winCondition:
          'Q silence him when he activates E, spin on him, and R execute. Your passive regen sustains through his poke.',
        tips: [
          'Silence him during Counter Strike so he cannot reactivate it for the stun.',
          'Spin damage continues even during his Counter Strike.',
          'Your passive regen keeps you healthy between trades.',
        ],
        runes: {
          primaryTree: 'Precision',
          primaryKeystones: ['Conqueror', 'Triumph', 'Legend: Tenacity', 'Last Stand'],
          secondaryTree: 'Resolve',
          secondaryRunes: ['Bone Plating', 'Overgrowth'],
          shards: ['Adaptive Force', 'Adaptive Force', 'Health'],
        },
        items: {
          start: ["Doran's Blade", 'Health Potion'],
          core: ['Stridebreaker', 'Black Cleaver', "Death's Dance"],
          boots: ['Plated Steelcaps'],
          situational: ["Sterak's Gage", 'Mortal Reminder', 'Hullbreaker'],
        },
      },
      {
        id: 'Illaoi',
        score: 7,
        reason:
          'Illaoi\'s tentacle slam damage is not blocked by Counter Strike and her healing out-sustains his DPS.',
        winCondition:
          'Land E soul grab, slam with tentacles. His Counter Strike only blocks autos, not your tentacle slams.',
        tips: [
          'Your Q and tentacle slams are ability damage — his E does not block them.',
          'Hit E then combo with tentacles for free damage on his spirit.',
          'R and stand your ground when he engages — your healing wins.',
        ],
        runes: {
          primaryTree: 'Precision',
          primaryKeystones: ['Conqueror', 'Triumph', 'Legend: Tenacity', 'Last Stand'],
          secondaryTree: 'Resolve',
          secondaryRunes: ['Bone Plating', 'Overgrowth'],
          shards: ['Adaptive Force', 'Adaptive Force', 'Health'],
        },
        items: {
          start: ["Doran's Blade", 'Health Potion'],
          core: ['Black Cleaver', "Sterak's Gage", "Death's Dance"],
          boots: ['Plated Steelcaps'],
          situational: ['Ravenous Hydra', 'Hullbreaker', 'Guardian Angel'],
        },
      },
    ],
  },

  /* ================================================================ */
  /*  JAYCE                                                           */
  /* ================================================================ */
  Jayce: {
    counters: [
      {
        id: 'Irelia',
        score: 8,
        reason:
          'Irelia dashes onto Jayce through minions, negating his range advantage. She wins every all-in once stacked.',
        winCondition:
          'Stack passive on minions, dash in, and all-in. He is squishy and loses every melee trade.',
        tips: [
          'Wait for him to use his melee E knockback, then engage.',
          'Q to a low caster minion near him for a free gap close.',
          'After Blade of the Ruined King you run him down.',
        ],
        runes: {
          primaryTree: 'Precision',
          primaryKeystones: ['Conqueror', 'Triumph', 'Legend: Alacrity', 'Last Stand'],
          secondaryTree: 'Resolve',
          secondaryRunes: ['Second Wind', 'Unflinching'],
          shards: ['Attack Speed', 'Adaptive Force', 'Health'],
        },
        items: {
          start: ["Doran's Shield", 'Health Potion'],
          core: ['Blade of the Ruined King', 'Trinity Force', "Sterak's Gage"],
          boots: ['Plated Steelcaps'],
          situational: ["Death's Dance", "Wit's End", 'Guardian Angel'],
        },
      },
      {
        id: 'Wukong',
        score: 7,
        reason:
          'Wukong can gap close with E, clone to dodge Jayce abilities, and all-in with double R knock-up.',
        winCondition:
          'E dash in, trade, W clone out. At level 6 your double R is devastating against a squishy Jayce.',
        tips: [
          'W clone dodges his shock blast and makes trades free.',
          'E gives you a gapcloser that matches his melee knockback range.',
          'After level 6 your R all-in kills him easily.',
        ],
        runes: {
          primaryTree: 'Precision',
          primaryKeystones: ['Conqueror', 'Triumph', 'Legend: Alacrity', 'Last Stand'],
          secondaryTree: 'Resolve',
          secondaryRunes: ['Second Wind', 'Overgrowth'],
          shards: ['Adaptive Force', 'Adaptive Force', 'Health'],
        },
        items: {
          start: ["Doran's Shield", 'Health Potion'],
          core: ['Trinity Force', 'Black Cleaver', "Sterak's Gage"],
          boots: ['Plated Steelcaps'],
          situational: ["Death's Dance", 'Guardian Angel', 'Hullbreaker'],
        },
      },
      {
        id: 'Camille',
        score: 7,
        reason:
          'Camille can hookshot in from outside his poke range and burst him with Q2 true damage.',
        winCondition:
          'Wait for him to waste abilities on wave, then E-hookshot in for a Q1-Q2 trade. He is squishy enough to burst.',
        tips: [
          'Hookshot from max range to avoid his poke.',
          'Your passive shield absorbs his poke on engage.',
          'His melee knockback can interrupt hookshot — bait it out first.',
        ],
        runes: {
          primaryTree: 'Precision',
          primaryKeystones: ['Conqueror', 'Triumph', 'Legend: Alacrity', 'Last Stand'],
          secondaryTree: 'Resolve',
          secondaryRunes: ['Second Wind', 'Overgrowth'],
          shards: ['Adaptive Force', 'Adaptive Force', 'Health'],
        },
        items: {
          start: ["Doran's Shield", 'Health Potion'],
          core: ['Trinity Force', 'Ravenous Hydra', "Sterak's Gage"],
          boots: ['Plated Steelcaps'],
          situational: ["Death's Dance", 'Guardian Angel', 'Hullbreaker'],
        },
      },
    ],
  },

  /* ================================================================ */
  /*  K'SANTE                                                        */
  /* ================================================================ */
  KSante: {
    counters: [
      {
        id: 'Fiora',
        score: 8,
        reason:
          'Fiora can Riposte K\'Sante\'s W knock-up and her vital procs shred his tank stats.',
        winCondition:
          'Parry his W for a guaranteed stun, then proc vitals. He cannot trade back effectively.',
        tips: [
          'Save Riposte for his W charge — the timing is very telegraphed.',
          'His large model makes proccing vitals easy.',
          'After Trinity Force you duel him easily in side lane.',
        ],
        runes: {
          primaryTree: 'Precision',
          primaryKeystones: ['Conqueror', 'Triumph', 'Legend: Alacrity', 'Last Stand'],
          secondaryTree: 'Resolve',
          secondaryRunes: ['Bone Plating', 'Overgrowth'],
          shards: ['Adaptive Force', 'Adaptive Force', 'Health'],
        },
        items: {
          start: ["Doran's Blade", 'Health Potion'],
          core: ['Trinity Force', 'Ravenous Hydra', "Sterak's Gage"],
          boots: ['Mercury\'s Treads'],
          situational: ["Death's Dance", 'Maw of Malmortius', 'Guardian Angel'],
        },
      },
      {
        id: 'Gwen',
        score: 7,
        reason:
          'Gwen W blocks his abilities from outside and her percent HP damage shreds his tank build.',
        winCondition:
          'W his poke, stack Q, and trade with center Q for percent HP damage. You outscale him in side lane.',
        tips: [
          'W mist blocks his Q poke and W from outside.',
          'Center Q does massive damage against his HP stacking.',
          'Riftmaker sustain keeps you even in extended trades.',
        ],
        runes: {
          primaryTree: 'Precision',
          primaryKeystones: ['Conqueror', 'Triumph', 'Legend: Alacrity', 'Last Stand'],
          secondaryTree: 'Resolve',
          secondaryRunes: ['Bone Plating', 'Overgrowth'],
          shards: ['Attack Speed', 'Adaptive Force', 'Health'],
        },
        items: {
          start: ["Doran's Blade", 'Health Potion'],
          core: ['Riftmaker', "Nashor's Tooth", 'Cosmic Drive'],
          boots: ['Mercury\'s Treads'],
          situational: ["Zhonya's Hourglass", "Rabadon's Deathcap", 'Morellonomicon'],
        },
      },
      {
        id: 'Vayne',
        score: 7,
        reason:
          'Vayne Silver Bolts true damage ignores K\'Sante tank stats and she kites him easily with tumble.',
        winCondition:
          'Kite with tumble, proc Silver Bolts, and condemn him away. His tank stats mean nothing against true damage.',
        tips: [
          'Tumble his Q poke and stay at max range.',
          'Condemn him into wall for huge burst windows.',
          'His R changes him to a fighter but he is still kitable.',
        ],
        runes: {
          primaryTree: 'Precision',
          primaryKeystones: ['Press the Attack', 'Triumph', 'Legend: Alacrity', 'Cut Down'],
          secondaryTree: 'Resolve',
          secondaryRunes: ['Bone Plating', 'Overgrowth'],
          shards: ['Attack Speed', 'Adaptive Force', 'Health'],
        },
        items: {
          start: ["Doran's Blade", 'Health Potion'],
          core: ['Blade of the Ruined King', 'Guinsoo\'s Rageblade', 'Phantom Dancer'],
          boots: ['Boots of Swiftness'],
          situational: ['Mortal Reminder', 'Guardian Angel', "Wit's End"],
        },
      },
    ],
  },

  /* ================================================================ */
  /*  KAYLE                                                           */
  /* ================================================================ */
  Kayle: {
    counters: [
      {
        id: 'Irelia',
        score: 9,
        reason:
          'Irelia all-ins Kayle repeatedly before she reaches level 6 and ranged form. Kayle has no tools to survive.',
        winCondition:
          'Stack passive, all-in levels 1-5. Kill her over and over before she ever becomes ranged.',
        tips: [
          'Her levels 1-5 are the weakest in the game — abuse this window.',
          'Q through her minions to dash in and kill her.',
          'Even after 6, your all-in still beats hers if you have stacked passive.',
        ],
        runes: {
          primaryTree: 'Precision',
          primaryKeystones: ['Conqueror', 'Triumph', 'Legend: Alacrity', 'Last Stand'],
          secondaryTree: 'Resolve',
          secondaryRunes: ['Bone Plating', 'Overgrowth'],
          shards: ['Attack Speed', 'Adaptive Force', 'Health'],
        },
        items: {
          start: ["Doran's Blade", 'Health Potion'],
          core: ['Blade of the Ruined King', 'Trinity Force', "Sterak's Gage"],
          boots: ['Mercury\'s Treads'],
          situational: ["Death's Dance", "Wit's End", 'Guardian Angel'],
        },
      },
      {
        id: 'Pantheon',
        score: 8,
        reason:
          'Pantheon point-and-click stun and burst combo destroys Kayle early. She cannot farm or survive his aggression.',
        winCondition:
          'W-stun, empowered Q, auto combo kills her from 70% HP. Zone her off every CS.',
        tips: [
          'Emp W into empowered Q is a guaranteed kill combo at level 3.',
          'She cannot block your targeted stun — it always lands.',
          'Push and roam with R after level 6 to spread your lead.',
        ],
        runes: {
          primaryTree: 'Precision',
          primaryKeystones: ['Press the Attack', 'Triumph', 'Legend: Tenacity', 'Last Stand'],
          secondaryTree: 'Domination',
          secondaryRunes: ['Sudden Impact', 'Treasure Hunter'],
          shards: ['Adaptive Force', 'Adaptive Force', 'Armor'],
        },
        items: {
          start: ["Doran's Blade", 'Health Potion'],
          core: ['Eclipse', 'Black Cleaver', "Death's Dance"],
          boots: ['Mercury\'s Treads'],
          situational: ['Maw of Malmortius', 'Guardian Angel', 'Hullbreaker'],
        },
      },
      {
        id: 'Camille',
        score: 7,
        reason:
          'Camille can dive Kayle with hookshot and ult, preventing her from safely farming to her scaling breakpoints.',
        winCondition:
          'E-hookshot onto her, short trade Q1-Q2, and at 6 R-lock her down for a guaranteed kill.',
        tips: [
          'Hookshot reaches her even when she plays far back.',
          'Hextech Ultimatum prevents her from running away.',
          'Her R invulnerability counters your burst, so bait it with Q1 then wait for Q2.',
        ],
        runes: {
          primaryTree: 'Precision',
          primaryKeystones: ['Conqueror', 'Triumph', 'Legend: Alacrity', 'Last Stand'],
          secondaryTree: 'Resolve',
          secondaryRunes: ['Bone Plating', 'Overgrowth'],
          shards: ['Adaptive Force', 'Adaptive Force', 'Health'],
        },
        items: {
          start: ["Doran's Blade", 'Health Potion'],
          core: ['Trinity Force', 'Ravenous Hydra', "Sterak's Gage"],
          boots: ['Mercury\'s Treads'],
          situational: ["Death's Dance", 'Guardian Angel', 'Hullbreaker'],
        },
      },
    ],
  },

  /* ================================================================ */
  /*  KENNEN                                                          */
  /* ================================================================ */
  Kennen: {
    counters: [
      {
        id: 'Irelia',
        score: 8,
        reason:
          'Irelia dashes through minions to reach Kennen and all-ins him. His range advantage is useless against her mobility.',
        winCondition:
          'Stack passive on minions, dash in, and burst him. He is squishy and dies to a full-stack combo.',
        tips: [
          'Q through minions to close the gap before he can E away.',
          'His E lightning rush is his only escape — bait it out then re-engage.',
          'Mercury\'s Treads reduce his stun CC duration.',
        ],
        runes: {
          primaryTree: 'Precision',
          primaryKeystones: ['Conqueror', 'Triumph', 'Legend: Tenacity', 'Last Stand'],
          secondaryTree: 'Resolve',
          secondaryRunes: ['Second Wind', 'Unflinching'],
          shards: ['Attack Speed', 'Adaptive Force', 'Magic Resist'],
        },
        items: {
          start: ["Doran's Shield", 'Health Potion'],
          core: ['Blade of the Ruined King', "Wit's End", "Sterak's Gage"],
          boots: ['Mercury\'s Treads'],
          situational: ['Maw of Malmortius', "Death's Dance", 'Guardian Angel'],
        },
      },
      {
        id: 'Sylas',
        score: 8,
        reason:
          'Sylas steals Kennen\'s powerful R for his own use and his burst combo with E engage kills Kennen easily.',
        winCondition:
          'Engage with E, burst with Q-W, and steal his R for team fights. His R is better on you than on him.',
        tips: [
          'E2 dash closes the gap and he cannot escape.',
          'Stealing his R gives you one of the best team-fight ults in the game.',
          'W heal sustains through his poke.',
        ],
        runes: {
          primaryTree: 'Precision',
          primaryKeystones: ['Conqueror', 'Triumph', 'Legend: Tenacity', 'Last Stand'],
          secondaryTree: 'Resolve',
          secondaryRunes: ['Second Wind', 'Overgrowth'],
          shards: ['Adaptive Force', 'Adaptive Force', 'Magic Resist'],
        },
        items: {
          start: ["Doran's Ring", 'Health Potion', 'Health Potion'],
          core: ['Iceborn Gauntlet', "Zhonya's Hourglass", 'Frozen Heart'],
          boots: ['Mercury\'s Treads'],
          situational: ['Banshee\'s Veil', 'Cosmic Drive', 'Morellonomicon'],
        },
      },
      {
        id: 'Yasuo',
        score: 7,
        reason:
          'Yasuo Windwall blocks Kennen Q and auto-empowered W. He dashes through minions to reach Kennen easily.',
        winCondition:
          'Windwall his Q, E through wave, and all-in. Your sustained DPS beats his burst.',
        tips: [
          'Windwall blocks his Q shuriken — his main way of proccing stun.',
          'E through minions aggressively to close the gap.',
          'Passive shield absorbs a lot of his poke.',
        ],
        runes: {
          primaryTree: 'Precision',
          primaryKeystones: ['Conqueror', 'Triumph', 'Legend: Tenacity', 'Last Stand'],
          secondaryTree: 'Resolve',
          secondaryRunes: ['Second Wind', 'Overgrowth'],
          shards: ['Attack Speed', 'Adaptive Force', 'Magic Resist'],
        },
        items: {
          start: ["Doran's Shield", 'Health Potion'],
          core: ['Blade of the Ruined King', 'Infinity Edge', "Death's Dance"],
          boots: ['Mercury\'s Treads'],
          situational: ["Sterak's Gage", 'Maw of Malmortius', "Wit's End"],
        },
      },
    ],
  },

  /* ================================================================ */
  /*  KLED                                                            */
  /* ================================================================ */
  Kled: {
    counters: [
      {
        id: 'Fiora',
        score: 8,
        reason:
          'Fiora can Riposte Kled\'s Q pull or R charge for a free stun, and her vitals shred his HP effectively.',
        winCondition:
          'Parry his Q pull or R charge, then all-in with vitals. Once Skaarl drops, he cannot remount against you.',
        tips: [
          'Riposte his Q chain pull — the timing is very telegraphed at the second activation.',
          'Once Skaarl is gone, he has very little HP and you kill him easily.',
          'Do not underestimate his remount — finish him fast.',
        ],
        runes: {
          primaryTree: 'Precision',
          primaryKeystones: ['Conqueror', 'Triumph', 'Legend: Alacrity', 'Last Stand'],
          secondaryTree: 'Resolve',
          secondaryRunes: ['Bone Plating', 'Overgrowth'],
          shards: ['Adaptive Force', 'Adaptive Force', 'Health'],
        },
        items: {
          start: ["Doran's Blade", 'Health Potion'],
          core: ['Trinity Force', 'Ravenous Hydra', "Sterak's Gage"],
          boots: ['Plated Steelcaps'],
          situational: ["Death's Dance", 'Maw of Malmortius', 'Guardian Angel'],
        },
      },
      {
        id: 'Jax',
        score: 7,
        reason:
          'Jax Counter Strike blocks Kled\'s auto-attack-reliant damage pattern and outscales in split push.',
        winCondition:
          'E his autos, stun, short trade. After Trinity Force you win every duel.',
        tips: [
          'Counter Strike blocks his W empowered autos.',
          'Be careful of his level 2 all-in — he is very strong early.',
          'You outscale him hard — play safe until your first item.',
        ],
        runes: {
          primaryTree: 'Precision',
          primaryKeystones: ['Conqueror', 'Triumph', 'Legend: Alacrity', 'Last Stand'],
          secondaryTree: 'Resolve',
          secondaryRunes: ['Bone Plating', 'Overgrowth'],
          shards: ['Attack Speed', 'Adaptive Force', 'Health'],
        },
        items: {
          start: ["Doran's Blade", 'Health Potion'],
          core: ['Trinity Force', 'Blade of the Ruined King', "Sterak's Gage"],
          boots: ['Plated Steelcaps'],
          situational: ["Death's Dance", "Wit's End", 'Guardian Angel'],
        },
      },
      {
        id: 'Mordekaiser',
        score: 7,
        reason:
          'Mordekaiser R removes Skaarl in Death Realm, forcing Kled to fight as a dismounted weakling.',
        winCondition:
          'Poke with Q, then R him into Death Realm. His Skaarl health doesn\'t follow him — he is dismounted and easy to kill.',
        tips: [
          'Death Realm isolates him without Skaarl.',
          'Your sustained damage beats his in a prolonged duel.',
          'Build Riftmaker for sustain that matches his aggression.',
        ],
        runes: {
          primaryTree: 'Precision',
          primaryKeystones: ['Conqueror', 'Triumph', 'Legend: Tenacity', 'Last Stand'],
          secondaryTree: 'Resolve',
          secondaryRunes: ['Bone Plating', 'Overgrowth'],
          shards: ['Adaptive Force', 'Adaptive Force', 'Health'],
        },
        items: {
          start: ["Doran's Shield", 'Health Potion'],
          core: ['Riftmaker', "Rylai's Crystal Scepter", "Zhonya's Hourglass"],
          boots: ['Plated Steelcaps'],
          situational: ['Morellonomicon', "Rabadon's Deathcap", 'Cosmic Drive'],
        },
      },
    ],
  },

  /* ================================================================ */
  /*  MALPHITE                                                        */
  /* ================================================================ */
  Malphite: {
    counters: [
      {
        id: 'Sylas',
        score: 8,
        reason:
          'Sylas steals Malphite\'s incredibly powerful R and deals magic damage that Malphite\'s armor stacking cannot reduce.',
        winCondition:
          'Farm with Q, heal with W, and steal his R. Using his own R against his team is devastating.',
        tips: [
          'His R on you is one of the best ult steals in the game.',
          'W heal sustains through his Q poke.',
          'He stacks armor but your damage is magic — it goes right through.',
        ],
        runes: {
          primaryTree: 'Precision',
          primaryKeystones: ['Conqueror', 'Triumph', 'Legend: Tenacity', 'Last Stand'],
          secondaryTree: 'Resolve',
          secondaryRunes: ['Second Wind', 'Overgrowth'],
          shards: ['Adaptive Force', 'Adaptive Force', 'Health'],
        },
        items: {
          start: ["Doran's Ring", 'Health Potion', 'Health Potion'],
          core: ['Iceborn Gauntlet', "Zhonya's Hourglass", 'Frozen Heart'],
          boots: ['Mercury\'s Treads'],
          situational: ['Banshee\'s Veil', 'Cosmic Drive', 'Morellonomicon'],
        },
      },
      {
        id: 'Gwen',
        score: 8,
        reason:
          'Gwen deals magic damage that ignores Malphite armor stacking, and her W blocks his Q poke.',
        winCondition:
          'W his Q, trade with center Q, and outscale. He stacks armor but you deal magic damage.',
        tips: [
          'Your magic damage bypasses his entire armor stacking strategy.',
          'W blocks his Q poke from outside the mist.',
          'You outscale him massively in side lane.',
        ],
        runes: {
          primaryTree: 'Precision',
          primaryKeystones: ['Conqueror', 'Triumph', 'Legend: Alacrity', 'Last Stand'],
          secondaryTree: 'Resolve',
          secondaryRunes: ['Second Wind', 'Overgrowth'],
          shards: ['Attack Speed', 'Adaptive Force', 'Health'],
        },
        items: {
          start: ["Doran's Blade", 'Health Potion'],
          core: ['Riftmaker', "Nashor's Tooth", 'Cosmic Drive'],
          boots: ['Mercury\'s Treads'],
          situational: ["Zhonya's Hourglass", "Rabadon's Deathcap", 'Morellonomicon'],
        },
      },
      {
        id: 'DrMundo',
        score: 7,
        reason:
          'Dr. Mundo deals magic damage with Q cleavers, has unstoppable passive, and sustains through everything Malphite does.',
        winCondition:
          'Poke with Q, heal with passive and R, and outscale. Malphite cannot kill you and you out-sustain him.',
        tips: [
          'Q cleaver poke deals magic damage — his armor is useless.',
          'Your passive blocks one of his abilities periodically.',
          'You outscale as an unkillable front line.',
        ],
        runes: {
          primaryTree: 'Resolve',
          primaryKeystones: ['Grasp of the Undying', 'Demolish', 'Second Wind', 'Overgrowth'],
          secondaryTree: 'Precision',
          secondaryRunes: ['Triumph', 'Legend: Tenacity'],
          shards: ['Ability Haste', 'Adaptive Force', 'Health'],
        },
        items: {
          start: ["Doran's Shield", 'Health Potion'],
          core: ['Heartsteel', 'Hollow Radiance', 'Spirit Visage'],
          boots: ['Mercury\'s Treads'],
          situational: ['Force of Nature', 'Thornmail', "Randuin's Omen"],
        },
      },
    ],
  },

  /* ================================================================ */
  /*  MAOKAI                                                          */
  /* ================================================================ */
  Maokai: {
    counters: [
      {
        id: 'Fiora',
        score: 8,
        reason:
          'Fiora shreds Maokai with vitals, Ripostes his W root for a free stun, and he cannot match her in side lane.',
        winCondition:
          'Parry his W root for a stun, proc vitals. He has no kill pressure on you and you split push freely.',
        tips: [
          'Riposte his point-and-click W root for a guaranteed stun.',
          'His passive heal is irrelevant when you deal so much damage.',
          'You can split push freely — he needs to be with his team for team fights.',
        ],
        runes: {
          primaryTree: 'Precision',
          primaryKeystones: ['Conqueror', 'Triumph', 'Legend: Alacrity', 'Last Stand'],
          secondaryTree: 'Resolve',
          secondaryRunes: ['Second Wind', 'Overgrowth'],
          shards: ['Adaptive Force', 'Adaptive Force', 'Health'],
        },
        items: {
          start: ["Doran's Blade", 'Health Potion'],
          core: ['Trinity Force', 'Ravenous Hydra', "Sterak's Gage"],
          boots: ['Mercury\'s Treads'],
          situational: ["Death's Dance", 'Hullbreaker', 'Guardian Angel'],
        },
      },
      {
        id: 'Vayne',
        score: 7,
        reason:
          'Vayne percent HP true damage melts Maokai\'s health pool and she kites him easily.',
        winCondition:
          'Kite, proc Silver Bolts, and condemn him away. His passive heal cannot keep up with your DPS.',
        tips: [
          'Silver Bolts true damage ignores his tank stats.',
          'Condemn him into a wall for burst damage.',
          'Dodge his Q with tumble to avoid the knockback.',
        ],
        runes: {
          primaryTree: 'Precision',
          primaryKeystones: ['Press the Attack', 'Triumph', 'Legend: Alacrity', 'Cut Down'],
          secondaryTree: 'Resolve',
          secondaryRunes: ['Bone Plating', 'Overgrowth'],
          shards: ['Attack Speed', 'Adaptive Force', 'Health'],
        },
        items: {
          start: ["Doran's Blade", 'Health Potion'],
          core: ['Blade of the Ruined King', 'Guinsoo\'s Rageblade', 'Phantom Dancer'],
          boots: ['Boots of Swiftness'],
          situational: ['Mortal Reminder', 'Guardian Angel', "Wit's End"],
        },
      },
      {
        id: 'DrMundo',
        score: 7,
        reason:
          'Dr. Mundo out-sustains Maokai with his own healing and deals enough damage with cleavers to pressure him in lane.',
        winCondition:
          'Farm with Q cleavers, heal through his poke, and become an unkillable front line that out-tanks him.',
        tips: [
          'Q poke deals percent HP damage — it chunks him.',
          'Your passive blocks one ability on a cooldown — useful vs his W engage.',
          'You out-sustain him and outscale as a tank.',
        ],
        runes: {
          primaryTree: 'Resolve',
          primaryKeystones: ['Grasp of the Undying', 'Demolish', 'Second Wind', 'Overgrowth'],
          secondaryTree: 'Precision',
          secondaryRunes: ['Triumph', 'Legend: Tenacity'],
          shards: ['Ability Haste', 'Adaptive Force', 'Health'],
        },
        items: {
          start: ["Doran's Shield", 'Health Potion'],
          core: ['Heartsteel', 'Hollow Radiance', 'Spirit Visage'],
          boots: ['Mercury\'s Treads'],
          situational: ['Force of Nature', 'Thornmail', "Randuin's Omen"],
        },
      },
    ],
  },

  /* ================================================================ */
  /*  MORDEKAISER                                                     */
  /* ================================================================ */
  Mordekaiser: {
    counters: [
      {
        id: 'Fiora',
        score: 9,
        reason:
          'Fiora Ripostes Morde\'s E pull or R for a free stun. Her vitals shred his HP and she outscales in duels.',
        winCondition:
          'Parry his E or R activation for a stun, then run him down with vitals. You win every 1v1.',
        tips: [
          'Riposte his R activation to completely negate Death Realm.',
          'If R is on cooldown, parry his E pull instead.',
          'His Q is slow and predictable — sidestep it consistently.',
        ],
        runes: {
          primaryTree: 'Precision',
          primaryKeystones: ['Conqueror', 'Triumph', 'Legend: Alacrity', 'Last Stand'],
          secondaryTree: 'Resolve',
          secondaryRunes: ['Bone Plating', 'Overgrowth'],
          shards: ['Adaptive Force', 'Adaptive Force', 'Magic Resist'],
        },
        items: {
          start: ["Doran's Blade", 'Health Potion'],
          core: ['Trinity Force', 'Ravenous Hydra', "Sterak's Gage"],
          boots: ['Mercury\'s Treads'],
          situational: ['Maw of Malmortius', "Death's Dance", 'Guardian Angel'],
        },
      },
      {
        id: 'Vayne',
        score: 8,
        reason:
          'Vayne kites Mordekaiser with tumble and condemn, and Silver Bolts true damage melts him.',
        winCondition:
          'Kite backwards, proc Silver Bolts, and condemn into a wall. Even in Death Realm you out-DPS him.',
        tips: [
          'Tumble his Q — it is his main damage source.',
          'Condemn into wall for huge burst, even inside Death Realm.',
          'QSS removes his Death Realm entirely — buy it second or third item.',
        ],
        runes: {
          primaryTree: 'Precision',
          primaryKeystones: ['Press the Attack', 'Triumph', 'Legend: Alacrity', 'Cut Down'],
          secondaryTree: 'Resolve',
          secondaryRunes: ['Bone Plating', 'Overgrowth'],
          shards: ['Attack Speed', 'Adaptive Force', 'Health'],
        },
        items: {
          start: ["Doran's Blade", 'Health Potion'],
          core: ['Blade of the Ruined King', 'Phantom Dancer', 'Infinity Edge'],
          boots: ['Boots of Swiftness'],
          situational: ['Quicksilver Sash', 'Guardian Angel', 'Mortal Reminder'],
        },
      },
      {
        id: 'Gwen',
        score: 7,
        reason:
          'Gwen W blocks Morde abilities from outside the mist and her percent HP damage shreds him in extended fights.',
        winCondition:
          'W his E pull, trade with center Q, and outscale. In Death Realm your sustained DPS wins the 1v1.',
        tips: [
          'W blocks his E pull from outside the mist.',
          'Center Q does massive damage against his HP pool.',
          'Even in Death Realm, your DPS and healing win.',
        ],
        runes: {
          primaryTree: 'Precision',
          primaryKeystones: ['Conqueror', 'Triumph', 'Legend: Alacrity', 'Last Stand'],
          secondaryTree: 'Resolve',
          secondaryRunes: ['Bone Plating', 'Overgrowth'],
          shards: ['Attack Speed', 'Adaptive Force', 'Magic Resist'],
        },
        items: {
          start: ["Doran's Blade", 'Health Potion'],
          core: ['Riftmaker', "Nashor's Tooth", 'Cosmic Drive'],
          boots: ['Mercury\'s Treads'],
          situational: ["Zhonya's Hourglass", "Rabadon's Deathcap", 'Morellonomicon'],
        },
      },
    ],
  },

  /* ================================================================ */
  /*  NASUS                                                           */
  /* ================================================================ */
  Nasus: {
    counters: [
      {
        id: 'Darius',
        score: 9,
        reason:
          'Darius zones Nasus off every minion with his oppressive early game and can kill him repeatedly before he stacks.',
        winCondition:
          'Freeze near your tower, zone him off every Q stack, and kill him whenever he walks up. He will never scale if you deny stacks.',
        tips: [
          'Freeze the wave and punish every CS attempt with auto-W-Q combo.',
          'Ghost lets you run him down even through his W slow.',
          'Do not push the wave — freezing denies him stacks permanently.',
        ],
        runes: {
          primaryTree: 'Precision',
          primaryKeystones: ['Conqueror', 'Triumph', 'Legend: Tenacity', 'Last Stand'],
          secondaryTree: 'Resolve',
          secondaryRunes: ['Bone Plating', 'Unflinching'],
          shards: ['Adaptive Force', 'Adaptive Force', 'Health'],
        },
        items: {
          start: ["Doran's Blade", 'Health Potion'],
          core: ['Trinity Force', "Sterak's Gage", "Death's Dance"],
          boots: ['Mercury\'s Treads'],
          situational: ['Black Cleaver', 'Hullbreaker', 'Guardian Angel'],
        },
      },
      {
        id: 'Illaoi',
        score: 7,
        reason:
          'Illaoi bullies Nasus with tentacle poke and E soul grab. He cannot stack safely against her lane dominance.',
        winCondition:
          'E his soul, slam with tentacles, and zone him off stacks. Your lane pressure prevents him from ever reaching critical mass.',
        tips: [
          'E soul grab is free damage — he moves too slowly to dodge.',
          'Tentacle slams hit hard when he tries to farm under tower.',
          'He cannot fight you if you have 2+ tentacles set up.',
        ],
        runes: {
          primaryTree: 'Precision',
          primaryKeystones: ['Conqueror', 'Triumph', 'Legend: Tenacity', 'Last Stand'],
          secondaryTree: 'Resolve',
          secondaryRunes: ['Bone Plating', 'Overgrowth'],
          shards: ['Adaptive Force', 'Adaptive Force', 'Health'],
        },
        items: {
          start: ["Doran's Blade", 'Health Potion'],
          core: ['Black Cleaver', "Sterak's Gage", "Death's Dance"],
          boots: ['Mercury\'s Treads'],
          situational: ['Ravenous Hydra', 'Hullbreaker', 'Guardian Angel'],
        },
      },
      {
        id: 'Riven',
        score: 7,
        reason:
          'Riven can all-in Nasus repeatedly with her combo and mobility, preventing him from farming safely.',
        winCondition:
          'Short trade with Q-W-auto-E out, then all-in at 6 with R. He cannot fight back through your combos.',
        tips: [
          'His W wither slow is annoying but your E shield and dashes offset it.',
          'Trade aggressively levels 1-5 before he gets any significant stacks.',
          'Ignite reduces his R healing significantly.',
        ],
        runes: {
          primaryTree: 'Precision',
          primaryKeystones: ['Conqueror', 'Triumph', 'Legend: Tenacity', 'Last Stand'],
          secondaryTree: 'Resolve',
          secondaryRunes: ['Bone Plating', 'Unflinching'],
          shards: ['Adaptive Force', 'Adaptive Force', 'Health'],
        },
        items: {
          start: ["Doran's Blade", 'Health Potion'],
          core: ['Black Cleaver', 'Ravenous Hydra', "Death's Dance"],
          boots: ['Ionian Boots of Lucidity'],
          situational: ["Sterak's Gage", 'Guardian Angel', 'Hullbreaker'],
        },
      },
    ],
  },

  /* ================================================================ */
  /*  OLAF                                                            */
  /* ================================================================ */
  Olaf: {
    counters: [
      {
        id: 'Jax',
        score: 8,
        reason:
          'Jax Counter Strike blocks Olaf\'s auto-attack-reliant damage and outscales him hard.',
        winCondition:
          'E his autos, stun, short trade. You outscale massively and he falls off after laning phase.',
        tips: [
          'Counter Strike blocks the auto attacks he relies on for damage and healing.',
          'Dodge his Q axes — without the slow he cannot stick to you.',
          'You outscale enormously — be patient.',
        ],
        runes: {
          primaryTree: 'Precision',
          primaryKeystones: ['Conqueror', 'Triumph', 'Legend: Alacrity', 'Last Stand'],
          secondaryTree: 'Resolve',
          secondaryRunes: ['Bone Plating', 'Overgrowth'],
          shards: ['Attack Speed', 'Adaptive Force', 'Health'],
        },
        items: {
          start: ["Doran's Blade", 'Health Potion'],
          core: ['Trinity Force', 'Blade of the Ruined King', "Sterak's Gage"],
          boots: ['Plated Steelcaps'],
          situational: ["Death's Dance", "Wit's End", 'Guardian Angel'],
        },
      },
      {
        id: 'Vayne',
        score: 7,
        reason:
          'Vayne kites Olaf and condemns him away. Even with R immunity to CC, she can still tumble to maintain distance.',
        winCondition:
          'Kite backwards, proc Silver Bolts, condemn him away. He has no gap closer except running at you.',
        tips: [
          'Condemn him away when he Rs and runs at you.',
          'Even with R CC immunity, condemn knockback still creates distance.',
          'Dodge his Q axes with tumble — without the slow he cannot reach you.',
        ],
        runes: {
          primaryTree: 'Precision',
          primaryKeystones: ['Press the Attack', 'Triumph', 'Legend: Alacrity', 'Cut Down'],
          secondaryTree: 'Resolve',
          secondaryRunes: ['Bone Plating', 'Overgrowth'],
          shards: ['Attack Speed', 'Adaptive Force', 'Health'],
        },
        items: {
          start: ["Doran's Blade", 'Health Potion'],
          core: ['Blade of the Ruined King', 'Phantom Dancer', 'Infinity Edge'],
          boots: ['Boots of Swiftness'],
          situational: ['Mortal Reminder', 'Guardian Angel', "Wit's End"],
        },
      },
      {
        id: 'Quinn',
        score: 7,
        reason:
          'Quinn blinds Olaf, vaults away, and kites him from range. He cannot auto attack while blinded.',
        winCondition:
          'Poke from range, blind his autos, and vault away. His R gives CC immunity but you still kite him.',
        tips: [
          'Q blind negates his auto-attack damage and healing.',
          'E vault creates distance even when he pops R.',
          'Dodge his Q axes and he has no way to catch you.',
        ],
        runes: {
          primaryTree: 'Precision',
          primaryKeystones: ['Press the Attack', 'Triumph', 'Legend: Alacrity', 'Cut Down'],
          secondaryTree: 'Resolve',
          secondaryRunes: ['Bone Plating', 'Overgrowth'],
          shards: ['Attack Speed', 'Adaptive Force', 'Health'],
        },
        items: {
          start: ["Doran's Blade", 'Health Potion'],
          core: ['Blade of the Ruined King', 'Phantom Dancer', 'Infinity Edge'],
          boots: ['Boots of Swiftness'],
          situational: ['Mortal Reminder', 'Guardian Angel', "Lord Dominik's Regards"],
        },
      },
    ],
  },

  /* ================================================================ */
  /*  ORNN                                                            */
  /* ================================================================ */
  Ornn: {
    counters: [
      {
        id: 'Fiora',
        score: 9,
        reason:
          'Fiora Ripostes Ornn\'s brittle proc or R knock-up for a free stun and her vitals ignore his tank stats.',
        winCondition:
          'Parry his R or brittle auto for a stun, proc vitals, and split push. He cannot match you in side lane.',
        tips: [
          'Riposte his R ram for a guaranteed stun in team fights too.',
          'His large hitbox makes proccing vitals trivially easy.',
          'You split push; he team fights. Pressure side lanes to force a response.',
        ],
        runes: {
          primaryTree: 'Precision',
          primaryKeystones: ['Conqueror', 'Triumph', 'Legend: Alacrity', 'Last Stand'],
          secondaryTree: 'Resolve',
          secondaryRunes: ['Bone Plating', 'Overgrowth'],
          shards: ['Adaptive Force', 'Adaptive Force', 'Health'],
        },
        items: {
          start: ["Doran's Blade", 'Health Potion'],
          core: ['Trinity Force', 'Ravenous Hydra', "Sterak's Gage"],
          boots: ['Mercury\'s Treads'],
          situational: ["Death's Dance", 'Hullbreaker', 'Guardian Angel'],
        },
      },
      {
        id: 'Vayne',
        score: 8,
        reason:
          'Vayne percent HP true damage shreds Ornn\'s massive HP pool. She kites him freely.',
        winCondition:
          'Kite, Silver Bolts, condemn. He has no way to reach you and your damage ignores his tank stats.',
        tips: [
          'Tumble his Q pillar placement and R knock-up.',
          'Silver Bolts true damage bypasses all his resistances.',
          'Condemn him into his own Q pillar for a wall stun.',
        ],
        runes: {
          primaryTree: 'Precision',
          primaryKeystones: ['Press the Attack', 'Triumph', 'Legend: Alacrity', 'Cut Down'],
          secondaryTree: 'Resolve',
          secondaryRunes: ['Bone Plating', 'Overgrowth'],
          shards: ['Attack Speed', 'Adaptive Force', 'Health'],
        },
        items: {
          start: ["Doran's Blade", 'Health Potion'],
          core: ['Blade of the Ruined King', 'Guinsoo\'s Rageblade', 'Phantom Dancer'],
          boots: ['Boots of Swiftness'],
          situational: ['Mortal Reminder', 'Guardian Angel', "Wit's End"],
        },
      },
      {
        id: 'Gwen',
        score: 7,
        reason:
          'Gwen W blocks Ornn abilities from outside and her percent HP magic damage melts his health.',
        winCondition:
          'W his abilities, trade with center Q, and outscale in side lane. He cannot kill you.',
        tips: [
          'W blocks his R charge from outside the mist.',
          'Center Q damage scales with his HP — very effective against Ornn.',
          'You outscale him in split push matchups.',
        ],
        runes: {
          primaryTree: 'Precision',
          primaryKeystones: ['Conqueror', 'Triumph', 'Legend: Alacrity', 'Last Stand'],
          secondaryTree: 'Resolve',
          secondaryRunes: ['Second Wind', 'Overgrowth'],
          shards: ['Attack Speed', 'Adaptive Force', 'Health'],
        },
        items: {
          start: ["Doran's Blade", 'Health Potion'],
          core: ['Riftmaker', "Nashor's Tooth", 'Cosmic Drive'],
          boots: ['Mercury\'s Treads'],
          situational: ["Zhonya's Hourglass", "Rabadon's Deathcap", 'Morellonomicon'],
        },
      },
    ],
  },

  /* ================================================================ */
  /*  PANTHEON                                                        */
  /* ================================================================ */
  Pantheon: {
    counters: [
      {
        id: 'Malphite',
        score: 8,
        reason:
          'Malphite armor stacking neutralizes Pantheon\'s AD burst and he outscales massively for team fights.',
        winCondition:
          'Stack armor, absorb his burst with passive shield, and outscale. Your R engage is far better late game.',
        tips: [
          'Passive shield absorbs a significant chunk of his empowered combo.',
          'E attack speed slow makes his autos useless after his burst.',
          'You massively outscale — just survive to team fights.',
        ],
        runes: {
          primaryTree: 'Resolve',
          primaryKeystones: ['Grasp of the Undying', 'Shield Bash', 'Bone Plating', 'Overgrowth'],
          secondaryTree: 'Sorcery',
          secondaryRunes: ['Manaflow Band', 'Scorch'],
          shards: ['Ability Haste', 'Adaptive Force', 'Armor'],
        },
        items: {
          start: ["Doran's Shield", 'Health Potion'],
          core: ['Hollow Radiance', 'Thornmail', "Randuin's Omen"],
          boots: ['Plated Steelcaps'],
          situational: ["Jak'Sho, the Protean", 'Spirit Visage', 'Force of Nature'],
        },
      },
      {
        id: 'Shen',
        score: 7,
        reason:
          'Shen blocks Pantheon autos with Spirit Blade, taunts through his E shield, and outscales with global R.',
        winCondition:
          'Block his empowered W with your W, taunt for trades, and use R to counter his R roams.',
        tips: [
          'W spirit blade blocks his empowered W auto attacks.',
          'Taunt through his E shield timing.',
          'Match his R roam with your own R for map pressure.',
        ],
        runes: {
          primaryTree: 'Resolve',
          primaryKeystones: ['Grasp of the Undying', 'Shield Bash', 'Second Wind', 'Overgrowth'],
          secondaryTree: 'Precision',
          secondaryRunes: ['Triumph', 'Legend: Tenacity'],
          shards: ['Ability Haste', 'Adaptive Force', 'Armor'],
        },
        items: {
          start: ["Doran's Shield", 'Health Potion'],
          core: ['Heartsteel', 'Hollow Radiance', 'Titanic Hydra'],
          boots: ['Plated Steelcaps'],
          situational: ['Thornmail', "Randuin's Omen", 'Spirit Visage'],
        },
      },
      {
        id: 'Ornn',
        score: 7,
        reason:
          'Ornn tanks Pantheon\'s burst, outscales with item upgrades, and provides better team-fight engage.',
        winCondition:
          'Survive early with defensive runes, scale with items, and dominate team fights where Pantheon falls off.',
        tips: [
          'Your tank stats absorb his burst combo.',
          'Brittle proc after he commits gives free bonus damage.',
          'Item upgrades give your team a massive gold advantage late.',
        ],
        runes: {
          primaryTree: 'Resolve',
          primaryKeystones: ['Grasp of the Undying', 'Demolish', 'Bone Plating', 'Overgrowth'],
          secondaryTree: 'Precision',
          secondaryRunes: ['Triumph', 'Legend: Tenacity'],
          shards: ['Ability Haste', 'Adaptive Force', 'Armor'],
        },
        items: {
          start: ["Doran's Shield", 'Health Potion'],
          core: ['Hollow Radiance', 'Thornmail', "Jak'Sho, the Protean"],
          boots: ['Plated Steelcaps'],
          situational: ["Randuin's Omen", 'Spirit Visage', 'Force of Nature'],
        },
      },
    ],
  },

  /* ================================================================ */
  /*  POPPY                                                           */
  /* ================================================================ */
  Poppy: {
    counters: [
      {
        id: 'Mordekaiser',
        score: 8,
        reason:
          'Mordekaiser deals magic damage that Poppy cannot itemize against easily, and Death Realm isolates her from walls.',
        winCondition:
          'Q poke, E pull, then R into Death Realm where she has no walls for her E stun.',
        tips: [
          'Death Realm removes her from any nearby walls — her E stun requires a wall.',
          'Your sustained damage beats her short trades.',
          'She is tanky but your passive shreds resistances.',
        ],
        runes: {
          primaryTree: 'Precision',
          primaryKeystones: ['Conqueror', 'Triumph', 'Legend: Tenacity', 'Last Stand'],
          secondaryTree: 'Resolve',
          secondaryRunes: ['Bone Plating', 'Overgrowth'],
          shards: ['Adaptive Force', 'Adaptive Force', 'Health'],
        },
        items: {
          start: ["Doran's Shield", 'Health Potion'],
          core: ['Riftmaker', "Rylai's Crystal Scepter", "Zhonya's Hourglass"],
          boots: ['Mercury\'s Treads'],
          situational: ['Morellonomicon', "Rabadon's Deathcap", 'Cosmic Drive'],
        },
      },
      {
        id: 'Darius',
        score: 7,
        reason:
          'Darius out-trades Poppy with bleed stacking and his E pull negates her W anti-dash zone.',
        winCondition:
          'Pull her with E when she tries to disengage, stack passive, and R execute.',
        tips: [
          'Your E pull is not a dash — it goes through her W.',
          'Stack bleed in extended trades where she is weaker.',
          'Ghost lets you stick to her through her hammer knockback.',
        ],
        runes: {
          primaryTree: 'Precision',
          primaryKeystones: ['Conqueror', 'Triumph', 'Legend: Tenacity', 'Last Stand'],
          secondaryTree: 'Resolve',
          secondaryRunes: ['Bone Plating', 'Unflinching'],
          shards: ['Adaptive Force', 'Adaptive Force', 'Health'],
        },
        items: {
          start: ["Doran's Blade", 'Health Potion'],
          core: ['Trinity Force', "Sterak's Gage", "Death's Dance"],
          boots: ['Mercury\'s Treads'],
          situational: ['Black Cleaver', 'Hullbreaker', 'Guardian Angel'],
        },
      },
      {
        id: 'Illaoi',
        score: 7,
        reason:
          'Illaoi\'s tentacle damage ignores Poppy\'s anti-dash kit and her sustain wins extended trades.',
        winCondition:
          'Set up tentacles, land E soul grab, and slam. Poppy\'s W does nothing against tentacles.',
        tips: [
          'Your tentacles are not dashes — her W does nothing against your kit.',
          'E soul grab chunks her and she has no way to dodge it.',
          'R and stand your ground if she all-ins you.',
        ],
        runes: {
          primaryTree: 'Precision',
          primaryKeystones: ['Conqueror', 'Triumph', 'Legend: Tenacity', 'Last Stand'],
          secondaryTree: 'Resolve',
          secondaryRunes: ['Bone Plating', 'Overgrowth'],
          shards: ['Adaptive Force', 'Adaptive Force', 'Health'],
        },
        items: {
          start: ["Doran's Blade", 'Health Potion'],
          core: ['Black Cleaver', "Sterak's Gage", "Death's Dance"],
          boots: ['Mercury\'s Treads'],
          situational: ['Ravenous Hydra', 'Hullbreaker', 'Guardian Angel'],
        },
      },
    ],
  },

  /* ================================================================ */
  /*  QUINN                                                           */
  /* ================================================================ */
  Quinn: {
    counters: [
      {
        id: 'Malphite',
        score: 8,
        reason:
          'Malphite stacks armor against Quinn AD poke, Q slows her kiting, and R engage is unavoidable.',
        winCondition:
          'Stack armor, Q poke, and at 6 R engage is a guaranteed kill on squishy Quinn.',
        tips: [
          'She is squishy and your R one-shots her after one armor item.',
          'Q slow prevents her from kiting you.',
          'Passive shield absorbs her auto poke.',
        ],
        runes: {
          primaryTree: 'Resolve',
          primaryKeystones: ['Grasp of the Undying', 'Shield Bash', 'Bone Plating', 'Overgrowth'],
          secondaryTree: 'Sorcery',
          secondaryRunes: ['Manaflow Band', 'Scorch'],
          shards: ['Ability Haste', 'Adaptive Force', 'Armor'],
        },
        items: {
          start: ["Doran's Ring", 'Health Potion', 'Health Potion'],
          core: ['Hollow Radiance', 'Thornmail', "Randuin's Omen"],
          boots: ['Plated Steelcaps'],
          situational: ["Jak'Sho, the Protean", 'Spirit Visage', 'Force of Nature'],
        },
      },
      {
        id: 'Irelia',
        score: 8,
        reason:
          'Irelia dashes through minions onto Quinn and all-ins her. Quinn vault is not enough to escape a full-stack Irelia.',
        winCondition:
          'Stack passive on minions, Q-dash onto Quinn. Her vault E only delays the inevitable — you kill her in the all-in.',
        tips: [
          'Q through minions to close the gap instantly.',
          'Her vault knocks you back but your Q resets let you follow up.',
          'At 6 your R and stacked passive kill her easily.',
        ],
        runes: {
          primaryTree: 'Precision',
          primaryKeystones: ['Conqueror', 'Triumph', 'Legend: Alacrity', 'Last Stand'],
          secondaryTree: 'Resolve',
          secondaryRunes: ['Second Wind', 'Unflinching'],
          shards: ['Attack Speed', 'Adaptive Force', 'Health'],
        },
        items: {
          start: ["Doran's Shield", 'Health Potion'],
          core: ['Blade of the Ruined King', 'Trinity Force', "Sterak's Gage"],
          boots: ['Plated Steelcaps'],
          situational: ["Death's Dance", "Wit's End", 'Guardian Angel'],
        },
      },
      {
        id: 'Pantheon',
        score: 7,
        reason:
          'Pantheon point-and-click W stun reaches Quinn before she can vault and his burst kills her quickly.',
        winCondition:
          'W stun, empowered Q, and she dies. She is too squishy to survive your all-in combo.',
        tips: [
          'Your W stun is targeted — she cannot blind or vault away from it.',
          'E shield blocks her blind Q.',
          'Bush control lets you W-engage without her seeing you.',
        ],
        runes: {
          primaryTree: 'Precision',
          primaryKeystones: ['Press the Attack', 'Triumph', 'Legend: Tenacity', 'Last Stand'],
          secondaryTree: 'Domination',
          secondaryRunes: ['Sudden Impact', 'Treasure Hunter'],
          shards: ['Adaptive Force', 'Adaptive Force', 'Armor'],
        },
        items: {
          start: ["Doran's Shield", 'Health Potion'],
          core: ['Eclipse', 'Black Cleaver', "Death's Dance"],
          boots: ['Plated Steelcaps'],
          situational: ['Maw of Malmortius', 'Guardian Angel', 'Hullbreaker'],
        },
      },
    ],
  },

  /* ================================================================ */
  /*  RENEKTON                                                        */
  /* ================================================================ */
  Renekton: {
    counters: [
      {
        id: 'Vayne',
        score: 8,
        reason:
          'Vayne kites Renekton and condemns him away after he E dashes in. Her scaling vastly outpaces his.',
        winCondition:
          'Kite backwards, condemn after he double-dashes in, and outscale. He falls off hard.',
        tips: [
          'Condemn him away after his second E dash — he has no more gap closers.',
          'Silver Bolts shred his HP even with ult bonus health.',
          'You outscale massively — survive lane and carry later.',
        ],
        runes: {
          primaryTree: 'Precision',
          primaryKeystones: ['Press the Attack', 'Triumph', 'Legend: Alacrity', 'Cut Down'],
          secondaryTree: 'Resolve',
          secondaryRunes: ['Bone Plating', 'Overgrowth'],
          shards: ['Attack Speed', 'Adaptive Force', 'Health'],
        },
        items: {
          start: ["Doran's Blade", 'Health Potion'],
          core: ['Blade of the Ruined King', 'Phantom Dancer', 'Infinity Edge'],
          boots: ['Boots of Swiftness'],
          situational: ['Guardian Angel', 'Mortal Reminder', "Wit's End"],
        },
      },
      {
        id: 'Quinn',
        score: 7,
        reason:
          'Quinn blinds and kites Renekton. Her vault creates distance after his E engage.',
        winCondition:
          'Poke from range, vault after his E dash, blind his autos. He never gets a clean trade.',
        tips: [
          'Save vault for after he E-dashes — it resets the distance.',
          'Q blind negates his empowered W auto attacks.',
          'Roam with R after shoving to spread your lead.',
        ],
        runes: {
          primaryTree: 'Precision',
          primaryKeystones: ['Press the Attack', 'Triumph', 'Legend: Alacrity', 'Cut Down'],
          secondaryTree: 'Resolve',
          secondaryRunes: ['Bone Plating', 'Overgrowth'],
          shards: ['Attack Speed', 'Adaptive Force', 'Health'],
        },
        items: {
          start: ["Doran's Blade", 'Health Potion'],
          core: ['Blade of the Ruined King', 'Phantom Dancer', 'Infinity Edge'],
          boots: ['Boots of Swiftness'],
          situational: ['Guardian Angel', 'Mortal Reminder', "Lord Dominik's Regards"],
        },
      },
      {
        id: 'Gnar',
        score: 7,
        reason:
          'Gnar pokes Renekton from range in Mini form and hops away from his E engage attempts.',
        winCondition:
          'Poke as Mini Gnar, hop away from his E dash, and outscale for team fights.',
        tips: [
          'Hop away when he E-dashes toward you.',
          'Poke with Q boomerang and auto attacks from range.',
          'Mega Gnar R is far more impactful in team fights.',
        ],
        runes: {
          primaryTree: 'Precision',
          primaryKeystones: ['Fleet Footwork', 'Triumph', 'Legend: Alacrity', 'Last Stand'],
          secondaryTree: 'Resolve',
          secondaryRunes: ['Second Wind', 'Overgrowth'],
          shards: ['Attack Speed', 'Adaptive Force', 'Health'],
        },
        items: {
          start: ["Doran's Blade", 'Health Potion'],
          core: ['Trinity Force', 'Black Cleaver', "Sterak's Gage"],
          boots: ['Plated Steelcaps'],
          situational: ["Death's Dance", 'Maw of Malmortius', 'Guardian Angel'],
        },
      },
    ],
  },

  /* ================================================================ */
  /*  RENGAR                                                          */
  /* ================================================================ */
  Rengar: {
    counters: [
      {
        id: 'Malphite',
        score: 8,
        reason:
          'Malphite stacks armor, slows Rengar\'s attack speed, and is too tanky for Rengar to burst down.',
        winCondition:
          'Stack armor, E his autos, and outscale for team fights. He cannot kill you.',
        tips: [
          'E attack speed slow cripples his empowered combo.',
          'Passive shield absorbs his bush leap poke.',
          'You are infinitely more useful in team fights.',
        ],
        runes: {
          primaryTree: 'Resolve',
          primaryKeystones: ['Grasp of the Undying', 'Shield Bash', 'Bone Plating', 'Overgrowth'],
          secondaryTree: 'Sorcery',
          secondaryRunes: ['Manaflow Band', 'Scorch'],
          shards: ['Ability Haste', 'Adaptive Force', 'Armor'],
        },
        items: {
          start: ["Doran's Ring", 'Health Potion', 'Health Potion'],
          core: ['Hollow Radiance', 'Thornmail', "Randuin's Omen"],
          boots: ['Plated Steelcaps'],
          situational: ["Jak'Sho, the Protean", 'Spirit Visage', 'Force of Nature'],
        },
      },
      {
        id: 'Pantheon',
        score: 7,
        reason:
          'Pantheon matches Rengar\'s early aggression and his point-and-click stun is unavoidable.',
        winCondition:
          'W stun when he leaps from bush, empowered Q burst combo, and E to block his damage.',
        tips: [
          'Your W is targeted — he cannot dodge it even from bushes.',
          'E blocks a lot of his burst damage.',
          'You match his early aggression and outperform in roaming.',
        ],
        runes: {
          primaryTree: 'Precision',
          primaryKeystones: ['Press the Attack', 'Triumph', 'Legend: Tenacity', 'Last Stand'],
          secondaryTree: 'Domination',
          secondaryRunes: ['Sudden Impact', 'Treasure Hunter'],
          shards: ['Adaptive Force', 'Adaptive Force', 'Armor'],
        },
        items: {
          start: ["Doran's Blade", 'Health Potion'],
          core: ['Eclipse', 'Black Cleaver', "Death's Dance"],
          boots: ['Plated Steelcaps'],
          situational: ["Sterak's Gage", 'Guardian Angel', 'Hullbreaker'],
        },
      },
      {
        id: 'Poppy',
        score: 7,
        reason:
          'Poppy W blocks Rengar\'s leap and her E wall stun punishes his aggression. She is too tanky to burst.',
        winCondition:
          'W his bush leap to ground him, then E him into a wall for a stun. He cannot play the game.',
        tips: [
          'W Steadfast Presence blocks his leap from bushes.',
          'E him into a wall after his blocked leap for free damage.',
          'He literally cannot engage you while your W is active.',
        ],
        runes: {
          primaryTree: 'Resolve',
          primaryKeystones: ['Grasp of the Undying', 'Shield Bash', 'Bone Plating', 'Overgrowth'],
          secondaryTree: 'Precision',
          secondaryRunes: ['Triumph', 'Legend: Tenacity'],
          shards: ['Ability Haste', 'Adaptive Force', 'Armor'],
        },
        items: {
          start: ["Doran's Shield", 'Health Potion'],
          core: ['Hollow Radiance', 'Thornmail', "Randuin's Omen"],
          boots: ['Plated Steelcaps'],
          situational: ["Jak'Sho, the Protean", 'Spirit Visage', 'Force of Nature'],
        },
      },
    ],
  },

  /* ================================================================ */
  /*  RIVEN                                                           */
  /* ================================================================ */
  Riven: {
    counters: [
      {
        id: 'Renekton',
        score: 8,
        reason:
          'Renekton W stun goes through Riven\'s shield and his empowered burst wins every short trade early.',
        winCondition:
          'E in, W stun through her shield, Q, E out. You win every short trade levels 1-6.',
        tips: [
          'Empowered W stun goes through her E shield — always use fury W.',
          'Trade aggressively when she wastes her Q cooldown.',
          'You have a strong level 3 all-in advantage.',
        ],
        runes: {
          primaryTree: 'Precision',
          primaryKeystones: ['Conqueror', 'Triumph', 'Legend: Tenacity', 'Last Stand'],
          secondaryTree: 'Resolve',
          secondaryRunes: ['Bone Plating', 'Unflinching'],
          shards: ['Adaptive Force', 'Adaptive Force', 'Health'],
        },
        items: {
          start: ["Doran's Blade", 'Health Potion'],
          core: ['Blade of the Ruined King', 'Black Cleaver', "Sterak's Gage"],
          boots: ['Plated Steelcaps'],
          situational: ["Death's Dance", 'Guardian Angel', 'Hullbreaker'],
        },
      },
      {
        id: 'Poppy',
        score: 8,
        reason:
          'Poppy W blocks all of Riven\'s dashes and her E wall stun creates devastating punish windows.',
        winCondition:
          'W when she tries to dash in, E her into a wall, and out-trade. She literally cannot play the game against your W.',
        tips: [
          'W grounds her and blocks every dash — Q3, E, and third Q are all dashes.',
          'E her into a wall after blocking her engage.',
          'She is completely helpless when your W is active.',
        ],
        runes: {
          primaryTree: 'Resolve',
          primaryKeystones: ['Grasp of the Undying', 'Shield Bash', 'Bone Plating', 'Overgrowth'],
          secondaryTree: 'Precision',
          secondaryRunes: ['Triumph', 'Legend: Tenacity'],
          shards: ['Ability Haste', 'Adaptive Force', 'Health'],
        },
        items: {
          start: ["Doran's Shield", 'Health Potion'],
          core: ['Hollow Radiance', 'Thornmail', "Randuin's Omen"],
          boots: ['Plated Steelcaps'],
          situational: ["Jak'Sho, the Protean", 'Spirit Visage', 'Force of Nature'],
        },
      },
      {
        id: 'Volibear',
        score: 7,
        reason:
          'Volibear raw stats overwhelm Riven in melee trades and his E shield absorbs her combo burst.',
        winCondition:
          'Run at her with Q, trade autos, W bite twice. Your raw stat-check wins.',
        tips: [
          'Q stun interrupt her Q combo.',
          'E shield absorbs a lot of her burst.',
          'W second bite healing sustains you through repeated trades.',
        ],
        runes: {
          primaryTree: 'Precision',
          primaryKeystones: ['Conqueror', 'Triumph', 'Legend: Alacrity', 'Last Stand'],
          secondaryTree: 'Resolve',
          secondaryRunes: ['Bone Plating', 'Unflinching'],
          shards: ['Attack Speed', 'Adaptive Force', 'Health'],
        },
        items: {
          start: ["Doran's Blade", 'Health Potion'],
          core: ['Blade of the Ruined King', 'Trinity Force', "Death's Dance"],
          boots: ['Plated Steelcaps'],
          situational: ["Sterak's Gage", "Wit's End", 'Spirit Visage'],
        },
      },
    ],
  },

  /* ================================================================ */
  /*  RUMBLE                                                          */
  /* ================================================================ */
  Rumble: {
    counters: [
      {
        id: 'Irelia',
        score: 8,
        reason:
          'Irelia dashes through minions to reach Rumble and all-ins him in melee where he cannot kite.',
        winCondition:
          'Stack passive, Q-dash in, all-in. He has no escape once you are on top of him.',
        tips: [
          'Dash through minions to close the gap against his flamespitter.',
          'Once in melee you out-DPS him easily.',
          'Hexdrinker into Wit\'s End makes his damage meaningless.',
        ],
        runes: {
          primaryTree: 'Precision',
          primaryKeystones: ['Conqueror', 'Triumph', 'Legend: Tenacity', 'Last Stand'],
          secondaryTree: 'Resolve',
          secondaryRunes: ['Second Wind', 'Unflinching'],
          shards: ['Attack Speed', 'Adaptive Force', 'Magic Resist'],
        },
        items: {
          start: ["Doran's Shield", 'Health Potion'],
          core: ['Blade of the Ruined King', "Wit's End", "Sterak's Gage"],
          boots: ['Mercury\'s Treads'],
          situational: ['Maw of Malmortius', "Death's Dance", 'Guardian Angel'],
        },
      },
      {
        id: 'Yasuo',
        score: 7,
        reason:
          'Yasuo Windwall blocks Rumble E harpoons and his mobility through minions makes him hard to flamespitter.',
        winCondition:
          'Windwall his E, dash through minions, and trade in melee. His flamespitter is hard to land when you are dashing.',
        tips: [
          'Windwall blocks both E harpoon charges.',
          'Passive shield absorbs a lot of his poke.',
          'Mercury\'s Treads reduce the slow from his harpoons.',
        ],
        runes: {
          primaryTree: 'Precision',
          primaryKeystones: ['Conqueror', 'Triumph', 'Legend: Tenacity', 'Last Stand'],
          secondaryTree: 'Resolve',
          secondaryRunes: ['Second Wind', 'Overgrowth'],
          shards: ['Attack Speed', 'Adaptive Force', 'Magic Resist'],
        },
        items: {
          start: ["Doran's Shield", 'Health Potion'],
          core: ['Blade of the Ruined King', 'Infinity Edge', "Death's Dance"],
          boots: ['Mercury\'s Treads'],
          situational: ['Maw of Malmortius', "Sterak's Gage", "Wit's End"],
        },
      },
      {
        id: 'Riven',
        score: 7,
        reason:
          'Riven multiple dashes let her close the gap and burst Rumble before he can get flamespitter damage off.',
        winCondition:
          'Dash in with Q combos, shield his damage with E, and burst him with full combo.',
        tips: [
          'E shield absorbs a lot of his flamespitter damage.',
          'Q dashes close the gap quickly against his short range.',
          'All-in after he overheats — he silences himself.',
        ],
        runes: {
          primaryTree: 'Precision',
          primaryKeystones: ['Conqueror', 'Triumph', 'Legend: Tenacity', 'Last Stand'],
          secondaryTree: 'Resolve',
          secondaryRunes: ['Second Wind', 'Unflinching'],
          shards: ['Adaptive Force', 'Adaptive Force', 'Magic Resist'],
        },
        items: {
          start: ["Doran's Shield", 'Health Potion'],
          core: ['Black Cleaver', 'Ravenous Hydra', "Death's Dance"],
          boots: ['Mercury\'s Treads'],
          situational: ['Maw of Malmortius', "Sterak's Gage", 'Guardian Angel'],
        },
      },
    ],
  },

  /* ================================================================ */
  /*  SETT                                                            */
  /* ================================================================ */
  Sett: {
    counters: [
      {
        id: 'Gwen',
        score: 8,
        reason:
          'Gwen W makes Sett\'s W true damage haymaker whiff from outside the mist. She outscales in sustained fights.',
        winCondition:
          'W when he charges W haymaker, then trade back with center Q. You outscale in split push.',
        tips: [
          'W blocks his W true damage center — his main damage tool.',
          'Center Q shreds his HP in extended trades.',
          'Riftmaker sustain lets you match his passive regen.',
        ],
        runes: {
          primaryTree: 'Precision',
          primaryKeystones: ['Conqueror', 'Triumph', 'Legend: Alacrity', 'Last Stand'],
          secondaryTree: 'Resolve',
          secondaryRunes: ['Bone Plating', 'Overgrowth'],
          shards: ['Attack Speed', 'Adaptive Force', 'Health'],
        },
        items: {
          start: ["Doran's Blade", 'Health Potion'],
          core: ['Riftmaker', "Nashor's Tooth", 'Cosmic Drive'],
          boots: ['Plated Steelcaps'],
          situational: ["Zhonya's Hourglass", "Rabadon's Deathcap", 'Morellonomicon'],
        },
      },
      {
        id: 'Vayne',
        score: 8,
        reason:
          'Vayne kites Sett, condemns him away, and Silver Bolts shred his HP. He can never reach her.',
        winCondition:
          'Kite backwards, tumble his E pull, condemn when he reaches you. He is too slow.',
        tips: [
          'Tumble sideways to dodge his E pull.',
          'Condemn creates distance whenever he walks at you.',
          'Silver Bolts melt his HP pool.',
        ],
        runes: {
          primaryTree: 'Precision',
          primaryKeystones: ['Press the Attack', 'Triumph', 'Legend: Alacrity', 'Cut Down'],
          secondaryTree: 'Resolve',
          secondaryRunes: ['Bone Plating', 'Overgrowth'],
          shards: ['Attack Speed', 'Adaptive Force', 'Health'],
        },
        items: {
          start: ["Doran's Blade", 'Health Potion'],
          core: ['Blade of the Ruined King', 'Phantom Dancer', 'Infinity Edge'],
          boots: ['Boots of Swiftness'],
          situational: ['Guardian Angel', 'Mortal Reminder', "Wit's End"],
        },
      },
      {
        id: 'Quinn',
        score: 7,
        reason:
          'Quinn blinds Sett, vaults away from his E, and kites him from range.',
        winCondition:
          'Poke from range, blind when he walks up, vault after his E. He cannot touch you.',
        tips: [
          'Vault away immediately after his E pull.',
          'Q blind negates his auto-attack trading.',
          'Kite and poke — he has no gap closer besides walking.',
        ],
        runes: {
          primaryTree: 'Precision',
          primaryKeystones: ['Press the Attack', 'Triumph', 'Legend: Alacrity', 'Cut Down'],
          secondaryTree: 'Resolve',
          secondaryRunes: ['Bone Plating', 'Overgrowth'],
          shards: ['Attack Speed', 'Adaptive Force', 'Health'],
        },
        items: {
          start: ["Doran's Blade", 'Health Potion'],
          core: ['Blade of the Ruined King', 'Phantom Dancer', 'Infinity Edge'],
          boots: ['Boots of Swiftness'],
          situational: ['Guardian Angel', 'Mortal Reminder', "Lord Dominik's Regards"],
        },
      },
    ],
  },

  /* ================================================================ */
  /*  SHEN                                                            */
  /* ================================================================ */
  Shen: {
    counters: [
      {
        id: 'Mordekaiser',
        score: 8,
        reason:
          'Mordekaiser Death Realm prevents Shen from ulting to team fights and he wins the isolated 1v1.',
        winCondition:
          'R him into Death Realm when he tries to ult an ally. He is stuck with you and cannot help his team.',
        tips: [
          'Death Realm cancels his R channel — huge strategic advantage.',
          'Your sustained damage beats his short trades.',
          'He deals magic damage, which makes his W less effective.',
        ],
        runes: {
          primaryTree: 'Precision',
          primaryKeystones: ['Conqueror', 'Triumph', 'Legend: Tenacity', 'Last Stand'],
          secondaryTree: 'Resolve',
          secondaryRunes: ['Second Wind', 'Overgrowth'],
          shards: ['Adaptive Force', 'Adaptive Force', 'Health'],
        },
        items: {
          start: ["Doran's Shield", 'Health Potion'],
          core: ['Riftmaker', "Rylai's Crystal Scepter", "Zhonya's Hourglass"],
          boots: ['Mercury\'s Treads'],
          situational: ['Morellonomicon', "Rabadon's Deathcap", 'Cosmic Drive'],
        },
      },
      {
        id: 'Gwen',
        score: 7,
        reason:
          'Gwen magic damage bypasses Shen\'s physical damage blocking W. She outscales in side lane.',
        winCondition:
          'Your damage is magic — his W is useless against you. Out-DPS him and outscale.',
        tips: [
          'His W only blocks auto attacks — your Q and passive are magic damage.',
          'Center Q shreds him in trades.',
          'You outscale him in the side lane easily.',
        ],
        runes: {
          primaryTree: 'Precision',
          primaryKeystones: ['Conqueror', 'Triumph', 'Legend: Alacrity', 'Last Stand'],
          secondaryTree: 'Resolve',
          secondaryRunes: ['Bone Plating', 'Overgrowth'],
          shards: ['Attack Speed', 'Adaptive Force', 'Health'],
        },
        items: {
          start: ["Doran's Blade", 'Health Potion'],
          core: ['Riftmaker', "Nashor's Tooth", 'Cosmic Drive'],
          boots: ['Mercury\'s Treads'],
          situational: ["Zhonya's Hourglass", "Rabadon's Deathcap", 'Morellonomicon'],
        },
      },
      {
        id: 'Vayne',
        score: 7,
        reason:
          'Vayne Silver Bolts true damage ignores Shen\'s tank stats and she kites him with tumble.',
        winCondition:
          'Kite, proc Silver Bolts, condemn. His taunt is telegraphed and you can tumble it.',
        tips: [
          'Tumble his E taunt — it is his only engage tool.',
          'Silver Bolts true damage bypasses his defensive stats.',
          'Condemn creates distance after his taunt.',
        ],
        runes: {
          primaryTree: 'Precision',
          primaryKeystones: ['Press the Attack', 'Triumph', 'Legend: Alacrity', 'Cut Down'],
          secondaryTree: 'Resolve',
          secondaryRunes: ['Bone Plating', 'Overgrowth'],
          shards: ['Attack Speed', 'Adaptive Force', 'Health'],
        },
        items: {
          start: ["Doran's Blade", 'Health Potion'],
          core: ['Blade of the Ruined King', 'Guinsoo\'s Rageblade', 'Phantom Dancer'],
          boots: ['Boots of Swiftness'],
          situational: ['Mortal Reminder', 'Guardian Angel', "Wit's End"],
        },
      },
    ],
  },

  /* ================================================================ */
  /*  SINGED                                                          */
  /* ================================================================ */
  Singed: {
    counters: [
      {
        id: 'Gnar',
        score: 8,
        reason:
          'Gnar kites Singed endlessly in Mini form and can hop away from his fling. Singed cannot proxy safely either.',
        winCondition:
          'Poke from range, hop away from his fling, and team fight better. He can never touch you.',
        tips: [
          'Hop away from his E fling — it is his only way to trade.',
          'Q boomerang poke whittles him down.',
          'Never chase Singed — let him come to you.',
        ],
        runes: {
          primaryTree: 'Precision',
          primaryKeystones: ['Fleet Footwork', 'Triumph', 'Legend: Alacrity', 'Last Stand'],
          secondaryTree: 'Resolve',
          secondaryRunes: ['Second Wind', 'Overgrowth'],
          shards: ['Attack Speed', 'Adaptive Force', 'Magic Resist'],
        },
        items: {
          start: ["Doran's Blade", 'Health Potion'],
          core: ['Trinity Force', 'Black Cleaver', "Sterak's Gage"],
          boots: ['Mercury\'s Treads'],
          situational: ["Death's Dance", 'Maw of Malmortius', 'Guardian Angel'],
        },
      },
      {
        id: 'Quinn',
        score: 7,
        reason:
          'Quinn kites Singed from range, vaults away from his fling, and roams with R to impact the map.',
        winCondition:
          'Poke from range, vault his fling, and roam. He cannot touch you or follow your roams.',
        tips: [
          'Never chase him — poke from range and let him come to you.',
          'Vault away from his fling attempt.',
          'Roam with R while he proxies.',
        ],
        runes: {
          primaryTree: 'Precision',
          primaryKeystones: ['Press the Attack', 'Triumph', 'Legend: Alacrity', 'Cut Down'],
          secondaryTree: 'Resolve',
          secondaryRunes: ['Second Wind', 'Overgrowth'],
          shards: ['Attack Speed', 'Adaptive Force', 'Magic Resist'],
        },
        items: {
          start: ["Doran's Blade", 'Health Potion'],
          core: ['Blade of the Ruined King', 'Phantom Dancer', 'Infinity Edge'],
          boots: ['Boots of Swiftness'],
          situational: ['Guardian Angel', 'Mortal Reminder', "Wit's End"],
        },
      },
      {
        id: 'Kayle',
        score: 7,
        reason:
          'Kayle outscales Singed and after level 6 can kite him with ranged autos. He cannot proxy against her safely either.',
        winCondition:
          'Survive early, become ranged at 6, and outscale. You hard carry late while he falls off.',
        tips: [
          'Play safe early — he can fling you if you get too close.',
          'After level 6 you poke him from range freely.',
          'Your R invulnerability saves you from his all-in.',
        ],
        runes: {
          primaryTree: 'Precision',
          primaryKeystones: ['Fleet Footwork', 'Triumph', 'Legend: Alacrity', 'Last Stand'],
          secondaryTree: 'Resolve',
          secondaryRunes: ['Second Wind', 'Overgrowth'],
          shards: ['Attack Speed', 'Adaptive Force', 'Magic Resist'],
        },
        items: {
          start: ["Doran's Blade", 'Health Potion'],
          core: ["Nashor's Tooth", 'Riftmaker', "Rabadon's Deathcap"],
          boots: ['Boots of Swiftness'],
          situational: ["Zhonya's Hourglass", 'Shadowflame', "Wit's End"],
        },
      },
    ],
  },

  /* ================================================================ */
  /*  SION                                                            */
  /* ================================================================ */
  Sion: {
    counters: [
      {
        id: 'Fiora',
        score: 9,
        reason:
          'Fiora vital procs deal percent max HP true damage, melting Sion\'s massive HP pool. Riposte blocks his Q or R.',
        winCondition:
          'Parry his Q charge or R channel, proc vitals, and split push. He cannot match you in side lane.',
        tips: [
          'Riposte his Q charge for a free stun.',
          'His enormous hitbox makes proccing all four R vitals trivial.',
          'Split push relentlessly — he needs to group for team fights.',
        ],
        runes: {
          primaryTree: 'Precision',
          primaryKeystones: ['Conqueror', 'Triumph', 'Legend: Alacrity', 'Last Stand'],
          secondaryTree: 'Resolve',
          secondaryRunes: ['Second Wind', 'Overgrowth'],
          shards: ['Adaptive Force', 'Adaptive Force', 'Health'],
        },
        items: {
          start: ["Doran's Blade", 'Health Potion'],
          core: ['Trinity Force', 'Ravenous Hydra', "Sterak's Gage"],
          boots: ['Mercury\'s Treads'],
          situational: ["Death's Dance", 'Hullbreaker', 'Guardian Angel'],
        },
      },
      {
        id: 'Vayne',
        score: 8,
        reason:
          'Vayne percent HP true damage shreds Sion\'s massive health pool. She dodges his Q with tumble easily.',
        winCondition:
          'Kite, tumble his Q, proc Silver Bolts. His health stacking is useless against true damage.',
        tips: [
          'Tumble his Q charge — it is slow and obvious.',
          'Condemn into wall for massive burst.',
          'Every three autos take a huge chunk of his HP bar.',
        ],
        runes: {
          primaryTree: 'Precision',
          primaryKeystones: ['Press the Attack', 'Triumph', 'Legend: Alacrity', 'Cut Down'],
          secondaryTree: 'Resolve',
          secondaryRunes: ['Bone Plating', 'Overgrowth'],
          shards: ['Attack Speed', 'Adaptive Force', 'Health'],
        },
        items: {
          start: ["Doran's Blade", 'Health Potion'],
          core: ['Blade of the Ruined King', 'Guinsoo\'s Rageblade', 'Phantom Dancer'],
          boots: ['Boots of Swiftness'],
          situational: ['Mortal Reminder', 'Guardian Angel', "Wit's End"],
        },
      },
      {
        id: 'Gwen',
        score: 7,
        reason:
          'Gwen percent HP damage shreds Sion, and her W blocks his Q and E from outside the mist.',
        winCondition:
          'W his Q, trade with center Q, and outscale. His HP stacking plays into your percent damage.',
        tips: [
          'W blocks his Q and E from outside your mist.',
          'Center Q damage increases with his HP — he builds what you counter.',
          'You outscale in side lane matchups.',
        ],
        runes: {
          primaryTree: 'Precision',
          primaryKeystones: ['Conqueror', 'Triumph', 'Legend: Alacrity', 'Last Stand'],
          secondaryTree: 'Resolve',
          secondaryRunes: ['Second Wind', 'Overgrowth'],
          shards: ['Attack Speed', 'Adaptive Force', 'Health'],
        },
        items: {
          start: ["Doran's Blade", 'Health Potion'],
          core: ['Riftmaker', "Nashor's Tooth", 'Cosmic Drive'],
          boots: ['Mercury\'s Treads'],
          situational: ["Zhonya's Hourglass", "Rabadon's Deathcap", 'Morellonomicon'],
        },
      },
    ],
  },

  /* ================================================================ */
  /*  SKARNER                                                         */
  /* ================================================================ */
  Skarner: {
    counters: [
      {
        id: 'Gwen',
        score: 8,
        reason:
          'Gwen percent HP damage shreds Skarner and her W blocks his abilities from outside. She outscales.',
        winCondition:
          'W his engage, trade with center Q, outscale. He cannot handle your sustained DPS.',
        tips: [
          'W mist blocks his abilities from outside.',
          'Center Q deals huge damage against his HP.',
          'You outscale him in side lane.',
        ],
        runes: {
          primaryTree: 'Precision',
          primaryKeystones: ['Conqueror', 'Triumph', 'Legend: Alacrity', 'Last Stand'],
          secondaryTree: 'Resolve',
          secondaryRunes: ['Bone Plating', 'Overgrowth'],
          shards: ['Attack Speed', 'Adaptive Force', 'Health'],
        },
        items: {
          start: ["Doran's Blade", 'Health Potion'],
          core: ['Riftmaker', "Nashor's Tooth", 'Cosmic Drive'],
          boots: ['Mercury\'s Treads'],
          situational: ["Zhonya's Hourglass", "Rabadon's Deathcap", 'Morellonomicon'],
        },
      },
      {
        id: 'Vayne',
        score: 7,
        reason:
          'Vayne true damage melts Skarner and she kites him with tumble and condemn.',
        winCondition:
          'Kite, Silver Bolts, condemn away. His tank stats are useless against your true damage.',
        tips: [
          'Tumble his engage attempts.',
          'Condemn creates distance from his suppression.',
          'QSS removes his R suppression if he catches you.',
        ],
        runes: {
          primaryTree: 'Precision',
          primaryKeystones: ['Press the Attack', 'Triumph', 'Legend: Alacrity', 'Cut Down'],
          secondaryTree: 'Resolve',
          secondaryRunes: ['Bone Plating', 'Overgrowth'],
          shards: ['Attack Speed', 'Adaptive Force', 'Health'],
        },
        items: {
          start: ["Doran's Blade", 'Health Potion'],
          core: ['Blade of the Ruined King', 'Guinsoo\'s Rageblade', 'Phantom Dancer'],
          boots: ['Boots of Swiftness'],
          situational: ['Quicksilver Sash', 'Guardian Angel', "Wit's End"],
        },
      },
      {
        id: 'Fiora',
        score: 7,
        reason:
          'Fiora Riposte blocks Skarner\'s R suppression and her vitals shred his HP pool.',
        winCondition:
          'Parry his R for a stun, then run him down with vitals. He is helpless against your dueling.',
        tips: [
          'Riposte his R suppression — it is his only threat.',
          'Vitals shred his HP easily.',
          'Split push relentlessly — he needs to be with his team.',
        ],
        runes: {
          primaryTree: 'Precision',
          primaryKeystones: ['Conqueror', 'Triumph', 'Legend: Alacrity', 'Last Stand'],
          secondaryTree: 'Resolve',
          secondaryRunes: ['Bone Plating', 'Overgrowth'],
          shards: ['Adaptive Force', 'Adaptive Force', 'Health'],
        },
        items: {
          start: ["Doran's Blade", 'Health Potion'],
          core: ['Trinity Force', 'Ravenous Hydra', "Sterak's Gage"],
          boots: ['Mercury\'s Treads'],
          situational: ["Death's Dance", 'Hullbreaker', 'Guardian Angel'],
        },
      },
    ],
  },

  /* ================================================================ */
  /*  SMOLDER                                                         */
  /* ================================================================ */
  Smolder: {
    counters: [
      {
        id: 'Irelia',
        score: 9,
        reason:
          'Irelia all-ins Smolder easily — he is squishy, immobile, and cannot duel her at any stage.',
        winCondition:
          'Stack passive, Q-dash in, and burst him. He has no escape and dies to your all-in.',
        tips: [
          'Dash through minions onto him for guaranteed kills.',
          'He is one of the squishiest top laners — full combo kills him.',
          'Zone him off CS early and he never scales.',
        ],
        runes: {
          primaryTree: 'Precision',
          primaryKeystones: ['Conqueror', 'Triumph', 'Legend: Alacrity', 'Last Stand'],
          secondaryTree: 'Resolve',
          secondaryRunes: ['Bone Plating', 'Overgrowth'],
          shards: ['Attack Speed', 'Adaptive Force', 'Health'],
        },
        items: {
          start: ["Doran's Blade", 'Health Potion'],
          core: ['Blade of the Ruined King', 'Trinity Force', "Sterak's Gage"],
          boots: ['Mercury\'s Treads'],
          situational: ["Death's Dance", "Wit's End", 'Guardian Angel'],
        },
      },
      {
        id: 'Camille',
        score: 8,
        reason:
          'Camille hookshot reaches Smolder from range and her ult locks him down with no escape.',
        winCondition:
          'E-hookshot in, ult to trap him, and burst with Q2 true damage. He cannot escape Hextech Ultimatum.',
        tips: [
          'Hookshot range is longer than his poke range.',
          'R locks him in — he has zero mobility to escape.',
          'Q2 true damage bursts him incredibly fast.',
        ],
        runes: {
          primaryTree: 'Precision',
          primaryKeystones: ['Conqueror', 'Triumph', 'Legend: Alacrity', 'Last Stand'],
          secondaryTree: 'Resolve',
          secondaryRunes: ['Bone Plating', 'Overgrowth'],
          shards: ['Adaptive Force', 'Adaptive Force', 'Health'],
        },
        items: {
          start: ["Doran's Blade", 'Health Potion'],
          core: ['Trinity Force', 'Ravenous Hydra', "Sterak's Gage"],
          boots: ['Mercury\'s Treads'],
          situational: ["Death's Dance", 'Guardian Angel', 'Hullbreaker'],
        },
      },
      {
        id: 'Pantheon',
        score: 8,
        reason:
          'Pantheon point-and-click stun and burst destroys Smolder before he can react. Roam with R to snowball.',
        winCondition:
          'W-stun, emp-Q, auto combo. He is too squishy to survive your level 3 all-in.',
        tips: [
          'Your W is targeted — he cannot dodge it.',
          'Emp Q after stun chunks him massively.',
          'Push and roam after killing him to spread the lead.',
        ],
        runes: {
          primaryTree: 'Precision',
          primaryKeystones: ['Press the Attack', 'Triumph', 'Legend: Tenacity', 'Last Stand'],
          secondaryTree: 'Domination',
          secondaryRunes: ['Sudden Impact', 'Treasure Hunter'],
          shards: ['Adaptive Force', 'Adaptive Force', 'Armor'],
        },
        items: {
          start: ["Doran's Blade", 'Health Potion'],
          core: ['Eclipse', 'Black Cleaver', "Death's Dance"],
          boots: ['Mercury\'s Treads'],
          situational: ['Maw of Malmortius', 'Guardian Angel', 'Hullbreaker'],
        },
      },
    ],
  },

  /* ================================================================ */
  /*  SYLAS                                                           */
  /* ================================================================ */
  Sylas: {
    counters: [
      {
        id: 'Aatrox',
        score: 8,
        reason:
          'Aatrox out-ranges Sylas with Q sweet-spots and his sustain matches Sylas W healing. Aatrox ult is poor for Sylas to steal.',
        winCondition:
          'Space with Q sweet-spots, W pull when he E2 dashes in, and sustain through his trades. Your ult is not great for him.',
        tips: [
          'Hit Q sweet-spots to out-range his combo.',
          'W pull catches him after he E2 dashes in.',
          'Your ult gives him a weaker version — less synergy for Sylas.',
        ],
        runes: {
          primaryTree: 'Precision',
          primaryKeystones: ['Conqueror', 'Triumph', 'Legend: Tenacity', 'Last Stand'],
          secondaryTree: 'Resolve',
          secondaryRunes: ['Second Wind', 'Overgrowth'],
          shards: ['Adaptive Force', 'Adaptive Force', 'Health'],
        },
        items: {
          start: ["Doran's Blade", 'Health Potion'],
          core: ['Black Cleaver', "Sterak's Gage", "Death's Dance"],
          boots: ['Mercury\'s Treads'],
          situational: ['Ravenous Hydra', 'Guardian Angel', 'Hullbreaker'],
        },
      },
      {
        id: 'Renekton',
        score: 7,
        reason:
          'Renekton burst combo with empowered W stun wins every short trade against Sylas early.',
        winCondition:
          'E in, fury W stun, Q, E out. You win every short trade and he cannot heal back efficiently.',
        tips: [
          'Fury W burst through his early game is overwhelming.',
          'Trade aggressively levels 1-5.',
          'Build Executioner\'s early to cut his W healing.',
        ],
        runes: {
          primaryTree: 'Precision',
          primaryKeystones: ['Conqueror', 'Triumph', 'Legend: Tenacity', 'Last Stand'],
          secondaryTree: 'Resolve',
          secondaryRunes: ['Bone Plating', 'Unflinching'],
          shards: ['Adaptive Force', 'Adaptive Force', 'Health'],
        },
        items: {
          start: ["Doran's Blade", 'Health Potion'],
          core: ['Blade of the Ruined King', 'Black Cleaver', "Sterak's Gage"],
          boots: ['Mercury\'s Treads'],
          situational: ["Death's Dance", 'Mortal Reminder', 'Guardian Angel'],
        },
      },
      {
        id: 'Darius',
        score: 7,
        reason:
          'Darius stacks passive bleed and his sustained damage overwhelms Sylas in extended trades.',
        winCondition:
          'E pull when he E2 dashes in, stack passive, all-in with R execute. He cannot out-trade your bleed.',
        tips: [
          'Pull him when he dashes in with E2.',
          'Your bleed passive wins extended trades.',
          'Ghost helps you stick to him through his kit.',
        ],
        runes: {
          primaryTree: 'Precision',
          primaryKeystones: ['Conqueror', 'Triumph', 'Legend: Tenacity', 'Last Stand'],
          secondaryTree: 'Resolve',
          secondaryRunes: ['Bone Plating', 'Unflinching'],
          shards: ['Adaptive Force', 'Adaptive Force', 'Health'],
        },
        items: {
          start: ["Doran's Blade", 'Health Potion'],
          core: ['Trinity Force', "Sterak's Gage", "Death's Dance"],
          boots: ['Mercury\'s Treads'],
          situational: ['Black Cleaver', 'Hullbreaker', 'Guardian Angel'],
        },
      },
    ],
  },

  /* ================================================================ */
  /*  TAHM KENCH                                                      */
  /* ================================================================ */
  TahmKench: {
    counters: [
      {
        id: 'Fiora',
        score: 9,
        reason:
          'Fiora vitals shred Tahm Kench\'s massive HP and Riposte blocks his W knock-up or Q stun.',
        winCondition:
          'Parry his Q stun or W knock-up, proc vitals. His large model and slow movement make him an easy target.',
        tips: [
          'Riposte his Q stun after he stacks three passive hits.',
          'His large model makes hitting all four R vitals very easy.',
          'Anti-heal is essential against his E grey health shield.',
        ],
        runes: {
          primaryTree: 'Precision',
          primaryKeystones: ['Conqueror', 'Triumph', 'Legend: Alacrity', 'Last Stand'],
          secondaryTree: 'Resolve',
          secondaryRunes: ['Bone Plating', 'Overgrowth'],
          shards: ['Adaptive Force', 'Adaptive Force', 'Health'],
        },
        items: {
          start: ["Doran's Blade", 'Health Potion'],
          core: ['Trinity Force', 'Ravenous Hydra', "Sterak's Gage"],
          boots: ['Mercury\'s Treads'],
          situational: ['Mortal Reminder', "Death's Dance", 'Guardian Angel'],
        },
      },
      {
        id: 'Vayne',
        score: 8,
        reason:
          'Vayne Silver Bolts true damage ignores Tahm Kench\'s massive tank stats and she kites him easily.',
        winCondition:
          'Kite, proc Silver Bolts, condemn. His slow movement makes him easy to kite endlessly.',
        tips: [
          'Tumble his Q tongue lash.',
          'Condemn him into wall for burst.',
          'His E grey health shield cannot save him from true damage.',
        ],
        runes: {
          primaryTree: 'Precision',
          primaryKeystones: ['Press the Attack', 'Triumph', 'Legend: Alacrity', 'Cut Down'],
          secondaryTree: 'Resolve',
          secondaryRunes: ['Bone Plating', 'Overgrowth'],
          shards: ['Attack Speed', 'Adaptive Force', 'Health'],
        },
        items: {
          start: ["Doran's Blade", 'Health Potion'],
          core: ['Blade of the Ruined King', 'Guinsoo\'s Rageblade', 'Phantom Dancer'],
          boots: ['Boots of Swiftness'],
          situational: ['Mortal Reminder', 'Guardian Angel', "Wit's End"],
        },
      },
      {
        id: 'Gwen',
        score: 7,
        reason:
          'Gwen percent HP damage and W mist counter Tahm Kench\'s tank playstyle effectively.',
        winCondition:
          'W his tongue lash, trade with center Q for percent damage. You outscale.',
        tips: [
          'W blocks his Q from outside.',
          'Center Q shreds his massive HP.',
          'Riftmaker sustain matches his E shield regen.',
        ],
        runes: {
          primaryTree: 'Precision',
          primaryKeystones: ['Conqueror', 'Triumph', 'Legend: Alacrity', 'Last Stand'],
          secondaryTree: 'Resolve',
          secondaryRunes: ['Bone Plating', 'Overgrowth'],
          shards: ['Attack Speed', 'Adaptive Force', 'Health'],
        },
        items: {
          start: ["Doran's Blade", 'Health Potion'],
          core: ['Riftmaker', "Nashor's Tooth", 'Cosmic Drive'],
          boots: ['Mercury\'s Treads'],
          situational: ["Zhonya's Hourglass", "Rabadon's Deathcap", 'Morellonomicon'],
        },
      },
    ],
  },

  /* ================================================================ */
  /*  TEEMO                                                           */
  /* ================================================================ */
  Teemo: {
    counters: [
      {
        id: 'Irelia',
        score: 9,
        reason:
          'Irelia dashes onto Teemo through minions and kills him before his blind wears off. He is too squishy to survive.',
        winCondition:
          'Stack passive, Q-dash in. Even blinded, your Q deals magic on-hit damage and your abilities still hit.',
        tips: [
          'Q damage is not blocked by his blind — it applies on-hit.',
          'Dash through minions to reach him instantly.',
          'After level 6 your all-in is always lethal.',
        ],
        runes: {
          primaryTree: 'Precision',
          primaryKeystones: ['Conqueror', 'Triumph', 'Legend: Tenacity', 'Last Stand'],
          secondaryTree: 'Resolve',
          secondaryRunes: ['Second Wind', 'Unflinching'],
          shards: ['Attack Speed', 'Adaptive Force', 'Magic Resist'],
        },
        items: {
          start: ["Doran's Shield", 'Health Potion'],
          core: ['Blade of the Ruined King', "Wit's End", "Sterak's Gage"],
          boots: ['Mercury\'s Treads'],
          situational: ['Maw of Malmortius', "Death's Dance", 'Guardian Angel'],
        },
      },
      {
        id: 'Yasuo',
        score: 7,
        reason:
          'Yasuo Windwall blocks Teemo blind and he dashes through minions to reach Teemo.',
        winCondition:
          'Windwall his Q blind, dash through minions, and all-in. He is too squishy.',
        tips: [
          'Windwall blocks his Q blind dart.',
          'E through wave to close the distance.',
          'Passive shield absorbs poke.',
        ],
        runes: {
          primaryTree: 'Precision',
          primaryKeystones: ['Conqueror', 'Triumph', 'Legend: Tenacity', 'Last Stand'],
          secondaryTree: 'Resolve',
          secondaryRunes: ['Second Wind', 'Overgrowth'],
          shards: ['Attack Speed', 'Adaptive Force', 'Magic Resist'],
        },
        items: {
          start: ["Doran's Shield", 'Health Potion'],
          core: ['Blade of the Ruined King', 'Infinity Edge', "Death's Dance"],
          boots: ['Mercury\'s Treads'],
          situational: ['Maw of Malmortius', "Sterak's Gage", "Wit's End"],
        },
      },
      {
        id: 'Pantheon',
        score: 7,
        reason:
          'Pantheon targeted stun and burst combo destroys Teemo. E shield blocks his damage.',
        winCondition:
          'W-stun into empowered Q kills him quickly. E blocks his blind and poison damage.',
        tips: [
          'W is targeted — he cannot blind to stop it.',
          'E blocks his auto-attack damage during the channel.',
          'Bush control prevents him from poking you.',
        ],
        runes: {
          primaryTree: 'Precision',
          primaryKeystones: ['Press the Attack', 'Triumph', 'Legend: Tenacity', 'Last Stand'],
          secondaryTree: 'Domination',
          secondaryRunes: ['Sudden Impact', 'Treasure Hunter'],
          shards: ['Adaptive Force', 'Adaptive Force', 'Magic Resist'],
        },
        items: {
          start: ["Doran's Shield", 'Health Potion'],
          core: ['Eclipse', 'Black Cleaver', "Death's Dance"],
          boots: ['Mercury\'s Treads'],
          situational: ['Maw of Malmortius', 'Guardian Angel', 'Hullbreaker'],
        },
      },
    ],
  },

  /* ================================================================ */
  /*  TRUNDLE                                                         */
  /* ================================================================ */
  Trundle: {
    counters: [
      {
        id: 'Vayne',
        score: 8,
        reason:
          'Vayne kites Trundle with tumble and Silver Bolts shred him. He has no gap closer to reach her.',
        winCondition:
          'Kite backwards, tumble over his pillar, and condemn him away. Silver Bolts ignore his stolen stats.',
        tips: [
          'Tumble over or around his ice pillar.',
          'Condemn him into his own pillar for a wall stun.',
          'His R stat steal does not help if you never let him auto you.',
        ],
        runes: {
          primaryTree: 'Precision',
          primaryKeystones: ['Press the Attack', 'Triumph', 'Legend: Alacrity', 'Cut Down'],
          secondaryTree: 'Resolve',
          secondaryRunes: ['Bone Plating', 'Overgrowth'],
          shards: ['Attack Speed', 'Adaptive Force', 'Health'],
        },
        items: {
          start: ["Doran's Blade", 'Health Potion'],
          core: ['Blade of the Ruined King', 'Phantom Dancer', 'Infinity Edge'],
          boots: ['Boots of Swiftness'],
          situational: ['Mortal Reminder', 'Guardian Angel', "Wit's End"],
        },
      },
      {
        id: 'Quinn',
        score: 7,
        reason:
          'Quinn kites Trundle, blinds his autos, and vaults over his pillar placement.',
        winCondition:
          'Poke from range, blind his autos, vault away. He can never touch you.',
        tips: [
          'Vault over his ice pillar terrain.',
          'Q blind negates his auto-attack-reliant damage.',
          'Kite him endlessly — he has no dash.',
        ],
        runes: {
          primaryTree: 'Precision',
          primaryKeystones: ['Press the Attack', 'Triumph', 'Legend: Alacrity', 'Cut Down'],
          secondaryTree: 'Resolve',
          secondaryRunes: ['Bone Plating', 'Overgrowth'],
          shards: ['Attack Speed', 'Adaptive Force', 'Health'],
        },
        items: {
          start: ["Doran's Blade", 'Health Potion'],
          core: ['Blade of the Ruined King', 'Phantom Dancer', 'Infinity Edge'],
          boots: ['Boots of Swiftness'],
          situational: ['Mortal Reminder', 'Guardian Angel', "Lord Dominik's Regards"],
        },
      },
      {
        id: 'Gnar',
        score: 7,
        reason:
          'Gnar pokes Trundle from range and hops away from him. Trundle can never close the gap.',
        winCondition:
          'Poke as Mini Gnar, hop away when he runs at you. Team fight better with Mega Gnar.',
        tips: [
          'Hop over his pillar to escape.',
          'Q boomerang slows him further when he chases.',
          'Never let him melee you as Mini Gnar.',
        ],
        runes: {
          primaryTree: 'Precision',
          primaryKeystones: ['Fleet Footwork', 'Triumph', 'Legend: Alacrity', 'Last Stand'],
          secondaryTree: 'Resolve',
          secondaryRunes: ['Second Wind', 'Overgrowth'],
          shards: ['Attack Speed', 'Adaptive Force', 'Health'],
        },
        items: {
          start: ["Doran's Blade", 'Health Potion'],
          core: ['Trinity Force', 'Black Cleaver', "Sterak's Gage"],
          boots: ['Boots of Swiftness'],
          situational: ["Death's Dance", 'Mortal Reminder', 'Guardian Angel'],
        },
      },
    ],
  },

  /* ================================================================ */
  /*  TRYNDAMERE                                                      */
  /* ================================================================ */
  Tryndamere: {
    counters: [
      {
        id: 'Malphite',
        score: 8,
        reason:
          'Malphite E attack speed slow cripples Tryndamere\'s auto-attack DPS and armor stacking makes him unkillable.',
        winCondition:
          'Stack armor, E his autos, Q poke. He cannot kill you and you are far more useful in team fights.',
        tips: [
          'E attack speed slow makes his DPS meaningless.',
          'Passive shield absorbs his poke attempts.',
          'You outperform him in team fights by a massive margin.',
        ],
        runes: {
          primaryTree: 'Resolve',
          primaryKeystones: ['Grasp of the Undying', 'Shield Bash', 'Conditioning', 'Overgrowth'],
          secondaryTree: 'Sorcery',
          secondaryRunes: ['Manaflow Band', 'Scorch'],
          shards: ['Ability Haste', 'Adaptive Force', 'Armor'],
        },
        items: {
          start: ["Doran's Ring", 'Health Potion', 'Health Potion'],
          core: ['Hollow Radiance', 'Thornmail', "Randuin's Omen"],
          boots: ['Plated Steelcaps'],
          situational: ["Jak'Sho, the Protean", 'Spirit Visage', 'Force of Nature'],
        },
      },
      {
        id: 'Nasus',
        score: 7,
        reason:
          'Nasus W wither is devastating against Tryndamere — slowing his attack speed and movement speed to a crawl.',
        winCondition:
          'W wither him when he spins in, stack Q, and outscale. He literally cannot auto attack during wither.',
        tips: [
          'Wither reduces his attack speed by 50%+ — it destroys his DPS.',
          'Stack Q safely; you outscale him hard.',
          'Frozen Heart further reduces his attack speed.',
        ],
        runes: {
          primaryTree: 'Resolve',
          primaryKeystones: ['Grasp of the Undying', 'Demolish', 'Second Wind', 'Overgrowth'],
          secondaryTree: 'Precision',
          secondaryRunes: ['Triumph', 'Legend: Tenacity'],
          shards: ['Ability Haste', 'Adaptive Force', 'Armor'],
        },
        items: {
          start: ["Doran's Shield", 'Health Potion'],
          core: ['Frozen Heart', 'Spirit Visage', 'Trinity Force'],
          boots: ['Plated Steelcaps'],
          situational: ["Randuin's Omen", 'Thornmail', 'Hullbreaker'],
        },
      },
      {
        id: 'Jax',
        score: 7,
        reason:
          'Jax Counter Strike blocks all of Tryndamere\'s auto attacks and his stun wins trades.',
        winCondition:
          'E his autos, stun, trade. You outscale him in late-game split push with Trinity Force.',
        tips: [
          'Counter Strike blocks every auto attack he throws.',
          'Wait for him to use E spin, then jump on him.',
          'You outscale in split push — be patient.',
        ],
        runes: {
          primaryTree: 'Precision',
          primaryKeystones: ['Conqueror', 'Triumph', 'Legend: Alacrity', 'Last Stand'],
          secondaryTree: 'Resolve',
          secondaryRunes: ['Bone Plating', 'Overgrowth'],
          shards: ['Attack Speed', 'Adaptive Force', 'Health'],
        },
        items: {
          start: ["Doran's Blade", 'Health Potion'],
          core: ['Trinity Force', 'Blade of the Ruined King', "Sterak's Gage"],
          boots: ['Plated Steelcaps'],
          situational: ["Death's Dance", "Wit's End", 'Guardian Angel'],
        },
      },
    ],
  },

  /* ================================================================ */
  /*  UDYR                                                            */
  /* ================================================================ */
  Udyr: {
    counters: [
      {
        id: 'Vayne',
        score: 8,
        reason:
          'Vayne kites Udyr with tumble and condemn. He has to run at her and she creates distance endlessly.',
        winCondition:
          'Kite, Silver Bolts, condemn. He has no gap closer and just runs at you.',
        tips: [
          'Tumble away when he runs at you.',
          'Condemn creates huge distance.',
          'He has zero ranged abilities — pure kiting.',
        ],
        runes: {
          primaryTree: 'Precision',
          primaryKeystones: ['Press the Attack', 'Triumph', 'Legend: Alacrity', 'Cut Down'],
          secondaryTree: 'Resolve',
          secondaryRunes: ['Bone Plating', 'Overgrowth'],
          shards: ['Attack Speed', 'Adaptive Force', 'Health'],
        },
        items: {
          start: ["Doran's Blade", 'Health Potion'],
          core: ['Blade of the Ruined King', 'Phantom Dancer', 'Infinity Edge'],
          boots: ['Boots of Swiftness'],
          situational: ['Mortal Reminder', 'Guardian Angel', "Wit's End"],
        },
      },
      {
        id: 'Quinn',
        score: 7,
        reason:
          'Quinn kites Udyr, blinds him, and vaults away. He cannot touch her.',
        winCondition:
          'Poke from range, blind, vault. He runs at you and you run away.',
        tips: [
          'Vault away whenever he gets close.',
          'Q blind negates his auto-based damage.',
          'Roam with R to spread leads while he farms.',
        ],
        runes: {
          primaryTree: 'Precision',
          primaryKeystones: ['Press the Attack', 'Triumph', 'Legend: Alacrity', 'Cut Down'],
          secondaryTree: 'Resolve',
          secondaryRunes: ['Second Wind', 'Overgrowth'],
          shards: ['Attack Speed', 'Adaptive Force', 'Health'],
        },
        items: {
          start: ["Doran's Blade", 'Health Potion'],
          core: ['Blade of the Ruined King', 'Phantom Dancer', 'Infinity Edge'],
          boots: ['Boots of Swiftness'],
          situational: ['Guardian Angel', 'Mortal Reminder', "Lord Dominik's Regards"],
        },
      },
      {
        id: 'Gnar',
        score: 7,
        reason:
          'Gnar pokes Udyr from range and hops away. Udyr can never close the gap against Mini Gnar.',
        winCondition:
          'Poke from range, hop away, and team fight better. He cannot reach you.',
        tips: [
          'Hop away whenever he runs at you.',
          'Q boomerang slows him to create more distance.',
          'Mega Gnar R is much more impactful in team fights.',
        ],
        runes: {
          primaryTree: 'Precision',
          primaryKeystones: ['Fleet Footwork', 'Triumph', 'Legend: Alacrity', 'Last Stand'],
          secondaryTree: 'Resolve',
          secondaryRunes: ['Second Wind', 'Overgrowth'],
          shards: ['Attack Speed', 'Adaptive Force', 'Health'],
        },
        items: {
          start: ["Doran's Blade", 'Health Potion'],
          core: ['Trinity Force', 'Black Cleaver', "Sterak's Gage"],
          boots: ['Boots of Swiftness'],
          situational: ["Death's Dance", 'Maw of Malmortius', 'Guardian Angel'],
        },
      },
    ],
  },

  /* ================================================================ */
  /*  URGOT                                                           */
  /* ================================================================ */
  Urgot: {
    counters: [
      {
        id: 'Mordekaiser',
        score: 8,
        reason:
          'Mordekaiser Death Realm isolates Urgot and his sustained magic damage beats Urgot in 1v1.',
        winCondition:
          'Poke with Q, E pull, R into Death Realm. He loses the isolated duel.',
        tips: [
          'Death Realm neutralizes his team-fight presence.',
          'Your magic damage bypasses his armor itemization.',
          'Dodge his E flip by sidestepping.',
        ],
        runes: {
          primaryTree: 'Precision',
          primaryKeystones: ['Conqueror', 'Triumph', 'Legend: Tenacity', 'Last Stand'],
          secondaryTree: 'Resolve',
          secondaryRunes: ['Second Wind', 'Overgrowth'],
          shards: ['Adaptive Force', 'Adaptive Force', 'Health'],
        },
        items: {
          start: ["Doran's Shield", 'Health Potion'],
          core: ['Riftmaker', "Rylai's Crystal Scepter", "Zhonya's Hourglass"],
          boots: ['Mercury\'s Treads'],
          situational: ['Morellonomicon', "Rabadon's Deathcap", 'Cosmic Drive'],
        },
      },
      {
        id: 'Vayne',
        score: 7,
        reason:
          'Vayne kites Urgot and Silver Bolts shred his HP. She condemns him away when he tries to E-flip.',
        winCondition:
          'Kite, Silver Bolts, condemn. Dodge his E with tumble and he can never fight you.',
        tips: [
          'Tumble his E flip — it is telegraphed.',
          'Condemn him away to reset the fight.',
          'Silver Bolts ignore his tank stats.',
        ],
        runes: {
          primaryTree: 'Precision',
          primaryKeystones: ['Press the Attack', 'Triumph', 'Legend: Alacrity', 'Cut Down'],
          secondaryTree: 'Resolve',
          secondaryRunes: ['Bone Plating', 'Overgrowth'],
          shards: ['Attack Speed', 'Adaptive Force', 'Health'],
        },
        items: {
          start: ["Doran's Blade", 'Health Potion'],
          core: ['Blade of the Ruined King', 'Phantom Dancer', 'Infinity Edge'],
          boots: ['Boots of Swiftness'],
          situational: ['Mortal Reminder', 'Guardian Angel', "Wit's End"],
        },
      },
      {
        id: 'Fiora',
        score: 7,
        reason:
          'Fiora Ripostes Urgot\'s E flip for a stun and her vitals shred his HP.',
        winCondition:
          'Parry his E flip for a stun, proc vitals, and out-duel him. He cannot match you in side lane.',
        tips: [
          'Riposte his E flip — it is very telegraphed.',
          'Proc vitals around his large hitbox.',
          'You outscale in split push.',
        ],
        runes: {
          primaryTree: 'Precision',
          primaryKeystones: ['Conqueror', 'Triumph', 'Legend: Alacrity', 'Last Stand'],
          secondaryTree: 'Resolve',
          secondaryRunes: ['Bone Plating', 'Overgrowth'],
          shards: ['Adaptive Force', 'Adaptive Force', 'Health'],
        },
        items: {
          start: ["Doran's Blade", 'Health Potion'],
          core: ['Trinity Force', 'Ravenous Hydra', "Sterak's Gage"],
          boots: ['Mercury\'s Treads'],
          situational: ["Death's Dance", 'Hullbreaker', 'Guardian Angel'],
        },
      },
    ],
  },

  /* ================================================================ */
  /*  VAYNE                                                           */
  /* ================================================================ */
  Vayne: {
    counters: [
      {
        id: 'Malphite',
        score: 9,
        reason:
          'Malphite R is an unavoidable engage that one-shots squishy Vayne. His Q slows her kiting.',
        winCondition:
          'Survive early with passive shield and Q poke, then R one-shot her at level 6.',
        tips: [
          'Your R is point-and-click death for squishy Vayne.',
          'Q slow prevents her from kiting you.',
          'Stack armor — her true damage is only every third auto.',
        ],
        runes: {
          primaryTree: 'Resolve',
          primaryKeystones: ['Grasp of the Undying', 'Shield Bash', 'Bone Plating', 'Overgrowth'],
          secondaryTree: 'Sorcery',
          secondaryRunes: ['Manaflow Band', 'Scorch'],
          shards: ['Ability Haste', 'Adaptive Force', 'Armor'],
        },
        items: {
          start: ["Doran's Ring", 'Health Potion', 'Health Potion'],
          core: ['Hollow Radiance', 'Thornmail', "Randuin's Omen"],
          boots: ['Plated Steelcaps'],
          situational: ["Jak'Sho, the Protean", 'Spirit Visage', 'Force of Nature'],
        },
      },
      {
        id: 'Renekton',
        score: 8,
        reason:
          'Renekton double-dash E reaches Vayne and his empowered W stun burst kills her.',
        winCondition:
          'E-E double dash onto her, W stun, Q. She dies to one combo. Do not let her free-farm.',
        tips: [
          'Double E dash closes the gap — she cannot kite two dashes.',
          'Empowered W stun locks her down for your full combo.',
          'Freeze and zone her — she is too squishy for melee range.',
        ],
        runes: {
          primaryTree: 'Precision',
          primaryKeystones: ['Conqueror', 'Triumph', 'Legend: Tenacity', 'Last Stand'],
          secondaryTree: 'Resolve',
          secondaryRunes: ['Bone Plating', 'Unflinching'],
          shards: ['Adaptive Force', 'Adaptive Force', 'Health'],
        },
        items: {
          start: ["Doran's Blade", 'Health Potion'],
          core: ['Blade of the Ruined King', 'Black Cleaver', "Sterak's Gage"],
          boots: ['Plated Steelcaps'],
          situational: ["Death's Dance", 'Guardian Angel', 'Hullbreaker'],
        },
      },
      {
        id: 'Pantheon',
        score: 7,
        reason:
          'Pantheon point-and-click stun and burst one-shots Vayne. She cannot dodge his W.',
        winCondition:
          'W-stun, emp-Q, auto. She dies to your level 3 combo.',
        tips: [
          'Your W is undodgeable — she cannot tumble it.',
          'E blocks her autos during the channel.',
          'Bush control lets you W without her seeing.',
        ],
        runes: {
          primaryTree: 'Precision',
          primaryKeystones: ['Press the Attack', 'Triumph', 'Legend: Tenacity', 'Last Stand'],
          secondaryTree: 'Domination',
          secondaryRunes: ['Sudden Impact', 'Treasure Hunter'],
          shards: ['Adaptive Force', 'Adaptive Force', 'Armor'],
        },
        items: {
          start: ["Doran's Shield", 'Health Potion'],
          core: ['Eclipse', 'Black Cleaver', "Death's Dance"],
          boots: ['Plated Steelcaps'],
          situational: ["Sterak's Gage", 'Guardian Angel', 'Hullbreaker'],
        },
      },
    ],
  },

  /* ================================================================ */
  /*  VLADIMIR                                                        */
  /* ================================================================ */
  Vladimir: {
    counters: [
      {
        id: 'Aatrox',
        score: 8,
        reason:
          'Aatrox can hit Vladimir with Q sweet-spots even after he pools, and his healing reduction on passive chunks Vladimir.',
        winCondition:
          'Q sweet-spot poke, W pull when he comes back from pool, and all-in at 6. Your sustain matches his.',
        tips: [
          'His pool has a very long cooldown — punish after he uses it.',
          'W pull catches him after pool ends.',
          'Your healing sustain matches his in lane.',
        ],
        runes: {
          primaryTree: 'Precision',
          primaryKeystones: ['Conqueror', 'Triumph', 'Legend: Tenacity', 'Last Stand'],
          secondaryTree: 'Resolve',
          secondaryRunes: ['Second Wind', 'Overgrowth'],
          shards: ['Adaptive Force', 'Adaptive Force', 'Magic Resist'],
        },
        items: {
          start: ["Doran's Blade", 'Health Potion'],
          core: ['Black Cleaver', "Sterak's Gage", "Death's Dance"],
          boots: ['Mercury\'s Treads'],
          situational: ['Maw of Malmortius', 'Ravenous Hydra', 'Guardian Angel'],
        },
      },
      {
        id: 'Irelia',
        score: 8,
        reason:
          'Irelia dashes onto Vladimir and kills him before he can pool. Her sustained DPS overwhelms his healing.',
        winCondition:
          'Stack passive, Q-dash in, and all-in. He is squishy without pool and you burst him quickly.',
        tips: [
          'Full passive stacks and you burst him before he can pool.',
          'If he pools, wait for it to end then continue the all-in.',
          'Blade of the Ruined King rush gives overwhelming early kill pressure.',
        ],
        runes: {
          primaryTree: 'Precision',
          primaryKeystones: ['Conqueror', 'Triumph', 'Legend: Tenacity', 'Last Stand'],
          secondaryTree: 'Resolve',
          secondaryRunes: ['Second Wind', 'Unflinching'],
          shards: ['Attack Speed', 'Adaptive Force', 'Magic Resist'],
        },
        items: {
          start: ["Doran's Shield", 'Health Potion'],
          core: ['Blade of the Ruined King', "Wit's End", "Sterak's Gage"],
          boots: ['Mercury\'s Treads'],
          situational: ['Maw of Malmortius', "Death's Dance", 'Guardian Angel'],
        },
      },
      {
        id: 'Renekton',
        score: 7,
        reason:
          'Renekton E-W-Q combo bursts Vladimir through his pool cooldown and his early pressure denies Vladimir scaling.',
        winCondition:
          'E in, W stun, Q, E out. He cannot pool during stun. Repeat until he is dead.',
        tips: [
          'His pool has a 28 second cooldown early — punish the window.',
          'Fury W stun prevents him from pooling your combo.',
          'Press the lead before he scales with AP and CDR.',
        ],
        runes: {
          primaryTree: 'Precision',
          primaryKeystones: ['Conqueror', 'Triumph', 'Legend: Tenacity', 'Last Stand'],
          secondaryTree: 'Resolve',
          secondaryRunes: ['Second Wind', 'Unflinching'],
          shards: ['Adaptive Force', 'Adaptive Force', 'Magic Resist'],
        },
        items: {
          start: ["Doran's Shield", 'Health Potion'],
          core: ['Blade of the Ruined King', 'Black Cleaver', "Sterak's Gage"],
          boots: ['Mercury\'s Treads'],
          situational: ["Death's Dance", 'Maw of Malmortius', 'Guardian Angel'],
        },
      },
    ],
  },

  /* ================================================================ */
  /*  VOLIBEAR                                                        */
  /* ================================================================ */
  Volibear: {
    counters: [
      {
        id: 'Gwen',
        score: 8,
        reason:
          'Gwen W blocks Volibear abilities from outside and her percent HP damage shreds his health pool.',
        winCondition:
          'W his engage, trade with center Q. You outscale in sustained fights.',
        tips: [
          'W mist blocks his E and Q from outside.',
          'Center Q does huge percent HP damage.',
          'Riftmaker sustain matches his W bite healing.',
        ],
        runes: {
          primaryTree: 'Precision',
          primaryKeystones: ['Conqueror', 'Triumph', 'Legend: Alacrity', 'Last Stand'],
          secondaryTree: 'Resolve',
          secondaryRunes: ['Bone Plating', 'Overgrowth'],
          shards: ['Attack Speed', 'Adaptive Force', 'Health'],
        },
        items: {
          start: ["Doran's Blade", 'Health Potion'],
          core: ['Riftmaker', "Nashor's Tooth", 'Cosmic Drive'],
          boots: ['Mercury\'s Treads'],
          situational: ["Zhonya's Hourglass", "Rabadon's Deathcap", 'Morellonomicon'],
        },
      },
      {
        id: 'Vayne',
        score: 7,
        reason:
          'Vayne kites Volibear and Silver Bolts shred his HP. Condemn stops his Q engage.',
        winCondition:
          'Kite backwards, condemn his Q run, and proc Silver Bolts. He cannot reach you.',
        tips: [
          'Condemn cancels his Q charge and stun.',
          'Tumble to dodge his E zone.',
          'Silver Bolts shred his health pool.',
        ],
        runes: {
          primaryTree: 'Precision',
          primaryKeystones: ['Press the Attack', 'Triumph', 'Legend: Alacrity', 'Cut Down'],
          secondaryTree: 'Resolve',
          secondaryRunes: ['Bone Plating', 'Overgrowth'],
          shards: ['Attack Speed', 'Adaptive Force', 'Health'],
        },
        items: {
          start: ["Doran's Blade", 'Health Potion'],
          core: ['Blade of the Ruined King', 'Phantom Dancer', 'Infinity Edge'],
          boots: ['Boots of Swiftness'],
          situational: ['Mortal Reminder', 'Guardian Angel', "Wit's End"],
        },
      },
      {
        id: 'Fiora',
        score: 7,
        reason:
          'Fiora Ripostes Volibear Q stun for a free stun back and her vitals shred his HP.',
        winCondition:
          'Parry his Q stun, proc vitals, out-duel him. You outscale in side lane.',
        tips: [
          'Riposte his Q stun — it is very telegraphed as he runs at you.',
          'Proc vitals during his long auto-attack animations.',
          'You outscale hard — play patient if behind.',
        ],
        runes: {
          primaryTree: 'Precision',
          primaryKeystones: ['Conqueror', 'Triumph', 'Legend: Alacrity', 'Last Stand'],
          secondaryTree: 'Resolve',
          secondaryRunes: ['Bone Plating', 'Overgrowth'],
          shards: ['Adaptive Force', 'Adaptive Force', 'Health'],
        },
        items: {
          start: ["Doran's Blade", 'Health Potion'],
          core: ['Trinity Force', 'Ravenous Hydra', "Sterak's Gage"],
          boots: ['Mercury\'s Treads'],
          situational: ["Death's Dance", 'Maw of Malmortius', 'Guardian Angel'],
        },
      },
    ],
  },

  /* ================================================================ */
  /*  WARWICK                                                         */
  /* ================================================================ */
  Warwick: {
    counters: [
      {
        id: 'Vayne',
        score: 8,
        reason:
          'Vayne kites Warwick and Silver Bolts shred his HP. Condemn stops his R leap.',
        winCondition:
          'Kite, Silver Bolts, condemn his R leap. He is kiteable and your damage outpaces his healing.',
        tips: [
          'Condemn stops his R leap mid-air.',
          'Silver Bolts true damage bypasses his damage reduction.',
          'Mortal Reminder cuts his massive healing.',
        ],
        runes: {
          primaryTree: 'Precision',
          primaryKeystones: ['Press the Attack', 'Triumph', 'Legend: Alacrity', 'Cut Down'],
          secondaryTree: 'Resolve',
          secondaryRunes: ['Bone Plating', 'Overgrowth'],
          shards: ['Attack Speed', 'Adaptive Force', 'Health'],
        },
        items: {
          start: ["Doran's Blade", 'Health Potion'],
          core: ['Blade of the Ruined King', 'Phantom Dancer', 'Infinity Edge'],
          boots: ['Boots of Swiftness'],
          situational: ['Mortal Reminder', 'Guardian Angel', "Wit's End"],
        },
      },
      {
        id: 'Gwen',
        score: 7,
        reason:
          'Gwen W blocks Warwick abilities from outside and her percent damage shreds him. Anti-heal from items cuts his sustain.',
        winCondition:
          'W his engage, trade with Q, and build anti-heal. Your sustained DPS beats his healing.',
        tips: [
          'W blocks his abilities from outside the mist.',
          'Center Q shreds his HP quickly.',
          'Build Morellonomicon to reduce his healing.',
        ],
        runes: {
          primaryTree: 'Precision',
          primaryKeystones: ['Conqueror', 'Triumph', 'Legend: Alacrity', 'Last Stand'],
          secondaryTree: 'Resolve',
          secondaryRunes: ['Bone Plating', 'Overgrowth'],
          shards: ['Attack Speed', 'Adaptive Force', 'Health'],
        },
        items: {
          start: ["Doran's Blade", 'Health Potion'],
          core: ['Riftmaker', "Nashor's Tooth", 'Morellonomicon'],
          boots: ['Mercury\'s Treads'],
          situational: ["Zhonya's Hourglass", "Rabadon's Deathcap", 'Cosmic Drive'],
        },
      },
      {
        id: 'Olaf',
        score: 7,
        reason:
          'Olaf R makes him immune to Warwick\'s CC and his sustained damage with lifesteal out-trades Warwick.',
        winCondition:
          'Pop R to become immune to his E fear and R suppress, then out-trade with lifesteal and axes.',
        tips: [
          'Your R makes you immune to his R suppress and E fear.',
          'Axe spam gives you sustain to match his healing.',
          'Trade aggressively when R is up.',
        ],
        runes: {
          primaryTree: 'Precision',
          primaryKeystones: ['Conqueror', 'Triumph', 'Legend: Alacrity', 'Last Stand'],
          secondaryTree: 'Resolve',
          secondaryRunes: ['Bone Plating', 'Unflinching'],
          shards: ['Attack Speed', 'Adaptive Force', 'Health'],
        },
        items: {
          start: ["Doran's Blade", 'Health Potion'],
          core: ['Blade of the Ruined King', 'Black Cleaver', "Sterak's Gage"],
          boots: ['Plated Steelcaps'],
          situational: ["Death's Dance", 'Mortal Reminder', 'Guardian Angel'],
        },
      },
    ],
  },

  /* ================================================================ */
  /*  WUKONG                                                          */
  /* ================================================================ */
  Wukong: {
    counters: [
      {
        id: 'Darius',
        score: 8,
        reason:
          'Darius E pull catches Wukong even through his clone and his bleed stacking wins every extended trade.',
        winCondition:
          'E pull when he clones in, stack passive, and all-in. He cannot out-trade your bleed.',
        tips: [
          'His clone does not save him from your E pull.',
          'Stack passive in extended trades — he loses.',
          'Ghost lets you stick through his clone movement speed.',
        ],
        runes: {
          primaryTree: 'Precision',
          primaryKeystones: ['Conqueror', 'Triumph', 'Legend: Tenacity', 'Last Stand'],
          secondaryTree: 'Resolve',
          secondaryRunes: ['Bone Plating', 'Unflinching'],
          shards: ['Adaptive Force', 'Adaptive Force', 'Health'],
        },
        items: {
          start: ["Doran's Blade", 'Health Potion'],
          core: ['Trinity Force', "Sterak's Gage", "Death's Dance"],
          boots: ['Mercury\'s Treads'],
          situational: ['Black Cleaver', 'Hullbreaker', 'Guardian Angel'],
        },
      },
      {
        id: 'Volibear',
        score: 7,
        reason:
          'Volibear stat-checks Wukong with raw base damage and sustain. His E and W out-trade Wukong short combos.',
        winCondition:
          'Run him down with Q, stack passive, W bite. Your raw stats win.',
        tips: [
          'Your raw stats beat his in melee.',
          'E shield absorbs his E-auto-Q combo.',
          'W second bite heal sustains you in trades.',
        ],
        runes: {
          primaryTree: 'Precision',
          primaryKeystones: ['Conqueror', 'Triumph', 'Legend: Alacrity', 'Last Stand'],
          secondaryTree: 'Resolve',
          secondaryRunes: ['Bone Plating', 'Unflinching'],
          shards: ['Attack Speed', 'Adaptive Force', 'Health'],
        },
        items: {
          start: ["Doran's Blade", 'Health Potion'],
          core: ['Blade of the Ruined King', 'Trinity Force', "Death's Dance"],
          boots: ['Plated Steelcaps'],
          situational: ["Sterak's Gage", "Wit's End", 'Spirit Visage'],
        },
      },
      {
        id: 'Mordekaiser',
        score: 7,
        reason:
          'Mordekaiser Death Realm isolates Wukong and his sustained damage wins the 1v1.',
        winCondition:
          'R him into Death Realm — his clone is useless and your sustained damage wins.',
        tips: [
          'Death Realm prevents him from using clone to juke in team fights.',
          'Your passive steals his stats in Death Realm.',
          'Sustained damage beats his burst combo.',
        ],
        runes: {
          primaryTree: 'Precision',
          primaryKeystones: ['Conqueror', 'Triumph', 'Legend: Tenacity', 'Last Stand'],
          secondaryTree: 'Resolve',
          secondaryRunes: ['Bone Plating', 'Overgrowth'],
          shards: ['Adaptive Force', 'Adaptive Force', 'Health'],
        },
        items: {
          start: ["Doran's Shield", 'Health Potion'],
          core: ['Riftmaker', "Rylai's Crystal Scepter", "Zhonya's Hourglass"],
          boots: ['Mercury\'s Treads'],
          situational: ['Morellonomicon', "Rabadon's Deathcap", 'Cosmic Drive'],
        },
      },
    ],
  },

  /* ================================================================ */
  /*  YASUO                                                           */
  /* ================================================================ */
  Yasuo: {
    counters: [
      {
        id: 'Renekton',
        score: 8,
        reason:
          'Renekton empowered W goes through Yasuo Windwall and his burst combo wins every short trade.',
        winCondition:
          'E in, W stun through Windwall, Q, E out. He cannot trade back through your burst.',
        tips: [
          'Your W stun is not a projectile — Windwall does nothing.',
          'E dash lets you gap close and disengage freely.',
          'Press your level 3 advantage hard.',
        ],
        runes: {
          primaryTree: 'Precision',
          primaryKeystones: ['Conqueror', 'Triumph', 'Legend: Tenacity', 'Last Stand'],
          secondaryTree: 'Resolve',
          secondaryRunes: ['Bone Plating', 'Unflinching'],
          shards: ['Adaptive Force', 'Adaptive Force', 'Health'],
        },
        items: {
          start: ["Doran's Blade", 'Health Potion'],
          core: ['Blade of the Ruined King', 'Black Cleaver', "Sterak's Gage"],
          boots: ['Plated Steelcaps'],
          situational: ["Death's Dance", 'Guardian Angel', 'Hullbreaker'],
        },
      },
      {
        id: 'Pantheon',
        score: 7,
        reason:
          'Pantheon W stun goes through Windwall and his early burst kills Yasuo repeatedly.',
        winCondition:
          'W-stun, emp-Q, auto. All your abilities ignore Windwall. Burst him before he scales.',
        tips: [
          'W, Q, and E are all non-projectiles — Windwall is useless.',
          'E blocks his tornado and auto attacks.',
          'Press your early advantage before he hits two items.',
        ],
        runes: {
          primaryTree: 'Precision',
          primaryKeystones: ['Press the Attack', 'Triumph', 'Legend: Tenacity', 'Last Stand'],
          secondaryTree: 'Domination',
          secondaryRunes: ['Sudden Impact', 'Treasure Hunter'],
          shards: ['Adaptive Force', 'Adaptive Force', 'Armor'],
        },
        items: {
          start: ["Doran's Blade", 'Health Potion'],
          core: ['Eclipse', 'Black Cleaver', "Death's Dance"],
          boots: ['Plated Steelcaps'],
          situational: ["Sterak's Gage", 'Guardian Angel', 'Hullbreaker'],
        },
      },
      {
        id: 'Jax',
        score: 7,
        reason:
          'Jax Counter Strike blocks Yasuo auto attacks and his stun punishes aggressive dashing.',
        winCondition:
          'E his autos, stun when he dashes in, trade. You outscale.',
        tips: [
          'Counter Strike blocks all his auto attacks during trades.',
          'Wait for him to dash in then activate E.',
          'You outscale massively in split push.',
        ],
        runes: {
          primaryTree: 'Precision',
          primaryKeystones: ['Conqueror', 'Triumph', 'Legend: Alacrity', 'Last Stand'],
          secondaryTree: 'Resolve',
          secondaryRunes: ['Bone Plating', 'Overgrowth'],
          shards: ['Attack Speed', 'Adaptive Force', 'Health'],
        },
        items: {
          start: ["Doran's Blade", 'Health Potion'],
          core: ['Trinity Force', 'Blade of the Ruined King', "Sterak's Gage"],
          boots: ['Plated Steelcaps'],
          situational: ["Death's Dance", "Wit's End", 'Guardian Angel'],
        },
      },
    ],
  },

  /* ================================================================ */
  /*  YONE                                                            */
  /* ================================================================ */
  Yone: {
    counters: [
      {
        id: 'Renekton',
        score: 8,
        reason:
          'Renekton burst combo wins every short trade and he can punish Yone\'s weak early game.',
        winCondition:
          'E in, W stun, Q, E out. He cannot fight back through your burst early.',
        tips: [
          'Trade aggressively level 3 when you have fury.',
          'His E snap-back is predictable — dash to where he returns.',
          'Press your lead before he completes two items.',
        ],
        runes: {
          primaryTree: 'Precision',
          primaryKeystones: ['Conqueror', 'Triumph', 'Legend: Tenacity', 'Last Stand'],
          secondaryTree: 'Resolve',
          secondaryRunes: ['Bone Plating', 'Unflinching'],
          shards: ['Adaptive Force', 'Adaptive Force', 'Health'],
        },
        items: {
          start: ["Doran's Blade", 'Health Potion'],
          core: ['Blade of the Ruined King', 'Black Cleaver', "Sterak's Gage"],
          boots: ['Plated Steelcaps'],
          situational: ["Death's Dance", 'Guardian Angel', 'Hullbreaker'],
        },
      },
      {
        id: 'Jax',
        score: 8,
        reason:
          'Jax Counter Strike blocks Yone\'s auto-attack-reliant damage and outscales him.',
        winCondition:
          'E his autos, stun, trade. You outscale in split push.',
        tips: [
          'Counter Strike blocks all his auto attacks.',
          'Jump on him when he snaps back from E.',
          'You outscale massively — be patient.',
        ],
        runes: {
          primaryTree: 'Precision',
          primaryKeystones: ['Conqueror', 'Triumph', 'Legend: Alacrity', 'Last Stand'],
          secondaryTree: 'Resolve',
          secondaryRunes: ['Bone Plating', 'Overgrowth'],
          shards: ['Attack Speed', 'Adaptive Force', 'Health'],
        },
        items: {
          start: ["Doran's Blade", 'Health Potion'],
          core: ['Trinity Force', 'Blade of the Ruined King', "Sterak's Gage"],
          boots: ['Plated Steelcaps'],
          situational: ["Death's Dance", "Wit's End", 'Guardian Angel'],
        },
      },
      {
        id: 'Sett',
        score: 7,
        reason:
          'Sett stat-checks Yone early with his raw damage and W true damage center.',
        winCondition:
          'Trade aggressively, save W for his burst, and use the true damage center to chunk him.',
        tips: [
          'W true damage center hits hard against his squishy build.',
          'E pull catches him when he tries to disengage.',
          'R him when he snaps back from E for a guaranteed suplex.',
        ],
        runes: {
          primaryTree: 'Precision',
          primaryKeystones: ['Conqueror', 'Triumph', 'Legend: Alacrity', 'Last Stand'],
          secondaryTree: 'Resolve',
          secondaryRunes: ['Bone Plating', 'Overgrowth'],
          shards: ['Attack Speed', 'Adaptive Force', 'Health'],
        },
        items: {
          start: ["Doran's Blade", 'Health Potion'],
          core: ['Blade of the Ruined King', 'Black Cleaver', "Sterak's Gage"],
          boots: ['Plated Steelcaps'],
          situational: ["Death's Dance", 'Guardian Angel', 'Hullbreaker'],
        },
      },
    ],
  },

  /* ================================================================ */
  /*  YORICK                                                          */
  /* ================================================================ */
  Yorick: {
    counters: [
      {
        id: 'Irelia',
        score: 8,
        reason:
          'Irelia Q resets on Yorick ghouls, giving her free dashes and passive stacking. She destroys his summons.',
        winCondition:
          'Q through his ghouls for resets and passive stacks, then all-in Yorick himself.',
        tips: [
          'His ghouls give you free Q resets — use them as dash targets.',
          'Dash out of his W cage with Q.',
          'Once his ghouls and maiden are dead he is helpless.',
        ],
        runes: {
          primaryTree: 'Precision',
          primaryKeystones: ['Conqueror', 'Triumph', 'Legend: Alacrity', 'Last Stand'],
          secondaryTree: 'Resolve',
          secondaryRunes: ['Bone Plating', 'Overgrowth'],
          shards: ['Attack Speed', 'Adaptive Force', 'Health'],
        },
        items: {
          start: ["Doran's Blade", 'Health Potion'],
          core: ['Blade of the Ruined King', 'Trinity Force', "Sterak's Gage"],
          boots: ['Plated Steelcaps'],
          situational: ["Death's Dance", "Wit's End", 'Guardian Angel'],
        },
      },
      {
        id: 'Mordekaiser',
        score: 8,
        reason:
          'Mordekaiser R pulls Yorick into Death Realm without his Maiden of the Mist. He is helpless alone.',
        winCondition:
          'Wait for his Maiden to spawn, then R him. Without Maiden his damage is halved.',
        tips: [
          'Death Realm separates him from Maiden — his biggest power source.',
          'Without Maiden he deals significantly less damage.',
          'Your sustained damage wins the 1v1 in Death Realm.',
        ],
        runes: {
          primaryTree: 'Precision',
          primaryKeystones: ['Conqueror', 'Triumph', 'Legend: Tenacity', 'Last Stand'],
          secondaryTree: 'Resolve',
          secondaryRunes: ['Bone Plating', 'Overgrowth'],
          shards: ['Adaptive Force', 'Adaptive Force', 'Health'],
        },
        items: {
          start: ["Doran's Shield", 'Health Potion'],
          core: ['Riftmaker', "Rylai's Crystal Scepter", "Zhonya's Hourglass"],
          boots: ['Mercury\'s Treads'],
          situational: ['Morellonomicon', "Rabadon's Deathcap", 'Cosmic Drive'],
        },
      },
      {
        id: 'Tryndamere',
        score: 7,
        reason:
          'Tryndamere kills Yorick ghouls and maiden quickly with crits, then duels Yorick with R invulnerability.',
        winCondition:
          'Kill his ghouls, spin onto him, and ult when low. Without summons he is weak.',
        tips: [
          'Your crits kill his ghouls in one auto each.',
          'E spin out of his W cage.',
          'R lets you keep fighting after his full combo.',
        ],
        runes: {
          primaryTree: 'Precision',
          primaryKeystones: ['Lethal Tempo', 'Triumph', 'Legend: Alacrity', 'Last Stand'],
          secondaryTree: 'Resolve',
          secondaryRunes: ['Bone Plating', 'Unflinching'],
          shards: ['Attack Speed', 'Adaptive Force', 'Health'],
        },
        items: {
          start: ["Doran's Blade", 'Health Potion'],
          core: ['Blade of the Ruined King', 'Infinity Edge', 'Phantom Dancer'],
          boots: ['Plated Steelcaps'],
          situational: ['Ravenous Hydra', "Death's Dance", 'Hullbreaker'],
        },
      },
    ],
  },

  /* ================================================================ */
  /*  ZAC                                                             */
  /* ================================================================ */
  Zac: {
    counters: [
      {
        id: 'Fiora',
        score: 8,
        reason:
          'Fiora Ripostes Zac\'s E engage or R knock-up for a stun and her vitals shred his HP.',
        winCondition:
          'Parry his E jump, proc vitals, split push. He cannot match you in side lane.',
        tips: [
          'Riposte his E engage for a free stun.',
          'His large hitbox makes vitals easy to proc.',
          'Kill his healing blobs to reduce his sustain.',
        ],
        runes: {
          primaryTree: 'Precision',
          primaryKeystones: ['Conqueror', 'Triumph', 'Legend: Alacrity', 'Last Stand'],
          secondaryTree: 'Resolve',
          secondaryRunes: ['Bone Plating', 'Overgrowth'],
          shards: ['Adaptive Force', 'Adaptive Force', 'Health'],
        },
        items: {
          start: ["Doran's Blade", 'Health Potion'],
          core: ['Trinity Force', 'Ravenous Hydra', "Sterak's Gage"],
          boots: ['Mercury\'s Treads'],
          situational: ["Death's Dance", 'Hullbreaker', 'Guardian Angel'],
        },
      },
      {
        id: 'Gwen',
        score: 7,
        reason:
          'Gwen W blocks Zac abilities from outside and her percent damage shreds his HP.',
        winCondition:
          'W his engage, trade with Q, outscale. Step on his blobs to deny healing.',
        tips: [
          'W mist blocks his E engage from outside.',
          'Center Q deals massive damage against his HP pool.',
          'Step on his passive blobs to reduce his healing.',
        ],
        runes: {
          primaryTree: 'Precision',
          primaryKeystones: ['Conqueror', 'Triumph', 'Legend: Alacrity', 'Last Stand'],
          secondaryTree: 'Resolve',
          secondaryRunes: ['Bone Plating', 'Overgrowth'],
          shards: ['Attack Speed', 'Adaptive Force', 'Health'],
        },
        items: {
          start: ["Doran's Blade", 'Health Potion'],
          core: ['Riftmaker', "Nashor's Tooth", 'Cosmic Drive'],
          boots: ['Mercury\'s Treads'],
          situational: ["Zhonya's Hourglass", "Rabadon's Deathcap", 'Morellonomicon'],
        },
      },
      {
        id: 'Vayne',
        score: 7,
        reason:
          'Vayne Silver Bolts true damage melts Zac and she tumbles away from his E engage.',
        winCondition:
          'Kite, Silver Bolts, condemn. Step on his blobs to deny healing.',
        tips: [
          'Tumble his E jump for a dodge.',
          'Silver Bolts true damage shreds his HP.',
          'Step on blobs to deny his healing.',
        ],
        runes: {
          primaryTree: 'Precision',
          primaryKeystones: ['Press the Attack', 'Triumph', 'Legend: Alacrity', 'Cut Down'],
          secondaryTree: 'Resolve',
          secondaryRunes: ['Bone Plating', 'Overgrowth'],
          shards: ['Attack Speed', 'Adaptive Force', 'Health'],
        },
        items: {
          start: ["Doran's Blade", 'Health Potion'],
          core: ['Blade of the Ruined King', 'Guinsoo\'s Rageblade', 'Phantom Dancer'],
          boots: ['Boots of Swiftness'],
          situational: ['Mortal Reminder', 'Guardian Angel', "Wit's End"],
        },
      },
    ],
  },
};

export default matchups;
