// Loader.jsx
import React from "react";

export function Loader() {
  return (
    <div className="flex flex-col items-center justify-center w-full h-40">
      <span className="relative flex h-12 w-12">
        <span className="animate-spin absolute inline-flex h-full w-full rounded-full border-4 border-solid border-primary border-t-transparent"></span>
      </span>
      <span className="mt-4 text-sm text-muted-foreground">Loading data… Please wait.</span>
    </div>
  );
}
