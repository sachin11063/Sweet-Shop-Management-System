const request = require("supertest");
const app = require("../app");
const User = require("../models/User");
const Sweet = require("../models/Sweet");
const jwt = require("jsonwebtoken");

describe("Sweet API", () => {
  let adminToken;
  let userToken;

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
  });

  it("should block unauthenticated access", async () => {
    const res = await request(app).get("/api/sweets");
    expect(res.statusCode).toBe(401);
  });

  it("should allow admin to add sweet", async () => {
    const res = await request(app)
      .post("/api/sweets")
      .set("Authorization", `Bearer ${adminToken}`)
      .send({
        name: "Rasgulla",
        category: "Bengali",
        price: 25,
        quantity: 50
      });

    expect(res.statusCode).toBe(201);
    expect(res.body.sweet.name).toBe("Rasgulla");
  });

  it("should block normal user from adding sweet", async () => {
    const res = await request(app)
      .post("/api/sweets")
      .set("Authorization", `Bearer ${userToken}`)
      .send({
        name: "Ladoo",
        category: "Indian",
        price: 10,
        quantity: 20
      });

    expect(res.statusCode).toBe(403);
  });

  it("should allow authenticated user to view sweets", async () => {
    await Sweet.create({
      name: "Barfi",
      category: "Indian",
      price: 15,
      quantity: 40
    });


    const res = await request(app)
      .get("/api/sweets")
      .set("Authorization", `Bearer ${userToken}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBe(1);
  });

  it("should allow authenticated user to view sweets", async () => {
  await Sweet.create({
    name: "Barfi",
    category: "Indian",
    price: 15,
    quantity: 40
  });

  const res = await request(app)
    .get("/api/sweets")
    .set("Authorization", `Bearer ${userToken}`);

  expect(res.statusCode).toBe(200);
  expect(res.body.length).toBe(1);
});

it("should block unauthenticated user from adding sweet", async () => {
  const res = await request(app)
    .post("/api/sweets")
    .send({
      name: "Jalebi",
      category: "Indian",
      price: 15,
      quantity: 10
    });

  expect(res.statusCode).toBe(401);
});

});
