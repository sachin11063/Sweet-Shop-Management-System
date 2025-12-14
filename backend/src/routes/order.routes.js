const express = require("express");
const { getMyOrders, getAllOrders } = require("../controllers/order.controller");
const authMiddleware = require("../middleware/auth.middleware");
const adminMiddleware = require("../middleware/admin.middleware");

const router = express.Router();

router.get("/my", authMiddleware, getMyOrders);
router.get("/", authMiddleware, adminMiddleware, getAllOrders);

module.exports = router;
