const mongoose = require('mongoose');

const heroSchema = new mongoose.Schema({
  heroId: { type: String, unique: true, required: true },
  name: { type: String, required: true },
  rarity: { type: String, enum: ['Common', 'Uncommon', 'Rare', 'Epic', 'Legendary'], required: true },
  faction: { type: String, required: true },
  role: { type: String, required: true }, // Attacker, Defender, Support, HP
  affinity: { type: String, enum: ['Force', 'Magic', 'Spirit', 'Void'], required: true },
  image: { type: String },
  description: { type: String },
  
  // Ratings by Performance
  ratings: {
    campaign: { type: Number, min: 0, max: 10, default: 5 },
    arena: { type: Number, min: 0, max: 10, default: 5 },
    dungeons: { type: Number, min: 0, max: 10, default: 5 },
    boss: { type: Number, min: 0, max: 10, default: 5 },
    clanBoss: { type: Number, min: 0, max: 10, default: 5 },
    overworldBoss: { type: Number, min: 0, max: 10, default: 5 },
    overall: { type: Number, min: 0, max: 10, default: 5 }
  },
  
  // Base Stats
  baseStats: {
    health: { type: Number },
    attack: { type: Number },
    defense: { type: Number },
    speed: { type: Number },
    critRate: { type: Number },
    critDamage: { type: Number },
    resistance: { type: Number },
    accuracy: { type: Number }
  },
  
  // Skills
  skills: [{
    skillName: String,
    skillDescription: String,
    cooldown: Number
  }],
  
  // Additional Info
  buildGuides: [String],
  synergies: [String],
  counters: [String],
  lastUpdated: { type: Date, default: Date.now },
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('Hero', heroSchema);
