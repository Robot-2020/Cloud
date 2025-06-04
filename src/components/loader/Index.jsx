import styles from './Style.module.css'

import { gsap, Power4 } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from '@gsap/react';
import { useEffect } from 'react';

gsap.registerPlugin(ScrollTrigger);

function Loader() {
    
    useEffect(() => {
        // 找到页面中 class 为 part1 的元素下的 h5 元素
        var h5timer = document.querySelector('.part1 h5');
        
        // 定义一个初始值为 0 的变量，表示计时器的当前值
        var grow = 0;
        
        // 使用 setInterval 每隔 36 毫秒执行一次
        setInterval(function() {
            // 如果当前值 grow 小于 100
            if (grow < 100) {
                // 增加 grow 的值，并更新 h5 元素的 innerHTML
                h5timer.innerHTML = grow += 2;
            } else {
                // 如果 grow 达到 100，直接设置为 100
                h5timer.innerHTML = grow;
            }
        }, 48); // 36 毫秒后执行一次

    }, []); // 只有在组件加载时执行一次

    useGSAP(() => {
        // 创建一个新的 GSAP 动画时间轴
        const tl = gsap.timeline();

        // 定义第一个动画，选择所有 class 为 .line 下的 h1 元素
        // h2字体浅入效果
        tl.from('.line h1', {
            y: 150, // 从 y=150 开始，元素向上移动
            stagger: 0.25, // 每个元素之间有 0.3 秒的延迟
            duration: 0.5, // 每个动画持续 1 秒
        });

        // 定义第二个动画，选择所有 .line 下的 h2 和 h6 元素
        // NOW 和 Please wait 字体浅入效果
        tl.from('.line h2', {
            opacity: 0, // 元素从透明度 0 开始，逐渐显示
        });

        // 定义第三个动画，隐藏 class 为 .loader 的元素
        tl.to('.loader', {
            opacity: 0, // 逐渐将透明度设置为 0
            duration: 0.5, // 动画持续时间 0.5 秒
            delay: 2, // 延迟 2 秒后开始动画
        });

        // 定义第四个动画，隐藏 .loader 元素
        tl.to('.loader', {
            display: 'none', // 动画完成后，将 display 属性设为 none，将元素移出视图
        });
    });


  return ( 
    <div>
        <div className='loader w-full h-full bg-[#0b0b0b] fixed font-[PlinaReg]
            px-[5vw] py-[5vw] leading-[7.8vw] text-[7.4vw] tracking-tighter
            sm:px-[6vw] sm:py-[18vw] sm:leading-[7vw] sm:tracking-tight sm:text-[7vw]
            xl:py-[10vw] xl:leading-[6vw] xl:text-[5.8vw]'>

            <div className={`line ${styles.line} flex flex-col items-start uppercase
                sm:flex-row sm:items-center sm:justify-start gap-[2vw]`}>

                <h1>YOUR</h1>
            </div>

            <div className={`line ${styles.line} line uppercase`}>

                <h1>
                    Web Experience
                </h1>
            </div>

            <div className={`line ${styles.line} flex gap-[1.5vw] uppercase
                sm:items-center sm:justify-start`}>

                <h1>is loading right</h1>

                <h2 className={`animateh2 ${styles.animateh2} ml-[1vw] text-[5.5vw]`}>
                    Now
                </h2>
            </div>

            <div className={`part1 ${styles.part1} flex items-center justify-end tracking-wide 
                    gap-[2.5vw] mt-[5vw] mr-[0.5vw] font-[silkSerif] text-[4.2vw] leading-[4.5vw] 
                    sm:gap-[1vw] sm:items-start sm:text-[2.4vw] xl:mr-[8vw]`}>

                <h5 className='w-[6vw] sm:w-[4vw]'>00 </h5>

                <h4>- 100 %</h4>    
            </div>

        </div>
    </div>
   )
}

export default Loader
