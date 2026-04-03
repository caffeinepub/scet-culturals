interface Props {
  current: number;
  total: number;
}

export function TopBar({ current, total }: Props) {
  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 30,
        background: "rgba(0,0,0,0.75)",
        backdropFilter: "blur(8px)",
        borderBottom: "1px solid rgba(255,42,42,0.2)",
        padding: "8px 20px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <span
        style={{
          fontFamily: "Montserrat,sans-serif",
          fontSize: "12px",
          fontWeight: 800,
          letterSpacing: "0.15em",
          color: "#ff2a2a",
          textShadow: "0 0 10px rgba(255,42,42,0.6)",
          textTransform: "uppercase",
        }}
      >
        ✨ FOR KAMALI ✨
      </span>
      <span
        style={{
          fontFamily: "Montserrat,sans-serif",
          fontSize: "11px",
          fontWeight: 600,
          letterSpacing: "0.08em",
          color: "rgba(242,242,242,0.55)",
          textTransform: "uppercase",
        }}
      >
        Happy Birthday Kamali! | Page {current + 1}/{total}
      </span>
      <span
        style={{
          fontFamily: "Montserrat,sans-serif",
          fontSize: "11px",
          fontWeight: 600,
          color: "#d6a44a",
          textShadow: "0 0 8px rgba(214,164,74,0.5)",
        }}
      >
        30 · 10 · 2007
      </span>
    </div>
  );
}
