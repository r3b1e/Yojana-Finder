export function Footer() {
  return (
    <footer className="border-t border-border bg-muted/50">
      <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Site Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                <span className="text-sm font-bold text-primary-foreground">
                  Y
                </span>
              </div>
              <span className="text-xl font-semibold">Yojna Finder</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Making government schemes accessible to everyone through
              intelligent search and filtering.
            </p>
          </div>

          {/* Explore Links */}
          <div>
            <h4 className="mb-4 font-semibold">Explore</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a
                  href="#"
                  className="transition-colors hover:text-foreground"
                >
                  All Schemes
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="transition-colors hover:text-foreground"
                >
                  Categories
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="transition-colors hover:text-foreground"
                >
                  State Schemes
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="transition-colors hover:text-foreground"
                >
                  Central Schemes
                </a>
              </li>
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h4 className="mb-4 font-semibold">Support</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a
                  href="#"
                  className="transition-colors hover:text-foreground"
                >
                  Help Center
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="transition-colors hover:text-foreground"
                >
                  Application Guide
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="transition-colors hover:text-foreground"
                >
                  Contact Us
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="transition-colors hover:text-foreground"
                >
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h4 className="mb-4 font-semibold">Legal</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a
                  href="#"
                  className="transition-colors hover:text-foreground"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="transition-colors hover:text-foreground"
                >
                  Terms of Service
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="transition-colors hover:text-foreground"
                >
                  Disclaimer
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 border-t border-border pt-8 text-center text-sm text-muted-foreground">
          <p>
            &copy; 2025 Yojna Finder. All rights reserved. Built to serve the
            people of India.
          </p>
        </div>
      </div>
    </footer>
  );
}
