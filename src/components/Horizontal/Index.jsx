import Lenis from '@studio-freight/lenis';
import { useEffect, useRef } from 'react';
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

function Horizon() {
    const imageRef = useRef([]);
    const imageContainerRef = useRef();

    let imageSection = [];
    for (let i = 1; i <= 7; i++) {
        imageSection.push(
            <div className='w-[100vw] shrink-0 rounded-3xl overflow-hidden' ref={(ref) => imageRef.current[i - 1] = ref}>
                <img src={`../../img/IMG_${i}.jpg`} className='w-full' />
            </div>
        )
    }

    // gsap
    gsap.registerPlugin(ScrollTrigger);

    let dragRatio = 1;

    useEffect(() => {
        gsap.to(imageRef.current, {
            xPercent: -100 * (imageRef.current.length - 1),
            ease: 'none',
            scrollTrigger: {
                trigger: imageContainerRef.current, // 监听的触发元素
                scrub: 0.01, // 平滑滚动，值越小越平滑
                end: '+=' + imageContainerRef.current.offsetWidth,  // 滚动结束的触发点
                pin: true,  // 锁定元素直到滚动结束
                snap: 1 / (imageRef.current - 1),   // 滚动时的快照，确保每次滚动一个完整的图像
            }
        })

        return () => {
            ScrollTrigger.getAll().forEach(st => st.kill());
        }
    })

    // lenis
    const lenis = new Lenis();
    lenis.on('scroll', () => { });

    function raf(time) {
        lenis.raf(time);     // 处理滚动事件
        requestAnimationFrame(raf); // 递归调用，确保平滑滚动
    }
    requestAnimationFrame(raf); // 启动动画帧

    return (
        <main className="bg-[#101010] w-full overflow-x-hidden">
            <section className='min-h-screen flex justify-center items-center'>
                <h1 className='font-bold text-8xl text-white'>Scroll down</h1>
            </section>
            <section className='min-h-screen flex flex-nowrap items-center space-x-10 px-20' ref={imageContainerRef} style={{ width: 'calc(100vw * 6)' }}>
                {imageSection}
            </section>
            <section className='w-full min-h-screen'></section>
        </main>
    );
}

export default Horizon;
