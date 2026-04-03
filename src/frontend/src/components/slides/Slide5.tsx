import { Confetti } from "../Confetti";
import { Hearts } from "../Hearts";
import { SlideNav } from "../SlideNav";
import { TopBar } from "../TopBar";

interface Props {
  onNext: () => void;
}

const lines = [
  { text: "I am GOWTHAM — but you call me Lucky.", highlight: false },
  { text: "Lucky, because I found you.", highlight: false },
  { text: "Lucky, because you chose to stay.", highlight: false },
  { text: "Lucky every single day.", highlight: false },
  { text: "KAMALI, you are my greatest blessing.", highlight: true },
];

export function Slide5({ onNext }: Props) {
  return (
    <div
      className="slide slide-fade-in"
      style={{
        background:
          "radial-gradient(ellipse at top left, #1a0005 0%, #050010 50%, #000000 100%)",
      }}
      data-ocid="slide5.panel"
    >
      <Confetti count={35} />
      <Hearts count={12} />
      <TopBar current={4} total={8} />

      <div
        style={{
          zIndex: 10,
          textAlign: "center",
          padding: "80px 24px 130px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "18px",
          maxWidth: "660px",
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
            💌 From Lucky
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
              letterSpacing: "0.03em",
            }}
          >
            From <span style={{ color: "#ff2a2a" }}>LUCKY</span> — Just For You
          </h2>
        </div>
        <div
          className="gold-card anim-rise-up opacity-0-start delay-300"
          style={{ padding: "22px 30px", width: "100%" }}
        >
          {lines.map((line) => (
            <p
              key={line.text}
              className="anim-rise-up opacity-0-start"
              style={{
                fontFamily: line.highlight
                  ? "Montserrat,sans-serif"
                  : "Poppins,sans-serif",
                fontSize: line.highlight
                  ? "clamp(14px,2vw,18px)"
                  : "clamp(12px,1.7vw,16px)",
                fontWeight: line.highlight ? 700 : 400,
                color: line.highlight ? "#d6a44a" : "rgba(242,242,242,0.85)",
                lineHeight: 1.9,
                textShadow: line.highlight
                  ? "0 0 20px rgba(214,164,74,0.5)"
                  : "none",
                animationDelay: `${0.4 + lines.indexOf(line) * 0.15}s`,
              }}
            >
              {line.highlight ? `⭐ ${line.text}` : `• ${line.text}`}
            </p>
          ))}
        </div>
        <div className="anim-rise-up opacity-0-start delay-900">
          <p
            style={{
              fontFamily: "Montserrat,sans-serif",
              fontSize: "clamp(16px,2.8vw,28px)",
              fontWeight: 900,
              color: "#d6a44a",
              letterSpacing: "0.1em",
              animation: "goldShimmer 2s ease-in-out infinite",
            }}
          >
            — GOWTHAM (Lucky) —
          </p>
          <p
            style={{
              fontFamily: "Poppins,sans-serif",
              fontSize: "clamp(11px,1.3vw,13px)",
              color: "rgba(242,242,242,0.35)",
              marginTop: "4px",
            }}
          >
            Always &amp; Forever For KAMALI
          </p>
        </div>
      </div>

      <SlideNav
        current={4}
        total={8}
        btnLabel="Celebrate You! 🎊"
        onNext={onNext}
      />
    </div>
  );
}
