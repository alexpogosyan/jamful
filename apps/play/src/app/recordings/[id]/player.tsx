"use client";

import ReactAudioPlayer from "react-audio-player";

export default async function Player(props: { url: string }) {
  return (
    <>
      <ReactAudioPlayer src={props.url} autoPlay controls />
    </>
  );
}
