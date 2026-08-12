function GrowthIllustration() {
    return (
        <svg viewBox="0 0 420 320" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Savings growing over time">
            <path d="M40 300C10 240 25 150 100 105C165 65 250 70 295 115C338 158 335 235 285 278C232 322 90 335 40 300Z" fill="#1a3f6b" opacity="0.5" />

            {/* rising arrow line */}
            <path d="M50 250 L130 200 L180 225 L260 130 L330 90" stroke="#ffb703" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            <path d="M300 82 L335 88 L328 122" stroke="#ffb703" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" fill="none" />

            {/* coin stacks */}
            {[
                { x: 40, h: 3 },
                { x: 100, h: 5 },
                { x: 165, h: 4 },
                { x: 230, h: 6 },
                { x: 295, h: 8 },
            ].map((stack, i) => (
                <g key={i}>
                    {Array.from({ length: stack.h }).map((_, j) => (
                        <ellipse
                            key={j}
                            cx={stack.x}
                            cy={300 - j * 11}
                            rx="26"
                            ry="9"
                            fill={j % 2 === 0 ? "#ffd166" : "#ffb703"}
                            stroke="#e0930f"
                            strokeWidth="1"
                        />
                    ))}
                </g>
            ))}

            {/* figure walking up */}
            <g transform="translate(195,150)">
                <circle cx="0" cy="0" r="14" fill="#f0b27a" />
                <path d="M-14 20c2-10 10-16 14-16s12 6 14 16l6 34h-40l6-34z" fill="#1769e0" />
                <path d="M-10 54l-6 26h10l6-22" fill="#16233b" />
                <path d="M10 54l8 24h10l-8-26" fill="#16233b" />
                <path d="M-14 8l-14 10 4 8 16-10z" fill="#f0b27a" />
                <path d="M14 8l16 6-2 9-18-6z" fill="#f0b27a" />
            </g>
        </svg>
    );
}

export default GrowthIllustration;
