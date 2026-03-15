import { CheckCircle, Loader2, Plus, Trash2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { useRegisterEvent } from "../hooks/useQueries";

const eventOptions = [
  "Solo Dance",
  "Group Naatiyam",
  "Solo Singing",
  "Battle of Bands",
  "Street Play",
  "Skit",
  "Fashion Show \u2013 Ramp Walk",
  "Rangoli & Fine Arts",
  "Painting Contest",
  "Debate Competition",
  "Quiz Competition",
  "Poetry Recitation",
  "Mobile Gaming \u2013 BGMI",
  "Mobile Gaming \u2013 Free Fire",
  "PC Gaming",
  "Photography Contest",
];

type TeamMember = { id: string; value: string };
let memberCounter = 0;
function newMember(): TeamMember {
  memberCounter += 1;
  return { id: `tm-${memberCounter}`, value: "" };
}

export function RegistrationSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { mutate, isPending, isSuccess, reset } = useRegisterEvent();
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    college: "",
    event: "",
  });
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});

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

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!form.name.trim()) errs.name = "Name is required";
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email))
      errs.email = "Valid email required";
    if (!form.phone.trim() || !/^[6-9]\d{9}$/.test(form.phone))
      errs.phone = "Valid 10-digit phone required";
    if (!form.college.trim()) errs.college = "College name required";
    if (!form.event) errs.event = "Please select an event";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    mutate(
      { ...form, teamMembers: teamMembers.map((m) => m.value).filter(Boolean) },
      {
        onSuccess: () => {
          toast.success(
            "Registration successful! We'll reach out with confirmation.",
          );
          setForm({ name: "", email: "", phone: "", college: "", event: "" });
          setTeamMembers([]);
          setErrors({});
        },
        onError: () => toast.error("Registration failed. Please try again."),
      },
    );
  };

  const addMember = () => setTeamMembers((prev) => [...prev, newMember()]);
  const removeMember = (id: string) =>
    setTeamMembers((prev) => prev.filter((m) => m.id !== id));
  const updateMember = (id: string, val: string) =>
    setTeamMembers((prev) =>
      prev.map((m) => (m.id === id ? { ...m, value: val } : m)),
    );

  return (
    <section
      id="register"
      className="py-24 lg:py-36 relative overflow-hidden"
      style={{ background: "#080816" }}
      ref={ref}
    >
      <div
        className="orb w-[500px] h-[500px] top-[-100px] right-[-100px] opacity-22"
        style={{ background: "rgba(139,92,246,0.2)" }}
        aria-hidden="true"
      />
      <div
        className="orb w-[400px] h-[400px] bottom-[-50px] left-[-80px] opacity-18"
        style={{ background: "rgba(6,182,212,0.15)", animationDelay: "4s" }}
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 circuit-bg opacity-22"
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 space-y-4 fade-in-up">
          <span
            className="font-mono-tech text-xs tracking-[0.5em] uppercase"
            style={{ color: "rgba(139,92,246,0.6)" }}
          >
            [ ENROLLMENT PORTAL ]
          </span>
          <h2 className="font-orbitron text-3xl sm:text-4xl lg:text-5xl font-bold gradient-text-cyan-purple">
            Register Now
          </h2>
          <div
            className="w-32 h-px mx-auto"
            style={{
              background:
                "linear-gradient(90deg, transparent, #8b5cf6, #06b6d4, transparent)",
            }}
          />
          <p className="font-jakarta text-white/45 text-lg">
            Secure your spot in SCET Culturals 2026
          </p>
        </div>

        {isSuccess ? (
          <div
            className="fade-in-up glass-card rounded-2xl p-12 text-center space-y-5"
            style={{
              border: "1px solid rgba(139,92,246,0.3)",
              boxShadow: "0 0 60px rgba(139,92,246,0.15)",
            }}
            data-ocid="register.success_state"
          >
            <div
              className="w-20 h-20 rounded-full flex items-center justify-center mx-auto"
              style={{
                background: "rgba(139,92,246,0.15)",
                border: "2px solid rgba(139,92,246,0.4)",
              }}
            >
              <CheckCircle
                className="w-10 h-10"
                style={{
                  color: "#8b5cf6",
                  filter: "drop-shadow(0 0 10px rgba(139,92,246,0.8))",
                }}
              />
            </div>
            <h3 className="font-orbitron text-2xl font-bold gradient-text-cyan-purple">
              Registration Complete!
            </h3>
            <p className="font-jakarta text-white/55 text-lg">
              Your entry has been recorded. We'll send confirmation details to
              your email.
            </p>
            <button
              type="button"
              onClick={() => reset()}
              data-ocid="register.secondary_button"
              className="cyber-button btn-outline-gradient font-orbitron text-xs font-bold tracking-widest uppercase px-8 py-3 rounded-xl cursor-pointer"
            >
              Register Another
            </button>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="fade-in-up glass-card rounded-2xl p-7 lg:p-9 space-y-5 relative overflow-hidden"
            style={{
              border: "1px solid rgba(255,255,255,0.06)",
              boxShadow: "0 32px 80px rgba(0,0,0,0.5)",
            }}
            data-ocid="register.panel"
          >
            <div
              className="absolute top-0 left-0 w-full h-px"
              style={{
                background:
                  "linear-gradient(90deg, transparent, #8b5cf6, #06b6d4, transparent)",
              }}
            />

            <div className="grid sm:grid-cols-2 gap-5">
              <div className="space-y-2">
                <label
                  htmlFor="reg-name"
                  className="font-mono-tech text-xs text-white/45 tracking-wider uppercase"
                >
                  Full Name *
                </label>
                <input
                  id="reg-name"
                  type="text"
                  value={form.name}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, name: e.target.value }))
                  }
                  placeholder="Enter your full name"
                  className="cyber-input w-full px-4 py-3"
                  data-ocid="register.input"
                />
                {errors.name && (
                  <p
                    className="font-jakarta text-xs text-red-400"
                    data-ocid="register.error_state"
                  >
                    {errors.name}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <label
                  htmlFor="reg-email"
                  className="font-mono-tech text-xs text-white/45 tracking-wider uppercase"
                >
                  Email Address *
                </label>
                <input
                  id="reg-email"
                  type="email"
                  value={form.email}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, email: e.target.value }))
                  }
                  placeholder="your@email.com"
                  className="cyber-input w-full px-4 py-3"
                  data-ocid="register.input"
                />
                {errors.email && (
                  <p
                    className="font-jakarta text-xs text-red-400"
                    data-ocid="register.error_state"
                  >
                    {errors.email}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <label
                  htmlFor="reg-phone"
                  className="font-mono-tech text-xs text-white/45 tracking-wider uppercase"
                >
                  Phone Number *
                </label>
                <input
                  id="reg-phone"
                  type="tel"
                  value={form.phone}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, phone: e.target.value }))
                  }
                  placeholder="10-digit mobile number"
                  className="cyber-input w-full px-4 py-3"
                  data-ocid="register.input"
                />
                {errors.phone && (
                  <p
                    className="font-jakarta text-xs text-red-400"
                    data-ocid="register.error_state"
                  >
                    {errors.phone}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <label
                  htmlFor="reg-college"
                  className="font-mono-tech text-xs text-white/45 tracking-wider uppercase"
                >
                  College Name *
                </label>
                <input
                  id="reg-college"
                  type="text"
                  value={form.college}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, college: e.target.value }))
                  }
                  placeholder="Your college name"
                  className="cyber-input w-full px-4 py-3"
                  data-ocid="register.input"
                />
                {errors.college && (
                  <p
                    className="font-jakarta text-xs text-red-400"
                    data-ocid="register.error_state"
                  >
                    {errors.college}
                  </p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <label
                htmlFor="reg-event"
                className="font-mono-tech text-xs text-white/45 tracking-wider uppercase"
              >
                Select Event *
              </label>
              <select
                id="reg-event"
                value={form.event}
                onChange={(e) =>
                  setForm((p) => ({ ...p, event: e.target.value }))
                }
                className="cyber-input w-full px-4 py-3 appearance-none"
                data-ocid="register.select"
              >
                <option value="" disabled>
                  \u2014 Choose your event \u2014
                </option>
                {eventOptions.map((opt) => (
                  <option
                    key={opt}
                    value={opt}
                    style={{ background: "#0d0d20" }}
                  >
                    {opt}
                  </option>
                ))}
              </select>
              {errors.event && (
                <p
                  className="font-jakarta text-xs text-red-400"
                  data-ocid="register.error_state"
                >
                  {errors.event}
                </p>
              )}
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-mono-tech text-xs text-white/45 tracking-wider uppercase">
                  Team Members
                </span>
                <button
                  type="button"
                  onClick={addMember}
                  data-ocid="register.primary_button"
                  className="flex items-center gap-1.5 font-jakarta text-xs font-semibold px-3 py-1.5 rounded-lg cursor-pointer transition-all"
                  style={{
                    background: "rgba(139,92,246,0.12)",
                    color: "#a78bfa",
                    border: "1px solid rgba(139,92,246,0.3)",
                  }}
                >
                  <Plus className="w-3 h-3" /> Add Member
                </button>
              </div>
              {teamMembers.map((member, i) => (
                <div
                  key={member.id}
                  className="flex gap-2"
                  data-ocid={`register.item.${i + 1}`}
                >
                  <input
                    type="text"
                    value={member.value}
                    onChange={(e) => updateMember(member.id, e.target.value)}
                    placeholder={`Team member ${i + 1} name`}
                    className="cyber-input flex-1 px-4 py-2.5 text-sm"
                    data-ocid="register.input"
                  />
                  <button
                    type="button"
                    onClick={() => removeMember(member.id)}
                    data-ocid={`register.delete_button.${i + 1}`}
                    className="p-2.5 rounded-lg border border-red-500/30 text-red-400 hover:bg-red-500/10 hover:border-red-500/55 transition-all cursor-pointer"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
              {teamMembers.length === 0 && (
                <p className="font-jakarta text-xs text-white/28">
                  Optional \u2014 add team members for group events
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={isPending}
              data-ocid="register.submit_button"
              className="cyber-button btn-gradient w-full py-4 font-orbitron font-bold text-sm tracking-widest uppercase rounded-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer"
            >
              {isPending ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" /> Processing...
                </>
              ) : (
                "Submit Registration \u2726"
              )}
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
