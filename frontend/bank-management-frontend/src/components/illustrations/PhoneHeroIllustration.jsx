function PhoneHeroIllustration() {
    return (
        <svg viewBox="0 0 420 380" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Phone in hand with payment bubbles">
            {/* soft leaf backdrop */}
            <path d="M55 330C10 260 15 150 95 90C160 42 250 40 300 85C355 135 360 230 305 290C250 350 130 375 55 330Z" fill="#1a3f6b" opacity="0.55" />
            <path d="M95 300C55 245 60 160 120 115C170 78 245 78 285 115C328 155 330 230 288 278C245 326 145 335 95 300Z" fill="#1fae8e" opacity="0.35" />

            {/* arm / hand */}
            <path d="M120 360C150 300 190 270 230 262C255 257 275 262 288 275L300 340L150 360H120Z" fill="#f0b27a" />
            <path d="M228 258C255 250 285 258 300 280C312 297 314 318 305 335L272 322C278 305 274 290 260 280C248 271 235 268 222 270L228 258Z" fill="#16233b" />

            {/* phone */}
            <rect x="188" y="120" width="112" height="200" rx="20" fill="#eef4fb" stroke="#c9d8ea" strokeWidth="2" />
            <rect x="198" y="140" width="92" height="150" rx="8" fill="#3d7fd6" />
            <circle cx="244" cy="300" r="7" fill="#c9d8ea" />
            {/* app glyph on screen */}
            <circle cx="244" cy="205" r="30" fill="#ffffff" opacity="0.15" />
            <path d="M230 195a14 14 0 1 1 0 20" stroke="#ffd166" strokeWidth="5" strokeLinecap="round" fill="none" />
            <path d="M258 215a14 14 0 1 1 0-20" stroke="#7be0c9" strokeWidth="5" strokeLinecap="round" fill="none" />
            <circle cx="244" cy="205" r="4" fill="#ffffff" />

            {/* speech bubbles */}
            <g>
                <rect x="18" y="150" width="120" height="46" rx="14" fill="#ffb703" />
                <path d="M60 196l-14 16 24-10z" fill="#ffb703" />
                <text x="78" y="179" textAnchor="middle" fontSize="16" fontWeight="800" fill="#3a2400" fontFamily="Arial, sans-serif">Transfer</text>
            </g>
            <g>
                <rect x="258" y="55" width="120" height="46" rx="14" fill="#ffb703" />
                <path d="M300 101l14 16-22-10z" fill="#ffb703" />
                <text x="318" y="84" textAnchor="middle" fontSize="16" fontWeight="800" fill="#3a2400" fontFamily="Arial, sans-serif">Payment</text>
            </g>
            <g>
                <rect x="30" y="255" width="110" height="46" rx="14" fill="#ffb703" />
                <path d="M70 301l-12 17 24-11z" fill="#ffb703" />
                <text x="85" y="284" textAnchor="middle" fontSize="16" fontWeight="800" fill="#3a2400" fontFamily="Arial, sans-serif">Credit</text>
            </g>
            <g>
                <rect x="270" y="215" width="128" height="46" rx="14" fill="#ffb703" />
                <path d="M296 261l-14 17 26-11z" fill="#ffb703" />
                <text x="334" y="244" textAnchor="middle" fontSize="15" fontWeight="800" fill="#3a2400" fontFamily="Arial, sans-serif">All In One</text>
            </g>
        </svg>
    );
}

export default PhoneHeroIllustration;
