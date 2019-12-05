import { Photon } from "@prisma/photon";

const photon = new Photon();

afterAll(async () => {
  await photon.disconnect();
});

it("are by default set as published", async () => {
  // ACT
  const post = await photon.posts.create({
    data: {
      title: "foo"
    }
  });

  // ASSERT
  expect(post.published).toBeTruthy();
});
