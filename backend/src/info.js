const res = await fetch("http://localhost:5000/translate", {
	method: "POST",
	body: JSON.stringify({
		q: "hello",
		source: "auto",
		target: "hi",
		format: "text",
		alternatives: 3,
		api_key: ""
	}),
	headers: { "Content-Type": "application/json" }
});

console.log(await res.json());



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



 

// PS C:\Users\Sunny Gupta> history

//   Id CommandLine
//   -- -----------
//    1 ubuntu
//    2 wsl
//    3 wsl --list --verbose
//    4 wsl -l -v
//    5 docker ps
//    6 docker run libretranslate
//    7 docker imagess
//    8 docker images
//    9 docker run libretranslate
//   10 docker run -d -p 5000:5000 -v libretranslate-data:/app/.local/share/argos-translate  --name libretranslate libretranslate/libretranslate
//   11 docker ps
//   12 docker logs -f libretranslate
//   13 docker rm -f libretranslate
//   14 docker ps
//   15 docker run -d -p 5000:5000 -v libretranslate-data:/app/.local/share/argos-translate -e LT_LOAD_MODELS=en,hi --name libretranslate libretranslate/li...
//   16 docker logs -f libretranslate
//   17 docker volume inspect libretranslate-data
//   18 docker ps
//   19 docker volume inspect libretranslate-data
//   20 docker rm -f libretranslate
//   21 docker ps
//   22 docker run -d -p 5000:5000 -v libretranslate-data:/app/.local/share/argos-translate -e LT_LOAD_MODELS=en,hi --name libretranslate libretranslate/li...
//   23 docker logs -f libretranslate
//   24 docker logs -f libretranslate
//   25 docker logs -f libretranslate
//   26 docker rm -f libretranslate
//   27 docker run -d -p 5000:5000 -v libretranslate-data:/app/.local/share/argos-translate  --name libretranslate libretranslate/libretranslate
//   28 docker rm -f libretranslate
//   29 docker run -d -p 5000:5000 -v libretranslate-data:/app/.local/share/argos-translate  --name libretranslate libretranslate/libretranslate
//   30 docker logs -f libretranslate
//   31 history

