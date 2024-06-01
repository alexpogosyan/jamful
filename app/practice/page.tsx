import Link from "next/link";

export default async function PracticePage() {
  return (
    <div>
      <ul className="flex p-4">
        <Link href="/practice/scale-explorer">
          <li className="block rounded-md border p-8 text-lg hover:bg-gray-50">
            Scale Explorer
          </li>
        </Link>
      </ul>
    </div>
  );
}
