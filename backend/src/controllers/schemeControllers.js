const Scheme = require("../models/schemeSchema");
const fs = require("fs");
const csv = require("csv-parser");
const mongoose = require("mongoose");

const addSingleEntry = async (req, res) => {
  try {
    // Create a new Scheme document from request body
    const scheme = new Scheme(req.body);

    // Save to MongoDB
    const savedScheme = await scheme.save();

    // Send response
    res.status(201).json({
      message: "Scheme created successfully",
      data: savedScheme,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error creating scheme",
      error: error.message,
    });
  }
};

function extractSteps(text) {
  // Clean -> Step prefix
  // text = text.replace(/->/g, "");

  // Split on Step numbers (keeping delimiter)
  const parts = text.split(/Step\s*\d+[:\-]/i);

  // Get all matches for "Step x:" to prepend back
  const matches = text.match(/Step\s*\d+[:\-]/gi);

  const steps = [];
  for (let i = 0; i < parts.length; i++) {
    const part = parts[i].trim();
    if (part) {
      const prefix = matches && matches[i - 1] ? matches[i - 1] : "";
      steps.push((prefix + " " + part).trim());
    }
  }
  return steps;
}

function extractDocuments(text) {
  return text
    .split(".") // split on dot
    .map((d) => d.trim()) // trim whitespace
    .filter((d) => d.length > 0); // remove empty strings
}

function extractCategory(text) {
  return text
    .split(",") // split on dot
    .map((d) => d.trim()) // trim whitespace
    .filter((d) => d.length > 0); // remove empty strings
}

const translateText = async (text) => {
  const res = await fetch("http://localhost:5000/translate", {
    method: "POST",
    body: JSON.stringify({
      q: text,
      source: "en",
      target: "hi",
      format: "text",
      api_key: "",
    }),
    headers: { "Content-Type": "application/json" },
  });

  const trans_text = await res.json();
  return trans_text.translatedText;

  console.log("->", await res.json());
};

const test_translate = async (req, res) => {
  const data = await translateText("hello");
  console.log(await data);
  res.send("ok");
};

const array_to_Hi = async (arr) => {
  // Map each element to a promise
  const promises = arr.map((element) => translateText(element));

  // Wait for all promises to resolve at once
  const translatedArray = await Promise.all(promises);

  return translatedArray;
};

const insertFromCsv = async (req, res) => {
  try {
    const results = [];

    // 1️⃣ Read CSV fully first
    await new Promise((resolve, reject) => {
      fs.createReadStream("updated_data.csv")
        .pipe(
          csv({
            // separator: "\t", // 👈 TAB separator
            // mapHeaders: ({ header }) => header.trim(), // clean up header
          })
        )
        .on("data", (row) => results.push(row))
        .on("end", resolve)
        .on("error", reject);
    });

    console.log(`CSV loaded with ${results.length} rows`);

    // 2️⃣ Process rows and translate
    const translatedRows = await Promise.all(
      results.map(async (row) => {
        const scheme_name = row.scheme_name;
        const slug = row.slug;
        const details = row.details;
        const benefits = row.benefits;
        const eligibility = row.eligibility;

        const application = extractSteps(row.application);
        const documents = extractDocuments(row.documents);
        const level = row.level;
        const schemeCategory = extractCategory(row.schemeCategory);
        const tags = extractCategory(row.tags);

        // Translate each field (can also batch translate arrays)
        const [
          hi_scheme_name,
          hi_details,
          hi_benefits,
          hi_eligibility,
          hi_application,
          hi_documents,
          hi_schemeCategory,
          hi_tags,
        ] = await Promise.all([
          translateText(scheme_name),
          translateText(details),
          translateText(benefits),
          translateText(eligibility),
          translateText(application),
          translateText(documents),
          translateText(schemeCategory),
          translateText(tags),
        ]);

        return {
          scheme_name: { en: scheme_name, hi: hi_scheme_name },
          slug: slug,
          details: { en: details, hi: hi_details },
          benefits: { en: benefits, hi: hi_benefits },
          eligibility: { en: eligibility, hi: hi_eligibility },
          application: { en: application, hi: hi_application },
          documents: { en: documents, hi: hi_documents },
          level: level,
          schemeCategory: { en: schemeCategory, hi: hi_schemeCategory },
          tags: { en: tags, hi: hi_tags },
        };
      })
    );

    // 3️⃣ Insert into MongoDB
    await Scheme.insertMany(translatedRows);
    console.log("✅ All data inserted successfully!");

    res.send("✅ All data inserted successfully!");
  } catch (error) {
    console.error("❌ Error inserting data:", error);
    res.status(500).send("Error inserting data");
  }
};

