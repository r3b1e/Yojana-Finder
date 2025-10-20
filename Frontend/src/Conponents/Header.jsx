import { Search, Menu, Bookmark} from "lucide-react";
import { Link } from "react-router-dom";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo and Site Title */}
          <div className="flex items-center space-x-4">
            <Link to="/" className="flex items-center space-x-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                <span className="text-sm font-bold text-primary-foreground">
                  Y
                </span>
              </div>
              <span className="text-xl font-semibold text-foreground">
                Yojna Finder
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden items-center space-x-8 md:flex">
            <Link
              to="/search"
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              Browse Schemes
            </Link>
            <a
              href="#"
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              Categories
            </a>
            <Link
              to="/about"
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              About
            </Link>
            <Link
              to="/help"
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              Help
            </Link>
          </nav>

          {/* Action Buttons */}
          <div className="flex items-center space-x-4">
            {/* Search Button (Ghost Style) */}
            <Link to="/saved">
              <button className="inline-flex items-center justify-center rounded-md text-sm font-medium h-9 px-3 text-foreground hover:bg-accent hover:text-accent-foreground">
                <Bookmark className="h-4 w-4 mr-2" />
                Saved
              </button>
            </Link>
            <Link to="/search" className="hidden sm:flex">
              <button className="inline-flex items-center justify-center rounded-md text-sm font-medium h-9 px-3 text-foreground hover:bg-accent hover:text-accent-foreground">
                <Search className="mr-2 h-4 w-4" />
                Search
              </button>
            </Link>
            
            {/* Get Started Button (Primary Style) */}
            <Link to="/search" className="hidden sm:flex items-center justify-center rounded-md text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 h-9 px-4 py-2">
              Get Started
            </Link>
            
            {/* Mobile Menu Button (Ghost Style) */}
            <button className="md:hidden inline-flex items-center justify-center rounded-md text-sm font-medium h-9 w-9 text-foreground hover:bg-accent hover:text-accent-foreground">
              <Menu className="h-4 w-4" />
              <span className="sr-only">Open menu</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
