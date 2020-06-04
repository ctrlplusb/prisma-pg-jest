import { PrismaClient } from "@prisma/client";

const client = new PrismaClient();

afterAll(async () => {
  await client.disconnect();
});

it("are by default set as published", async () => {
  // ACT
  const post = await client.post.create({
    data: {
      title: "foo",
      author: {
        create: {
          email: "foo@bar.com",
        },
      },
    },
  });

  // ASSERT
  expect(post.published).toBeTruthy();
});
