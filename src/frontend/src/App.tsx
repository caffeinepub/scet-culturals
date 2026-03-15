import { Toaster } from "@/components/ui/sonner";
import { AboutSection } from "./components/AboutSection";
import { AdminPanel } from "./components/AdminPanel";
import { ContactSection } from "./components/ContactSection";
import { EventsSection } from "./components/EventsSection";
import { Footer } from "./components/Footer";
import { GallerySection } from "./components/GallerySection";
import { HeroSection } from "./components/HeroSection";
import { Navbar } from "./components/Navbar";
import { RegistrationSection } from "./components/RegistrationSection";
import { ScheduleSection } from "./components/ScheduleSection";

const isAdminRoute =
  typeof window !== "undefined" &&
  (window.location.pathname === "/admin" || window.location.hash === "#/admin");

export default function App() {
  if (isAdminRoute) {
    return (
      <>
        <Toaster
          theme="dark"
          toastOptions={{
            style: {
              background: "#0a120a",
              border: "1px solid #00ff41",
              color: "#e8f5e8",
              fontFamily: "Rajdhani, sans-serif",
            },
          }}
        />
        <AdminPanel />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-bg-deep text-foreground overflow-x-hidden">
      <Toaster
        theme="dark"
        toastOptions={{
          style: {
            background: "#0a120a",
            border: "1px solid #00ff41",
            color: "#e8f5e8",
            fontFamily: "Rajdhani, sans-serif",
          },
        }}
      />
      <Navbar />
      <main>
        <HeroSection />
        <AboutSection />
        <EventsSection />
        <ScheduleSection />
        <GallerySection />
        <RegistrationSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
