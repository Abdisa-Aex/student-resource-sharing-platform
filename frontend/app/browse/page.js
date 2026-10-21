import { Suspense } from "react";
import BrowseClient from "./BrowseClient";

export default function BrowsePage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <p className="text-gray-600">Loading resources...</p>
        </div>
      }
    >
      <BrowseClient />
    </Suspense>
  );
}
