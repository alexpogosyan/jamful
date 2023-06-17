import Player from "./player";

async function getData(id: string) {
  const res = await fetch(`${process.env.API_URL}/recordings/${id}`);

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export default async function Recording({
  params,
}: {
  params: { id: string };
}) {
  const recording = await getData(params.id);

  return (
    <>
      <h1>{recording.title}</h1>
      <Player url={recording.url} />
    </>
  );
}
