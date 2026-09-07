const express = require('express');
const router = express.Router();
const Hero = require('../models/Hero');

// Get all heroes
router.get('/', async (req, res) => {
  try {
    const { search, rarity, faction, role, sortBy } = req.query;
    const filter = { isActive: true };
    
    if (search) {
      filter.name = { $regex: search, $options: 'i' };
    }
    if (rarity) filter.rarity = rarity;
    if (faction) filter.faction = faction;
    if (role) filter.role = role;
    
    let query = Hero.find(filter);
    
    // Sorting options
    if (sortBy === 'overall') {
      query = query.sort({ 'ratings.overall': -1 });
    } else if (sortBy === 'campaign') {
      query = query.sort({ 'ratings.campaign': -1 });
    } else if (sortBy === 'arena') {
      query = query.sort({ 'ratings.arena': -1 });
    } else if (sortBy === 'clanBoss') {
      query = query.sort({ 'ratings.clanBoss': -1 });
    }
    
    const heroes = await query.exec();
    res.json(heroes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get single hero
router.get('/:id', async (req, res) => {
  try {
    const hero = await Hero.findById(req.params.id);
    if (!hero) return res.status(404).json({ error: 'Hero not found' });
    res.json(hero);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Search heroes
router.get('/search/query', async (req, res) => {
  try {
    const { q } = req.query;
    const heroes = await Hero.find({
      $or: [
        { name: { $regex: q, $options: 'i' } },
        { faction: { $regex: q, $options: 'i' } },
        { role: { $regex: q, $options: 'i' } }
      ]
    });
    res.json(heroes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get heroes by rating filter
router.get('/filter/rating', async (req, res) => {
  try {
    const { minRating, category } = req.query;
    const min = parseFloat(minRating) || 5;
    
    const filter = { isActive: true };
    filter[`ratings.${category}`] = { $gte: min };
    
    const heroes = await Hero.find(filter).sort({ [`ratings.${category}`]: -1 });
    res.json(heroes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
