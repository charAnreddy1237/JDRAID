const express = require('express');
const router = express.Router();
const PerformanceLog = require('../models/PerformanceLog');
const Account = require('../models/Account');

// Log performance entry
router.post('/', async (req, res) => {
  try {
    const log = new PerformanceLog(req.body);
    await log.save();
    res.status(201).json(log);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get performance logs for account
router.get('/account/:accountId', async (req, res) => {
  try {
    const { limit = 50, category } = req.query;
    const filter = { accountId: req.params.accountId };
    if (category) filter.category = category;
    
    const logs = await PerformanceLog.find(filter)
      .sort({ logDate: -1 })
      .limit(parseInt(limit));
    res.json(logs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get performance summary
router.get('/summary/:accountId', async (req, res) => {
  try {
    const account = await Account.findById(req.params.accountId);
    if (!account) return res.status(404).json({ error: 'Account not found' });
    
    const logs = await PerformanceLog.find({ accountId: req.params.accountId });
    
    const summary = {
      accountLevel: account.accountLevel,
      powerLevel: account.powerLevel,
      heroesOwned: account.heroesOwned.length,
      progress: account.progress,
      focusAreas: account.focusAreas,
      goals: account.goals,
      recentActivity: logs.slice(0, 10)
    };
    
    res.json(summary);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get recommendations based on performance
router.get('/recommendations/:accountId', async (req, res) => {
  try {
    const account = await Account.findById(req.params.accountId).populate('heroesOwned.heroId');
    if (!account) return res.status(404).json({ error: 'Account not found' });
    
    const recommendations = [];
    
    // Generate recommendations based on progress
    if (account.progress.campaignProgressPercentage < 50) {
      recommendations.push({
        priority: 'high',
        recommendation: 'Focus on Campaign progression',
        reason: 'You are below 50% campaign completion'
      });
    }
    
    if (account.heroesOwned.length < 10) {
      recommendations.push({
        priority: 'high',
        recommendation: 'Collect and level more heroes',
        reason: 'You need a diverse hero roster'
      });
    }
    
    if (account.resources.shards.ancient < 5) {
      recommendations.push({
        priority: 'medium',
        recommendation: 'Save Ancient Shards',
        reason: 'Stock up on ancient shards for summon events'
      });
    }
    
    res.json(recommendations);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
