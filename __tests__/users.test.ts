import { Photon } from "@prisma/photon";

const photon = new Photon();

afterAll(async () => {
  await photon.disconnect();
});

it("cannot create a user with an email address that is already in user", async () => {
  // ARRANGE
  await photon.users.create({
    data: {
      email: "foo@bar.com"
    }
  });

  // ACT + ASSERT
  expect(
    photon.users.create({
      data: {
        email: "foo@bar.com"
      }
    })
  ).rejects.toThrow();
});
