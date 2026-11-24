import type { Metadata } from "next";
import { Suspense } from "react";
import SearchResults from "./SearchResults";
import "./search.scss";

export const metadata: Metadata = {
  title: "Find trains",
  description: "Search available trains, compare classes and choose your departure.",
};

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="search-page search-page--loading" aria-busy="true" />}>
      <SearchResults />
    </Suspense>
  );
}
