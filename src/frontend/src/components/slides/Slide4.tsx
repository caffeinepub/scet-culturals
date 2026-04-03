import { Confetti } from "../Confetti";
import { Fireworks } from "../Fireworks";
import { SlideNav } from "../SlideNav";
import { TopBar } from "../TopBar";

interface Props {
  onNext: () => void;
}

export function Slide4({ onNext }: Props) {
  return (
    <div
      className="slide slide-fade-in"
      style={{
        background:
          "radial-gradient(ellipse at center, #150000 0%, #0a0000 50%, #000000 100%)",
      }}
      data-ocid="slide4.panel"
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse at 50% 50%, rgba(214,164,74,0.05) 0%, transparent 60%)",
          pointerEvents: "none",
        }}
      />
      <Fireworks count={5} />
      <Confetti count={30} />
      <TopBar current={3} total={8} />

      <div
        style={{
          zIndex: 10,
          textAlign: "center",
          padding: "80px 24px 130px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "10px",
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
            🎂 Birthday Celebration
          </p>
        </div>
        <div className="anim-count-up opacity-0-start delay-200">
          <span
            style={{
              fontFamily: "Montserrat,sans-serif",
              fontSize: "clamp(80px,20vw,190px)",
              fontWeight: 900,
              color: "#d6a44a",
              display: "block",
              animation: "goldShimmer 1.5s ease-in-out infinite",
              lineHeight: 1,
            }}
          >
            30
          </span>
        </div>
        <div className="anim-rise-up opacity-0-start delay-400">
          <p
            className="glow-white"
            style={{
              fontFamily: "Montserrat,sans-serif",
              fontSize: "clamp(16px,3.5vw,36px)",
              fontWeight: 700,
              color: "#f2f2f2",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
            }}
          >
            October 2007
          </p>
        </div>
        <div className="anim-rise-up opacity-0-start delay-500">
          <p
            style={{
              fontFamily: "Poppins,sans-serif",
              fontSize: "clamp(13px,1.8vw,18px)",
              fontWeight: 400,
              color: "rgba(242,242,242,0.65)",
            }}
          >
            The Day My World Got Beautiful
          </p>
        </div>
        <div className="anim-rise-up opacity-0-start delay-600">
          <div
            className="glass-card"
            style={{ padding: "14px 36px", marginTop: "6px" }}
          >
            <p
              style={{
                fontFamily: "Poppins,sans-serif",
                fontSize: "clamp(12px,1.6vw,15px)",
                color: "rgba(242,242,242,0.6)",
              }}
            >
              Today You Turn
            </p>
            <p
              className="glow-red"
              style={{
                fontFamily: "Montserrat,sans-serif",
                fontSize: "clamp(40px,9vw,88px)",
                fontWeight: 900,
                color: "#ff2a2a",
                animation: "textPulse 2s ease-in-out infinite",
                lineHeight: 1,
              }}
            >
              18
            </p>
            <p
              className="glow-gold"
              style={{
                fontFamily: "Montserrat,sans-serif",
                fontSize: "clamp(13px,2.2vw,20px)",
                fontWeight: 700,
                color: "#d6a44a",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                animation: "goldShimmer 2s ease-in-out infinite",
              }}
            >
              Years of Pure Magic ✨
            </p>
          </div>
        </div>
        <div className="anim-rise-up opacity-0-start delay-900">
          <p
            className="glow-red"
            style={{
              fontFamily: "Montserrat,sans-serif",
              fontSize: "clamp(14px,2.2vw,22px)",
              fontWeight: 900,
              color: "#ff2a2a",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
            }}
          >
            Happy Birthday, KAMALI 🎂
          </p>
        </div>
      </div>

      <SlideNav current={3} total={8} btnLabel="Our Story 📖" onNext={onNext} />
    </div>
  );
}
