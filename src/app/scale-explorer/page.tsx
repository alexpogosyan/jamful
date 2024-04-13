"use client";
import { Scale } from "@/types/keyboard";
import Keyboard from "@/ui/Keyboard/Keyboard";
import { useState } from "react";

const scales: Scale[] = [
  {
    name: "Ionian",
    keyNums: [0, 2, 4, 5, 7, 9, 11],
  },
  {
    name: "Dorian",
    keyNums: [0, 2, 3, 5, 7, 9, 10],
  },
  {
    name: "Phrygian",
    keyNums: [0, 1, 3, 5, 7, 8, 10],
  },
  {
    name: "Lydian",
    keyNums: [0, 2, 4, 6, 7, 9, 11],
  },
  {
    name: "Mixolydian",
    keyNums: [0, 2, 4, 5, 7, 9, 10],
  },
  {
    name: "Aeolian",
    keyNums: [0, 2, 3, 5, 7, 8, 10],
  },
  {
    name: "Locrian",
    keyNums: [0, 1, 3, 5, 6, 8, 10],
  },
];

export default function ScaleExplorerPage() {
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
        <Keyboard highlightedKeys={scales[scaleIndex].keyNums} octaves={2} />
      </div>
    </div>
  );
}
