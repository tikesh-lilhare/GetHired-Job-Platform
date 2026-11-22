export default function Logo({ size = 34 }) {
    return (
        <svg width={size} height={size} viewBox="0 0 40 40" aria-hidden="true" focusable="false">
            <rect width="40" height="40" rx="11" fill="#0d1f1a" />
            <path d="M10 25.5 17 18l5 5 8.5-9.5" fill="none" stroke="#d8f55a" strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M24 13.5h6.5V20" fill="none" stroke="#d8f55a" strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
}
