"use client";
import Keyboard from "@/ui/Keyboard/Keyboard";
import { useState } from "react";
import { scales } from "./scales";

export default function HomePage() {
  const [scaleIndex, setScaleIndex] = useState(0);

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setScaleIndex(Number(event.target.value));
  };

  return (
    <div className="flex w-full flex-col items-center gap-4">
      <h2 className="text-2xl font-bold">Scale Explorer</h2>

      <select
        value={scaleIndex}
        onChange={handleChange}
        className="block  rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
      >
        {scales.map((scale, index) => (
          <option key={scale.name} value={index}>
            {scales[index].name}
          </option>
        ))}
      </select>

      <div className="flex w-4/5">
        <Keyboard scale={scales[scaleIndex]} octaves={2} />
      </div>
    </div>
  );
}
