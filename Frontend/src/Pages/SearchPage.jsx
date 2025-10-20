import React, { useState, useEffect } from "react";
import { Header } from "../Conponents/Header";
import { Footer } from "../Conponents/Footer";
import { AdvancedFilters } from "../Conponents/AdvancedFilters";
import { SchemeCard } from "../Conponents/SchemeCard";
import { sampleScheme } from "../lib/sample-scheme";
import { ArrowUpDown, Grid, List, TrendingUp, ChevronLeft, ChevronRight } from "lucide-react";
import { useSelector } from "react-redux";
import axios from "axios"
import { baseUrl } from "../lib/base";
import { Loader } from "../Conponents/Loader";
import { useNavigate, useLocation } from "react-router-dom";

// Pagination Component
function Pagination({ currentPage, totalPages, onPageChange }) {
  const getPageNumbers = () => {
    const pages = [];
    const showEllipsis = totalPages > 7;
    
    if (!showEllipsis) {
      for (let i = 0; i < totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage < 3) {
        for (let i = 0; i < 5; i++) pages.push(i);
        pages.push('ellipsis');
        pages.push(totalPages - 1);
      } else if (currentPage > totalPages - 4) {
        pages.push(0);
        pages.push('ellipsis');
        for (let i = totalPages - 5; i < totalPages; i++) pages.push(i);
      } else {
        pages.push(0);
        pages.push('ellipsis');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) pages.push(i);
        pages.push('ellipsis');
        pages.push(totalPages - 1);
      }
    }
    
    return pages;
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePageChange = (newPage) => {
    onPageChange(newPage);
    scrollToTop();
  };

  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-center gap-2 mt-8">
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 0}
        className="flex items-center gap-1 px-3 py-2 rounded border border-input bg-background hover:bg-accent hover:text-accent-foreground disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        <ChevronLeft className="h-4 w-4" />
        <span className="hidden sm:inline">Previous</span>
      </button>

      <div className="flex items-center gap-1">
        {getPageNumbers().map((pageNum, idx) => {
          if (pageNum === 'ellipsis') {
            return (
              <span key={`ellipsis-${idx}`} className="px-2 py-2 text-muted-foreground">
                ...
              </span>
            );
          }
          
          return (
            <button
              key={pageNum}
              onClick={() => handlePageChange(pageNum)}
              className={`min-w-[40px] px-3 py-2 rounded transition-colors ${
                currentPage === pageNum
                  ? 'bg-primary text-primary-foreground font-semibold'
                  : 'border border-input bg-background hover:bg-accent hover:text-accent-foreground'
              }`}
            >
              {pageNum + 1}
            </button>
          );
        })}
      </div>

      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages - 1}
        className="flex items-center gap-1 px-3 py-2 rounded border border-input bg-background hover:bg-accent hover:text-accent-foreground disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        <span className="hidden sm:inline">Next</span>
        <ChevronRight className="h-4 w-4" />
      </button>
    </div>
  );
}

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
  const [itemsPerPage] = useState(10);
  const [totalPages, setTotalPages] = useState(0);

  const allCategoryData = useSelector(store => store.dashData.items)

  const [filteredSchemes, setFilteredSchemes] = useState([allCategoryData.all]);
  const [viewMode, setViewMode] = useState("grid");
  const [actualSchemes, setActualSchemes] = useState([]);

  const fetchSchemes = async () => {
    const startIndex = page * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const requestData = {
        filteredSchemes: filteredSchemes.slice(startIndex, endIndex),
    };

    try {
        const res = await axios.post(
            baseUrl + "/scheme/requestschemes", 
            requestData,
            {
                withCredentials: true
            }
        );
        
        console.log(res.data, "this is response");
        setActualSchemes(res.data);

    } catch(error) {
        console.error("Error fetching schemes:", error);
    }
  }

  useEffect(() => {
    console.log(filteredSchemes)
    fetchSchemes()
  }, [filteredSchemes, page])

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

    const set = new Set(filteredArray);

    if (filters.categories && filters.categories.length > 0) {
        filters.categories.forEach((element) => {
            if (allCategoryData.category[element]) { 
                allCategoryData.category[element].forEach((ele) => {
                    set.add(ele);
                });
            }
        });
    }

    if (filters.level && filters.level.length > 0) {
        filters.level.forEach((element) => {
            if (allCategoryData.level[element]) { 
                allCategoryData.level[element].forEach((ele) => {
                    set.add(ele);
                });
            }
        });
    }

    if (filters.tags && filters.tags.length > 0) {
        filters.tags.forEach((element) => {
            if (allCategoryData.tags[element]) { 
                allCategoryData.tags[element].forEach((ele) => {
                    set.add(ele);
                });
            }
        });
    }

    setActualSchemes([]);
    const myFinalArray = [...set]
    setFilteredSchemes(myFinalArray);
    setTotalPages(Math.ceil(myFinalArray.length / itemsPerPage));
    setPage(0);
  }, [filters]);

  const handleSortChange = (value) => {
    const [sortBy, sortOrder] = value.split("-");
    setFilters({ ...filters, sortBy, sortOrder });
  };

  return (
    <div className="min-h-screen flex flex-col">
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
              <>
                <div className={viewMode === "grid" ? "grid grid-cols-1 gap-6 md:grid-cols-2" : "space-y-4"}>
                  {actualSchemes.map((scheme) => (
                    <SchemeCard key={scheme._id} scheme={scheme} language={filters.language} />
                  ))}
                </div>
                
                <Pagination 
                  currentPage={page}
                  totalPages={totalPages}
                  onPageChange={setPage}
                />
              </>
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
    </div>
  );
}