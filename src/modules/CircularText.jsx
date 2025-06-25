import { useEffect } from "react";
import { motion, useAnimation, useMotionValue } from "framer-motion";

const getRotationTransition = (duration, from, loop = true) => ({
  from,
  to: from + 360,
  ease: "linear",
  duration,
  type: "tween",
  repeat: loop ? Infinity : 0,
});

const getTransition = (duration, from) => ({
  rotate: getRotationTransition(duration, from),
  scale: {
    type: "spring",
    damping: 20,
    stiffness: 300,
  },
});

const CircularText = ({
  text,
  spinDuration = 20,
  onHover = "speedUp",
  className = "",
  radius = 100, // 添加半径参数
}) => {
  const letters = Array.from(text);
  const controls = useAnimation();
  const rotation = useMotionValue(0);

  useEffect(() => {
    const start = rotation.get();
    controls.start({
      rotate: start + 360,
      scale: 1,
      transition: getTransition(spinDuration, start),
    });
  }, [spinDuration, text, onHover, controls, rotation]);

  const handleHoverStart = () => {
    const start = rotation.get();
    if (!onHover) return;

    let transitionConfig;
    let scaleVal = 1;

    switch (onHover) {
      case "slowDown":
        transitionConfig = getTransition(spinDuration * 2, start);
        break;
      case "speedUp":
        transitionConfig = getTransition(spinDuration / 4, start);
        break;
      case "pause":
        transitionConfig = {
          rotate: { type: "spring", damping: 20, stiffness: 300 },
          scale: { type: "spring", damping: 20, stiffness: 300 },
        };
        scaleVal = 1;
        break;
      case "goBonkers":
        transitionConfig = getTransition(spinDuration / 20, start);
        scaleVal = 0.8;
        break;
      default:
        transitionConfig = getTransition(spinDuration, start);
    }

    controls.start({
      rotate: start + 360,
      scale: scaleVal,
      transition: transitionConfig,
    });
  };

  const handleHoverEnd = () => {
    const start = rotation.get();
    controls.start({
      rotate: start + 360,
      scale: 1,
      transition: getTransition(spinDuration, start),
    });
  };

  // 计算容器大小（直径）
  const containerSize = radius * 2 + 40; // 添加一些边距

  return (
    <div 
      className={`relative ${className}`} 
      style={{ 
        width: `${containerSize}px`, 
        height: `${containerSize}px`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      {/* 透明覆盖层用于扩大hover区域 */}
      <div 
        className="absolute inset-0 z-10"
        onMouseEnter={handleHoverStart}
        onMouseLeave={handleHoverEnd}
      />
      
      <motion.div
        className="circular-text"
        style={{ 
          rotate: rotation,
          position: 'relative',
          width: `${radius * 2}px`,
          height: `${radius * 2}px`,
        }}
        initial={{ rotate: 0 }}
        animate={controls}
      >
        {letters.map((letter, i) => {
          const rotationDeg = (360 / letters.length) * i;
          const transform = `rotateZ(${rotationDeg}deg) translateY(-${radius}px)`;

          return (
            <span
              key={i}
              className="absolute inline-block left-1/2 top-1/2 text-2xl transition-all duration-500 ease-[cubic-bezier(0,0,0,1)]"
              style={{ 
                transform: `${transform} translateX(-50%)`, 
                WebkitTransform: `${transform} translateX(-50%)`,
                transformOrigin: '0 0',
              }}
            >
              {letter}
            </span>
          );
        })}
      </motion.div>
    </div>
  );
};

export default CircularText;