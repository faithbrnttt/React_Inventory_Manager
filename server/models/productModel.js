const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  price: Number,
  category: {
    type: String,
    required: true,
    enum: ['Produce', 'Meat & Seafood', 'Dairy & Eggs', 'Bakery', 'Dry Goods', 'Beverages', 'Frozen Foods', 'Personal Care', 'Household Supplies', 'Health & Wellness', 'Pet Supplies'],
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Product', productSchema);
