import React, { useState, useEffect, useRef } from "react";
import { Search, Clock, TrendingUp, Hash, Folder, X } from "lucide-react";
import { SearchEngine, SearchHistory } from "../lib/search-utils"; // Adjust path as needed
import { sampleSchemes } from "../lib/sample-data"; // Adjust path as needed

export function SearchInput({
  value,
  onChange,
  onSearch,
  language,
  placeholder,
  className,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [recentSearches, setRecentSearches] = useState([]);
  const searchEngine = useRef(new SearchEngine(sampleSchemes));
  const inputRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    setRecentSearches(SearchHistory.getHistory());
  }, []);

  useEffect(() => {
    if (value?.trim()) {
      const newSuggestions = searchEngine.current.getSuggestions(
        value,
        language
      );
      setSuggestions(newSuggestions);
    } else {
      setSuggestions([]);
    }
  }, [value, language]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleInputChange = (e) => {
    const newValue = e.target.value;
    onChange(newValue);
    setIsOpen(true);
  };

  const handleSearch = (query = value) => {
    if (query.trim()) {
      SearchHistory.addToHistory(query.trim());
      setRecentSearches(SearchHistory.getHistory());
      onSearch(query.trim());
      setIsOpen(false);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    onChange(suggestion.text);
    handleSearch(suggestion.text);
  };

  const handleRecentSearchClick = (query) => {
    onChange(query);
    handleSearch(query);
  };

  const clearRecentSearches = () => {
    SearchHistory.clearHistory();
    setRecentSearches([]);
  };

  const getSuggestionIcon = (type) => {
    switch (type) {
      case "scheme":
        return <Search className="h-4 w-4" />;
      case "category":
        return <Folder className="h-4 w-4" />;
      case "tag":
        return <Hash className="h-4 w-4" />;
      case "keyword":
        return <TrendingUp className="h-4 w-4" />;
      default:
        return <Search className="h-4 w-4" />;
    }
  };

  const getSuggestionTypeLabel = (type) => {
    // This function remains the same
    return type.charAt(0).toUpperCase() + type.slice(1);
  };

  const showDropdown = isOpen && (suggestions.length > 0 || recentSearches.length > 0);

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <input
          ref={inputRef}
          type="text"
          placeholder={
            placeholder || "Search schemes by name, category, or benefits..."
          }
          value={value}
          onChange={handleInputChange}
          onFocus={() => setIsOpen(true)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSearch();
            else if (e.key === "Escape") setIsOpen(false);
          }}
          className="h-12 w-full rounded-md border border-input bg-background pl-10 pr-4 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
        />
      </div>

      {showDropdown && (
        <div className="absolute top-full left-0 right-0 z-50 mt-1 max-h-96 overflow-hidden rounded-md border border-border bg-card shadow-lg">
          <div className="max-h-96 overflow-y-auto">
            {recentSearches.length > 0 && (
              <div className="p-4">
                <div className="mb-3 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium text-muted-foreground">
                      Recent Searches
                    </span>
                  </div>
                  <button
                    onClick={clearRecentSearches}
                    className="inline-flex h-6 items-center justify-center rounded-md px-2 text-sm font-medium text-muted-foreground hover:bg-accent"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {recentSearches.slice(0, 5).map((query, index) => (
                    <button
                      key={index}
                      onClick={() => handleRecentSearchClick(query)}
                      className="h-7 rounded-md border border-border bg-transparent px-2.5 text-xs font-medium text-foreground hover:bg-accent"
                    >
                      {query}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {suggestions.length > 0 && (
              <>
                {recentSearches.length > 0 && (
                  <hr className="border-border" />
                )}
                <div className="p-2">
                  {suggestions.map((suggestion, index) => (
                    <button
                      key={index}
                      onClick={() => handleSuggestionClick(suggestion)}
                      className="flex w-full items-center justify-between rounded-md p-2 text-left hover:bg-muted"
                    >
                      <div className="flex items-center gap-3">
                        <div className="text-muted-foreground">
                          {getSuggestionIcon(suggestion.type)}
                        </div>
                        <span className="text-sm">{suggestion.text}</span>
                      </div>
                      <span className="rounded-md border border-border bg-background px-1.5 py-0.5 text-xs text-muted-foreground">
                        {getSuggestionTypeLabel(suggestion.type)}
                      </span>
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
