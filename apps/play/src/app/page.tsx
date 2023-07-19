"use client";

import Link from "next/link";
import Text from "../components/Text/Text";
import { Button } from "../components/Button/Button";

export default function Home() {
  return (
    <main>
      <Text size="h1">Latest recordings</Text>
      <Link href="/recordings">Recordings</Link>
    </main>
  );
}
Text;
