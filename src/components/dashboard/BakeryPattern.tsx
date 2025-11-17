export function BakeryPattern() {
  return (
    <div style={{
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      height: '120px',
      overflow: 'hidden',
      pointerEvents: 'none',
      zIndex: 1,
      opacity: 0.04
    }}>
      <svg
        width="100%"
        height="120"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern id="bakery-pattern" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
            {/* Rolling Pin - Top Left (24x24 strict) */}
            <g transform="translate(10, 10) rotate(15 12 12)">
              <rect x="3" y="10" width="18" height="4" fill="#5A3825" rx="1" />
              <circle cx="3" cy="12" r="3" fill="#5A3825" />
              <circle cx="21" cy="12" r="3" fill="#5A3825" />
            </g>

            {/* Whisk - Top Right (24x24 strict) */}
            <g transform="translate(56, 12) rotate(-10 12 12)">
              <rect x="10" y="2" width="4" height="10" fill="#5A3825" rx="1" />
              <rect x="6" y="12" width="2" height="8" fill="#5A3825" />
              <rect x="10" y="12" width="2" height="10" fill="#5A3825" />
              <rect x="14" y="12" width="2" height="8" fill="#5A3825" />
              <circle cx="12" cy="4" r="3" fill="#5A3825" />
            </g>

            {/* Cake Slice - Center (24x24 strict) */}
            <g transform="translate(28, 30) rotate(5 12 12)">
              <path d="M 2,22 L 22,2 L 22,22 Z" fill="#5A3825" />
              <rect x="4" y="16" width="14" height="2" fill="#F8EBD7" opacity="0.3" />
              <rect x="6" y="12" width="12" height="2" fill="#F8EBD7" opacity="0.3" />
            </g>

            {/* Cupcake - Bottom Left (24x24 strict) */}
            <g transform="translate(8, 52) rotate(-8 12 12)">
              <path d="M 6,14 L 18,14 L 17,22 L 7,22 Z" fill="#5A3825" />
              <circle cx="12" cy="10" r="6" fill="#5A3825" />
              <circle cx="12" cy="7" r="2.5" fill="#F8EBD7" opacity="0.3" />
            </g>

            {/* Mixing Bowl - Bottom Right (24x24 strict) */}
            <g transform="translate(52, 54) rotate(12 12 12)">
              <path d="M 6,10 Q 6,18 12,20 Q 18,18 18,10 Z" fill="#5A3825" />
              <ellipse cx="12" cy="10" rx="6" ry="2.5" fill="#5A3825" />
              <rect x="6" y="9" width="12" height="2" fill="#F8EBD7" opacity="0.3" />
            </g>
          </pattern>
        </defs>
        
        <rect width="100%" height="120" fill="url(#bakery-pattern)" />
      </svg>
    </div>
  );
}
