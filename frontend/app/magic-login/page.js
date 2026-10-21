import { Suspense } from "react";
import MagicLoginClient from "./MagicLoginClient";

export default function MagicLoginPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <p className="text-gray-600">Processing your magic link...</p>
        </div>
      }
    >
      <MagicLoginClient />
    </Suspense>
  );
}
