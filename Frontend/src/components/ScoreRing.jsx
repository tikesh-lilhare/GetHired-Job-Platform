function ScoreRing({ value = 0, size = 112, stroke = 10 }) {
    const v = Math.max(0, Math.min(100, Number(value) || 0));
    const r = (size - stroke) / 2;
    const c = 2 * Math.PI * r;

    return (
        <div className="ring" style={{ width: size, height: size }}>
            <svg width={size} height={size}>
                <circle className="track" cx={size / 2} cy={size / 2} r={r} fill="none" strokeWidth={stroke} />
                <circle
                    className="val"
                    cx={size / 2}
                    cy={size / 2}
                    r={r}
                    fill="none"
                    strokeWidth={stroke}
                    strokeDasharray={c}
                    strokeDashoffset={c * (1 - v / 100)}
                />
            </svg>
            <span className="label">{v.toFixed(0)}%</span>
        </div>
    );
}

export default ScoreRing;
