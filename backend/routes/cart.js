const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { auth } = require('../middleware/auth');


router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id)
      .populate('cart.product', 'name price image');
    res.json(user.cart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


router.post('/', auth, async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const user = await User.findById(req.user._id);
    
    const existingItem = user.cart.find(
      item => item.product.toString() === productId
    );
    
    if (existingItem) {
      existingItem.quantity += quantity || 1;
    } else {
      user.cart.push({ product: productId, quantity: quantity || 1 });
    }
    
    await user.save();
    await user.populate('cart.product', 'name price image');
    
    res.json(user.cart);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});


router.put('/:productId', auth, async (req, res) => {
  try {
    const { quantity } = req.body;
    const user = await User.findById(req.user._id);
    
    const item = user.cart.find(
      item => item.product.toString() === req.params.productId
    );
    
    if (!item) {
      return res.status(404).json({ error: 'Item not found in cart' });
    }
    
    item.quantity = quantity;
    await user.save();
    await user.populate('cart.product', 'name price image');
    
    res.json(user.cart);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});


router.delete('/:productId', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    
    user.cart = user.cart.filter(
      item => item.product.toString() !== req.params.productId
    );
    
    await user.save();
    await user.populate('cart.product', 'name price image');
    
    res.json(user.cart);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;