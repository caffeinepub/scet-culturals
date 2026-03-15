import { Skeleton } from "@/components/ui/skeleton";
import {
  BookOpen,
  Camera,
  Drama,
  Gamepad2,
  Mic2,
  Music,
  Palette,
  Shirt,
  Star,
  Users,
} from "lucide-react";
import { useEffect, useRef } from "react";
import type { ElementType } from "react";
import { useGetAllEvents } from "../hooks/useQueries";
import { useAdminStore } from "../lib/adminStore";

const SKELETON_KEYS = ["sk1", "sk2", "sk3", "sk4", "sk5", "sk6", "sk7", "sk8"];

const categoryIconMap: Record<string, ElementType> = {
  Dance: Star,
  Music: Mic2,
  Drama,
  Fashion: Shirt,
  "Fine Arts": Palette,
  Literary: BookOpen,
  Gaming: Gamepad2,
  Arts: Camera,
  Group: Users,
};

function getIconForCategory(category: string, index: number): ElementType {
  if (categoryIconMap[category]) return categoryIconMap[category];
  const fallbacks = [
    Star,
    Mic2,
    Music,
    Palette,
    BookOpen,
    Gamepad2,
    Camera,
    Users,
    Drama,
    Shirt,
  ];
  return fallbacks[index % fallbacks.length];
}

const categoryConfig: Record<
  string,
  { accent: string; badge: string; iconBg: string }
> = {
  Dance: {
    accent: "#ec4899",
    badge: "rgba(236,72,153,0.12)",
    iconBg: "rgba(236,72,153,0.15)",
  },
  Music: {
    accent: "#8b5cf6",
    badge: "rgba(139,92,246,0.12)",
    iconBg: "rgba(139,92,246,0.15)",
  },
  Drama: {
    accent: "#f59e0b",
    badge: "rgba(245,158,11,0.12)",
    iconBg: "rgba(245,158,11,0.15)",
  },
  Fashion: {
    accent: "#06b6d4",
    badge: "rgba(6,182,212,0.12)",
    iconBg: "rgba(6,182,212,0.15)",
  },
  "Fine Arts": {
    accent: "#f97316",
    badge: "rgba(249,115,22,0.12)",
    iconBg: "rgba(249,115,22,0.15)",
  },
  Literary: {
    accent: "#22d3ee",
    badge: "rgba(34,211,238,0.12)",
    iconBg: "rgba(34,211,238,0.15)",
  },
  Gaming: {
    accent: "#ef4444",
    badge: "rgba(239,68,68,0.12)",
    iconBg: "rgba(239,68,68,0.15)",
  },
  Arts: {
    accent: "#14b8a6",
    badge: "rgba(20,184,166,0.12)",
    iconBg: "rgba(20,184,166,0.15)",
  },
};

const PRIZE_LABELS = ["1st", "2nd"];

