import { Link } from "react-router-dom";
import { SearchInput } from "./SearchInput"; // Adjust the path as needed
import { ArrowRight, Users, FileText, Award } from "lucide-react";

export function HeroSection() {
  const handleSearch = (query) => {
    // Redirect to the search page with the query
    window.location.href = `/search?q=${encodeURIComponent(query)}`;
  };

  return (
    <section className="relative overflow-hidden py-20 lg:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="mb-6 text-balance text-4xl font-bold sm:text-5xl lg:text-6xl">
            Discover Government{" "}
            <span className="text-primary">Schemes</span> Made for You
          </h1>
          <p className="mx-auto mb-8 max-w-2xl text-pretty text-xl text-muted-foreground">
            Find the perfect government schemes and benefits tailored to your
            needs. Search through thousands of programs with our intelligent
            filtering system.
          </p>

          <div className="mx-auto mb-12 max-w-2xl">
            <div className="flex flex-col gap-4 sm:flex-row">
              <SearchInput onSearch={handleSearch} className="flex-1" />
              <Link to="/search" className="w-full sm:w-auto">
                <button className="flex h-12 w-full items-center justify-center rounded-md bg-primary px-8 text-lg font-medium text-primary-foreground hover:bg-primary/90 sm:w-auto">
                  Search Schemes
                  <ArrowRight className="ml-2 h-4 w-4" />
                </button>
              </Link>
            </div>
          </div>

          <div className="mx-auto grid max-w-3xl grid-cols-1 gap-8 md:grid-cols-3">
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <FileText className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-2 font-semibold">1000+ Schemes</h3>
              <p className="text-sm text-muted-foreground">
                Comprehensive database of government programs
              </p>
            </div>
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10">
                <Users className="h-6 w-6 text-accent" />
              </div>
              <h3 className="mb-2 font-semibold">For Everyone</h3>
              <p className="text-sm text-muted-foreground">
                Schemes for individuals, families, and businesses
              </p>
            </div>
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-chart-4/10">
                <Award className="h-6 w-6 text-chart-4" />
              </div>
              <h3 className="mb-2 font-semibold">Easy Access</h3>
              <p className="text-sm text-muted-foreground">
                Step-by-step application guidance
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
