import { KeyNum } from "@/types/keyboard";

const repeat = (ary: any[], count: number) => Array(count).fill(ary).flat();

interface Props {
  highlightedKeys: KeyNum[];
  octaves: number;
}

export default function Keyboard({ highlightedKeys, octaves = 2 }: Props) {
  const whiteKeys = repeat([0, 2, 4, 5, 7, 9, 11], octaves);
  const blackKeys = repeat([1, 3, 0, 6, 8, 10, 0], octaves);

  return (
    <div className="w-full">
      <svg className="block" viewBox="0 0 560 180">
        <defs>
          <rect
            id="white-key"
            width="40"
            height="160"
            fill="white"
            stroke="black"
          />
          <rect id="black-key" width="20" height="100" fill="black" />
        </defs>

        {whiteKeys.map((keyNum, i) => (
          <g key={i} transform={`translate(${i * 40} ,0)`}>
            <use href="#white-key" />
            {highlightedKeys.includes(keyNum) && (
              <circle r="10" fill="#84d4b3" cx="20" cy="130" />
            )}
          </g>
        ))}

        {blackKeys.map((keyNum, i) => {
          return (
            keyNum > 0 && (
              <g key={i} transform={`translate(${i * 40 + 30} ,0)`}>
                <use href="#black-key" />
                {highlightedKeys.includes(keyNum) && (
                  <circle r="8" fill="#84d4b3" cx="10" cy="80" />
                )}
              </g>
            )
          );
        })}
      </svg>
    </div>
  );
}
