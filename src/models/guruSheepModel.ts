import mongoose, { Schema } from "mongoose";

// Define a Schema corresponding to the ApiSheep type
const GuruSheepSchema = new Schema(
  {
    id: { type: Number, required: true },
    communityId: { type: Number, required: true },
    earned: { type: Number, required: true },
    weatherMultiplier: { type: Number, required: true },
    timeMultiplier: { type: Number, required: true },
    energySpent: { type: Number, required: true },
    lootableResources: { type: Number, required: true },
    looted: { type: Boolean, required: true },
    energyCost: {
      energy: { type: Number, required: true },
      wool: { type: Number, required: true },
    },
    ownerAddress: { type: String, required: true },
    position: {
      x: { type: Number, required: true },
      y: { type: Number, required: true },
    },
    generation: { type: Number, required: true },
    energy: { type: Number, required: true },
    maxEnergy: { type: Number, required: true },
    landId: { type: Number, required: true },
    weather: {
      type: String,
      enum: ["SUNNY", "CLOUDY", "RAINY"],
      required: true,
    },
    resourceType: {
      type: String,
      enum: ["WOOD", "WATER", "STONE", "GRASS"],
      required: true,
    },
    gameType: {
      type: String,
      enum: ["PRISONERS_DILEMMA", "WOLFS_GAMBIT"],
      required: true,
    },
    initiatedOn: { type: String },
    farmer: { type: String, default: null },
  },
  { timestamps: true }
);

const GuruSheepDataSchema = new Schema({
  characters: [GuruSheepSchema],
  updatedAt: Number,
});

export const GuruSheep = mongoose.model("GuruSheep", GuruSheepSchema);
export const GuruSheepData = mongoose.model(
  "GuruSheepData",
  GuruSheepDataSchema
);

// export default SheepData;
// export default GuruSheepSchema;
