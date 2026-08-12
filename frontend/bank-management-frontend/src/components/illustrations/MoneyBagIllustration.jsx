function MoneyBagIllustration() {
    return (
        <svg viewBox="0 0 220 200" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Bag of money">
            <ellipse cx="110" cy="182" rx="80" ry="12" fill="#000" opacity="0.08" />

            {/* cash bundles behind bag */}
            <rect x="18" y="120" width="70" height="34" rx="4" fill="#7be0c9" opacity="0.9" />
            <rect x="18" y="120" width="70" height="8" fill="#57c9ae" />
            <rect x="140" y="128" width="66" height="30" rx="4" fill="#7be0c9" opacity="0.9" />
            <rect x="140" y="128" width="66" height="8" fill="#57c9ae" />

            {/* bag */}
            <path d="M75 78c-4-18 8-32 35-32s39 14 35 32c26 8 42 34 36 62-7 33-34 46-71 46s-64-13-71-46c-6-28 10-54 36-62z" fill="#ffb703" />
            <path d="M75 78c-4-18 8-32 35-32s39 14 35 32" stroke="#e0930f" strokeWidth="4" fill="none" />
            <circle cx="110" cy="118" r="26" fill="#ffd166" />
            <text x="110" y="128" textAnchor="middle" fontSize="26" fontWeight="800" fill="#8a5a00" fontFamily="Arial, sans-serif">₹</text>

            {/* tie */}
            <path d="M96 50c4-10 24-10 28 0l-6 14h-16l-6-14z" fill="#e0930f" />
        </svg>
    );
}

export default MoneyBagIllustration;
