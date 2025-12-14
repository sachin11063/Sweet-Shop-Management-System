const request = require("supertest");
const app = require("../app");

describe("Auth API", () => {
  it("should register a new user", async () => {
    const res = await request(app)
      .post("/api/auth/register")
      .send({
        name: "Test User",
        email: "test@test.com",
        password: "123456"
      });

    expect(res.statusCode).toBe(201);
    expect(res.body.user.email).toBe("test@test.com");
  });
});
