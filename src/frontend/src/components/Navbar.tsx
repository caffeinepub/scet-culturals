import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Events", href: "#events" },
  { label: "Schedule", href: "#schedule" },
  { label: "Gallery", href: "#gallery" },
  { label: "Register", href: "#register" },
  { label: "Contact", href: "#contact" },
];

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("#home");

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNav = (href: string) => {
    setMenuOpen(false);
    setActive(href);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "backdrop-blur-xl border-b border-white/5" : "bg-transparent"
      }`}
      style={scrolled ? { background: "rgba(5,5,15,0.88)" } : undefined}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <button
            type="button"
            onClick={() => handleNav("#home")}
            data-ocid="nav.link"
            className="flex items-center gap-1 group bg-transparent border-none p-0 cursor-pointer"
          >
            <span className="font-orbitron font-black text-lg tracking-wider gradient-text-cyan-purple">
              SCET
            </span>
            <span className="font-orbitron font-light text-sm text-white/40 tracking-[0.3em] ml-1">
              CULTURALS
            </span>
          </button>

          <div className="hidden md:flex items-center gap-1 lg:gap-2">
            {navLinks.map((link) => (
              <button
                key={link.href}
                type="button"
                data-ocid="nav.link"
                onClick={() => handleNav(link.href)}
                className={`relative font-jakarta font-medium text-sm px-4 py-2 rounded-lg transition-all duration-200 cursor-pointer border-none bg-transparent ${
                  active === link.href
                    ? "text-white"
                    : "text-white/45 hover:text-white/75"
                }`}
              >
                {active === link.href && (
                  <span
                    className="absolute inset-0 rounded-lg"
                    style={{
                      background: "rgba(139,92,246,0.12)",
                      border: "1px solid rgba(139,92,246,0.28)",
                    }}
                  />
                )}
                <span className="relative">{link.label}</span>
                {active === link.href && (
                  <span
                    className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-5 h-0.5 rounded-full"
                    style={{
                      background: "linear-gradient(90deg, #8b5cf6, #06b6d4)",
                    }}
                  />
                )}
              </button>
            ))}
            <button
              type="button"
              data-ocid="nav.primary_button"
              onClick={() => handleNav("#register")}
              className="cyber-button btn-gradient font-orbitron text-xs font-bold px-5 py-2.5 rounded-lg tracking-wider uppercase cursor-pointer ml-2"
            >
              Register
            </button>
            <a
              href="/admin"
              data-ocid="nav.link"
              className="font-mono-tech text-[10px] text-white/18 hover:text-white/45 transition-colors tracking-widest uppercase ml-2"
            >
              Admin
            </a>
          </div>

          <button
            type="button"
            className="md:hidden text-white/55 p-2 hover:text-white transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
            data-ocid="nav.toggle"
          >
            {menuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div
          className="md:hidden border-t border-white/5 backdrop-blur-xl"
          style={{ background: "rgba(5,5,15,0.96)" }}
        >
          <div className="px-4 py-4 space-y-1">
            {navLinks.map((link) => (
              <button
                key={link.href}
                type="button"
                data-ocid="nav.link"
                onClick={() => handleNav(link.href)}
                className="block w-full text-left py-3 px-3 font-jakarta font-medium text-base text-white/55 hover:text-white rounded-lg hover:bg-white/5 border-none bg-transparent tracking-wide transition-all cursor-pointer"
              >
                {link.label}
              </button>
            ))}
            <a
              href="/admin"
              data-ocid="nav.link"
              className="block py-3 px-3 font-mono-tech text-xs text-white/18 hover:text-white/45 tracking-widest uppercase transition-colors"
            >
              Admin Panel
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
