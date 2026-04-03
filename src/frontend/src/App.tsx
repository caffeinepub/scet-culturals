import { Toaster } from "@/components/ui/sonner";
import { useCallback, useState } from "react";
import { MusicPlayer } from "./components/MusicPlayer";
import { Slide1 } from "./components/slides/Slide1";
import { Slide2 } from "./components/slides/Slide2";
import { Slide3 } from "./components/slides/Slide3";
import { Slide4 } from "./components/slides/Slide4";
import { Slide5 } from "./components/slides/Slide5";
import { Slide6 } from "./components/slides/Slide6";
import { Slide7 } from "./components/slides/Slide7";
import { Slide8 } from "./components/slides/Slide8";

export default function App() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const goToSlide = useCallback((index: number) => {
    setCurrentSlide(((index % 8) + 8) % 8);
  }, []);

  const next = useCallback(
    () => goToSlide(currentSlide + 1),
    [currentSlide, goToSlide],
  );

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "#0a0a0b",
        overflow: "hidden",
        fontFamily: "Montserrat,sans-serif",
      }}
    >
      <Toaster />
      {currentSlide === 0 && <Slide1 onNext={next} />}
      {currentSlide === 1 && <Slide2 onNext={next} />}
      {currentSlide === 2 && <Slide3 onNext={next} />}
      {currentSlide === 3 && <Slide4 onNext={next} />}
      {currentSlide === 4 && <Slide5 onNext={next} />}
      {currentSlide === 5 && <Slide6 onNext={next} />}
      {currentSlide === 6 && <Slide7 onNext={next} />}
      {currentSlide === 7 && <Slide8 onNext={next} />}
      <MusicPlayer />
    </div>
  );
}
