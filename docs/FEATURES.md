# JDRAID Features Guide

## Hero Finder

The Hero Finder is your comprehensive guide to all Raid: Shadow Legends champions.

### Features:

#### 1. Advanced Search
- Search heroes by name
- Filter by rarity (Common to Legendary)
- Filter by faction
- Filter by role (Attacker, Defender, Support, HP)
- Filter by affinity (Force, Magic, Spirit, Void)

#### 2. Rating System
Each hero has ratings in different content areas:
- **Campaign**: Story mode effectiveness
- **Arena**: PvP performance
- **Dungeons**: Dungeon effectiveness
- **Boss**: Boss fight performance
- **Clan Boss**: Clan boss raid importance
- **Overworld Boss**: Overworld boss effectiveness
- **Overall**: Weighted average rating

Ratings scale 1-10:
- 9-10: Top tier, highly recommended
- 7-8: Great choice
- 5-6: Viable option
- 3-4: Situational use
- 1-2: Not recommended

#### 3. Hero Information
- Base statistics
- Skill descriptions and cooldowns
- Build recommendations
- Synergies with other heroes
- Counter matchups

### Usage Examples:

```bash
# Find all legendary support champions
GET /api/heroes?rarity=Legendary&role=Support&sortBy=overall

# Search for a specific hero
GET /api/heroes?search=Arbiter

# Find best arena heroes
GET /api/heroes/filter/rating?minRating=8&category=arena
```

---

## Performance Tracker

Track your account progress, heroes, and resources.

### Features:

#### 1. Account Management
- Create multiple accounts
- Track separate progress per account
- Set default account
- Switch between accounts easily

#### 2. Progress Tracking
- Campaign stage and completion %
- Arena rank and points
- Dungeon levels
- Clan Boss stage
- Account level and power level

#### 3. Hero Inventory
- Track owned heroes
- Record star rating (1-6 stars)
- Monitor hero levels (1-60)
- Record gear score
- Track skill levels
- Note mastery loadouts
- Save build templates

#### 4. Resource Management
- Silver (in-game currency)
- Gold (premium currency)
- Ancient Shards
- Void Shards
- Sacred Shards
- Shard Fragments

#### 5. Goal Setting
- Create specific goals
- Set target dates
- Track progress
- Mark goals as completed
- View goal history

#### 6. Focus Areas
Set priorities for what to work on:
- Campaign progression
- Arena climbing
- Dungeon clearing
- Clan Boss improvement

Specify priority levels:
- High: Focus immediately
- Medium: Work on when time permits
- Low: Long-term goals

---

## Multi-Account Support

### Features:

#### Managing Multiple Accounts
1. Create New Account - Give each account a unique name
2. Account Switching - Quick switch between accounts
3. Default Account - Set one as default on login

#### Cross-Account Features
- Use hero database across all accounts
- Compare progress between accounts
- Share performance insights

---

## Automation Features

### Performance Recommendations

The system automatically analyzes your account and provides recommendations:

1. **Campaign Focus** - Complete more campaign stages if progress < 50%
2. **Hero Collection** - Summon more heroes if you have < 10
3. **Resource Management** - Save shards for summon events
4. **Arena Progression** - Suggestions based on current rank
5. **Clan Boss Performance** - Suggest hero upgrades

### Performance Logging

Automatic tracking of:
- Major milestones
- Resource changes
- Hero additions and upgrades
- Achievement unlocks

### Activity History

View your account history with timestamps for all major events.

---

## Future Features (Roadmap)

- [ ] Hero Building Calculator
- [ ] Gear Optimization
- [ ] Community Features
- [ ] Mobile App
- [ ] Advanced Analytics
- [ ] Raid Automater Integration

---

## Tips & Best Practices

1. **Keep Data Updated** - Log progress regularly
2. **Set Clear Goals** - Define what you want to achieve
3. **Use Focus Areas** - Prioritize what matters most
4. **Monitor Recommendations** - Check suggested improvements
5. **Review Performance** - Check activity logs regularly
