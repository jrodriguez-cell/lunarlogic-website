import { Suspense } from "react";
import LoginForm from "./LoginForm";

export const metadata = {
  title: "Trainer Login",
};

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <div className="text-2xl font-extrabold text-indigo-600">
            LunarLogic Training
          </div>
          <p className="mt-2 text-sm text-slate-500">Trainer sign in</p>
        </div>
        <Suspense>
          <LoginForm />
        </Suspense>
      </div>
    </div>
  );
}
