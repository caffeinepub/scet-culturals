import { Hearts } from "../Hearts";
import { SlideNav } from "../SlideNav";
import { TopBar } from "../TopBar";

interface Props {
  onNext: () => void;
}

const lines = [
  "You are my sunshine on dark days.",
  "My smile starts with your name.",
  "Every moment feels right with you.",
  "You make ordinary days magical.",
  "KAMALI — my heart knows your name.",
];

export function Slide2({ onNext }: Props) {
  return (
    <div
      className="slide slide-fade-in"
      style={{
        background:
          "radial-gradient(ellipse at top, #1a000a 0%, #0a0005 50%, #000000 100%)",
      }}
      data-ocid="slide2.panel"
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse at 30% 60%, rgba(255,42,42,0.07) 0%, transparent 60%)",
          pointerEvents: "none",
        }}
      />
      <Hearts count={20} />
      <TopBar current={1} total={8} />

      <div
        style={{
          zIndex: 10,
          textAlign: "center",
          padding: "80px 24px 130px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "18px",
          maxWidth: "680px",
          margin: "0 auto",
        }}
      >
        <div className="anim-rise-up opacity-0-start delay-100">
          <p
            style={{
              fontFamily: "Montserrat,sans-serif",
              fontSize: "clamp(10px,1.4vw,13px)",
              fontWeight: 700,
              letterSpacing: "0.35em",
              color: "rgba(214,164,74,0.8)",
              textTransform: "uppercase",
            }}
          >
            ✉️ A Letter of Love
          </p>
        </div>
        <div className="anim-rise-up opacity-0-start delay-200">
          <h2
            className="glow-red"
            style={{
              fontFamily: "Montserrat,sans-serif",
              fontSize: "clamp(20px,4.5vw,44px)",
              fontWeight: 900,
              color: "#f2f2f2",
              textTransform: "uppercase",
              letterSpacing: "0.04em",
            }}
          >
            A Few Words For You,{" "}
            <span style={{ color: "#ff2a2a" }}>KAMALI</span>
          </h2>
        </div>
        <div
          className="glass-card anim-rise-up opacity-0-start delay-300"
          style={{ padding: "26px 34px", width: "100%" }}
        >
          {lines.map((line) => (
            <p
              key={line}
              className="anim-rise-up opacity-0-start"
              style={{
                fontFamily: "Poppins,sans-serif",
                fontSize: "clamp(13px,1.8vw,17px)",
                fontWeight:
                  lines.indexOf(line) === lines.length - 1 ? 500 : 400,
                color:
                  lines.indexOf(line) === lines.length - 1
                    ? "#ff8c8c"
                    : "rgba(242,242,242,0.85)",
                lineHeight: 1.9,
                fontStyle:
                  lines.indexOf(line) === lines.length - 1
                    ? "italic"
                    : "normal",
                animationDelay: `${0.4 + lines.indexOf(line) * 0.15}s`,
              }}
            >
              {lines.indexOf(line) === lines.length - 1
                ? `❤️ ${line}`
                : `❖ ${line}`}
            </p>
          ))}
        </div>
        <div className="anim-rise-up opacity-0-start delay-900">
          <p
            style={{
              fontFamily: "Montserrat,sans-serif",
              fontSize: "clamp(16px,2.8vw,26px)",
              fontWeight: 900,
              color: "#d6a44a",
              letterSpacing: "0.15em",
              animation: "goldShimmer 2s ease-in-out infinite",
            }}
          >
            — KAMALI —
          </p>
        </div>
      </div>

      <SlideNav
        current={1}
        total={8}
        btnLabel="Feel My Heart 💓"
        onNext={onNext}
      />
    </div>
  );
}
