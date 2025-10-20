import React, { useState, useEffect } from "react";
import { ArrowLeft, BookmarkX } from "lucide-react";
import { SchemeCard } from "./SchemeCard";
import { sampleSchemes } from "../lib/sample-data";
import { Link } from "react-router-dom";

export function SavedSchemesPage() {
  const [language, setLanguage] = useState("en");
  const [savedSchemes, setSavedSchemes] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load saved schemes from localStorage
  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem("Schemes")) || [];
      console.log(saved);
      setSavedSchemes(saved);
    } catch (error) {
      console.error("Error loading saved schemes:", error);
      setSavedSchemes([]);
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    console.log("saveing", savedSchemes);
  }, [savedSchemes])
  const savedSchemesData = savedSchemes.filter((scheme) =>
   scheme._id ? scheme : null
  );

  if (!isLoaded) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-b-2 border-primary"></div>
          <p className="text-muted-foreground">Loading saved schemes...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col">
      <main className="container mx-auto flex-1 px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Link to="/">
            <button className="mb-4 flex items-center gap-2 rounded-md px-3 py-1 text-sm font-medium text-muted-foreground hover:bg-accent hover:text-accent-foreground">
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </button>
          </Link>
          <h1 className="mb-2 text-4xl font-bold text-foreground">Saved Schemes</h1>
          <p className="text-muted-foreground">
            {savedSchemesData.length} scheme{savedSchemesData.length !== 1 ? "s" : ""} saved
          </p>
        </div>

        {/* Language Toggle */}
        <div className="mb-8 flex gap-2">
          <button
            onClick={() => setLanguage("en")}
            className={`rounded-md px-4 py-2 text-sm font-medium ${
              language === "en"
                ? "bg-primary text-primary-foreground"
                : "border border-input bg-background hover:bg-accent hover:text-accent-foreground"
            }`}
          >
            English
          </button>
          <button
            onClick={() => setLanguage("hi")}
            className={`rounded-md px-4 py-2 text-sm font-medium ${
              language === "hi"
                ? "bg-primary text-primary-foreground"
                : "border border-input bg-background hover:bg-accent hover:text-accent-foreground"
            }`}
          >
            हिंदी
          </button>
        </div>

        {savedSchemesData.length === 0 ? (
          <div className="py-16 text-center">
            <BookmarkX className="mx-auto mb-4 h-16 w-16 text-muted-foreground opacity-50" />
            <h2 className="mb-2 text-2xl font-semibold text-foreground">No Saved Schemes</h2>
            <p className="mb-6 text-muted-foreground">
              You haven't saved any schemes yet. Start exploring and save your favorite schemes!
            </p>
            <Link to="/">
              <button className="rounded-md bg-primary px-6 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90">
                Browse Schemes
              </button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {savedSchemesData.map((scheme) => (
              <SchemeCard key={scheme._id} scheme={scheme} language={language} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
