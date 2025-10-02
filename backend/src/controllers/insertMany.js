const csv = require("csv-parser");
const fs = require("fs");

const insertFromCsv = async (req, res) => {
  const results = [];

  fs.createReadStream("updated_data.csv")
    .pipe(csv({
      separator: "\t", // 👈 TAB separator
      mapHeaders: ({ header }) => header.trim() // clean up header names
    }))
    .on("data", (row) => {
      console.log(row); // see each row after parsing correctly

      results.push({
        scheme_name: row.scheme_name,
        slug: row.slug,
        details: row.details,
        benefits: row.benefits,
        eligibility: row.eligibility,
        application: row.application,
        documents: row.documents ? row.documents.split(",") : [],
        level: row.level,
        schemeCategory: row.schemeCategory,
        tags: row.tags ? row.tags.split(",") : [],
      });
    })
    .on("end", async () => {
      try {
        await Scheme.insertMany(results);
        console.log("✅ All data inserted successfully!");
      } catch (error) {
        console.error("❌ Error inserting data:", error);
      }
    });

  res.send("ok!");
};
