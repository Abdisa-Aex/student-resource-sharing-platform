import { Suspense } from "react";
import MagicLoginSuccessClient from "./MagicLoginSuccessClient";

export default function MagicLoginSuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <p className="text-gray-600">Completing login...</p>
        </div>
      }
    >
      <MagicLoginSuccessClient />
    </Suspense>
  );
}
