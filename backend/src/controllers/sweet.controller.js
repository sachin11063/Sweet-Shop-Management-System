const Sweet = require("../models/Sweet");
const Order = require("../models/Order");

// ADD SWEET (ADMIN)
const addSweet = async (req, res) => {
  try {
    const { name, category, price, quantity, description } = req.body;

    if (!name || !category || !price || quantity === undefined) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const sweet = await Sweet.create({
      name,
      category,
      price,
      quantity,
      description
    });

    res.status(201).json({
      message: "Sweet added successfully",
      sweet
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// GET ALL SWEETS (PROTECTED)
const getAllSweets = async (req, res) => {
  try {
    const sweets = await Sweet.find();
    res.json(sweets);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// SEARCH SWEETS
const searchSweets = async (req, res) => {
  try {
    const { name, category, minPrice, maxPrice } = req.query;

    const query = {};

    if (name) {
      query.name = { $regex: name, $options: "i" };
    }

    if (category) {
      query.category = { $regex: category, $options: "i" };
    }

    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    const sweets = await Sweet.find(query);
    res.json(sweets);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// UPDATE SWEET (ADMIN)
const updateSweet = async (req, res) => {
  try {
    const sweet = await Sweet.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!sweet) {
      return res.status(404).json({ message: "Sweet not found" });
    }

    res.json({
      message: "Sweet updated successfully",
      sweet
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};


// PURCHASE SWEET
const purchaseSweet = async (req, res) => {
  try {
    const { quantity } = req.body;

    if (!quantity || quantity <= 0) {
      return res.status(400).json({ message: "Invalid quantity" });
    }

    const sweet = await Sweet.findById(req.params.id);

    if (!sweet) {
      return res.status(404).json({ message: "Sweet not found" });
    }

    if (sweet.quantity < quantity) {
      return res.status(400).json({ message: "Not enough stock available" });
    }

    sweet.quantity -= quantity;
    await sweet.save();

    const order = await Order.create({
      user: req.user.id,
      sweet: sweet._id,
      quantity,
      totalPrice: sweet.price * quantity
    });

    res.json({
      message: "Sweet purchased successfully",
      order
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};


// DELETE SWEET (ADMIN)
const deleteSweet = async (req, res) => {
  try {
    const sweet = await Sweet.findByIdAndDelete(req.params.id);

    if (!sweet) {
      return res.status(404).json({ message: "Sweet not found" });
    }

    res.json({ message: "Sweet deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// RESTOCK SWEET (ADMIN)
const restockSweet = async (req, res) => {
  try {
    const { quantity } = req.body;

    if (!quantity || quantity <= 0) {
      return res.status(400).json({ message: "Invalid quantity" });
    }

    const sweet = await Sweet.findById(req.params.id);

    if (!sweet) {
      return res.status(404).json({ message: "Sweet not found" });
    }

    sweet.quantity += quantity;
    await sweet.save();

    res.json({
      message: "Sweet restocked successfully",
      totalQuantity: sweet.quantity
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};





module.exports = {
  addSweet,
  getAllSweets,
  searchSweets,
  updateSweet,
  purchaseSweet,
  deleteSweet,
  restockSweet
};