const getDashboardData = async (req, res) => {
  try {
    const allSchemes = await Scheme.find().select("schemeCategory level tags");
    const all = [];
    const level = {
      Central: [],
      State: [],
    };
    let category = {};
    let tags = {};

    allSchemes.forEach((element) => {
      level[element.level].push(element._id.toString());

      (element.schemeCategory?.en || []).forEach((cogy, inx) => {
        // Check if the English category key exists in the 'category' object
        if (!category[cogy]) {
          // 1. Create the new array and initialize it with the Hindi category
          category[cogy] = [element.schemeCategory.hi[inx]];

          // 2. Now that category[cogy] is an array, you can push the ID
          category[cogy].push(element._id.toString());
        } else {
          // Key exists, just push the ID
          category[cogy].push(element._id.toString());
        }
      });

      (element.tags?.en || []).forEach((tag, inx) => {
        if (!tags[tag]) {
          tags[tag] = [element.tags.hi[inx]];
        }
        tags[tag].push(element._id.toString());
      });
      all.push(element._id.toString());
    });
    console.log(category);

    res.json({
      all,
      category,
      level,
      tags,
    });
  } catch (error) {
    console.log(error);
    res.status(401).json({ message: "Faild to fetch the data", error: error });
  }
};

const getSchemes = async (req, res) => {
  // 1. Get the array of IDs from the request body
  const idArray = req.body.filteredSchemes;

  // Check if the array is empty
  if (!idArray || idArray.length === 0) {
    return res.status(200).json([]); // Send an empty array if no IDs are provided
  }

  // 2. Prepare the IDs for the query
  // MongoDB IDs must often be converted to Mongoose/MongoDB ObjectId type
  const validObjectIds = idArray
    // Filter out non-string/non-valid IDs like "कृषि" if you only want to query by ObjectId
    // If 'कृषि' is an actual ID, this line should be adjusted or removed.
    .filter((id) => mongoose.Types.ObjectId.isValid(id))
    .map((id) => new mongoose.Types.ObjectId(id));

  try {
    // 3. Query the database using the $in operator
    const schemesData = await Scheme.find({
      // Find documents where the '_id' field is IN the array of IDs
      _id: { $in: validObjectIds },
    });

    // 4. Send the resulting array of documents back to the frontend
    res.status(200).json(schemesData);
  } catch (error) {
    console.error("Error fetching schemes:", error);
    res.status(500).json({ message: "Failed to fetch data." });
  }
};

const getSchemeBySlug = async (req, res) => {
  try {
    const { slug } = req.params;
    // res.send(slug);
    const singleScheme = await Scheme.findOne({
      slug: slug,
    });

    if (!singleScheme) {
      return res.status(404).json({ message: "Scheme not found." });
    }
    res.status(200).json(singleScheme);
  } catch (error) {
    console.error("Error fetching schemes:", error);
    res.status(500).json({ message: "Failed to fetch data." });
  }
};

module.exports = {
  addSingleEntry,
  insertFromCsv,
  test_translate,
  getDashboardData,
  getSchemes,
  getSchemeBySlug,
};
