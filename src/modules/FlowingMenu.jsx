import React, { useEffect } from 'react';
import { gsap } from 'gsap';
import { useLayoutEffect } from 'react';

function FlowingMenu({ items = [] }) {
  return (
    <div className="w-full h-full overflow-hidden">
      <nav className="flex flex-col h-full m-0 p-0">
        {items.map((item, idx) => (
          <MenuItem key={idx} {...item} />
        ))}
      </nav>
    </div>
  );
}

function MenuItem({ link, text, image }) {
  const itemRef = React.useRef(null);
  const marqueeRef = React.useRef(null);
  const marqueeInnerRef = React.useRef(null);

  const animationDefaults = { duration: 0.6, ease: 'expo' };

  const findClosestEdge = (mouseX, mouseY, width, height) => {
    const topEdgeDist = (mouseX - width / 2) ** 2 + mouseY ** 2;
    const bottomEdgeDist = (mouseX - width / 2) ** 2 + (mouseY - height) ** 2;
    return topEdgeDist < bottomEdgeDist ? 'top' : 'bottom';
  };

  useLayoutEffect(() => {
    // 初始化动画，确保不会出现空白现象
    if (!itemRef.current || !marqueeRef.current || !marqueeInnerRef.current) return;
    gsap.set([marqueeRef.current, marqueeInnerRef.current], { y: '101%' });
  }, []);

  useEffect(() => {
    // 清除动画，在组件卸载时避免内存泄漏
    return () => {
      gsap.killTweensOf([marqueeRef.current, marqueeInnerRef.current]);
    };
  }, []);

  const handleMouseEnter = (ev) => {
    if (!itemRef.current || !marqueeRef.current || !marqueeInnerRef.current) return;
    const rect = itemRef.current.getBoundingClientRect();
    const edge = findClosestEdge(
      ev.clientX - rect.left,
      ev.clientY - rect.top,
      rect.width,
      rect.height
    );

    gsap.to([marqueeRef.current, marqueeInnerRef.current], {
      y: '0%',
      overwrite: 'auto',
      duration: 0.6,
      ease: 'expo'
    });
  };

  const handleMouseLeave = (ev) => {
    if (!itemRef.current || !marqueeRef.current || !marqueeInnerRef.current) return;
    const rect = itemRef.current.getBoundingClientRect();
    const edge = findClosestEdge(
      ev.clientX - rect.left,
      ev.clientY - rect.top,
      rect.width,
      rect.height
    );

    gsap.to([marqueeRef.current, marqueeInnerRef.current], {
      y: edge === 'top' ? '-101%' : '101%',
      overwrite: 'auto',
      duration: 0.6,
      ease: 'expo'
    });
  };

  const repeatedMarqueeContent = Array.from({ length: 20 }).map((_, idx) => (
    <React.Fragment key={idx}>
      <span className="text-[#060010] uppercase font-normal text-[2vh] leading-[1.2] p-[1vh_1vw_0]">
        {text}
      </span>
      <div
        className="w-[200px] h-[7vh] my-[2em] mx-[2vw] p-[1em_0] rounded-[50px] bg-cover bg-center"
        style={{ backgroundImage: `url(${image})` }}
      />
    </React.Fragment>
  ));

  return (
    <div className="flex-1 relative overflow-hidden text-center shadow-[0_-1px_0_0_#fff]" ref={itemRef}>
      <a
        className="flex items-center justify-center h-full relative cursor-pointer uppercase no-underline font-semibold text-white text-[2vh] hover:text-[#060010] focus:text-white focus-visible:text-[#060010]"
        href={link}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* 文字 */}
        {text}
        <div>
          {/* 左侧 SVG */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-[24px] h-[24px] ml-2 mr-2"  // 设置宽高和左侧间距
            fill="currentColor"
            viewBox="0 0 64 64"
          >
            <circle cx="32" cy="32" r="20" fill="currentColor" />
            <path d="M2,32 C2,12 62,12 62,32 C62,52 2,52 2,32" fill="none" stroke="currentColor" strokeWidth="4" />
          </svg>
        </div>
      </a>
      <div
        className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none bg-white translate-y-[101%] will-change-transform"
        ref={marqueeRef}
      >
        <div className="h-full w-[200%] flex will-change-transform" ref={marqueeInnerRef}>
          <div className="flex items-center relative h-full w-[200%] will-change-transform animate-marquee">
            {repeatedMarqueeContent}
          </div>
        </div>
      </div>
    </div>
  );
}

export default FlowingMenu;

// Note: this is also needed
// /** @type {import('tailwindcss').Config} */
// export default {
//   content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
//   theme: {
//     extend: {
//       translate: {
//         '101': '101%',
//       },
//       keyframes: {
//         marquee: {
//           'from': { transform: 'translateX(0%)' },
//           'to': { transform: 'translateX(-50%)' }
//         }
//       },
//       animation: {
//         marquee: 'marquee 15s linear infinite'
//       }
//     }
//   },
//   plugins: [],
// };