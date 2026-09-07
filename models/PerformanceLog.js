const mongoose = require('mongoose');

const performanceLogSchema = new mongoose.Schema({
  accountId: { type: mongoose.Schema.Types.ObjectId, ref: 'Account', required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  
  // Log Entry
  logDate: { type: Date, default: Date.now },
  category: { type: String, enum: ['Campaign', 'Arena', 'Dungeons', 'ClanBoss', 'Progress', 'Resource'], required: true },
  
  // Details
  details: {
    before: mongoose.Schema.Types.Mixed,
    after: mongoose.Schema.Types.Mixed,
    change: mongoose.Schema.Types.Mixed
  },
  
  // Description
  description: String,
  notes: String,
  
  // Metrics
  metrics: {
    accountLevel: Number,
    powerLevel: Number,
    heroCount: Number,
    averageStarRating: Number
  },
  
  // Achievements
  achievements: [String]
}, { timestamps: true });

module.exports = mongoose.model('PerformanceLog', performanceLogSchema);
