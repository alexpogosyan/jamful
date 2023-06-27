import Link from "next/link";

async function getData() {
  const res = await fetch(`${process.env.API_URL}/recordings`);

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export default async function Recordings() {
  const recordings = await getData();

  return (
    <main>
      <h1>Recordings</h1>
      <ul>
        {recordings.map((recording: any) => (
          <li key={`rec_${recording.id}`}>
            <Link href={`/recordings/${recording.id}`}>{recording.title}</Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
