import mongoose, { Schema } from "mongoose";

const ChopRatesSchema = new Schema({
  chopRates: {
    GRASS: { type: Number, required: true },
    STONE: { type: Number, required: true },
    WATER: { type: Number, required: true },
    WOOD: { type: Number, required: true }
  },
  updatedAt: Number
});

export const ChopRates = mongoose.model("ChopRates", ChopRatesSchema);
