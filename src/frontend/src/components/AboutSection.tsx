import { Calendar, Trophy, Users, Zap } from "lucide-react";
import { useEffect, useRef } from "react";

const stats = [
  {
    icon: Zap,
    value: "20+",
    label: "Events",
    desc: "Across multiple categories",
    color: "#8b5cf6",
  },
  {
    icon: Users,
    value: "500+",
    label: "Participants",
    desc: "From colleges across Tamil Nadu",
    color: "#06b6d4",
  },
  {
    icon: Trophy,
    value: "\u20b91L+",
    label: "Prize Pool",
    desc: "In cash and rewards",
    color: "#00ff41",
  },
  {
    icon: Calendar,
    value: "2 Days",
    label: "Non-Stop",
    desc: "September 8\u20139, 2026",
    color: "#8b5cf6",
  },
];

export function AboutSection() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll(".fade-in-up").forEach((el, i) => {
              setTimeout(() => el.classList.add("visible"), i * 100);
            });
          }
        }
      },
      { threshold: 0.1 },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="about"
      className="py-24 lg:py-36 relative overflow-hidden"
      style={{ background: "#05050f" }}
      ref={ref}
    >
      <div
        className="orb w-[400px] h-[400px] top-0 right-[-80px] opacity-35"
        style={{ background: "rgba(6,182,212,0.15)" }}
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 circuit-bg opacity-40"
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 space-y-4 fade-in-up">
          <span
            className="font-mono-tech text-xs tracking-[0.5em] uppercase"
            style={{ color: "rgba(139,92,246,0.6)" }}
          >
            [ ABOUT THE FEST ]
          </span>
          <h2 className="font-orbitron text-3xl sm:text-4xl lg:text-5xl font-bold gradient-text-cyan-purple">
            Where Art Meets Technology
          </h2>
          <div
            className="w-32 h-px mx-auto"
            style={{
              background:
                "linear-gradient(90deg, transparent, #8b5cf6, #06b6d4, transparent)",
            }}
          />
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 fade-in-up">
            <div
              className="glass-card p-8 lg:p-10 rounded-2xl relative overflow-hidden"
              style={{ border: "1px solid rgba(139,92,246,0.15)" }}
            >
              <div
                className="absolute top-0 left-0 w-full h-px"
                style={{
                  background:
                    "linear-gradient(90deg, transparent, #8b5cf6, #06b6d4, transparent)",
                }}
              />
              <div
                className="text-6xl font-orbitron font-black leading-none mb-4 opacity-15"
                style={{ color: "#8b5cf6" }}
              >
                “
              </div>
              <p className="font-jakarta text-lg text-white/80 leading-relaxed mb-5">
                <span className="font-bold gradient-text-cyan-purple">
                  SCET CULTURALS 2026
                </span>{" "}
                is the annual mega cultural extravaganza of Salem College of
                Engineering and Technology — where innovation meets artistry,
                and technology powers creativity.
              </p>
              <p className="font-jakarta text-base text-white/50 leading-relaxed mb-5">
                Experience two days of electrifying performances, fierce
                competitions, and unforgettable memories. From classical dance
                to battle of bands, from digital art to esports.
              </p>
              <p className="font-jakarta text-base text-white/50 leading-relaxed">
                Participants from engineering colleges across Tamil Nadu
                converge at SCET for the ultimate showcase of human potential.
              </p>
              <div className="mt-8 flex items-center gap-3 pt-6 border-t border-white/5">
                <span
                  className="w-2 h-2 rounded-full animate-pulse"
                  style={{ background: "#8b5cf6" }}
                />
                <span
                  className="font-mono-tech text-xs tracking-widest"
                  style={{ color: "rgba(139,92,246,0.6)" }}
                >
                  SYSTEM STATUS: ACTIVE
                </span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4" data-ocid="about.section">
            {stats.map((stat, i) => (
              <div
                key={stat.label}
                className="fade-in-up glass-card rounded-2xl p-5 lg:p-6 group cursor-default relative overflow-hidden transition-all duration-300"
                style={{
                  transitionDelay: `${i * 80}ms`,
                  border: `1px solid ${stat.color}22`,
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.boxShadow =
                    `0 0 30px ${stat.color}40, 0 8px 32px rgba(0,0,0,0.4)`;
                  (e.currentTarget as HTMLElement).style.borderColor =
                    `${stat.color}44`;
                  (e.currentTarget as HTMLElement).style.transform =
                    "scale(1.02)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.boxShadow = "";
                  (e.currentTarget as HTMLElement).style.borderColor =
                    `${stat.color}22`;
                  (e.currentTarget as HTMLElement).style.transform = "";
                }}
                data-ocid="about.card"
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                  style={{ background: `${stat.color}15` }}
                >
                  <stat.icon
                    className="w-5 h-5"
                    style={{ color: stat.color }}
                  />
                </div>
                <div
                  className="font-orbitron text-2xl lg:text-3xl font-black mb-1"
                  style={{
                    color: stat.color,
                    textShadow: `0 0 20px ${stat.color}60`,
                  }}
                >
                  {stat.value}
                </div>
                <div className="font-jakarta font-semibold text-white/75 text-base">
                  {stat.label}
                </div>
                <div className="font-jakarta text-xs text-white/38 mt-1">
                  {stat.desc}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
