"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function MehndiPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/haldi");
  }, [router]);

  return (
    <main className="flex min-h-screen items-center justify-center">
      <p className="font-sans text-sm text-deep-gold/60">Opening invitation…</p>
    </main>
  );
}
