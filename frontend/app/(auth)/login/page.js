import { Suspense } from "react";
import LoginClient from "./LoginClient";

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <p className="text-gray-600">Loading login page...</p>
        </div>
      }
    >
      <LoginClient />
    </Suspense>
  );
}
