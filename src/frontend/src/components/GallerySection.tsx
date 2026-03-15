import { ImageIcon } from "lucide-react";
import { useEffect, useRef } from "react";

const galleryItems = [
  {
    title: "Opening Ceremony 2025",
    year: "2025",
    aspect: "large",
    color: "#8b5cf6",
  },
  { title: "Battle of Bands", year: "2025", aspect: "small", color: "#ec4899" },
  { title: "Dance Finals", year: "2025", aspect: "small", color: "#06b6d4" },
  {
    title: "Fashion Ramp Walk",
    year: "2025",
    aspect: "medium",
    color: "#f97316",
  },
  { title: "Street Play", year: "2025", aspect: "small", color: "#f59e0b" },
  { title: "Gaming Arena", year: "2025", aspect: "small", color: "#ef4444" },
  {
    title: "Prize Distribution",
    year: "2025",
    aspect: "medium",
    color: "#00ff41",
  },
  {
    title: "Photography Showcase",
    year: "2025",
    aspect: "small",
    color: "#a78bfa",
  },
  { title: "Cultural Night", year: "2025", aspect: "large", color: "#22d3ee" },
];

export function GallerySection() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll(".fade-in-up").forEach((el, i) => {
              setTimeout(() => el.classList.add("visible"), i * 80);
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
      id="gallery"
      className="py-24 lg:py-36 relative overflow-hidden"
      style={{ background: "#05050f" }}
      ref={ref}
    >
      <div
        className="orb w-[450px] h-[450px] top-[20%] left-[-80px] opacity-22"
        style={{ background: "rgba(139,92,246,0.2)" }}
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 circuit-bg opacity-22"
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 space-y-4 fade-in-up">
          <span
            className="font-mono-tech text-xs tracking-[0.5em] uppercase"
            style={{ color: "rgba(139,92,246,0.6)" }}
          >
            [ MEMORY BANK ]
          </span>
          <h2 className="font-orbitron text-3xl sm:text-4xl lg:text-5xl font-bold gradient-text-cyan-purple">
            Gallery
          </h2>
          <div
            className="w-32 h-px mx-auto"
            style={{
              background:
                "linear-gradient(90deg, transparent, #8b5cf6, #06b6d4, transparent)",
            }}
          />
          <p className="font-jakarta text-white/45 text-lg max-w-xl mx-auto">
            Moments from previous editions — preserved in the archive.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {galleryItems.map((item, i) => (
            <div
              key={item.title}
              className={`fade-in-up gallery-card group cursor-pointer ${
                item.aspect === "large"
                  ? "col-span-2 row-span-2"
                  : item.aspect === "medium"
                    ? "col-span-2"
                    : ""
              }`}
              data-ocid={`gallery.item.${i + 1}`}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor =
                  `${item.color}55`;
                (e.currentTarget as HTMLElement).style.boxShadow =
                  `0 0 30px ${item.color}30`;
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor =
                  "rgba(139,92,246,0.15)";
                (e.currentTarget as HTMLElement).style.boxShadow = "";
              }}
            >
              <div
                className="absolute inset-0 opacity-8 group-hover:opacity-18 transition-opacity duration-400"
                style={{
                  background: `radial-gradient(circle at 50% 50%, ${item.color}, transparent 70%)`,
                }}
              />
              <div
                className="absolute inset-0 opacity-12 group-hover:opacity-22 transition-opacity pointer-events-none"
                style={{
                  backgroundImage: `linear-gradient(${item.color}18 1px, transparent 1px), linear-gradient(90deg, ${item.color}18 1px, transparent 1px)`,
                  backgroundSize: "24px 24px",
                }}
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center mb-3 transition-all duration-300"
                  style={{
                    background: `${item.color}18`,
                    border: `1px solid ${item.color}28`,
                  }}
                >
                  <ImageIcon
                    className="w-6 h-6"
                    style={{ color: `${item.color}70` }}
                  />
                </div>
                <span className="font-jakarta font-semibold text-xs text-white/38 group-hover:text-white/65 transition-all text-center">
                  {item.title}
                </span>
                <span
                  className="font-mono-tech text-[10px] mt-1"
                  style={{ color: `${item.color}55` }}
                >
                  {item.year}
                </span>
              </div>
              <div
                className="absolute top-2 left-2 w-4 h-4 border-t border-l transition-all"
                style={{ borderColor: `${item.color}28` }}
              />
              <div
                className="absolute top-2 right-2 w-4 h-4 border-t border-r transition-all"
                style={{ borderColor: `${item.color}28` }}
              />
              <div
                className="absolute bottom-2 left-2 w-4 h-4 border-b border-l transition-all"
                style={{ borderColor: `${item.color}28` }}
              />
              <div
                className="absolute bottom-2 right-2 w-4 h-4 border-b border-r transition-all"
                style={{ borderColor: `${item.color}28` }}
              />
            </div>
          ))}
        </div>

        <div className="mt-10 text-center fade-in-up">
          <p className="font-mono-tech text-xs text-white/25 tracking-widest">
            [ GALLERY UPLOADS COMING SOON — STAY TUNED ]
          </p>
        </div>
      </div>
    </section>
  );
}
