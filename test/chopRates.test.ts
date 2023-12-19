import chai from "chai";
import chaiHttp from "chai-http";
import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import app from "../src/app.js";
import { ChopRates } from "../src/models/chopRatesModel.js";

chai.use(chaiHttp);
const expect = chai.expect;

describe("ChopRates API Tests", function () {
  let mongoServer: MongoMemoryServer;

  before(async () => {
    // Setup in-memory MongoDB instance
    mongoServer = await MongoMemoryServer.create();
    const mongoUri = mongoServer.getUri();
    await mongoose.connect(mongoUri);
  });

  after(async () => {
    // Cleanup
    await mongoose.disconnect();
    await mongoServer.stop();
  });

  beforeEach(async () => {
    // Seed with a test document
    const chopRates = new ChopRates({
      chopRates: { GRASS: 10, STONE: 20, WATER: 30, WOOD: 40 },
      updatedAt: Date.now(),
    });
    await chopRates.save();
  });

  afterEach(async () => {
    // Clean up database between tests
    await ChopRates.deleteMany({});
  });

  describe("GET /choprates/latest", () => {
    it("should get the latest chop rates", (done) => {
      chai
        .request(app)
        .get("/api/choprates/latest")
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an("object");
          expect(res.body.chopRates).to.have.keys([
            "GRASS",
            "STONE",
            "WATER",
            "WOOD",
          ]);
          done();
        });
    });
  });
});
