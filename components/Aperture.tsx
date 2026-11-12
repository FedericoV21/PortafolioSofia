export function Aperture({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 96 96" className={`aperture ${className}`} aria-hidden="true">
      <circle
        cx="48"
        cy="48"
        r="40"
        fill="none"
        stroke="currentColor"
        strokeOpacity="0.35"
        strokeWidth="1"
      />
      <circle
        cx="48"
        cy="48"
        r="30"
        fill="none"
        stroke="#e4b6a6"
        strokeWidth="1.5"
        strokeDasharray="9 13"
        strokeLinecap="round"
      />
      {Array.from({ length: 6 }, (_, index) => {
        const angle = (Math.PI / 3) * index - Math.PI / 2;
        const x1 = 48 + Math.cos(angle) * 16;
        const y1 = 48 + Math.sin(angle) * 16;
        const x2 = 48 + Math.cos(angle) * 26;
        const y2 = 48 + Math.sin(angle) * 26;
        return (
          <line
            key={index}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke="currentColor"
            strokeWidth="1.35"
            strokeLinecap="round"
          />
        );
      })}
    </svg>
  );
}
