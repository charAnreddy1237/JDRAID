const express = require('express');
const router = express.Router();
const Account = require('../models/Account');

// Get all accounts for user
router.get('/user/:userId', async (req, res) => {
  try {
    const accounts = await Account.find({ userId: req.params.userId }).populate('heroesOwned.heroId');
    res.json(accounts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create new account
router.post('/', async (req, res) => {
  try {
    const account = new Account(req.body);
    await account.save();
    res.status(201).json(account);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get single account
router.get('/:accountId', async (req, res) => {
  try {
    const account = await Account.findById(req.params.accountId).populate('heroesOwned.heroId');
    if (!account) return res.status(404).json({ error: 'Account not found' });
    res.json(account);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update account
router.put('/:accountId', async (req, res) => {
  try {
    const account = await Account.findByIdAndUpdate(
      req.params.accountId,
      req.body,
      { new: true }
    ).populate('heroesOwned.heroId');
    res.json(account);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Add hero to account
router.post('/:accountId/heroes', async (req, res) => {
  try {
    const account = await Account.findById(req.params.accountId);
    account.heroesOwned.push(req.body);
    await account.save();
    res.json(account);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Update account progress
router.put('/:accountId/progress', async (req, res) => {
  try {
    const account = await Account.findByIdAndUpdate(
      req.params.accountId,
      { progress: req.body },
      { new: true }
    );
    res.json(account);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete account
router.delete('/:accountId', async (req, res) => {
  try {
    await Account.findByIdAndDelete(req.params.accountId);
    res.json({ message: 'Account deleted' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
