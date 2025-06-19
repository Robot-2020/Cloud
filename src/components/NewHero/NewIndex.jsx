import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { CustomEase, SplitText, ScrambleTextPlugin } from "gsap/all";

const NewHero = () => {

return (
    <div className="relative min-h-screen bg-black overflow-hidden">
      {/* Background frame */}
      <div className="fixed top-0 left-0 w-full h-screen bg-cover bg-center pointer-events-none z-0" style={{ backgroundImage: "url('https://assets.codepen.io/7558/web03.webp')" }}></div>

      {/* Background images */}
      <div className="fixed w-full h-screen bg-cover bg-center opacity-100 z-1 mix-blend-multiply transition-opacity duration-800" style={{ backgroundImage: "url('https://assets.codepen.io/7558/wave-bg-001.webp')" }} id="default-bg"></div>
      <div className="fixed w-full h-screen bg-cover bg-center opacity-0 z-1 mix-blend-multiply transition-opacity duration-800" style={{ backgroundImage: "url('https://assets.codepen.io/7558/wave-bg-002.webp')" }} id="focus-bg"></div>
      <div className="fixed w-full h-screen bg-cover bg-center opacity-0 z-1 mix-blend-multiply transition-opacity duration-800" style={{ backgroundImage: "url('https://assets.codepen.io/7558/wave-bg-003.webp')" }} id="presence-bg"></div>
      <div className="fixed w-full h-screen bg-cover bg-center opacity-0 z-1 mix-blend-multiply transition-opacity duration-800" style={{ backgroundImage: "url('https://assets.codepen.io/7558/wave-bg-004.webp')" }} id="feel-bg"></div>

      {/* Bottom gradient */}
      <div className="fixed bottom-0 left-0 w-full h-[40vh] bg-gradient-to-t from-black to-transparent pointer-events-none z-1"></div>

      {/* Text background */}
      <div className="fixed top-0 left-0 w-full h-full z-2 pointer-events-none">
        {["BE", "PRESENT", "LISTEN", "DEEPLY", "OBSERVE", "&", "FEEL", "MAKE", "BETTER", "DECISIONS", "THE", "CREATIVE", "PROCESS", "IS", "MYSTERIOUS", "S", "I", "M", "P", "L", "I", "C", "I", "T", "Y", "IS THE KEY", "FIND YOUR VOICE", "TRUST INTUITION", "EMBRACE SILENCE", "QUESTION EVERYTHING", "TRUTH", "WISDOM", "FOCUS", "ATTENTION", "AWARENESS", "PRESENCE", "SIMPLIFY", "REFINE"].map((text, index) => (
          <div
            key={index}
            className="absolute text-yellow-400 font-mono uppercase opacity-80 whitespace-nowrap"
            style={{
              top: `${5 + Math.floor(index / 7) * 5}%`,
              left: `${(index % 7) * 10 + 5}%`,
            }}
          >
            {text}
          </div>
        ))}
      </div>

      {/* Main content */}
      <div className="relative z-10 h-screen flex flex-col justify-center items-center">
        <div className="relative max-w-full w-auto transform-gpu">
          {["focus", "presence", "feel"].map((rowId, index) => (
            <div className="relative w-full h-[140px] mb-4 flex items-center justify-center overflow-visible" key={index}>
              <div className="text-6xl text-yellow-400 uppercase z-1">{rowId.toUpperCase()}</div>
              <div className="absolute top-0 left-0 w-full h-full cursor-pointer z-10"></div>
            </div>
          ))}
        </div>
      </div>

      {/* Type animation */}
      <div className="fixed h-screen w-screen text-center top-1/2 left-1/2 -mt-[50vmax] -ml-[50vmax] z-5 transform-style-3d pointer-events-none">
        {["focus", "presence", "feel"].map((rowId, index) => (
          <div className={`type-line ${index % 2 === 0 ? "odd" : "even"}`} key={index}>
            {`${rowId} ${rowId} ${rowId}`}
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewHero
