import React, { useState, useEffect } from "react";
import { Header } from "../Conponents/Header";
import { Footer } from "../Conponents/Footer";
import { AdvancedFilters } from "../Conponents/AdvancedFilters";
import { SchemeCard } from "../Conponents/SchemeCard";
import { sampleScheme } from "../lib/sample-scheme";
import { ArrowUpDown, Grid, List, TrendingUp } from "lucide-react";
import { useSelector } from "react-redux";
import axios from "axios"
import { baseUrl } from "../lib/base";
import { Loader } from "../Conponents/Loader";
import { useNavigate, useLocation } from "react-router-dom";
// import { schema } from "../../../backend/src/models/schemeSchema";

export function SearchPage() {
  const location = useLocation()
  const navigate = useNavigate()
  const fromFeaturedCategory = location.state?.categorySelected
  const [filters, setFilters] = useState({
    search: "",
    categories: fromFeaturedCategory ? [fromFeaturedCategory] : [],
    tags: [],
    level: [],
    language: "en",
    dateRange: { from: null, to: null },
    benefitAmount: { min: null, max: null },
    sortBy: "relevance",
    sortOrder: "desc",
  });
  const [page, setPage] = useState(0);

  const allCategoryData = useSelector(store => store.dashData.items)

  
  // console.log(allCategoryData, "-<")

  const [filteredSchemes, setFilteredSchemes] = useState([allCategoryData.all]);
  const [viewMode, setViewMode] = useState("grid"); // "grid" or "list"
  const [actualSchemes, setActualSchemes] = useState([]);


  

  // const categoryOptions = [
  //   { value: "Agriculture", label: "Agriculture", count: 45 },
  //   { value: "Rural & Environment", label: "Rural & Environment", count: 32 },
  //   { value: "Social welfare & Empowerment", label: "Social Welfare & Empowerment", count: 67 },
  //   { value: "Education", label: "Education", count: 28 },
  //   { value: "Healthcare", label: "Healthcare", count: 41 },
  //   { value: "Employment", label: "Employment", count: 35 },
  //   { value: "Housing", label: "Housing", count: 22 },
  //   { value: "Women & Child Development", label: "Women & Child Development", count: 38 },
  // ];

  // const tagOptions = [
  //   { value: "Financial Assistance", label: "Financial Assistance", count: 89 },
  //   { value: "Farmer", label: "Farmer", count: 45 },
  //   { value: "Relief", label: "Relief", count: 23 },
  //   { value: "Income Support", label: "Income Support", count: 34 },
  //   { value: "Scholarship", label: "Scholarship", count: 28 },
  //   { value: "Healthcare", label: "Healthcare", count: 41 },
  //   { value: "Employment", label: "Employment", count: 35 },
  //   { value: "Housing", label: "Housing", count: 22 },
  //   { value: "Women", label: "Women", count: 38 },
  //   { value: "Child", label: "Child", count: 25 },
  //   { value: "Elderly", label: "Elderly", count: 18 },
  //   { value: "Disability", label: "Disability", count: 15 },
  // ];

  // const fetchSchemes = async () => {
  //   try{

  //     const res = await axios(baseUrl + "/scheme/requestschemes",{
        
  //     }, {
  //       withCredentials: true
  //     })

  //   }catch(error){
  //     console.error(error);
  //   }
  // }


  const fetchSchemes = async () => {
    // 1. Define the data array clearly
    const requestData = {
        // filteredSchemes: [
        //     "68d80382b0a881721ee22b24",
        //     "68d8eeee08fef1dd950a87e5",
        //     "68d8eeee08fef1dd950a87e9",
        //     "68d8eeee08fef1dd950a87f0",
        //     "68d90178b6692fb8cdba9846",
        //     "68d90178b6692fb8cdba9847",
        //     "68d90178b6692fb8cdba9850",
        //     "68d90178b6692fb8cdba9851",
        //     "68d90178b6692fb8cdba9856",
        //     "68d90178b6692fb8cdba9857",
        //     "68d90178b6692fb8cdba9861",
        //     "68d90178b6692fb8cdba9862",
        //     "68d90178b6692fb8cdba9865",
        //     "68d90178b6692fb8cdba9867",
        //     "68d90178b6692fb8cdba9869",
        //     "कृषि",
        //     "ग्रामीण और पर्यावरण"
        // ],
        filteredSchemes: filteredSchemes.slice(page, page+10),
    };

    try {
        // Use axios.post(url, data, config)
        const res = await axios.post(
            baseUrl + "/scheme/requestschemes", 
            requestData,                      // <-- 2nd argument: The data (req.body)
            {                                 // <-- 3rd argument: The config object
                withCredentials: true
            }
        );
        
        // Handle the successful response here, e.g., set data to state
        console.log(res.data, "this is response");
        // setActualSchemes([]);
        setActualSchemes(res.data);

    } catch(error) {
        console.error("Error fetching schemes:", error);
    }
}

  useEffect(() => {
    console.log(filteredSchemes)
    fetchSchemes()

  }, [filteredSchemes])

  useEffect(() => {
    let filtered = [sampleScheme];

    if (filters.search.trim()) {
      const searchTerm = filters.search.toLowerCase();
      filtered = filtered.filter(
        (scheme) =>
          scheme.scheme_name[filters.language].toLowerCase().includes(searchTerm) ||
          scheme.details[filters.language].toLowerCase().includes(searchTerm) ||
          scheme.benefits[filters.language].toLowerCase().includes(searchTerm) ||
          scheme.tags[filters.language].some((tag) => tag.toLowerCase().includes(searchTerm))
      );
    }

    if (filters.categories.length > 0) {
      filtered = filtered.filter((scheme) =>
        scheme.schemeCategory[filters.language].some((cat) => filters.categories.includes(cat))
      );
    }

    if (filters.tags.length > 0) {
      filtered = filtered.filter((scheme) =>
        scheme.tags[filters.language].some((tag) => filters.tags.includes(tag))
      );
    }

    if (filters.level.length > 0) {
      filtered = filtered.filter((scheme) => filters.level.includes(scheme.level));
    }

    if (filters.dateRange.from || filters.dateRange.to) {
      filtered = filtered.filter((scheme) => {
        const schemeDate = new Date(scheme.updatedAt);
        if (filters.dateRange.from && schemeDate < filters.dateRange.from) return false;
        if (filters.dateRange.to && schemeDate > filters.dateRange.to) return false;
        return true;
      });
    }
    //Mycode ===================================================================
    
    let filteredArray = [...allCategoryData["all"]];
    // console.log(filteredArray, "filtered")

    if(filters.categories.length > 0){
      filters.categories.forEach((element) => {
        const requiredScheme = allCategoryData.category[element].filter((schemeId) => filteredArray.includes(schemeId));
        filteredArray = requiredScheme;
      })
    }

    if(filters.level.length > 0){
      filters.level.forEach((element) => {
        const requiredScheme = allCategoryData.level[element].filter((schemeId) => filteredArray.includes(schemeId));
        filteredArray = requiredScheme;
      })
    }

    if(filters.tags.length > 0){
      filters.tags.forEach((element) => {
        const requiredScheme = allCategoryData.tags[element].filter((schemeId) => filteredArray.includes(schemeId));
        filteredArray = requiredScheme;
      })
      
    }
    // console.log(filteredArray, "final");

    const set = new Set(filteredArray);

// **CORRECTION:** Check the length of the categories array
if (filters.categories && filters.categories.length > 0) {
    filters.categories.forEach((element) => {
        // 'element' is the category name/ID, e.g., 'Electronics'
        // console.log("1");
        // **ASSUMPTION:** allCategoryData.category[element] is an array of items
        if (allCategoryData.category[element]) { 
            allCategoryData.category[element].forEach((ele) => {
              // if(typeof ele === "number"){
                set.add(ele);
            });
        }
    });
}

if (filters.level && filters.level.length > 0) {
    filters.level.forEach((element) => {
        // 'element' is the category name/ID, e.g., 'Electronics'
        // console.log("2")
        // **ASSUMPTION:** allCategoryData.category[element] is an array of items
        if (allCategoryData.level[element]) { 
            allCategoryData.level[element].forEach((ele) => {
              // if(typeof ele === "number")
                set.add(ele);
            });
        }
    });
}

if (filters.tags && filters.tags.length > 0) {
    filters.tags.forEach((element) => {
        // 'element' is the category name/ID, e.g., 'Electronics'
        // console.log("3")
        // **ASSUMPTION:** allCategoryData.category[element] is an array of items
        if (allCategoryData.tags[element]) { 
            allCategoryData.tags[element].forEach((ele) => {
              // if(typeof ele === "number")
                set.add(ele);
            });
        }
    });
}


    // console.log(set, "this is set")


    // ==========================================================================
    // Simplified benefit amount filtering removed for brevity

    // if (filters.sortBy === "name") {
    //   filtered.sort((a, b) => {
    //     const c = a.scheme_name[filters.language].localeCompare(b.scheme_name[filters.language]);
    //     return filters.sortOrder === "asc" ? c : -c;
    //   });
    // } else if (filters.sortBy === "updated") {
    //   filtered.sort((a, b) => {
    //     const c = new Date(a.updatedAt) - new Date(b.updatedAt);
    //     return filters.sortOrder === "asc" ? c : -c;
    //   });
    // }
    setActualSchemes([]);
    const myFinalAarray = [...set]
    setFilteredSchemes(myFinalAarray);
    // console.log(filteredSchemes)
  }, [filters]);

  const handleSortChange = (value) => {
    const [sortBy, sortOrder] = value.split("-");
    setFilters({ ...filters, sortBy, sortOrder });
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* <Header /> */}

      <main className="container mx-auto flex-grow px-4 py-8 sm:px-6 lg:px-8">
        <h1 className="mb-2 text-3xl font-bold">Search Government Schemes</h1>
        <p className="mb-8 text-muted-foreground">
          Find the perfect government schemes and benefits for your needs
        </p>

        <div className="grid gap-8 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <AdvancedFilters
              filters={filters}
              onFiltersChange={setFilters}
              onSearch={() => { }}
            />
          </div>

          <div className="lg:col-span-3">
            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm text-muted-foreground">
                Showing {filteredSchemes.length} of {sampleScheme.length} schemes
              </p>

              <div className="flex items-center gap-4">
                <select
                  value={`${filters.sortBy}-${filters.sortOrder}`}
                  onChange={e => handleSortChange(e.target.value)}
                  className="rounded border border-input p-2"
                >
                  <option value="relevance-desc">Most Relevant</option>
                  <option value="name-asc">Name A-Z</option>
                  <option value="name-desc">Name Z-A</option>
                  <option value="updated-desc">Recently Updated</option>
                  <option value="updated-asc">Oldest First</option>
                </select>

                <div className="flex border rounded-md overflow-hidden">
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`p-2 ${viewMode === "grid" ? "bg-primary text-primary-foreground" : "text-muted-foreground"}`}
                  >Grid</button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={`p-2 ${viewMode === "list" ? "bg-primary text-primary-foreground" : "text-muted-foreground"}`}
                  >List</button>
                </div>
              </div>
            </div>

            {actualSchemes.length > 0 ? (
              <div className={viewMode === "grid" ? "grid grid-cols-1 gap-6 md:grid-cols-2" : "space-y-4"}>
                {actualSchemes.map((scheme) => (
                  <SchemeCard key={scheme._id} scheme={scheme} language={filters.language} />
                ))}
              </div>
            ) : (
              <div className="py-12 text-center text-muted-foreground">
                <Loader />
                <p className="text-lg font-semibold mb-2">No schemes found</p>
                <p>Try adjusting your filters or search terms</p>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* <Footer /> */}
    </div>
  );
}
