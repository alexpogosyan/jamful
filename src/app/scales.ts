import { Scale } from "@/types/keyboard";

export const scales: Scale[] = [
  {
    name: "Ionian",
    keyNums: [0, 2, 4, 5, 7, 9, 11],
    degrees: ["1", "2", "3", "4", "5", "6", "7"],
  },
  {
    name: "Dorian",
    keyNums: [0, 2, 3, 5, 7, 9, 10],
    degrees: ["1", "2", "b3", "4", "5", "6", "b7"],
  },
  {
    name: "Phrygian",
    keyNums: [0, 1, 3, 5, 7, 8, 10],
    degrees: ["1", "b2", "b3", "4", "5", "b6", "b7"],
  },
  {
    name: "Lydian",
    keyNums: [0, 2, 4, 6, 7, 9, 11],
    degrees: ["1", "2", "3", "#4", "5", "6", "7"],
  },
  {
    name: "Mixolydian",
    keyNums: [0, 2, 4, 5, 7, 9, 10],
    degrees: ["1", "2", "3", "4", "5", "6", "b7"],
  },
  {
    name: "Aeolian",
    keyNums: [0, 2, 3, 5, 7, 8, 10],
    degrees: ["1", "2", "b3", "4", "5", "b6", "b7"],
  },
  {
    name: "Locrian",
    keyNums: [0, 1, 3, 5, 6, 8, 10],
    degrees: ["1", "b2", "b3", "4", "b5", "b6", "b7"],
  },
  {
    name: "Melodic Minor",
    keyNums: [0, 2, 3, 5, 7, 9, 11],
    degrees: ["1", "2", "b3", "4", "5", "6", "7"],
  },
  {
    name: "Dorian b2",
    keyNums: [0, 1, 3, 5, 7, 9, 10],
    degrees: ["1", "b2", "b3", "4", "5", "6", "b7"],
  },
  {
    name: "Lydian Augmented",
    keyNums: [0, 2, 4, 6, 8, 9, 11],
    degrees: ["1", "2", "3", "#4", "#5", "6", "7"],
  },
  {
    name: "Lydian Dominant",
    keyNums: [0, 2, 4, 6, 7, 9, 11],
    degrees: ["1", "2", "3", "#4", "5", "6", "b7"],
  },
  {
    name: "Mixolydian b6",
    keyNums: [0, 2, 4, 5, 7, 9, 10],
    degrees: ["1", "2", "3", "4", "5", "b6", "b7"],
  },
  {
    name: "Locrian natural 2",
    keyNums: [0, 2, 3, 5, 7, 8, 10],
    degrees: ["1", "2", "b3", "4", "b5", "b6", "b7"],
  },
  {
    name: "Super Locrian (aka Altered)",
    keyNums: [0, 1, 3, 4, 6, 8, 10],
    degrees: ["1", "b2", "b3", "b4", "b5", "b6", "b7"],
  },
];
