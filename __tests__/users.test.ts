import { PrismaClient } from "@prisma/client";

const client = new PrismaClient();

afterAll(async () => {
  await client.disconnect();
});

it("cannot create a user with an email address that is already in user", async () => {
  // ARRANGE
  await client.user.create({
    data: {
      email: "foo@bar.com",
    },
  });

  // ACT + ASSERT
  expect(
    client.user.create({
      data: {
        email: "foo@bar.com",
      },
    })
  ).rejects.toThrow();
});
