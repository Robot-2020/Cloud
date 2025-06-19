import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const Clock = () => {
  const hourHandRef = useRef(null);
  const minuteHandRef = useRef(null);
  const secondHandRef = useRef(null);
  const clockFaceRef = useRef(null);
  
  // 手表品牌文字
  const brandName = "CLOUD";
  const subBrand = "MADE IN CHINA";

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      const hours = now.getHours() % 12;
      const minutes = now.getMinutes();
      const seconds = now.getSeconds();
      const milliseconds = now.getMilliseconds();
      
      // 计算各指针的角度
      const hourAngle = (hours * 30) + (minutes * 0.5);
      const minuteAngle = (minutes * 6) + (seconds * 0.1);
      const secondAngle = (seconds * 6) + (milliseconds * 0.006);
      
      // 使用GSAP平滑动画
      gsap.to(hourHandRef.current, {
        rotation: hourAngle,
        duration: 0.8,
        ease: "power2.out",
        transformOrigin: "center bottom"
      });
      
      gsap.to(minuteHandRef.current, {
        rotation: minuteAngle,
        duration: 0.8,
        ease: "power2.out",
        transformOrigin: "center bottom"
      });
      
      gsap.to(secondHandRef.current, {
        rotation: secondAngle,
        duration: 0.3,
        ease: "elastic.out(1, 0.3)",
        transformOrigin: "center bottom"
      });
      
      // 添加手表表面的微妙反光效果
      gsap.to(clockFaceRef.current, {
        boxShadow: "0 0 20px rgba(255, 255, 255, 1)",
        duration: 0.5,
        yoyo: true,
        repeat: 1
      });
    };
    
    // 初始更新
    updateClock();
    
    // 每秒更新一次
    const interval = setInterval(updateClock, 1000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex justify-center items-center bg-gradient-to-br">
      {/* 手表主体 */}
      <div className="relative">

        {/* 手表表壳 */}
        <div 
          ref={clockFaceRef}
          className="relative w-48 h-48 rounded-full border-8 border-black-400 shadow-xl bg-gradient-to-br from-white to-pink-300"
          style={{
            boxShadow: "inset 0 0 20px rgba(0, 0, 0, 0.2), 0 0 30px rgba(0, 0, 0, 0.4)"
          }}
        >
          {/* 金属边框细节 */}
          <div className="absolute inset-0 rounded-full border-2 border-white opacity-30"></div>
          
          {/* 手表品牌文字 */}
          <div className="absolute top-1/4 left-0 right-0 text-center">
            <div className="text-xs font-bold text-black tracking-widest">{brandName}</div>
            <div className="text-[0.6rem] text-black mt-1">{subBrand}</div>
          </div>
          
          {/* 时钟中心点 - 金属质感 */}
          <div className="absolute top-1/2 left-1/2 w-3 h-3 -mt-1.5 -ml-1.5 rounded-full bg-gradient-to-br from-blue-400 to-white z-10 shadow-xl"></div>
          
          {/* 时钟刻度 - 手表风格 */}
          {Array.from({ length: 60 }).map((_, i) => (
            <div
              key={i}
              className={`absolute top-1/2 left-1/2 -ml-0.5 bg-pink-200`}
              style={{
                width: i % 5 === 0 ? '2px' : '1px',
                height: i % 5 === 0 ? '13px' : '6px',
                transform: `rotate(${i * 6}deg) translateY(83px)`,
                transformOrigin: 'center top',
                opacity: i % 5 === 0 ? 1 : 0.7,
                background: i % 5 === 0 ? 'linear-gradient(to bottom, #4b5563, #1f2937)' : '#4b5563'
              }}
            />
          ))}
          
          {/* 时针 - 更粗短的手表风格 */}
          <div
            ref={hourHandRef}
            className="absolute top-1/2 left-1/2 w-2 h-12 -ml-1 -mt-12 bg-pink-200 rounded-full shadow-md"
            style={{ 
              transformOrigin: 'center bottom',
              background: 'linear-gradient(to bottom, #111827, #374151)'
            }}
          />
          
          {/* 分针 - 中等长度 */}
          <div
            ref={minuteHandRef}
            className="absolute top-1/2 left-1/2 w-1.5 h-16 -ml-0.75 -mt-16 bg-pink-200 rounded-full shadow-md"
            style={{ 
              transformOrigin: 'center bottom',
              background: 'linear-gradient(to bottom, #1f2937, #4b5563)'
            }}
          />
          
          {/* 秒针 - 细长带红色尖端 */}
          <div
            ref={secondHandRef}
            className="absolute top-1/2 left-1/2 w-0.5 h-20 -ml-0.25 -mt-20 bg-pink-400 rounded-full shadow-lg"
            style={{ 
              transformOrigin: 'center bottom',
              boxShadow: '0 0 5px rgba(239, 68, 68, 0.7)'
            }}
          />
          
          {/* 秒针中心配重 */}
          <div className="absolute top-1/2 left-1/2 w-2 h-2 -mt-1 -ml-1 rounded-full bg-white-200 z-20"></div>
          
          {/* 日期窗口 */}
          <div className="absolute bottom-1/4 right-1/4 w-6 h-4 bg-white opacity-60 rounded-sm shadow-inner flex items-center justify-center">
            <span className="text-xs font-bold text-pink-400">
              {new Date().getDate()}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Clock;