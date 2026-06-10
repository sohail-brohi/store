"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import { PageHeader } from "@/components/ui/PageHeader";
import { Button } from "@/components/ui/Button";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import { getAuthErrorMessage } from "@/lib/auth-errors";
import toast from "react-hot-toast";

function AuthForm() {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const { user, loading: authLoading, login, register, loginWithGoogle } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") || "/account";

  useEffect(() => {
    if (!authLoading && user) {
      router.replace(redirect);
    }
  }, [authLoading, user, redirect, router]);

  if (authLoading || user) return <LoadingSpinner fullScreen />;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isLogin) {
        await login(form.email, form.password);
        toast.success("Welcome back!");
      } else {
        await register(form.email, form.password, form.name);
        toast.success("Account created successfully!");
      }
      router.push(redirect);
    } catch (error) {
      toast.error(getAuthErrorMessage(error));
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    setLoading(true);
    try {
      await loginWithGoogle();
      toast.success("Signed in with Google!");
      router.push(redirect);
    } catch (error) {
      toast.error(getAuthErrorMessage(error));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-md px-4 py-12">
      <PageHeader
        title={isLogin ? "Sign In" : "Create Account"}
        subtitle={
          isLogin ? "Welcome back to Luxee Store" : "Join the Luxee family today"
        }
      />

      <Button
        type="button"
        variant="outline"
        size="lg"
        className="mb-6 w-full"
        disabled={loading}
        onClick={handleGoogle}
      >
        Continue with Google
      </Button>

      <div className="relative mb-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-border" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted">or</span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {!isLogin && (
          <div>
            <label className="mb-1 block text-sm text-muted">Full Name</label>
            <input
              type="text"
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full rounded-sm border border-border bg-transparent px-4 py-3 focus:border-gold focus:outline-none"
            />
          </div>
        )}
        <div>
          <label className="mb-1 block text-sm text-muted">Email</label>
          <input
            type="email"
            required
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full rounded-sm border border-border bg-transparent px-4 py-3 focus:border-gold focus:outline-none"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm text-muted">Password</label>
          <input
            type="password"
            required
            minLength={6}
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            className="w-full rounded-sm border border-border bg-transparent px-4 py-3 focus:border-gold focus:outline-none"
          />
        </div>

        <Button type="submit" size="lg" className="w-full" disabled={loading}>
          {loading ? "Please wait..." : isLogin ? "Sign In" : "Create Account"}
        </Button>
      </form>

      {isLogin && (
        <p className="mt-4 text-center text-sm text-muted">
          <Link href="/forgot-password" className="text-gold hover:underline">
            Forgot password?
          </Link>
        </p>
      )}

      <p className="mt-6 text-center text-sm text-muted">
        {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
        <button
          type="button"
          onClick={() => setIsLogin(!isLogin)}
          className="text-gold hover:underline"
        >
          {isLogin ? "Sign Up" : "Sign In"}
        </button>
      </p>

      <p className="mt-4 text-center">
        <Link href="/" className="text-sm text-muted hover:text-gold">
          ← Back to store
        </Link>
      </p>
    </div>
  );
}

export default function AuthPage() {
  return (
    <Suspense fallback={<LoadingSpinner fullScreen />}>
      <AuthForm />
    </Suspense>
  );
}
