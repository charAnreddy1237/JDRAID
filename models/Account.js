const mongoose = require('mongoose');

const accountSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  accountName: { type: String, required: true },
  accountLevel: { type: Number, default: 1 },
  powerLevel: { type: Number, default: 0 },
  
  // Account Progress
  progress: {
    campaignStage: { type: String, default: '1-1' },
    campaignProgressPercentage: { type: Number, default: 0 },
    dungeonLevel: { type: Number, default: 1 },
    arenaRank: { type: Number },
    arenaPoints: { type: Number, default: 0 },
    clanBossStage: { type: Number, default: 1 },
    strongBoxOpenings: { type: Number, default: 0 }
  },
  
  // Heroes Owned
  heroesOwned: [{
    heroId: { type: mongoose.Schema.Types.ObjectId, ref: 'Hero' },
    stars: { type: Number, default: 1 }, // 1-6 stars
    level: { type: Number, default: 1 },
    gearScore: { type: Number, default: 0 },
    skillLevels: [Number],
    masteries: [String],
    builds: [String]
  }],
  
  // Resources
  resources: {
    silver: { type: Number, default: 0 },
    gold: { type: Number, default: 0 },
    shards: {
      ancient: { type: Number, default: 0 },
      void: { type: Number, default: 0 },
      sacred: { type: Number, default: 0 },
      fragment: { type: Number, default: 0 }
    }
  },
  
  // Focus Areas (what player should focus on)
  focusAreas: [{
    area: String, // campaign, arena, dungeons, clanBoss
    priority: String, // high, medium, low
    notes: String
  }],
  
  // Goals
  goals: [{
    goalName: String,
    description: String,
    targetDate: Date,
    completed: { type: Boolean, default: false },
    progress: { type: Number, default: 0 }
  }],
  
  isDefault: { type: Boolean, default: false },
  lastUpdated: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model('Account', accountSchema);
