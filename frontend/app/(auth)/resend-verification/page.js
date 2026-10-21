import { Suspense } from "react";
import ResendVerificationClient from "./ResendVerificationClient";

export default function ResendVerificationPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <p className="text-gray-600">Loading...</p>
        </div>
      }
    >
      <ResendVerificationClient />
    </Suspense>
  );
}
