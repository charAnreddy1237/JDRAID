const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Hero = require('../models/Hero');
const HEROES_DATA = require('../utils/heroDatabase');

dotenv.config();

const seedHeroes = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/jdraid');
    console.log('MongoDB connected');
    
    await Hero.deleteMany({});
    console.log('Cleared existing heroes');
    
    const insertedHeroes = await Hero.insertMany(HEROES_DATA);
    console.log('Inserted ' + insertedHeroes.length + ' heroes');
    
    await mongoose.connection.close();
    console.log('Database seeding completed');
  } catch (error) {
    console.error('Seeding error:', error);
    process.exit(1);
  }
};

if (require.main === module) {
  seedHeroes();
}

module.exports = seedHeroes;
