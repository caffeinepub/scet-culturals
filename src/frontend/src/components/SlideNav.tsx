const PAGE_LABELS = ["p1", "p2", "p3", "p4", "p5", "p6", "p7", "p8"];

interface Props {
  current: number;
  total: number;
  btnLabel: string;
  onNext: () => void;
}

export function SlideNav({ current, total, btnLabel, onNext }: Props) {
  return (
    <div
      style={{
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        padding: "16px 24px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "12px",
        background:
          "linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 100%)",
        zIndex: 20,
      }}
    >
      <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
        {PAGE_LABELS.slice(0, total).map((label, i) => (
          <div key={label} className={`dot ${i === current ? "active" : ""}`} />
        ))}
      </div>
      <span
        style={{
          fontFamily: "Montserrat,sans-serif",
          fontSize: "11px",
          fontWeight: 600,
          letterSpacing: "0.12em",
          color: "rgba(242,242,242,0.45)",
          textTransform: "uppercase",
        }}
      >
        Page {current + 1} of {total}
      </span>
      <button
        type="button"
        data-ocid="slide.button"
        className="nav-btn"
        onClick={onNext}
      >
        {btnLabel}
      </button>
    </div>
  );
}
