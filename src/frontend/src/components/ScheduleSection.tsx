import { Clock, MapPin } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useAdminStore } from "../lib/adminStore";

const typeColors: Record<string, string> = {
  ceremony: "#8b5cf6",
  dance: "#ec4899",
  music: "#a78bfa",
  literary: "#22d3ee",
  arts: "#f97316",
  break: "rgba(255,255,255,0.2)",
  drama: "#f59e0b",
  fashion: "#06b6d4",
  gaming: "#ef4444",
};

export function ScheduleSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { schedule: scheduleItems, settings } = useAdminStore();
  const [activeDay, setActiveDay] = useState<1 | 2>(1);

  const day1Items = scheduleItems
    .filter((s) => s.day === 1)
    .sort((a, b) => a.sortOrder - b.sortOrder);
  const day2Items = scheduleItems
    .filter((s) => s.day === 2)
    .sort((a, b) => a.sortOrder - b.sortOrder);

  const days = [
    {
      day: 1 as const,
      label: "Day 1",
      date: "September 8, 2026",
      items: day1Items,
    },
    {
      day: 2 as const,
      label: "Day 2",
      date: "September 9, 2026",
      items: day2Items,
    },
  ];

  const eventDateParts = settings.eventDates.split("\u2013");
  if (eventDateParts.length === 2) {
    const monthYear = eventDateParts[0].trim();
    const monthParts = monthYear.split(" ");
    if (monthParts.length >= 2) {
      const month = monthParts[0];
      const day1Num = monthParts[1];
      const day2Num = eventDateParts[1].split(",")[0].trim();
      const year = settings.eventYear;
      days[0].date = `${month.charAt(0) + month.slice(1).toLowerCase()} ${day1Num}, ${year}`;
      days[1].date = `${month.charAt(0) + month.slice(1).toLowerCase()} ${day2Num}, ${year}`;
    }
  }

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll(".fade-in-up").forEach((el, i) => {
              setTimeout(() => el.classList.add("visible"), i * 50);
            });
          }
        }
      },
      { threshold: 0.05 },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const currentDayData = days.find((d) => d.day === activeDay) || days[0];

  return (
    <section
      id="schedule"
      className="py-24 lg:py-36 relative overflow-hidden"
      style={{ background: "#080816" }}
      ref={ref}
    >
      <div
        className="orb w-[400px] h-[400px] top-0 left-[-60px] opacity-25"
        style={{ background: "rgba(6,182,212,0.2)" }}
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 circuit-bg opacity-20"
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 space-y-4 fade-in-up">
          <span
            className="font-mono-tech text-xs tracking-[0.5em] uppercase"
            style={{ color: "rgba(6,182,212,0.6)" }}
          >
            [ TIMELINE ]
          </span>
          <h2 className="font-orbitron text-3xl sm:text-4xl lg:text-5xl font-bold gradient-text-cyan-purple">
            Event Schedule
          </h2>
          <div
            className="w-32 h-px mx-auto"
            style={{
              background:
                "linear-gradient(90deg, transparent, #8b5cf6, #06b6d4, transparent)",
            }}
          />
        </div>

        {/* Day tab buttons */}
        <div className="flex gap-3 justify-center mb-10 fade-in-up">
          {days.map((d) => (
            <button
              key={d.day}
              type="button"
              onClick={() => setActiveDay(d.day)}
              data-ocid="schedule.tab"
              className="font-orbitron font-bold text-sm px-6 py-3 rounded-xl transition-all duration-300 cursor-pointer border-none"
              style={{
                background:
                  activeDay === d.day
                    ? "linear-gradient(135deg, #8b5cf6, #06b6d4)"
                    : "rgba(255,255,255,0.04)",
                color: activeDay === d.day ? "white" : "rgba(255,255,255,0.35)",
                boxShadow:
                  activeDay === d.day
                    ? "0 0 25px rgba(139,92,246,0.4)"
                    : "none",
                border:
                  activeDay === d.day
                    ? "1px solid rgba(139,92,246,0.3)"
                    : "1px solid rgba(255,255,255,0.07)",
              }}
            >
              {d.label}
              <span className="ml-2 font-jakarta font-normal text-xs opacity-65">
                {d.date}
              </span>
            </button>
          ))}
        </div>

        {/* Timeline */}
        <div className="fade-in-up" data-ocid="schedule.panel">
          <div className="relative pl-10">
            <div
              className="absolute left-3 top-0 bottom-0 w-px"
              style={{
                background:
                  "linear-gradient(to bottom, transparent, #8b5cf6 10%, #06b6d4 90%, transparent)",
                boxShadow: "0 0 10px rgba(139,92,246,0.4)",
              }}
            />
            <div className="space-y-3">
              {currentDayData.items.map((item, i) => {
                const color = typeColors[item.type] || "#8b5cf6";
                return (
                  <div
                    key={item.id}
                    className="relative flex gap-4 group"
                    data-ocid={`schedule.item.${i + 1}`}
                  >
                    <div
                      className="absolute -left-[29px] top-1/2 -translate-y-1/2 w-3.5 h-3.5 rounded-full border-2"
                      style={{
                        borderColor: color,
                        background: "#080816",
                        boxShadow: `0 0 8px ${color}`,
                      }}
                    />
                    <div
                      className="flex-1 glass-card rounded-xl p-4 transition-all duration-300"
                      style={{ border: `1px solid ${color}22` }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLElement).style.borderColor =
                          `${color}44`;
                        (e.currentTarget as HTMLElement).style.boxShadow =
                          `0 4px 20px rgba(0,0,0,0.3), 0 0 15px ${color}22`;
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLElement).style.borderColor =
                          `${color}22`;
                        (e.currentTarget as HTMLElement).style.boxShadow = "";
                      }}
                    >
                      <div className="flex items-center justify-between gap-3 flex-wrap">
                        <span
                          className="font-orbitron text-xs font-bold"
                          style={{ color }}
                        >
                          {item.eventName}
                        </span>
                        <div className="flex items-center gap-4">
                          <div
                            className="flex items-center gap-1.5"
                            style={{ color: "rgba(255,255,255,0.38)" }}
                          >
                            <Clock className="w-3 h-3" />
                            <span className="font-mono-tech text-xs">
                              {item.time}
                            </span>
                          </div>
                          <div
                            className="flex items-center gap-1.5"
                            style={{ color: "rgba(255,255,255,0.28)" }}
                          >
                            <MapPin className="w-3 h-3" />
                            <span className="font-jakarta text-xs">
                              {item.venue}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
              {currentDayData.items.length === 0 && (
                <div className="text-center py-12 glass-card rounded-xl border border-white/5 text-white/28 font-jakarta text-sm">
                  No events scheduled for this day.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
