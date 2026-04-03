import { Balloons } from "../Balloons";
import { Confetti } from "../Confetti";
import { SlideNav } from "../SlideNav";
import { TopBar } from "../TopBar";

interface Props {
  onNext: () => void;
}

export function Slide1({ onNext }: Props) {
  return (
    <div
      className="slide slide-fade-in"
      style={{
        background:
          "radial-gradient(ellipse at center, #1a0005 0%, #0a0003 40%, #000000 100%)",
      }}
      data-ocid="slide1.panel"
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse at 50% 80%, rgba(139,0,0,0.4) 0%, transparent 60%)",
          animation: "bgVignette 4s ease-in-out infinite",
          pointerEvents: "none",
        }}
      />
      <Balloons count={18} mode="float" />
      <Confetti count={60} />
      <TopBar current={0} total={8} />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "14px",
          zIndex: 10,
          textAlign: "center",
          padding: "80px 24px 130px",
        }}
      >
        <div className="anim-rise-up opacity-0-start delay-200">
          <p
            style={{
              fontFamily: "Montserrat,sans-serif",
              fontSize: "clamp(12px,2vw,18px)",
              fontWeight: 600,
              letterSpacing: "0.45em",
              color: "rgba(214,164,74,0.9)",
              textTransform: "uppercase",
              textShadow: "0 0 20px rgba(214,164,74,0.5)",
            }}
          >
            🎂 A Special Day For 🎂
          </p>
        </div>
        <div className="anim-rise-up opacity-0-start delay-300">
          <h1
            className="glow-red anim-text-pulse"
            style={{
              fontFamily: "Montserrat,sans-serif",
              fontSize: "clamp(44px,11vw,110px)",
              fontWeight: 900,
              letterSpacing: "0.08em",
              color: "#ff2a2a",
              lineHeight: 1.05,
              textTransform: "uppercase",
            }}
          >
            HAPPY BIRTHDAY
          </h1>
        </div>
        <div className="anim-rise-up opacity-0-start delay-500">
          <h2
            style={{
              fontFamily: "Montserrat,sans-serif",
              fontSize: "clamp(40px,10vw,100px)",
              fontWeight: 900,
              letterSpacing: "0.18em",
              color: "#d6a44a",
              textTransform: "uppercase",
              animation: "goldShimmer 2s ease-in-out infinite",
            }}
          >
            KAMALI
          </h2>
        </div>
        <div className="anim-rise-up opacity-0-start delay-700">
          <p
            style={{
              fontFamily: "Poppins,sans-serif",
              fontSize: "clamp(13px,1.8vw,18px)",
              fontWeight: 300,
              color: "rgba(242,242,242,0.8)",
              letterSpacing: "0.06em",
            }}
          >
            From Lucky, With All My Heart 💕
          </p>
        </div>
        <div className="anim-rise-up opacity-0-start delay-900">
          <p
            style={{
              fontFamily: "Montserrat,sans-serif",
              fontSize: "clamp(11px,1.4vw,15px)",
              fontWeight: 600,
              letterSpacing: "0.3em",
              color: "rgba(214,164,74,0.65)",
              textTransform: "uppercase",
            }}
          >
            30 • October • 2007
          </p>
        </div>
      </div>

      <SlideNav
        current={0}
        total={8}
        btnLabel="Open Your Heart 💕"
        onNext={onNext}
      />
    </div>
  );
}
