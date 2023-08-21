const mongoose = require('mongoose');
const databaseConfig = require('../configs/database');

let schema = new mongoose.Schema({
    name: String,
    title: String,
    slug: String
});

schema.virtual('product', {
    ref: 'product',
    localField: '_id',
    foreignField: 'category.id'
});

// Set Object and Json property to true. Default is set to false
schema.set('toObject', { virtuals: true });
schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model(databaseConfig.col_category, schema);