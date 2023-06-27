import Player from "./player";
import * as Recording from "@jamful/types/recording";

async function getData(id: string) {
  const res = await fetch(`${process.env["API_URL"]}/recordings/${id}`);

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export default async function RecordingPage({
  params,
}: {
  params: { id: string };
}) {
  const recording: Recording.Selectable = await getData(params.id);

  return (
    <main>
      <h1>{recording.title}</h1>
      <Player url={recording.url} />
    </main>
  );
}
