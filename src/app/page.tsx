import Link from "next/link";

export default function HomePage() {
  return (
    <main className="flex w-full flex-1 flex-col">
      <Link href="/scale-explorer">Scale Explorer</Link>
    </main>
  );
}
