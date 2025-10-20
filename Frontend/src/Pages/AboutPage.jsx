import React from "react";
import { CheckCircle2 } from "lucide-react";

export function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">

      <main className="flex-1">
        {/* Hero Section */}

        {/* Mission Section */}
        {/* <section className="py-16 md:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2">
              <div className="space-y-6">
                <h2 className="text-3xl font-bold text-foreground md:text-4xl">
                  Our Mission
                </h2>
                <p className="text-lg leading-relaxed text-muted-foreground">
                  Yojna Finder is dedicated to bridging the gap between citizens and government schemes. We believe that
                  every eligible person should have easy access to information about schemes they can benefit from.
                </p>
                <p className="text-lg leading-relaxed text-muted-foreground">
                  Our platform simplifies the discovery process by providing comprehensive, up-to-date information about
                  government schemes with powerful search and filtering capabilities.
                </p>
              </div>
              <div className="flex h-96 items-center justify-center rounded-xl border border-border bg-gradient-to-br from-primary/10 to-accent/10 p-8">
                <div className="text-center">
                  <div className="mb-4 text-6xl">🎯</div>
                  <p className="text-muted-foreground">Making schemes accessible to all</p>
                </div>
              </div>
            </div>
          </div>
        </section> */}

        {/* Features Section */}
        <section className="bg-muted/30 py-16 md:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-3xl">
              <h2 className="mb-12 text-center text-3xl font-bold text-foreground md:text-4xl">
                Why Choose Yojna Finder?
              </h2>
              <div className="space-y-6">
                {[
                  {
                    title: "Comprehensive Database",
                    description:
                      "Access information about hundreds of government schemes across various categories and levels",
                  },
                  {
                    title: "Advanced Filtering",
                    description:
                      "Filter schemes by category, level, tags, eligibility criteria, and more to find exactly what you need",
                  },
                  {
                    title: "Bilingual Support",
                    description:
                      "Content available in both English and Hindi for better accessibility and understanding",
                  },
                  {
                    title: "Detailed Information",
                    description:
                      "Get complete details about benefits, eligibility, application process, and required documents",
                  },
                  {
                    title: "Save & Organize",
                    description: "Save your favorite schemes and organize them for easy reference and comparison",
                  },
                  {
                    title: "User-Friendly Interface",
                    description: "Clean, intuitive design that makes finding schemes simple and enjoyable",
                  },
                ].map((feature, index) => (
                  <div
                    key={index}
                    className="flex gap-4 rounded-lg border border-border bg-background p-6 transition-colors hover:border-primary/30"
                  >
                    <CheckCircle2 className="mt-1 h-6 w-6 flex-shrink-0 text-primary" />
                    <div>
                      <h3 className="mb-2 font-semibold text-foreground">{feature.title}</h3>
                      <p className="text-muted-foreground">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Vision Section */}


        {/* CTA Section */}
      </main>

    </div>
  );
}
