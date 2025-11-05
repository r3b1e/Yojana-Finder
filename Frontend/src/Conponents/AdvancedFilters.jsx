import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Filter,
  X,
  ChevronDown,
  ChevronUp,
  CalendarIcon,
  RotateCcw,
  Search,
  Loader,
  SlidersHorizontal,
} from "lucide-react";
import { format } from "date-fns";
import { baseUrl } from "../lib/base";
import axios from "axios";

export function AdvancedFilters({ filters, onFiltersChange, onSearch }) {
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [openSections, setOpenSections] = useState({
    categories: true,
    tags: true,
    level: true,
    dateRange: false,
  });
  const search = useRef(null);
  const categoryData = useSelector((store) => store.dashData.items);
  const [searchValue, setSearchValue] = useState("");
  const [cursorerror, setCorsorerror] = useState(false);
  // console.log(categoryData);

  const handleSearch = async () => {
    // console.log(searchValue);
    setCorsorerror(true); // not sure why you set it before API call, maybe intended?

    try {
      const res = await axios.get(baseUrl + "/scheme/search/query", {
        params: { query: searchValue },
        withCredentials: true,
      });
      const data = await res.data;
      // console.log(data);
      if (res.data) {
        setCorsorerror(false); // maybe false on success?
        onFiltersChange({ ...filters, search: searchValue });
        onFiltersChange({ ...filters, searchArray: [...data.Id] });
      }
    } catch (err) {
      console.error("Error fetching schemes:", err);
    }
  };

  const toggleSection = (section) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const handleCheckboxChange = (filterType, value, checked) => {
    const currentValues = filters[filterType];
    const newValues = checked
      ? [...currentValues, value]
      : currentValues.filter((v) => v !== value);
    onFiltersChange({ ...filters, [filterType]: newValues });
    // console.log(filters);
  };

  const handleDateRangeChange = (field, date) => {
    onFiltersChange({
      ...filters,
      dateRange: {
        ...filters.dateRange,
        [field]: date || null,
      },
    });
  };

  const clearAllFilters = () => {
    onFiltersChange({
      search: "",
      categories: [],
      tags: [],
      level: [],
      language: "en",
      dateRange: { from: null, to: null },
      benefitAmount: { min: null, max: null },
      sortBy: "relevance",
      sortOrder: "desc",
    });
  };

  const activeFiltersCount =
    filters.categories.length +
    filters.tags.length +
    filters.level.length +
    (filters.dateRange.from || filters.dateRange.to ? 1 : 0);

  // const levels = [
  //   { value: "Central", label: "Central Government", count: 45 },
  //   { value: "State", label: "State Government", count: 78 },
  // ];

  return (
    <div className="space-y-6">
      {/* Search Input */}
      <div className="relative flex items-center w-full">
        <input
          type="text"
          placeholder="Search..."
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          className="w-full rounded-md border border-gray-300 p-2 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* Clear Button */}
        {searchValue && (
          <button
            onClick={() => {
              setSearchValue("");
              onFiltersChange({ ...filters, search: "" });
              onFiltersChange({ ...filters, searchArray: [] })
            }}
            className="absolute right-10 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600"
            title="Clear"
          >
            {!cursorerror ? (
              <X size={20} />
            ) : (
              <Loader className="animate-spin text-primary" size={24} />
            )}
          </button>
        )}

        {/* Search Button */}
        <button
          onClick={() => handleSearch()}
          className="cursor-pointer absolute right-1 top-1/2 -translate-y-1/2 rounded-md bg-blue-500 p-2 text-white hover:bg-blue-600 transition-colors"
          title="Search"
        >
          <Search size={18} />
        </button>
      </div>

      {/* Quick Filters */}
      <div className="flex flex-wrap gap-2">
        <span className="text-sm font-medium text-gray-600">
          Quick filters:
        </span>
        {[
          "Financial Assistance",
          "Farmer",
          "Women",
          "Education",
          "Entrepreneurship",
        ].map((tag) => (
          <button
            key={tag}
            onClick={() =>
              handleCheckboxChange("tags", tag, !filters.tags.includes(tag))
            }
            className={`px-2 py-1 text-xs rounded ${
              filters.tags.includes(tag)
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-700"
            }`}
          >
            {tag}
          </button>
        ))}
      </div>

      {/* Language Selector */}
      <select
        value={filters.language}
        onChange={(e) =>
          onFiltersChange({ ...filters, language: e.target.value })
        }
        className="w-32 rounded border p-1 text-sm"
      >
        <option value="en">English</option>
        <option value="hi">हिंदी</option>
      </select>

      {/* Filter Toggler for Mobile */}
      <button
        onClick={() => setIsFiltersOpen(!isFiltersOpen)}
        className="lg:hidden flex items-center gap-2 py-2 px-4 border rounded"
      >
        <SlidersHorizontal />
        Advanced Filters
        {activeFiltersCount > 0 && (
          <span className="ml-2 rounded-full bg-blue-600 px-2 text-white text-xs">
            {activeFiltersCount}``
          </span>
        )}
        {isFiltersOpen ? <ChevronUp /> : <ChevronDown />}
      </button>

      {/* Advanced Filters */}
      <div className={`${isFiltersOpen ? "block" : "hidden"} lg:block`}>
        {/* Categories */}
        <div className="mb-4">
          <button
            onClick={() => toggleSection("categories")}
            className="flex items-center justify-between w-full text-lg font-semibold"
          >
            Categories
            {openSections.categories ? <ChevronUp /> : <ChevronDown />}
          </button>
          {openSections.categories && (
            <div className="max-h-40 overflow-auto mt-2">
              {/* {categoryOptions.map((cat) => (
                <label key={cat.value} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={filters.categories.includes(cat.value)}
                    onChange={(e) =>
                      handleCheckboxChange(
                        "categories",
                        cat.value,
                        e.target.checked
                      )
                    }
                  />
                  <span>
                    {cat.label} ({cat.count})
                  </span>
                </label>
              ))} */}
              {Object.entries(categoryData.category).map(
                ([key, value], inx) => (
                  <label key={inx} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={filters.categories.includes(key)}
                      onChange={(e) =>
                        handleCheckboxChange(
                          "categories",
                          key,
                          e.target.checked
                        )
                      }
                    />
                    <span>
                      {key} ({value.length})
                    </span>
                  </label>
                )
              )}
            </div>
          )}
        </div>

        {/* Level */}
        <div className="mb-4">
          <button
            onClick={() => toggleSection("level")}
            className="flex items-center justify-between w-full text-lg font-semibold"
          >
            Scheme Level
            {openSections.level ? <ChevronUp /> : <ChevronDown />}
          </button>
          {openSections.level && (
            <div className="mt-2">
              {/* {levels.map((level) => (
                <label key={level.value} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={filters.level.includes(level.value)}
                    onChange={(e) =>
                      handleCheckboxChange(
                        "level",
                        level.value,
                        e.target.checked
                      )
                    }
                  />
                  <span>
                    {level.label} ({level.count})
                  </span>
                </label>
              ))} */}
              {Object.entries(categoryData.level).map(([key, value], inx) => (
                <label key={inx} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={filters.level.includes(key)}
                    onChange={(e) =>
                      handleCheckboxChange("level", key, e.target.checked)
                    }
                  />
                  <span>
                    {key} Government ({value.length})
                  </span>
                </label>
              ))}
            </div>
          )}
        </div>

        <div className="mb-4">
          <button
            onClick={() => toggleSection("tags")}
            className="flex items-center justify-between w-full text-lg font-semibold"
          >
            Tags
            {openSections.tags ? <ChevronUp /> : <ChevronDown />}
          </button>
          {openSections.tags && (
            <div className="max-h-40 overflow-auto mt-2">
              {Object.entries(categoryData.tags).map(([key, value], inx) => (
                <label key={inx} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={filters.tags.includes(key)}
                    onChange={(e) =>
                      handleCheckboxChange("tags", key, e.target.checked)
                    }
                  />
                  <span>
                    {key} ({value.length})
                  </span>
                </label>
              ))}
            </div>
          )}
        </div>

        {/* Date Range */}
        <div>
          <button
            onClick={() => toggleSection("dateRange")}
            className="flex items-center justify-between w-full text-lg font-semibold"
          >
            Last Updated
            {openSections.dateRange ? <ChevronUp /> : <ChevronDown />}
          </button>
          {openSections.dateRange && (
            <div className="mt-2 grid grid-cols-2 gap-2">
              <div>
                <label className="block mb-1 text-sm font-medium">From</label>
                <input
                  type="date"
                  value={
                    filters.dateRange.from
                      ? filters.dateRange.from.toISOString().slice(0, 10)
                      : ""
                  }
                  onChange={(e) =>
                    handleDateRangeChange(
                      "from",
                      e.target.value ? new Date(e.target.value) : null
                    )
                  }
                  className="w-full rounded border px-2 py-1"
                />
              </div>
              <div>
                <label className="block mb-1 text-sm font-medium">To</label>
                <input
                  type="date"
                  value={
                    filters.dateRange.to
                      ? filters.dateRange.to.toISOString().slice(0, 10)
                      : ""
                  }
                  onChange={(e) =>
                    handleDateRangeChange(
                      "to",
                      e.target.value ? new Date(e.target.value) : null
                    )
                  }
                  className="w-full rounded border px-2 py-1"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
