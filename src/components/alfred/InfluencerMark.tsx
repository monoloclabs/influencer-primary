/**
 * INFLUENCER brand mark: a hub with six spokes ending in round nodes of
 * varying size, and a carved smile inside the hub.
 */
export function InfluencerMark({ className = "h-4 w-4" }: { className?: string }) {
  const spokes = [
    { x: 12, y: 2.6, r: 2.4 },
    { x: 20.1, y: 7.4, r: 1.9 },
    { x: 20.4, y: 17.3, r: 2.1 },
    { x: 12, y: 21.4, r: 1.8 },
    { x: 3.6, y: 17.1, r: 2.3 },
    { x: 3.3, y: 7.6, r: 1.7 },
  ];

  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className={className}>
      <g stroke="currentColor" strokeWidth="2.1" strokeLinecap="round">
        {spokes.map((s) => (
          <line key={`${s.x}-${s.y}`} x1="12" y1="12" x2={s.x} y2={s.y} />
        ))}
      </g>
      {spokes.map((s) => (
        <circle key={`n-${s.x}-${s.y}`} cx={s.x} cy={s.y} r={s.r} fill="currentColor" />
      ))}
      <circle cx="12" cy="12" r="4.6" fill="currentColor" />
      {/* carved smile */}
      <path
        d="M9.7 12.1c.5 1.5 1.3 2.2 2.3 2.2s1.8-.7 2.3-2.2Z"
        fill="var(--background)"
      />
    </svg>
  );
}
