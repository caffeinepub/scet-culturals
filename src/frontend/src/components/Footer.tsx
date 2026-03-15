import { SiInstagram, SiX, SiYoutube } from "react-icons/si";
import { useAdminStore } from "../lib/adminStore";

const quickLinks = [
  { label: "Home", href: "#home" },
  { label: "Events", href: "#events" },
  { label: "Schedule", href: "#schedule" },
  { label: "Gallery", href: "#gallery" },
  { label: "Register", href: "#register" },
  { label: "Contact", href: "#contact" },
];

export function Footer() {
  const { settings } = useAdminStore();
  const year = new Date().getFullYear();
  const hostname =
    typeof window !== "undefined" ? window.location.hostname : "";
  const caffeineUrl = `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(hostname)}`;

  const handleNav = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer
      className="relative pt-16 pb-8 overflow-hidden"
      style={{ background: "#060613" }}
    >
      {/* Gradient divider */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, #8b5cf6 30%, #06b6d4 70%, transparent)",
        }}
      />
      <div
        className="orb w-[400px] h-[400px] bottom-[-200px] right-[-100px] opacity-12"
        style={{ background: "rgba(139,92,246,0.3)" }}
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 circuit-bg opacity-12"
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10 mb-12">
          {/* Brand */}
          <div className="space-y-5">
            <div>
              <div className="flex items-baseline gap-1 mb-1.5">
                <span className="font-orbitron font-black text-2xl gradient-text-cyan-purple tracking-wider">
                  SCET
                </span>
                <span className="font-orbitron font-light text-sm text-white/35 tracking-[0.3em] ml-1">
                  CULTURALS
                </span>
              </div>
              <div
                className="font-mono-tech text-[10px] tracking-widest"
                style={{ color: "rgba(139,92,246,0.5)" }}
              >
                {settings.eventYear}
              </div>
            </div>
            <p className="font-jakarta text-sm text-white/38 leading-relaxed max-w-xs">
              The annual mega cultural fest of {settings.collegeName}. Where
              innovation, art, and technology converge.
            </p>
            <div className="flex gap-3">
              {[
                {
                  href: settings.instagramUrl,
                  Icon: SiInstagram,
                  label: "Instagram",
                },
                {
                  href: settings.youtubeUrl,
                  Icon: SiYoutube,
                  label: "YouTube",
                },
                { href: settings.xUrl, Icon: SiX, label: "X / Twitter" },
              ].map(({ href, Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  data-ocid="footer.link"
                  className="w-9 h-9 rounded-xl flex items-center justify-center text-white/38 hover:text-white transition-all duration-300"
                  style={{
                    background: "rgba(139,92,246,0.08)",
                    border: "1px solid rgba(139,92,246,0.2)",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.background =
                      "rgba(139,92,246,0.18)";
                    (e.currentTarget as HTMLElement).style.borderColor =
                      "rgba(139,92,246,0.5)";
                    (e.currentTarget as HTMLElement).style.boxShadow =
                      "0 0 15px rgba(139,92,246,0.3)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.background =
                      "rgba(139,92,246,0.08)";
                    (e.currentTarget as HTMLElement).style.borderColor =
                      "rgba(139,92,246,0.2)";
                    (e.currentTarget as HTMLElement).style.boxShadow = "";
                  }}
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-5">
            <h4
              className="font-orbitron text-xs font-bold tracking-[0.3em] uppercase"
              style={{ color: "#8b5cf6" }}
            >
              Quick Links
            </h4>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    data-ocid="footer.link"
                    onClick={(e) => {
                      e.preventDefault();
                      handleNav(link.href);
                    }}
                    className="font-jakarta text-sm text-white/38 hover:text-white/70 transition-colors flex items-center gap-2"
                  >
                    <span
                      className="w-1.5 h-1.5 rounded-full"
                      style={{ background: "rgba(139,92,246,0.5)" }}
                    />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-5">
            <h4
              className="font-orbitron text-xs font-bold tracking-[0.3em] uppercase"
              style={{ color: "#06b6d4" }}
            >
              Contact
            </h4>
            <div className="space-y-3 font-jakarta text-sm text-white/38">
              <p className="font-semibold text-white/58">
                {settings.collegeName}
              </p>
              <p>
                Omalur Main Road, Attur Bypass
                <br />
                {settings.location}
              </p>
              <p style={{ color: "#8b5cf6" }}>{settings.contactEmail}</p>
              <p style={{ color: "#06b6d4" }}>{settings.eventDates}</p>
            </div>
          </div>
        </div>

        <div
          className="pt-6 border-t"
          style={{ borderColor: "rgba(255,255,255,0.05)" }}
        >
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="font-jakarta text-sm text-white/22">
              \u00a9 {year} {settings.eventName}. All rights reserved.
            </p>
            <p className="font-jakarta text-sm text-white/22">
              Built with \u2764\ufe0f using{" "}
              <a
                href={caffeineUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white/50 transition-colors"
                style={{ color: "rgba(139,92,246,0.55)" }}
              >
                caffeine.ai
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
