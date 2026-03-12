import matchupData from './toplane-matchups';

/**
 * Complete top-lane champion pool for Quantum Enigma.
 * IDs must match the Riot ddragon champion JSON keys exactly.
 */
export const TOP_LANE_POOL = [
  'Aatrox',
  'Akali',
  'Ambessa',
  'Aurora',
  'Camille',
  'ChoGath',
  'Darius',
  'DrMundo',
  'Fiora',
  'Gangplank',
  'Garen',
  'Gnar',
  'Gragas',
  'Gwen',
  'Heimerdinger',
  'Illaoi',
  'Irelia',
  'Jax',
  'Jayce',
  'KSante',
  'Kayle',
  'Kennen',
  'Kled',
  'Malphite',
  'Maokai',
  'Mordekaiser',
  'Nasus',
  'Olaf',
  'Ornn',
  'Pantheon',
  'Poppy',
  'Quinn',
  'Renekton',
  'Rengar',
  'Riven',
  'Rumble',
  'Sett',
  'Shen',
  'Singed',
  'Sion',
  'Skarner',
  'Smolder',
  'Sylas',
  'TahmKench',
  'Teemo',
  'Trundle',
  'Tryndamere',
  'Udyr',
  'Urgot',
  'Vayne',
  'Vladimir',
  'Volibear',
  'Warwick',
  'Wukong',
  'Yasuo',
  'Yone',
  'Yorick',
  'Zac',
] as const;

export const TOP_MATCHUPS = matchupData;

export function championIcon(version: string, championId: string) {
  return `https://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${championId}.png`;
}
