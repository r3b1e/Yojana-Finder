const mongoose = require("mongoose");

// reusable sub-schema for bilingual text
const bilingualFieldSchema = new mongoose.Schema(
  {
    en: { type: String, trim: true },
    hi: { type: String, trim: true },
  },
  { _id: false } // don’t create a separate _id for this subdocument
);

// reusable sub-schema for bilingual arrays (like documents/tags)
const bilingualArraySchema = new mongoose.Schema(
  {
    en: [{ type: String, trim: true }],
    hi: [{ type: String, trim: true }],
  },
  { _id: false }
);

const schemeSchema = new mongoose.Schema(
  {
    // bilingual scheme name
    scheme_name: bilingualFieldSchema,

    slug: {
      type: String,
      trim: true,
    },

    // bilingual details fields
    details: bilingualFieldSchema,
    benefits: bilingualFieldSchema,
    eligibility: bilingualFieldSchema,
    application: bilingualArraySchema,

    // bilingual array for documents
    documents: bilingualArraySchema,

    level: {
      type: String,
      enum: ["State", "Central", "Union Territory"],
    },

    // bilingual arrays for categories and tags
    schemeCategory: bilingualArraySchema,
    tags: bilingualArraySchema,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Scheme", schemeSchema);
