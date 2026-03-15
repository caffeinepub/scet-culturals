import { CheckCircle, Loader2, Mail, MapPin, Phone } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { useSubmitContactForm } from "../hooks/useQueries";

export function ContactSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { mutate, isPending, isSuccess, reset } = useSubmitContactForm();

  const [form, setForm] = useState({ name: "", email: "", message: "" });
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
    if (!form.name.trim()) errs.name = "Name required";
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email))
      errs.email = "Valid email required";
    if (!form.message.trim() || form.message.length < 10)
      errs.message = "Message too short";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    mutate(form, {
      onSuccess: () => {
        toast.success("Message sent! We'll get back to you soon.");
        setForm({ name: "", email: "", message: "" });
        setErrors({});
      },
      onError: () => toast.error("Failed to send message. Please try again."),
    });
  };

  return (
    <section id="contact" className="py-20 lg:py-32 relative" ref={ref}>
      <div className="absolute inset-0 circuit-bg opacity-30" />
      <div className="absolute inset-0 bg-gradient-to-b from-bg-deep via-bg-mid/30 to-bg-deep" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 space-y-3 fade-in-up">
          <span className="font-mono-tech text-xs text-neon/60 tracking-[0.5em] uppercase">
            [ COMMS CHANNEL ]
          </span>
          <h2 className="font-orbitron text-3xl sm:text-4xl lg:text-5xl font-bold text-neon glow-md">
            Contact Us
          </h2>
          <div
            className="w-24 h-px bg-neon mx-auto"
            style={{ boxShadow: "0 0 10px #00ff41" }}
          />
        </div>

        <div className="grid lg:grid-cols-2 gap-10">
          <div className="space-y-6 fade-in-up">
            <div className="bg-bg-card border border-neon/20 p-6 lg:p-8 space-y-6 relative overflow-hidden hover:border-neon/40 transition-all box-glow">
              <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-neon/40 to-transparent" />

              <h3 className="font-orbitron text-lg font-bold text-neon">
                SCET Cultural Committee
              </h3>

              <div className="space-y-4">
                <div className="flex items-start gap-3 group">
                  <div className="w-9 h-9 bg-neon/10 border border-neon/30 flex items-center justify-center flex-shrink-0 group-hover:bg-neon/20 transition-all">
                    <MapPin className="w-4 h-4 text-neon" />
                  </div>
                  <div>
                    <div className="font-rajdhani font-semibold text-white/90">
                      Address
                    </div>
                    <div className="font-rajdhani text-sm text-white/60 leading-relaxed">
                      Salem College of Engineering and Technology,
                      <br />
                      Omalur Main Road, Attur Bypass,
                      <br />
                      Salem – 636 106, Tamil Nadu, India
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 group">
                  <div className="w-9 h-9 bg-neon/10 border border-neon/30 flex items-center justify-center flex-shrink-0 group-hover:bg-neon/20 transition-all">
                    <Phone className="w-4 h-4 text-neon" />
                  </div>
                  <div>
                    <div className="font-rajdhani font-semibold text-white/90">
                      Phone
                    </div>
                    <div className="font-rajdhani text-sm text-neon/80">
                      +91 90000 00000
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 group">
                  <div className="w-9 h-9 bg-neon/10 border border-neon/30 flex items-center justify-center flex-shrink-0 group-hover:bg-neon/20 transition-all">
                    <Mail className="w-4 h-4 text-neon" />
                  </div>
                  <div>
                    <div className="font-rajdhani font-semibold text-white/90">
                      Email
                    </div>
                    <div className="font-rajdhani text-sm text-neon/80">
                      culturals@scet.ac.in
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-neon/10">
                <div className="font-mono-tech text-xs text-neon/50 tracking-widest">
                  [ SYSTEM UPTIME: 24/7 PRE-EVENT SUPPORT ]
                </div>
              </div>
            </div>
          </div>

          <div className="fade-in-up">
            {isSuccess ? (
              <div
                className="bg-bg-card border border-neon p-10 text-center space-y-4 box-glow-md h-full flex flex-col items-center justify-center"
                data-ocid="contact.success_state"
              >
                <CheckCircle
                  className="w-14 h-14 text-neon"
                  style={{ filter: "drop-shadow(0 0 8px #00ff41)" }}
                />
                <h3 className="font-orbitron text-xl font-bold text-neon">
                  Message Transmitted!
                </h3>
                <p className="font-rajdhani text-white/60">
                  We'll respond within 24 hours.
                </p>
                <button
                  type="button"
                  onClick={() => reset()}
                  data-ocid="contact.secondary_button"
                  className="cyber-button font-orbitron text-xs font-bold tracking-widest uppercase px-6 py-3 border border-neon/60 text-neon hover:bg-neon/10 transition-all"
                >
                  Send Another
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="bg-bg-card border border-neon/20 p-6 lg:p-8 space-y-5 relative overflow-hidden hover:border-neon/30 transition-all"
                data-ocid="contact.panel"
              >
                <div className="absolute top-0 right-0 w-full h-px bg-gradient-to-l from-transparent via-neon/40 to-transparent" />

                <div className="grid sm:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label
                      htmlFor="contact-name"
                      className="font-mono-tech text-xs text-neon/70 tracking-wider uppercase"
                    >
                      Name *
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      value={form.name}
                      onChange={(e) =>
                        setForm((p) => ({ ...p, name: e.target.value }))
                      }
                      placeholder="Your name"
                      className="cyber-input w-full px-4 py-3 rounded-none"
                      data-ocid="contact.input"
                    />
                    {errors.name && (
                      <p
                        className="font-rajdhani text-xs text-red-400"
                        data-ocid="contact.error_state"
                      >
                        {errors.name}
                      </p>
                    )}
                  </div>

                  <div className="space-y-1.5">
                    <label
                      htmlFor="contact-email"
                      className="font-mono-tech text-xs text-neon/70 tracking-wider uppercase"
                    >
                      Email *
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      value={form.email}
                      onChange={(e) =>
                        setForm((p) => ({ ...p, email: e.target.value }))
                      }
                      placeholder="your@email.com"
                      className="cyber-input w-full px-4 py-3 rounded-none"
                      data-ocid="contact.input"
                    />
                    {errors.email && (
                      <p
                        className="font-rajdhani text-xs text-red-400"
                        data-ocid="contact.error_state"
                      >
                        {errors.email}
                      </p>
                    )}
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label
                    htmlFor="contact-message"
                    className="font-mono-tech text-xs text-neon/70 tracking-wider uppercase"
                  >
                    Message *
                  </label>
                  <textarea
                    id="contact-message"
                    value={form.message}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, message: e.target.value }))
                    }
                    placeholder="Your message..."
                    rows={5}
                    className="cyber-input w-full px-4 py-3 rounded-none resize-none"
                    data-ocid="contact.textarea"
                  />
                  {errors.message && (
                    <p
                      className="font-rajdhani text-xs text-red-400"
                      data-ocid="contact.error_state"
                    >
                      {errors.message}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isPending}
                  data-ocid="contact.submit_button"
                  className="cyber-button w-full py-4 font-orbitron font-bold text-sm tracking-widest uppercase bg-neon/10 border border-neon/60 text-neon hover:bg-neon/20 hover:border-neon transition-all duration-300 disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {isPending ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />{" "}
                      Transmitting...
                    </>
                  ) : (
                    "Send Message"
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
