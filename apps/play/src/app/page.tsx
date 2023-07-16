import Link from "next/link";
import Text from "../components/Text/Text";

export default function Home() {
  return (
    <main>
      <Text size="h1">Latest recordings</Text>
      <Link href="/recordings">Recordings</Link>
    </main>
  );
}
Text;
