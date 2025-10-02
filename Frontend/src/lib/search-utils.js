// Manages search history using localStorage
export const SearchHistory = {
  getHistory: () => {
    try {
      const history = localStorage.getItem("searchHistory");
      return history ? JSON.parse(history) : [];
    } catch (e) {
      return [];
    }
  },
  addToHistory: (query) => {
    if (!query) return;
    let history = SearchHistory.getHistory();
    // Remove existing entry to move it to the front
    history = history.filter((item) => item !== query);
    // Add new query to the front
    history.unshift(query);
    // Keep only the last 10 searches
    localStorage.setItem("searchHistory", JSON.stringify(history.slice(0, 10)));
  },
  clearHistory: () => {
    localStorage.removeItem("searchHistory");
  },
};

// A simple search engine to generate suggestions from sample data
export class SearchEngine {
  constructor(schemes) {
    this.schemes = schemes;
    this.popularKeywords = ["scholarship", "loan", "pension", "health"];
  }

  getSuggestions(query) {
    if (!query) return [];
    const lowerQuery = query.toLowerCase();
    const suggestions = new Set();

    // Scheme name suggestions
    this.schemes.forEach((scheme) => {
      if (scheme.name_en.toLowerCase().includes(lowerQuery)) {
        suggestions.add(JSON.stringify({ text: scheme.name_en, type: "scheme" }));
      }
    });

    // Category suggestions
    this.schemes.forEach((scheme) => {
        if (scheme.category_en.toLowerCase().includes(lowerQuery)) {
            suggestions.add(JSON.stringify({ text: scheme.category_en, type: "category" }));
        }
    });
    
    // Popular keyword suggestions
    this.popularKeywords.forEach(keyword => {
        if(keyword.toLowerCase().includes(lowerQuery)) {
            suggestions.add(JSON.stringify({ text: keyword, type: 'keyword' }))
        }
    });

    return Array.from(suggestions).map(item => JSON.parse(item)).slice(0, 10);
  }
}
