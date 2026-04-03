import { Confetti } from "../Confetti";
import { Fireworks } from "../Fireworks";
import { SlideNav } from "../SlideNav";
import { Stars } from "../Stars";
import { TopBar } from "../TopBar";

interface Props {
  onNext: () => void;
}

const wishes = [
  { icon: "🏛", text: "May you stand tall in the court as a great LAWYER" },
  { icon: "🌟", text: "May your name be written in IAS history" },
  { icon: "✨", text: "May every dream you hold become your reality" },
  { icon: "💡", text: "You have the power, the mind, and the heart" },
  { icon: "🌍", text: "KAMALI — the world will know your name" },
];

export function Slide8({ onNext }: Props) {
  return (
    <div
      className="slide slide-fade-in"
      style={{
        background:
          "radial-gradient(ellipse at center, #120005 0%, #080010 40%, #000000 100%)",
      }}
      data-ocid="slide8.panel"
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse at 50% 30%, rgba(214,164,74,0.07) 0%, transparent 55%)",
          pointerEvents: "none",
        }}
      />
      <Fireworks count={8} />
      <Confetti count={50} />
      <Stars count={40} />
      <TopBar current={7} total={8} />

      <div
        style={{
          zIndex: 10,
          textAlign: "center",
          padding: "80px 24px 130px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "14px",
          maxWidth: "660px",
          margin: "0 auto",
          overflowY: "auto",
          maxHeight: "100vh",
        }}
        className="msg-list"
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
            🌟 Future Wishes
          </p>
        </div>
        <div className="anim-rise-up opacity-0-start delay-200">
          <h2
            className="glow-gold"
            style={{
              fontFamily: "Montserrat,sans-serif",
              fontSize: "clamp(18px,3.8vw,38px)",
              fontWeight: 900,
              color: "#d6a44a",
              textTransform: "uppercase",
              letterSpacing: "0.05em",
              animation: "goldShimmer 2s ease-in-out infinite",
            }}
          >
            KAMALI — Your Future Is Bright
          </h2>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "9px",
            width: "100%",
          }}
        >
          {wishes.map((w) => (
            <div
              key={w.icon}
              className="glass-card anim-rise-up opacity-0-start"
              style={{
                padding: "13px 18px",
                display: "flex",
                alignItems: "center",
                gap: "14px",
                animationDelay: `${0.3 + wishes.indexOf(w) * 0.15}s`,
              }}
            >
              <span style={{ fontSize: "20px" }}>{w.icon}</span>
              <p
                style={{
                  fontFamily: "Poppins,sans-serif",
                  fontSize: "clamp(12px,1.6vw,15px)",
                  fontWeight: wishes.indexOf(w) < 2 ? 600 : 400,
                  color:
                    wishes.indexOf(w) < 2
                      ? "#ff8c8c"
                      : "rgba(242,242,242,0.85)",
                  textAlign: "left",
                }}
              >
                {w.text}
              </p>
            </div>
          ))}
        </div>
        <div className="anim-rise-up opacity-0-start delay-900">
          <p
            className="glow-red"
            style={{
              fontFamily: "Montserrat,sans-serif",
              fontSize: "clamp(17px,3.2vw,34px)",
              fontWeight: 900,
              color: "#ff2a2a",
              letterSpacing: "0.07em",
              animation: "textPulse 2s ease-in-out infinite",
            }}
          >
            Happy Birthday, KAMALI 🎂
          </p>
        </div>
        <div className="anim-rise-up opacity-0-start delay-1000">
          <div className="gold-card" style={{ padding: "12px 26px" }}>
            <p
              style={{
                fontFamily: "Montserrat,sans-serif",
                fontSize: "clamp(12px,1.8vw,17px)",
                fontWeight: 700,
                color: "#d6a44a",
                letterSpacing: "0.06em",
                animation: "goldShimmer 2s ease-in-out infinite",
              }}
            >
              With all my love — GOWTHAM (Lucky) ❤️
            </p>
          </div>
        </div>
        <div className="anim-rise-up opacity-0-start delay-1200">
          <p
            style={{
              fontFamily: "Poppins,sans-serif",
              fontSize: "clamp(11px,1.3vw,13px)",
              color: "rgba(242,242,242,0.3)",
              fontStyle: "italic",
            }}
          >
            Click below to start over from the beginning ❤️
          </p>
        </div>
      </div>

      <SlideNav
        current={7}
        total={8}
        btnLabel="Start Again ❤️"
        onNext={onNext}
      />
    </div>
  );
}
