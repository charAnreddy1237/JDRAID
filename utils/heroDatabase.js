const HEROES_DATA = [
  {
    heroId: 'galek_001',
    name: 'Galek',
    rarity: 'Rare',
    faction: 'Barbarians',
    role: 'Attacker',
    affinity: 'Fire',
    description: 'One of the most reliable starter heroes, Galek is a solid damage dealer.',
    ratings: {
      campaign: 7,
      arena: 6,
      dungeons: 7,
      boss: 5,
      clanBoss: 4,
      overworldBoss: 5,
      overall: 6
    }
  },
  {
    heroId: 'arbiter_001',
    name: 'Arbiter',
    rarity: 'Legendary',
    faction: 'High Elves',
    role: 'Support',
    affinity: 'Light',
    description: 'One of the strongest support champions in the game.',
    ratings: {
      campaign: 10,
      arena: 10,
      dungeons: 10,
      boss: 10,
      clanBoss: 9,
      overworldBoss: 10,
      overall: 10
    }
  }
];

module.exports = HEROES_DATA;
