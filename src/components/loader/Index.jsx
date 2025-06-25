import styles from './Style.module.css'; // 引入样式模块
import { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";
import { SplitText } from 'gsap/SplitText'; // assuming you're using GSAP plugins
import Hero from '../Hero/Index';

const Loader = ({ onLoadComplete }) => {

    // 注册插件, 文本扰乱和切割
    gsap.registerPlugin(ScrambleTextPlugin, SplitText);

    // Initial setup
    const loaderRef = useRef(null);
    const preloaderEl = useRef(null);
    const terminalLines = useRef([]);
    const terminalLinesSpans = useRef([]);
    const progressBarRef = useRef(null);
    const titleLinesRef = useRef([]);

    useEffect(() => {
        document.body.classList.add('body-no-scroll');

        // 自定义的动画缓动函数 slideEase，它控制动画的加速和减速。
        const slideEase = "cubic-bezier(0.65,0.05,0.36,1)";

        // Setup initial preloader state
        gsap.set(preloaderEl.current, {
            clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)"
        });

        gsap.set(titleLinesRef.current, {
            y: "100%"
        });

        // 设置所有 .terminalLine 元素的初始透明度为 0，即在动画开始时这些元素是不可见的。
        gsap.set(terminalLines.current, {
            opacity: 0
        });

        // 定义一个特殊字符 specialChars，在扰乱文本时用作随机字符。
        const specialChars = "▪";

        // 保存其原始文本内容到 originalTexts 对象中，并清空它们的文本内容，为后续的扰乱效果做准备。
        const originalTexts = {};
        terminalLinesSpans.current.forEach((span, index) => {
            const originalText = span.textContent;
            originalTexts[index] = originalText;
            span.setAttribute("data-original-text", originalText);
        })

        // 更新进度条的宽度。传入的 percent 值会决定进度条的宽度。
        function updateProgress(progress) {
            const progressBar = progressBarRef.current;
            if (progressBar) {
                progressBar.style.transition = "none";
                progressBar.style.width = `${progress}%`;
            }
        }

        // 1. 加载动画。
        function animateTerminalPreloader() {
            // 首先将进度条重置为 0%。
            updateProgress(0);

            // 创建一个 GSAP 动画时间线 tl，并在动画完成时调用 revealContent 函数显示页面内容。
            const tl = gsap.timeline({
                onComplete: () => {
                    tl.set(loaderRef.current, { display: "none" }); // 直接隐藏
                }
            });

            // 设置动画的总时长为 3 秒。
            const totalDuration = 3;

            // 获取所有 .terminalLine 元素，并根据它们的 top 样式属性（即它们在页面中的垂直位置）进行排序。
            const allLines = Array.from(terminalLines.current);
            allLines.sort((a, b) => {
                const aTop = parseInt(a.style.top);
                const bTop = parseInt(b.style.top);
                return aTop - bTop;
            });

            // 创建另一个 GSAP 时间线 textRevealTl，用于控制文本的显示动画。
            const textRevealTl = gsap.timeline();

            // 遍历所有排序后的 .terminalLine 元素，并为每个元素创建一个动画。
            allLines.forEach((line, lineIndex) => {
                // 遍历每一行文本，根据行号设置透明度（偶数行完全可见，奇数行透明度稍低）。
                const baseOpacity = lineIndex % 2 === 0 ? 1 : 0.7;

                // 计算每个动画开始的时间点，以及动画的持续时间为总时间的80%。
                const timePoint = (lineIndex / allLines.length) * (totalDuration * 0.8);

                // 在时间线 textRevealTl 上添加一个动画，该动画在 timePoint 时刻开始，持续 duration 秒，延迟 delay 秒。
                textRevealTl.to(
                    line,
                    {
                        opacity: baseOpacity,
                        duration: 0.2,
                    },
                    timePoint
                );

                const scrambleSpans = line.querySelectorAll('span[data-scramble="true"]');
                scrambleSpans.forEach((span) => {
                    const originalText = span.getAttribute("data-original-text") || span.textContent;
                    textRevealTl.to(
                        span,
                        {
                            duration: 0.3,
                            scrambleText: {
                                text: originalText,
                                chars: specialChars,
                                revealDelay: 0,
                                speed: 0.3,
                            },
                            ease: "none",
                        },
                        timePoint + 0.1
                    );
                });
            });

            // 将文本显示的时间线 textRevealTl 添加到主时间线 tl 中。
            tl.add(textRevealTl, 0);

            for (let i = 0; i < 3; i++) {
                // 添加周期性的“故障”扰乱效果，故障效果会在动画过程中随机出现。每个故障效果间隔 1 秒。
                const randomTime = 1 + i * 1;
                const randomSpans = [];
                tl.add(() => {
                    const glitchTl = gsap.timeline();
                    const allScrambleSpans = terminalLinesSpans.current;
                    // Select 3-5 random spans to glitch
                    const numToGlitch = 2 + Math.floor(Math.random() * 3);
                    for (let j = 0; j < numToGlitch; j++) {
                        const randomIndex = Math.floor(Math.random() * allScrambleSpans.length);
                        randomSpans.push(allScrambleSpans[randomIndex]);
                    }

                    // 对这些随机选择的元素应用故障效果。
                    randomSpans.forEach((span) => {
                        if (span != null) {
                            const text = span.textContent || span.getAttribute("data-original-text");
                            glitchTl.to(
                                span,
                                {
                                    scrambleText: {
                                        text: text,
                                        chars: specialChars,
                                        revealDelay: 0,
                                        speed: 0.1,
                                    },
                                    duration: 0.2,
                                    ease: "none",
                                    repeat: 1
                                },
                                Math.random() * 0.3
                            )
                        }
                    });

                    return glitchTl;

                }, randomTime);
            }

            // 创建一个新的时间线 disappearTl，用于实现逐个消失的效果。
            const disappearTl = gsap.timeline();

            // 每一行的文本在 0.2 秒内逐渐消失，间隔为 0.1 秒。
            disappearTl.to(allLines, {
                opacity: 0,
                duration: 0.2,
                stagger: 0.1,
                ease: "power1.in"
            });

            // 在主时间线的最后 1 秒添加消失动画。
            tl.add(disappearTl, totalDuration - 1);

            // 在动画过程中，实时更新进度条，确保进度条与主动画同步。
            tl.eventCallback("onUpdate", () => {
                const progress = Math.min(99, tl.progress() * 120);
                updateProgress(progress);
            })

            // 修改时间轴结束逻辑
            tl.call(
                () => updateProgress(100),
                [],
                ">-=0.5" // 结束前0.5秒强制100%
            )
                .to(
                    loaderRef.current,
                    {
                        y: "-100%",
                        duration: 0.6,
                        ease: "power2.out",
                    },
                    "+=0.05" // 紧接着向上滑动
                )
                .call(() => {
                    document.body.classList.remove('body-no-scroll');
                    onLoadComplete(); // 必须通知父组件！
                });

            return tl;
        }
        // Start terminal preloader animation
        animateTerminalPreloader();


    }, [onLoadComplete]);

    return (
        <div ref={loaderRef} className={`loader ${styles.heroRoot} w-full h-screen`}>
            {/* Loader */}
            <div ref={preloaderEl} className={`${styles.preloader} preloader`} id="preloader">
                <div className={`${styles.terminalPreloader} terminalPreloader`}>
                    <div className={`${styles.borderTop} borderTop`}>
                        <span>Dimensional Gateway</span>
                        <span>Traversal Initiated</span>
                    </div>

                    <div className={`${styles.terminaContainer} terminaContainer`}>
                        {/* First block of text - before progress bar */}
                        <div ref={(tl) => terminalLines.current[0] = tl} className={`${styles.terminalLine} terminalLine`} style={{ top: "0px" }}>
                            <span ref={(tls) => terminalLinesSpans.current[0] = tls} className={`${styles.faded} faded`} data-scramble="true">Dimensional Coordinates: Alpha/Omega/Prime</span>
                            <span ref={(tls) => terminalLinesSpans.current[1] = tls} className={`${styles.highlight} highlight`} data-scramble="true">Coordinates Locked</span>
                        </div>

                        <div ref={(tl) => terminalLines.current[1] = tl} className={`${styles.terminalLine} terminalLine`} style={{ top: "40px" }}>
                            <span ref={(tls) => terminalLinesSpans.current[2] = tls} className={`${styles.faded} faded`} data-scramble="true">Initiate Quantum Calibration</span>
                            <span ref={(tls) => terminalLinesSpans.current[3] = tls} className={`${styles.highlight} highlight`} data-scramble="true">Singularity Detected</span>
                        </div>

                        <div ref={(tl) => terminalLines.current[2] = tl} className={`${styles.terminalLine} terminalLine`} style={{ top: "80px" }}>
                            <span ref={(tls) => terminalLinesSpans.current[4] = tls} className={`${styles.highlight} highlight`} data-scramble="true">Beginning Tesseract Unfolding</span>
                        </div>

                        <div ref={(tl) => terminalLines.current[3] = tl} className={`${styles.terminalLine} terminalLine`} style={{ top: "120px" }}>
                            <span ref={(tls) => terminalLinesSpans.current[5] = tls} className={`${styles.highlight} highlight`} data-scramble="true">Hyperdimensional Matrices Aligned</span>
                        </div>

                        {/* Progress bar with additional text */}
                        <div className={`${styles.progressLine} progressLine`} style={{ top: "180px" }}>
                            <span className={`${styles.progressLabel} progressLabel`}>Traversing</span>
                            <div className={`${styles.progressContainer} progressContainer`}>
                                <div ref={progressBarRef} className={`${styles.progressBar} progressBar`} id="progressBar"></div>
                            </div>
                            <span className={styles.highlight} style={{ marginLeft: '10px' }} data-scramble="true">Dimensional Shift</span>
                        </div>

                        {/* Second block of text - after progress bar */}
                        <div ref={(tl) => terminalLines.current[4] = tl} className={`${styles.terminalLine} terminalLine`} style={{ top: "220px" }}>
                            <span ref={(tls) => terminalLinesSpans.current[6] = tls} className={`${styles.highlight} highlight`} data-scramble="true">Quantum Entanglement Stabilized</span>
                        </div>

                        <div ref={(tl) => terminalLines.current[5] = tl} className={`${styles.terminalLine} terminalLine`} style={{ top: "260px" }}>
                            <span ref={(tls) => terminalLinesSpans.current[7] = tls} className={`${styles.highlight} highlight`} data-scramble="true">Cosmic Strings Vibrating in Harmony</span>
                        </div>

                        <div ref={(tl) => terminalLines.current[6] = tl} className={`${styles.terminalLine} terminalLine`} style={{ top: "300px" }}>
                            <span ref={(tls) => terminalLinesSpans.current[8] = tls} className={`${styles.highlight} highlight`} data-scramble="true">Wormhole Aperture Expanding</span>
                        </div>

                        <div ref={(tl) => terminalLines.current[7] = tl} className={`${styles.terminalLine} terminalLine`} style={{ top: "340px" }}>
                            <span ref={(tls) => terminalLinesSpans.current[9] = tls} className={`${styles.highlight} highlight`} data-scramble="true">Dimensional Gateway Stabilizing</span>
                        </div>

                        <div ref={(tl) => terminalLines.current[8] = tl} className={`${styles.terminalLine} terminalLine`} style={{ top: "380px" }}>
                            <span ref={(tls) => terminalLinesSpans.current[10] = tls} className={`${styles.highlight} highlight`} data-scramble="true">Reality Parameters Reconfigured</span>
                        </div>

                        {/* Background faded lines */}
                        <div ref={(tl) => terminalLines.current[9] = tl} className={`${styles.terminalLine} terminalLine`} style={{ top: "20px" }}>
                            <span ref={(tls) => terminalLinesSpans.current[11] = tls} className={`${styles.faded} faded`} data-scramble="true">Quantum Fluctuation Nominal</span>
                        </div>

                        <div ref={(tl) => terminalLines.current[10] = tl} className={`${styles.terminalLine} terminalLine`} style={{ top: "60px" }}>
                            <span ref={(tls) => terminalLinesSpans.current[12] = tls} className={`${styles.faded} faded`} data-scramble="true">Initiating Spacetime Fold</span>
                        </div>

                        <div ref={(tl) => terminalLines.current[11] = tl} className={`${styles.terminalLine} terminalLine`} style={{ top: "100px" }}>
                            <span ref={(tls) => terminalLinesSpans.current[13] = tls} className={`${styles.faded} faded`} data-scramble="true">Scanning Parallel Realities</span>
                        </div>

                        <div ref={(tl) => terminalLines.current[12] = tl} className={`${styles.terminalLine} terminalLine`} style={{ top: "140px" }}>
                            <span ref={(tls) => terminalLinesSpans.current[14] = tls} className={`${styles.faded} faded`} data-scramble="true">Analyzing Dark Matter Density</span>
                        </div>

                        <div ref={(tl) => terminalLines.current[13] = tl} className={`${styles.terminalLine} terminalLine`} style={{ top: "240px" }}>
                            <span ref={(tls) => terminalLinesSpans.current[15] = tls} className={`${styles.faded} faded`} data-scramble="true">Processing Gravitational Waves</span>
                        </div>

                        <div ref={(tl) => terminalLines.current[14] = tl} className={`${styles.terminalLine} terminalLine`} style={{ top: "280px" }}>
                            <span ref={(tls) => terminalLinesSpans.current[16] = tls} className={`${styles.faded} faded`} data-scramble="true">Calibrating Temporal Displacement</span>
                        </div>

                        <div ref={(tl) => terminalLines.current[15] = tl} className={`${styles.terminalLine} terminalLine`} style={{ top: "320px" }}>
                            <span ref={(tls) => terminalLinesSpans.current[17] = tls} className={`${styles.faded} faded`} data-scramble="true">Evaluating Dimensional Resonance</span>
                        </div>

                        <div ref={(tl) => terminalLines.current[16] = tl} className={`${styles.terminalLine} terminalLine`} style={{ top: "360px" }}>
                            <span ref={(tls) => terminalLinesSpans.current[18] = tls} className={`${styles.faded} faded`} data-scramble="true">Stabilizing Quantum Foam</span>
                        </div>

                        {/* 底部 */}
                        <div className={`${styles.borderBottom} borderBottom`} style={{ top: "430px" }}>
                            <span>Traversal Sequence Complete</span>
                            <span>Dimensional Gateway Open</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Loader;
