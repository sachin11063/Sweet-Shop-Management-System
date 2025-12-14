const request = require("supertest");
const app = require("../app");
const User = require("../models/User");
const Sweet = require("../models/Sweet");
const jwt = require("jsonwebtoken");

describe("Order API", () => {
  let userToken;
  let adminToken;
  let sweetId;

  beforeEach(async () => {
    const admin = await User.create({
      name: "Admin",
      email: "admin@test.com",
      password: "hashed",
      role: "admin"
    });

    const user = await User.create({
      name: "User",
      email: "user@test.com",
      password: "hashed",
      role: "user"
    });

    adminToken = jwt.sign(
      { id: admin._id, role: "admin" },
      process.env.JWT_SECRET
    );

    userToken = jwt.sign(
      { id: user._id, role: "user" },
      process.env.JWT_SECRET
    );

    const sweet = await Sweet.create({
      name: "Kaju Katli",
      category: "Indian",
      price: 30,
      quantity: 10
    });

    sweetId = sweet._id;
  });

  it("should allow user to purchase sweet", async () => {
    const res = await request(app)
      .post(`/api/sweets/${sweetId}/purchase`)
      .set("Authorization", `Bearer ${userToken}`)
      .send({ quantity: 2 });

    expect(res.statusCode).toBe(200);
    expect(res.body.order.totalPrice).toBe(60);
  });

  it("should reduce sweet quantity after purchase", async () => {
    await request(app)
      .post(`/api/sweets/${sweetId}/purchase`)
      .set("Authorization", `Bearer ${userToken}`)
      .send({ quantity: 3 });

    const updatedSweet = await Sweet.findById(sweetId);
    expect(updatedSweet.quantity).toBe(7);
  });

  it("should block non-admin from viewing all orders", async () => {
    const res = await request(app)
      .get("/api/orders")
      .set("Authorization", `Bearer ${userToken}`);

    expect(res.statusCode).toBe(403);
  });

  it("should allow admin to view all orders", async () => {
    const res = await request(app)
      .get("/api/orders")
      .set("Authorization", `Bearer ${adminToken}`);

    expect(res.statusCode).toBe(200);
  });

  it("should fail if requested quantity exceeds stock", async () => {
  const res = await request(app)
    .post(`/api/sweets/${sweetId}/purchase`)
    .set("Authorization", `Bearer ${userToken}`)
    .send({ quantity: 50 });

  expect(res.statusCode).toBe(400);
  expect(res.body.message).toMatch(/not enough stock/i);
});

it("should fail for invalid purchase quantity", async () => {
  const res = await request(app)
    .post(`/api/sweets/${sweetId}/purchase`)
    .set("Authorization", `Bearer ${userToken}`)
    .send({ quantity: 0 });

  expect(res.statusCode).toBe(400);
});

});
