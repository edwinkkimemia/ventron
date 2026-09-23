"use client";
import { signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

function LoginForm() {
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);
  const [checking, setChecking] = useState(true);
  const router = useRouter();
  const params = useSearchParams();
  const callbackUrl = params.get("callbackUrl") ?? "/admin";

  // Already signed in? Skip the form.
  useEffect(() => {
    fetch("/api/auth/session")
      .then((r) => r.json())
      .then((s) => {
        if (s?.user) router.replace(callbackUrl);
        else setChecking(false);
      })
      .catch(() => setChecking(false));
  }, [router, callbackUrl]);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true); setErr("");
    const fd = new FormData(e.currentTarget);
    const res = await signIn("credentials", {
      email: String(fd.get("email")).trim().toLowerCase(),
      password: fd.get("password"),
      redirect: false,
    });
    setLoading(false);
    if (res?.error) setErr("Invalid email or password.");
    else {
      router.replace(callbackUrl);
      router.refresh();
    }
  }

  if (checking) {
    return <div className="min-h-screen grid place-items-center bg-navy-950 text-steel-300 text-sm uppercase tracking-widest">Checking session…</div>;
  }

  return (
    <div className="min-h-screen grid place-items-center bg-gradient-to-b from-navy-900 to-navy-950 px-4">
      <form onSubmit={onSubmit} className="w-full max-w-sm bg-white p-8 shadow-2xl">
        <div className="inline-block bg-white border border-steel-200 px-2 py-1.5">
          <Image src="/ventron-logo.png" alt="Ventron Mechanical Systems Ltd" width={276} height={115} className="h-12 w-auto" />
        </div>
        <h1 className="font-condensed mt-4 text-2xl font-semibold uppercase text-navy-900">Admin sign in</h1>
        <p className="text-xs text-steel-500 mt-1">Ventron Mechanical Systems Ltd — restricted area</p>
        <label className="block mt-5 text-[11px] font-bold uppercase tracking-widest text-steel-500">Email</label>
        <input name="email" type="email" required autoComplete="username" placeholder="you@ventronltd.com" className="mt-1.5 w-full border border-steel-300 px-3.5 py-2.5 text-sm outline-none focus:border-navy-900" />
        <label className="block mt-3 text-[11px] font-bold uppercase tracking-widest text-steel-500">Password</label>
        <input name="password" type="password" required autoComplete="current-password" placeholder="••••••••" className="mt-1.5 w-full border border-steel-300 px-3.5 py-2.5 text-sm outline-none focus:border-navy-900" />
        {err && <p className="mt-3 text-sm font-semibold text-red-700">{err}</p>}
        <button disabled={loading} className="mt-5 w-full bg-navy-900 py-3 text-sm font-bold uppercase tracking-widest text-white hover:bg-navy-800 disabled:opacity-60">{loading ? "Signing in…" : "Sign in"}</button>
        <Link href="/" className="mt-4 block text-center text-xs font-bold uppercase tracking-widest text-steel-500 hover:text-navy-900">← Back to website</Link>
      </form>
    </div>
  );
}

export default function AdminLogin() {
  return (
    <Suspense fallback={<div className="min-h-screen grid place-items-center bg-navy-950 text-steel-300 text-sm uppercase tracking-widest">Loading…</div>}>
      <LoginForm />
    </Suspense>
  );
}
