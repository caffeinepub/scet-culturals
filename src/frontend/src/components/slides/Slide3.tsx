import { SlideNav } from "../SlideNav";
import { Stars } from "../Stars";
import { TopBar } from "../TopBar";

interface Props {
  onNext: () => void;
}

const roles = [
  { icon: "💪", text: "My strength when I am weak." },
  { icon: "🌿", text: "My calm when the world is loud." },
  { icon: "⭐", text: "My reason to be better every day." },
  { icon: "💞", text: "My best friend. My soulmate. My KAMALI." },
  { icon: "🌙", text: "Without you, nothing feels complete." },
];

export function Slide3({ onNext }: Props) {
  return (
    <div
      className="slide slide-fade-in"
      style={{
        background:
          "radial-gradient(ellipse at bottom, #0d0020 0%, #080010 50%, #000000 100%)",
      }}
      data-ocid="slide3.panel"
    >
      <Stars count={50} />
      <TopBar current={2} total={8} />

      <div
        style={{
          zIndex: 10,
          textAlign: "center",
          padding: "80px 24px 130px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "16px",
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
            ✨ Her Role In My Life
          </p>
        </div>
        <div className="anim-rise-up opacity-0-start delay-200">
          <h2
            className="glow-red"
            style={{
              fontFamily: "Montserrat,sans-serif",
              fontSize: "clamp(18px,4vw,40px)",
              fontWeight: 900,
              color: "#f2f2f2",
              textTransform: "uppercase",
              letterSpacing: "0.03em",
            }}
          >
            What You Mean To Me,{" "}
            <span style={{ color: "#ff2a2a" }}>KAMALI</span>
          </h2>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            width: "100%",
          }}
        >
          {roles.map((r) => (
            <div
              key={r.icon}
              className="glass-card anim-rise-up opacity-0-start"
              style={{
                padding: "13px 22px",
                display: "flex",
                alignItems: "center",
                gap: "14px",
                animationDelay: `${0.3 + roles.indexOf(r) * 0.15}s`,
              }}
            >
              <span style={{ fontSize: "20px" }}>{r.icon}</span>
              <p
                style={{
                  fontFamily: "Poppins,sans-serif",
                  fontSize: "clamp(12px,1.7vw,16px)",
                  fontWeight: roles.indexOf(r) === 3 ? 600 : 400,
                  color:
                    roles.indexOf(r) === 3
                      ? "#ff8c8c"
                      : "rgba(242,242,242,0.85)",
                  textAlign: "left",
                }}
              >
                {r.text}
              </p>
            </div>
          ))}
        </div>
        <div className="anim-rise-up opacity-0-start delay-900">
          <p
            className="glow-red"
            style={{
              fontFamily: "Montserrat,sans-serif",
              fontSize: "clamp(16px,2.5vw,24px)",
              fontWeight: 900,
              color: "#ff2a2a",
              letterSpacing: "0.15em",
              animation: "textPulse 2s ease-in-out infinite",
            }}
          >
            ❤️ KAMALI ❤️
          </p>
        </div>
      </div>

      <SlideNav
        current={2}
        total={8}
        btnLabel="Our Special Day 🎉"
        onNext={onNext}
      />
    </div>
  );
}