export function EventsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { data: backendEvents, isLoading } = useGetAllEvents();
  const { events: adminEvents } = useAdminStore();

  const events =
    backendEvents && backendEvents.length > 0
      ? backendEvents.map((e, i) => ({
          ...e,
          prizes: e.prizes as string[],
          icon: getIconForCategory(e.category, i),
        }))
      : adminEvents.map((e, i) => ({
          ...e,
          icon: getIconForCategory(e.category, i),
        }));

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll(".fade-in-up").forEach((el, i) => {
              setTimeout(() => el.classList.add("visible"), i * 60);
            });
          }
        }
      },
      { threshold: 0.05 },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const handleRegister = (eventName: string) => {
    const el = document.querySelector("#register");
    if (el) el.scrollIntoView({ behavior: "smooth" });
    setTimeout(() => {
      const select = document.querySelector<HTMLSelectElement>(
        "[data-ocid='register.select']",
      );
      if (select) {
        select.value = eventName;
        select.dispatchEvent(new Event("change", { bubbles: true }));
      }
    }, 600);
  };

  return (
    <section
      id="events"
      className="py-24 lg:py-36 relative overflow-hidden"
      style={{
        background:
          "linear-gradient(180deg, #05050f 0%, #080816 50%, #05050f 100%)",
      }}
      ref={ref}
    >
      <div
        className="orb w-[500px] h-[500px] bottom-[-80px] right-[-80px] opacity-25"
        style={{ background: "rgba(139,92,246,0.2)" }}
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 circuit-bg opacity-30"
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 space-y-4 fade-in-up">
          <span
            className="font-mono-tech text-xs tracking-[0.5em] uppercase"
            style={{ color: "rgba(139,92,246,0.6)" }}
          >
            [ EVENTS DATABASE ]
          </span>
          <h2 className="font-orbitron text-3xl sm:text-4xl lg:text-5xl font-bold gradient-text-cyan-purple">
            Events & Competitions
          </h2>
          <div
            className="w-32 h-px mx-auto"
            style={{
              background:
                "linear-gradient(90deg, transparent, #8b5cf6, #06b6d4, transparent)",
            }}
          />
          <p className="font-jakarta text-white/45 text-lg max-w-xl mx-auto">
            Choose your battlefield. Compete. Conquer.
          </p>
        </div>

        {isLoading ? (
          <div
            className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
            data-ocid="events.loading_state"
          >
            {SKELETON_KEYS.map((key) => (
              <div
                key={key}
                className="glass-card rounded-2xl p-5 space-y-3 border border-white/5"
              >
                <Skeleton className="w-10 h-10 rounded-xl bg-white/5" />
                <Skeleton className="w-3/4 h-4 bg-white/5" />
                <Skeleton className="w-1/2 h-3 bg-white/5" />
                <Skeleton className="w-full h-12 bg-white/5" />
                <Skeleton className="w-full h-8 bg-white/5" />
              </div>
            ))}
          </div>
        ) : (
          <div
            className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
            data-ocid="events.list"
          >
            {events.map((event, i) => {
              const IconComp = event.icon as ElementType;
              const cfg = categoryConfig[event.category] || {
                accent: "#8b5cf6",
                badge: "rgba(139,92,246,0.12)",
                iconBg: "rgba(139,92,246,0.15)",
              };
              return (
                <div
                  key={event.name}
                  className="fade-in-up glass-card rounded-2xl overflow-hidden flex flex-col group transition-all duration-300"
                  style={{ border: `1px solid ${cfg.accent}20` }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.boxShadow =
                      `0 16px 48px rgba(0,0,0,0.5), 0 0 30px ${cfg.accent}33`;
                    (e.currentTarget as HTMLElement).style.borderColor =
                      `${cfg.accent}44`;
                    (e.currentTarget as HTMLElement).style.transform =
                      "translateY(-4px)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.boxShadow = "";
                    (e.currentTarget as HTMLElement).style.borderColor =
                      `${cfg.accent}20`;
                    (e.currentTarget as HTMLElement).style.transform = "";
                  }}
                  data-ocid={`events.item.${i + 1}`}
                >
                  {/* Category-colored top accent */}
                  <div
                    className="w-full h-0.5"
                    style={{
                      background: `linear-gradient(90deg, ${cfg.accent}, transparent)`,
                    }}
                  />

                  <div className="p-5 flex flex-col flex-1">
                    <div className="flex items-start justify-between mb-4">
                      <div
                        className="w-11 h-11 rounded-xl flex items-center justify-center"
                        style={{ background: cfg.iconBg }}
                      >
                        <IconComp
                          className="w-5 h-5"
                          style={{ color: cfg.accent }}
                        />
                      </div>
                      <span
                        className="text-xs font-jakarta font-semibold px-2.5 py-1 rounded-full"
                        style={{
                          background: cfg.badge,
                          color: cfg.accent,
                          border: `1px solid ${cfg.accent}33`,
                        }}
                      >
                        {event.category}
                      </span>
                    </div>

                    <h3 className="font-orbitron text-sm font-bold text-white/90 group-hover:text-white transition-colors mb-2">
                      {event.name}
                    </h3>
                    <p className="font-jakarta text-xs text-white/40 leading-relaxed flex-1 mb-4">
                      {event.description}
                    </p>

                    {event.prizes.length > 0 && (
                      <div className="mb-4 space-y-1.5">
                        {event.prizes.slice(0, 2).map((prize, pi) => (
                          <div
                            key={`${event.name}-prize-${pi}`}
                            className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg"
                            style={{ background: `${cfg.accent}0f` }}
                          >
                            <span
                              className="text-[10px] font-orbitron font-bold px-1.5 py-0.5 rounded"
                              style={{
                                background: `${cfg.accent}25`,
                                color: cfg.accent,
                              }}
                            >
                              {PRIZE_LABELS[pi]}
                            </span>
                            <span
                              className="font-mono-tech text-xs"
                              style={{ color: cfg.accent }}
                            >
                              {prize}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}

                    <button
                      type="button"
                      onClick={() => handleRegister(event.name)}
                      data-ocid={`events.primary_button.${i + 1}`}
                      className="cyber-button w-full py-2.5 font-orbitron text-xs font-bold tracking-widest uppercase rounded-lg transition-all duration-300 cursor-pointer"
                      style={{
                        background: `${cfg.accent}15`,
                        border: `1px solid ${cfg.accent}40`,
                        color: cfg.accent,
                      }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLElement).style.background =
                          `${cfg.accent}25`;
                        (e.currentTarget as HTMLElement).style.borderColor =
                          `${cfg.accent}70`;
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLElement).style.background =
                          `${cfg.accent}15`;
                        (e.currentTarget as HTMLElement).style.borderColor =
                          `${cfg.accent}40`;
                      }}
                    >
                      Register →
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
