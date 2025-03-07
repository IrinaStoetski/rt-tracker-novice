const resolution = require("../models/resolution");
const user = require("../models/User");

const faker = require("@faker-js/faker").fakerEN_US;
const FactoryBot = require("factory-bot");

const testUserPassword = faker.internet.password();
const factory = FactoryBot.factory;
const factoryAdapter = new FactoryBot.MongooseAdapter();
factory.setAdapter(factoryAdapter);
factory.define("Resolution", resolution, {
  goal_amount: () => Math.floor(100 * Math.random()), // random number between 0 and 100
  done_amount: () => Math.floor(100 * Math.random()), // random number between 0 and 100
  status: () => ["in progress", "to do", "done"][Math.floor(3 * Math.random())], // random one of these
  type: () => ["loose_weight", "read_books"][Math.floor(3 * Math.random())], // random one of these
});

factory.define("user", user, {
  name: () => faker.person.fullName(),
  email: () => faker.internet.email(),
  password: () => faker.internet.password(),
});
const seed_db = async () => {
  let testUser = null;

  try {
    const mongoURL = process.env.MONGO_URI_TEST;
    await resolution.deleteMany({}); // deletes all job records
    await user.deleteMany({}); // and all the users
    testUser = await factory.create("user", { password: testUserPassword });
    await factory.createMany("Resolution", 20, { createdBy: testUser._id }); // put 30 job entries in the database.
  } catch (e) {
    console.log("database error");
    console.log(e.message);
    throw e;
  }
  return testUser;
};

module.exports = { testUserPassword, factory, seed_db };
