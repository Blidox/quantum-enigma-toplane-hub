import matchupData from '../data/toplane-matchups.json';

export const TOP_LANE_POOL = [
  'Aatrox',
  'Ambessa',
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
  'Illaoi',
  'Irelia',
  'Jax',
  'Jayce',
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
  'Riven',
  'Rumble',
  'Sett',
  'Shen',
  'Singed',
  'Sion',
  'Teemo',
  'Trundle',
  'Tryndamere',
  'Urgot',
  'Vayne',
  'Volibear',
  'Warwick',
  'Wukong',
  'Yasuo',
  'Yone',
  'Yorick',
  'Zac'
] as const;

export const TOP_MATCHUPS = matchupData;

export function championIcon(version: string, championId: string) {
  return `https://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${championId}.png`;
}
