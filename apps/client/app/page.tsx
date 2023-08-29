import { Button } from "@shared/ui";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";

export const preferredRegion = "home";
export const dynamic = "force-dynamic";

export default function Home() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center"></main>
  );
}
