const express = require("express");
const {
  addSweet,
  getAllSweets,
  searchSweets,
  updateSweet,
  purchaseSweet,
  deleteSweet,
  restockSweet
} = require("../controllers/sweet.controller");

const authMiddleware = require("../middleware/auth.middleware");
const adminMiddleware = require("../middleware/admin.middleware");

const router = express.Router();

router.get("/", authMiddleware, getAllSweets);
router.get("/search", authMiddleware, searchSweets);

router.post("/", authMiddleware, adminMiddleware, addSweet);
router.put("/:id", authMiddleware, adminMiddleware, updateSweet);
router.delete("/:id", authMiddleware, adminMiddleware, deleteSweet);

router.post("/:id/purchase", authMiddleware, purchaseSweet);
router.post("/:id/restock", authMiddleware, adminMiddleware, restockSweet);

module.exports = router;
