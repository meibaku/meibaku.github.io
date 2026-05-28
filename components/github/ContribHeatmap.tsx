import type { HeatmapCell } from "@/lib/types";

function colorForCount(count: number) {
  if (count === 0) return "rgba(127, 119, 221, 0.1)";
  if (count < 2) return "rgba(127, 119, 221, 0.32)";
  if (count < 4) return "rgba(127, 119, 221, 0.5)";
  if (count < 7) return "rgba(29, 158, 117, 0.7)";
  return "rgba(29, 158, 117, 1)";
}

export function ContribHeatmap({ cells }: { cells: HeatmapCell[] }) {
  const weeks = Math.ceil(cells.length / 7);
  const size = 10;
  const gap = 4;

  return (
    <svg viewBox={`0 0 ${weeks * (size + gap)} ${7 * (size + gap)}`} className="w-full overflow-visible">
      {cells.map((cell, index) => {
        const week = Math.floor(index / 7);
        const day = index % 7;
        const x = week * (size + gap);
        const y = day * (size + gap);

        return (
          <rect
            key={cell.date}
            x={x}
            y={y}
            width={size}
            height={size}
            rx={2}
            fill={colorForCount(cell.count)}
            className="heatmap-cell"
            style={{ animationDelay: `${index * 10}ms` }}
          >
            <title>{`${cell.date}: ${cell.count} commits`}</title>
          </rect>
        );
      })}
    </svg>
  );
}
