import React from "react";
import { ExternalLink, MapPin, Calendar } from "lucide-react";
import { SchemeDetailContent } from "../Pages/SchemeDetailContent";
import { useNavigate } from "react-router-dom";

export function SchemeCard({ scheme, language }) {
  console.log("this is ", scheme);
  const name = scheme?.scheme_name[language];
  const details = scheme.details[language];
  const benefits = scheme.benefits[language];
  const categories = scheme.schemeCategory[language];
  const tags = scheme.tags[language];
  const navigate = useNavigate()

  return (
    <div className="rounded-lg border bg-card p-6 shadow hover:shadow-lg transition-shadow cursor-pointer">
      <div className="flex-col justify-between items-start mb-4">
        <h3 className="text-lg font-semibold text-balance">{name}</h3>
        <div className="flex gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <MapPin className="h-3 w-3" />
            <span>{scheme.level} Level</span>
          </div>
          <div className="flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            <span>Updated {new Date(scheme.updatedAt).toLocaleDateString()}</span>
          </div>
        </div>
      </div>

      <p className="mb-4 line-clamp-3 text-muted-foreground">{details}</p>

      <div className="mb-4">
        <h4 className="font-medium text-sm mb-1">Benefits:</h4>
        <p className="line-clamp-2 text-foreground text-sm">{benefits}</p>
      </div>

      <div className="mb-4">
        <div className="flex flex-wrap gap-1">
          {categories.slice(0, 2).map((category, i) => (
            <span
              key={i}
              className="rounded-md bg-secondary px-2 py-0.5 text-xs font-semibold text-secondary-foreground"
            >
              {category}
            </span>
          ))}
          {categories.length > 2 && (
            <span className="rounded-md border border-border px-2 py-0.5 text-xs text-muted-foreground">
              +{categories.length - 2} more
            </span>
          )}
        </div>
      </div>

      <div className="mb-4">
        <div className="flex flex-wrap gap-1">
          {tags.slice(0, 3).map((tag, i) => (
            <span
              key={i}
              className="rounded-md border border-border px-2 py-0.5 text-xs text-muted-foreground"
            >
              {tag}
            </span>
          ))}
          {tags.length > 3 && (
            <span className="rounded-md border border-border px-2 py-0.5 text-xs text-muted-foreground">
              +{tags.length - 3} more
            </span>
          )}
        </div>
      </div>

      <div className="flex gap-2">
        {/* <a
          href={`/scheme/${scheme.slug}`}
          className="flex-1 text-center rounded-md bg-primary px-4 py-2 text-primary-foreground hover:bg-primary/90 transition"
        >
          View Details <ExternalLink className="inline ml-1 h-4 w-4" />
        </a> */}
        <button onClick={() => navigate(`/search/${scheme.slug}`, {
          state: {
            scheme: scheme
          }
        })} className="flex-1 text-center rounded-md bg-primary px-4 py-2 text-primary-foreground hover:bg-primary/90 transition">
          View Details
        </button>
      </div>
    </div>
  );
}
