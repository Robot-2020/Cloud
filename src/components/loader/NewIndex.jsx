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
    const contentEl = useRef(null);
    const preloaderEl = useRef(null);
    const terminalLines = useRef([]);
    const terminalLinesSpans = useRef([]);
    const progressBarRef = useRef(null);
    const menuBtnRef = useRef(null);
    const closeBtnRef = useRef(null);
    const overlayRef = useRef(null);
    const featuredImageRef = useRef(null);
    const scrollTextRef = useRef(null);
    const primaryNavRef = useRef(null);
    const brandLogoRef = useRef([]);
    const overlayBrandRef = useRef([]);
    const navLinksRef = useRef([]);
    const footerItemsRef = useRef([]);
    const titleLinesRef = useRef([]);
    const [isAnimating, setIsAnimating] = useState(false);
    const heroRef = useRef([]);

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
                    // Once preloader is done, reveal the content
                    revealContent();
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
                        duration: 0.3,
                    },
                    timePoint
                );

                const scrambleSpans = line.querySelectorAll('span[data-scramble="true"]');
                scrambleSpans.forEach((span) => {
                    const originalText = span.getAttribute("data-original-text") || span.textContent;
                    textRevealTl.to(
                        span,
                        {
                            duration: 0.8,
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
                    const numToGlitch = 3 + Math.floor(Math.random() * 3);
                    for (let j = 0; j < numToGlitch; j++) {
                        const randomIndex = Math.floor(Math.random() * allScrambleSpans.length);
                        randomSpans.push(allScrambleSpans[randomIndex]);
                    }

                    // 对这些随机选择的元素应用故障效果。
                    randomSpans.forEach((span) => {
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
                            Math.random() * 0.5
                        )
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
                const progress = Math.min(99, tl.progress() * 100);
                updateProgress(progress);
            })

            // 在动画结束前 0.5 秒强制更新进度条为 100%。
            tl.call(() => {
                updateProgress(100);
            },
                [],
                totalDuration - 0.5
            )
            return tl;
        }

        // 显示内容的函数
        function revealContent() {
            // 创建内容显示的动画时间线
            const revealTl = gsap.timeline();

            revealTl.to(heroRef.current, {
                opacity: 1,
                duration: 0.5,
            })

            revealTl.to(preloaderEl.current, {
                clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
                duration: 0.64,
                ease: slideEase,
                onComplete: () => {
                    // Remove preloader after animation
                    preloaderEl.current.style.display = "none";
                }
            });

            // 动画标题行
            revealTl.to(titleLinesRef.current, {
                y: "0%",
                opacity: 1,
                duration: 0.64,
                stagger: 0.32,
                ease: slideEase
            }, "-=0.2");

            revealTl.to(scrollTextRef.current, {
                y: "0%",
                opacity: 1,
                duration: 0.16,
                stagger: 0.1,
                ease: slideEase
            }, "-=0.1");

            // Show the content
            revealTl.to(contentEl.current, {
                opacity: 1,
                visibility: "visible",
                duration: 0.3
            },
                "=0.1"
            );

            // Menu的菜单字体分割动画
            revealTl.call(() => { // 在内容可见后初始化 SplitText
                // Initialize SplitText on nav links
                navLinksRef.current.forEach((link) => {
                    // Create new SplitText instance with new features
                    const splitLink = new SplitText(link, {
                        type: "chars",
                        charsClass: "char",
                        position: "relative",
                        linesClass: "line",
                        deepSlice: true,
                        propIndex: true
                    });

                    // Store the SplitText instance on the element
                    link._splitText = splitLink;

                    // Setup hover effect
                    link.addEventListener("mouseenter", () => {
                        gsap.to(splitLink.chars, {
                            x: (i) => `${0.5 + i * 0.1}em`,
                            duration: 0.64,
                            ease: slideEase,
                            stagger: {
                                each: 0.015,
                                from: "start"
                            }
                        });
                    });

                    link.addEventListener("mouseleave", () => {
                        gsap.to(splitLink.chars, {
                            x: 0,
                            duration: 0.64,
                            ease: slideEase,
                            stagger: {
                                each: 0.01,
                                from: "end"
                            }
                        });
                    });
                });
            });

            document.body.classList.remove('body-no-scroll');
        }


        function initializeMenu() {

            // 初始化菜单栏不可见
            gsap.set(overlayRef.current, {
                clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
                pointerEvents: "none"
            });

            gsap.set(featuredImageRef.current, {
                clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)"
            });

            gsap.set([overlayBrandRef.current, closeBtnRef.current], {
                y: "100%"
            });

            gsap.set(navLinksRef.current, {
                y: "100%"
            });

            gsap.set(footerItemsRef.current, {
                y: "100%"
            });

            // Open menu function
            const openMenu = () => {
                if (isAnimating) return;
                setIsAnimating(true);;

                const tl = gsap.timeline({
                    onComplete: () => (setIsAnimating(false))
                });

                // Hide the title lines with staggered animation
                tl.to(titleLinesRef.current, {
                    y: "100%",
                    duration: 0.32,
                    stagger: 0.1,
                    ease: slideEase
                });

                tl.to(scrollTextRef.current, {
                    opacity: 0,  // 将透明度设置为 0，元素将消失
                    duration: 0.12, // 动画时长（根据需要调整）
                    ease: "power2.inOut" // 可以自定义动画的缓动效果
                });

                tl.to(
                    [brandLogoRef.current, menuBtnRef.current],
                    {
                        y: "-100%",
                        duration: 0.32,
                        stagger: 0.2,
                        ease: slideEase,
                        onComplete: () => {
                            primaryNavRef.current.style.pointerEvents = "none";
                            gsap.set([brandLogoRef.current, menuBtnRef.current], {
                                y: "100%"
                            });
                        }
                    },
                );

                tl.to(
                    overlayRef.current,
                    {
                        clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
                        duration: 0.64,
                        ease: slideEase,
                        onStart: () => {
                            overlayRef.current.style.pointerEvents = "all";
                            closeBtnRef.current.style.pointerEvents = "all"; // 确保关闭按钮可交互
                        }
                    },
                    "-=0.4"
                );

                tl.fromTo(
                    featuredImageRef.current,
                    {
                        clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)"
                    },
                    {
                        clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
                        duration: 0.48,
                        ease: slideEase
                    },
                );

                tl.to(
                    [overlayBrandRef.current, closeBtnRef.current],
                    {
                        y: "0%",
                        duration: 0.64,
                        stagger: 0.2,
                        ease: slideEase
                    },
                    "<"
                );

                tl.to(
                    navLinksRef.current,
                    {
                        y: "0%",
                        duration: 0.32,
                        stagger: 0.2,
                        ease: slideEase
                    },
                    "-=0.32"
                );

                tl.to(
                    footerItemsRef.current,
                    {
                        y: "0%",
                        opacity: 1,
                        duration: 0.64,
                        stagger: 0.16,
                        ease: slideEase
                    },
                    "=0.16"
                );
            };

            // Close menu function
            const closeMenu = () => {
                if (isAnimating) return;
                setIsAnimating(true);

                const tl = gsap.timeline({
                    onComplete: () => {
                        setIsAnimating(false);
                    }
                });

                tl.to([overlayBrandRef.current, closeBtnRef.current], {
                    y: "-100%",
                    duration: 0.32,
                    stagger: 0.1,
                    ease: slideEase
                });

                tl.to(
                    navLinksRef.current,
                    {
                        y: "-100%", // 将元素移动到上面，超出视口
                        duration: 0.24,
                        stagger: 0.1, // 确保每个链接有一个延迟执行的顺序
                        ease: slideEase,
                    },
                    "<"
                );

                tl.to(
                    footerItemsRef.current,
                    {
                        y: "-100%",
                        opacity: 0,
                        duration: 0.32,
                        stagger: 0.1,
                        ease: slideEase
                    },
                    "<"
                );

                tl.to(
                    featuredImageRef.current,
                    {
                        clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
                        duration: 0.64,
                        ease: slideEase
                    },
                    "-=0.64"
                );

                tl.to(
                    overlayRef.current,
                    {
                        clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
                        duration: 0.64,
                        ease: slideEase,
                        onComplete: () => {
                            overlayRef.current.style.pointerEvents = "none";
                            gsap.set(overlayRef.current, {
                                clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)"
                            });
                            gsap.set(featuredImageRef.current, {
                                clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)"
                            });
                            gsap.set([overlayBrandRef.current, closeBtnRef.current], {
                                y: "100%"
                            });
                            gsap.set(navLinksRef.current, {
                                y: "100%"
                            });
                            gsap.set(footerItemsRef.current, {
                                y: "100%"
                            });
                        }
                    },
                    "-=0.2"
                );

                tl.to(menuBtnRef.current,
                    {
                        y: "0%",
                        duration: 0.32,
                        stagger: 0.1,
                        ease: slideEase,
                        onStart: () => {
                            primaryNavRef.current.style.pointerEvents = "all";
                        }
                    },
                    "-=0.3"
                );
            };

            // Set up event listeners
            menuBtnRef.current.addEventListener("click", openMenu);
            closeBtnRef.current.addEventListener("click", closeMenu);

            navLinksRef.current.forEach((link) => {
                link.addEventListener("click", (e) => {
                    e.preventDefault();
                    closeMenu();
                });
            });
        }
        // Start terminal preloader animation
        animateTerminalPreloader();

        // Initialize menu functionality
        initializeMenu();

    }, [onLoadComplete]);

    return (
        <div className={`${styles.heroRoot} w-full h-screen`}>
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

            {/* Menu */}
            <div ref={contentEl} className={`${styles.contentContainer} contentContainer`} id="content">
                <header className={`${styles.siteHeader} siteHeader`}>
                    <nav className={`${styles.primaryNav} primaryNav`}>
                        <div ref={primaryNavRef} className={`${styles.grid} grid`}>
                            <div className={`${styles.brand} brand`}>
                                <div className={`${styles.textReveal} textReveal`}>
                                    <a ref={brandLogoRef} className='brandLogo'>Cloud</a>
                                </div>
                            </div>
                            <div className={`${styles.menuToggle} menuToggle`}>
                                <div className={`${styles.textReveal} textReveal text-white z-50`}>
                                    <p ref={menuBtnRef} id="menuBtn">Menu</p>
                                </div>
                            </div>
                        </div>
                    </nav>
                    <div ref={overlayRef} className={`${styles.overlay} overlay`} id="overlay">
                        <div ref={featuredImageRef} className={`${styles.featuredImage} featuredImage`} id="featuredImage"></div>
                        <div className={`${styles.overlayHeader} overlayHeader`}>
                            <div className={`${styles.grid} grid`}>
                                <div className={`${styles.overlayBrand} overlayBrand`}>
                                    <div className={`${styles.textReveal} textReveal`}>
                                        <a ref={overlayBrandRef} href="hero">Cloud</a>
                                    </div>
                                </div>
                                <div className={`${styles.closeToggle} closeToggle`}>
                                    <div className={`${styles.textReveal} textReveal`}>
                                        <p ref={closeBtnRef} className={`closeBtn`} id="closeBtn">Close</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <nav className={`${styles.navMenu} navMenu`}>
                            <div className={`${styles.navMmenuInner} navMmenuInner`}>
                                <div className={`${styles.navItem} navItem`}>
                                    <div className={`${styles.textReveal} textReveal`}>
                                        <a href="#" ref={(el) => navLinksRef.current[0] = el} className={`${styles.navLink} navLink shiftEffect`}> Blog</a>
                                    </div>
                                </div>
                                <div className={`${styles.navItem} navItem`}>
                                    <div className={`${styles.textReveal} textReveal`}>
                                        <a href="#" ref={(el) => navLinksRef.current[1] = el} className={`${styles.navLink} navLink shiftEffect`}> Experience</a>
                                    </div>
                                </div>
                                <div className={`${styles.navItem} navItem`}>
                                    <div className={`${styles.textReveal} textReveal`}>
                                        <a href="#" ref={(el) => navLinksRef.current[2] = el} className={`${styles.navLink} navLink shiftEffect`}> Tech Skill</a>
                                    </div>
                                </div>
                                <div className={`${styles.navItem} navItem`}>
                                    <div className={`${styles.textReveal} textReveal`}>
                                        <a href="#" ref={(el) => navLinksRef.current[3] = el} className={`${styles.navLink} navLink shiftEffect`}> Contact Me</a>
                                    </div>
                                </div>
                            </div>
                        </nav>
                        <footer className={`${styles.overlayFooter} overlayFooter`}>
                            <div className={`${styles.grid} grid`}>
                                <div className={`${styles.copyright} copyright`}>
                                    <div className={`${styles.textReveal} textReveal`}>
                                        <p ref={(nl) => footerItemsRef.current[0] = nl}>&copy; Cloud 2022 - 2025</p>
                                    </div>
                                </div>
                                <div className={`${styles.socialLinks} socialLinks`}>
                                    <div className={`${styles.textReveal} textReveal`}>
                                        <a href="#" ref={(nl) => footerItemsRef.current[1] = nl}>VSCO</a>
                                    </div>
                                    <div className={`${styles.textReveal} textReveal`}>
                                        <a href="#" ref={(nl) => footerItemsRef.current[2] = nl}>Instagram</a>
                                    </div>
                                    <div className={`${styles.textReveal} textReveal`}>
                                        <a href="#" ref={(nl) => footerItemsRef.current[3] = nl}>X</a>
                                    </div>
                                </div>
                            </div>
                        </footer>
                    </div>
                </header>
            </div>
        </div>
    )
};

export default Loader;
