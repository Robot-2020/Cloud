import styles from './Style.module.css'

import { gsap, Power4 } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from '@gsap/react';
import { useEffect } from 'react';

gsap.registerPlugin(ScrollTrigger);

function Loader() {
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual'; // 禁止页面刷新后自动滚动到先前的位置
    }

    useEffect(() => {
        document.body.style.overflow = "hidden";
        var h5timer = document.querySelector('.part1 h5');
        var grow = 0;
        setInterval(function() {
            if(grow < 100) {
                h5timer.innerHTML = grow++;
            } else {
                h5timer.innerHTML = grow;
            }
        },36);
    }, []);
    

    useGSAP(() => {
        const tl = gsap.timeline();
        tl.from('.line h1', {
            y: 150,
            stagger: 0.3,
            duration: 1,
        })
        tl.from('.line h2, h6', {
            opacity: 0,  
        })
        
        tl.to('.loader', {
            opacity: 0,
            duration: 0.2,
            delay: 2.0
        })
        
        // 页面滚动到顶部
        window.scrollTo(0, 0);
        tl.from('.hero', {
            y: 1200,
            opacity: 0,
            duration: 0.1,
            ease: Power4
        })
        tl.from('.navbar', {
           opacity: 0,
           duration: 0.2,
        })
        tl.from('.firstword', {
           opacity: 0,
           duration: 0.2,
        })
        // 恢复页面滚动
        tl.add(() => {
            document.body.style.overflow = "auto";
        });
        tl.from('#hero1 h1, #hero2 h1, #hero2 h2, .hero h2, #hero2 h3', {
            y: 180,
            stagger: 0.1,
        })
        tl.to('.loader', {
            display: 'none'
        })
    }) 
    
  return ( 
    <div>
        <div 
            className="loader w-full h-full bg-white fixed z-[9] font-[PlinaReg] 
            px-[5vw] py-[40vw] leading-[7.8vw] text-[7.4vw] tracking-tighter
            sm:py-[18vw] sm:px-[6vw]  sm:leading-[7vw] sm:tracking-tight sm:text-[7vw]
            xl:text-[5.8vw] xl:leading-[6vw] xl:py-[10vw]"
        >
            <div 
                className={`line ${styles.line} flex flex-col items-start uppercase
                sm:flex-row sm:items-center sm:justify-start gap-[2vw]
                
                `}
            >
                <div 
                    className={`part1 ${styles.part1} flex  gap-[2.5vw]
                    items-center justify-center sm:gap-[1vw]
                    font-[silkSerif] text-[4.2vw] leading-[4.5vw] tracking-wide 
                    sm:items-start
                    sm:text-[2.4vw]`}
                >
                    <h5 className='w-[5vw] text-right'>00</h5>
                    <h4>- 100</h4>
                </div>
                <h1>Your</h1>
            </div>
            <div className={`line ${styles.line} uppercase`}>
                <h1>Web Experience</h1>
            </div>
            <div 
                className={` line ${styles.line} flex 
                sm:items-center sm:justify-start 
                gap-[1.5vw] uppercase`}
            >
                <h1>
                    is loading right
                </h1>
                <h2 className={`animateh2 ${styles.animateh2} text-[5.5vw]`}>
                    Now
                </h2>
            </div>
            <div 
                className={`line ${styles.line}  
                text-[3.5vw] mt-[14vw] tracking-tight
                sm:text-[.8vw] sm:tracking-wide leading-none sm:w-[30vw] sm:mt-[4vw] 
                flex flex-col sm:items-end justify-center`}
            >
                <h6 className='sm:w-[5.6vw] sm:text-left'>
                    Please wait 
                </h6>
                <h6>
                    a few seconds 
                </h6>
            </div>
        </div>
    </div>
   )
}

export default Loader
