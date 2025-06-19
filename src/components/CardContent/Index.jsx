import React from 'react'
import TitleCard from "../../modules/TitleCard"
import { gsap } from "gsap";
import { SplitText, ScrollTrigger, ScrollSmoother } from "gsap/all";
import { useState, useRef, useEffect } from 'react';
import styles from './Style.module.css'
import ScrollVelocity from '../../modules/ScrollVelocity';
import VolumeSlider from "../../modules/VolumeSlider"
import ThreadLine from '../../modules/ThreadLine';
import PersonMusic from '../../elemenets/PersonMusic/PersonMusic';
import MusicMan from '../../elemenets/MusicMan/MusicMan';

const CardContent = () => {

    // 初始化插件
    gsap.registerPlugin(ScrollTrigger);

    const titleCardsRef = useRef([]);
    const musicTextsRef = useRef([]);
    const containerRef = useRef(null);
    const listenHumanRef = useRef(null);
    const [activeIndex, setActiveIndex] = useState(null);
    const audiosRef = useRef([]);  // 创建对audio的引用

    const handlePlayPause = (index, play) => {
        if (index < 0 && index > 3)
            return;
        if (!play) {
            audiosRef.current[index].pause();  // 暂停音频
        } else {
            audiosRef.current[index].play();  // 播放音频
        }
    };

    const handleCardClick = (index) => {
        // 获取所有卡片元素
        const cards = titleCardsRef.current;
        const isSameCard = activeIndex === index;

        // 如果点击的是已激活的卡片，则恢复所有状态
        if (activeIndex != null) {
            if (isSameCard) {
                // 恢复所有卡片的显示
                cards.forEach((card, i) => {
                    if (i != index) {
                        gsap.to(card, {
                            scale: 1,
                            opacity: 1,
                            duration: 0.5,
                            ease: 'power2.out',
                            onComplete: () => {
                                // 可以在动画完成时调整层叠顺序
                                cards[index].style.zIndex = 10; // 让 z-index 恢复原值，或者设置其他值
                            }
                        });
                    }
                    else {
                        gsap.to(card, {
                            x: 0,
                            rotationY: -360,
                            scale: 1,
                            opacity: 1,
                            duration: 0.5,
                            ease: 'power2.out',
                            onComplete: () => {
                                // 可以在动画完成时调整层叠顺序
                                cards[index].style.zIndex = 10; // 让 z-index 恢复原值，或者设置其他值
                            }
                        });
                    }
                    gsap.to(musicTextsRef.current[i], {
                        y: 0,
                        x: 0,
                        opacity: 1,
                        duration: 0.3,
                        ease: 'power2.out',
                    });

                })
                gsap.to(listenHumanRef.current, {
                    x: 0,
                    duration: 0.3,
                    ease: 'power2.out'
                })
                handlePlayPause(index, false);
                setActiveIndex(null);
                return;
            }
            else {
                return;
            }
        }
        // 否则应用新动画
        setActiveIndex(index);

        // 隐藏未被点击的卡片
        cards.forEach((card, i) => {
            if (i !== index) {
                gsap.to(card, {
                    opacity: 0,
                    duration: 0.3,
                    ease: 'power2.out',
                    onComplete: () => {
                        // 可以在动画完成时调整层叠顺序
                        cards[index].style.zIndex = 0; // 让 z-index 恢复原值，或者设置其他值
                    }
                });
                gsap.to(musicTextsRef.current[i], {
                    opacity: 0,
                    duration: 0.3,
                    ease: 'power2.out',
                });
            }
        });

        gsap.to(cards[index], {
            rotationY: 360, // 旋转 360 度
            x: 360 * (1 - index),
            scale: 1.1,
            duration: 0.5, // 明确指定持续时间
            ease: 'power2.out',
            overwrite: true, // 确保覆盖其他动画
            force3D: true, // 保持 3D 加速
            onComplete: () => {
                // 可以在动画完成时调整层叠顺序
                cards[index].style.zIndex = 20; // 让 z-index 恢复原值，或者设置其他值
            }
        });

        gsap.to(musicTextsRef.current[index], {
            y: 50 * (1 - index),
            x: -500,
            scale: 1.5,
            duration: 0.3,
            ease: 'power2.out',
        });

        gsap.to(listenHumanRef.current, {
            x: 320,
            duration: 0.3,
            ease: 'power2.out'
        })
        handlePlayPause(index, true);

        gsap.from(listenHumanRef.current, { duration: 2, drawSVG: 0 }, 0.1); 

        const cx = motionValue(100)

        svgEffect(listenHumanRef.current, { cx })
    };

    useEffect(() => {
        // 确保所有卡片和容器已加载
        if (titleCardsRef.current.length === 0 || !containerRef.current) return;

        // 确保所有卡片都有有效尺寸（避免未渲染的组件）
        if (titleCardsRef.current.some(card => !card.offsetHeight)) return;

    }, [titleCardsRef.current, containerRef.current, audiosRef.current]);

    return (
        <div ref={containerRef} className='card min-h-[150vh] relative w-full' id="card">

            <div className="containerHeader w-full">
                <div style={{ width: '100%', height: '400px', position: 'relative', background: 'black' }}>
                    <ThreadLine
                        amplitude={1.9}
                        distance={0.2}
                        enableMouseInteraction={true}
                    />
                </div>
            </div>

            <div ref={listenHumanRef} className='absolute top-[64vh] -z-10'>
                <MusicMan />
            </div>


            <div className={`titleCardContainer ${styles.titleCardContainer} absolute w-full h-screen flex flex-row justify-center items-center space-x-[2vw] mt-[20vh] z-10`}>
                <div className={`titleCard relative z-10 ${styles.titleCard}`} ref={(el) => (titleCardsRef.current[0] = el)} onClick={() => handleCardClick(0)}>
                    <TitleCard
                        imageSrc="/img/BG2.jpg"
                        altText="Kendrick Lamar - GNX Album Cover"
                        captionText="Kendrick Lamar - GNX"
                        containerHeight="400px"
                        containerWidth="320px"
                        imageHeight="400px"
                        imageWidth="320px"
                        rotateAmplitude={6}
                        scaleOnHover={1.2}
                        showMobileWarning={false}
                        showTooltip={false}
                        displayOverlayContent={true}
                        overlayContent={
                            <p className="tilted-card-demo-text">
                                Kendrick Lamar - GNX
                            </p>
                        }
                    />
                </div>
                <div className={`titleCard z-10 ${styles.titleCard}`} ref={(el) => (titleCardsRef.current[1] = el)} onClick={() => handleCardClick(1)}>
                    <TitleCard
                        imageSrc="/img/IMG_1519.JPG"
                        altText="Jeremy Zucker/Chelsea Cutler - brent"
                        captionText="Jeremy Zucker/Chelsea Cutler - brent"
                        containerHeight="400px"
                        containerWidth="320px"
                        imageHeight="400px"
                        imageWidth="320px"
                        rotateAmplitude={6}
                        scaleOnHover={1.2}
                        showMobileWarning={false}
                        showTooltip={false}
                        displayOverlayContent={true}
                        overlayContent={
                            <p className="tilted-card-caption">
                                Jeremy / Chelsea - brent
                            </p>
                        }
                    />
                </div>
                <div className={`titleCard z-10 ${styles.titleCard}`} ref={(el) => (titleCardsRef.current[2] = el)} onClick={() => handleCardClick(2)}>
                    <TitleCard
                        imageSrc="/img/BG1.jpg"
                        altText="Danel Caesar - NEVER ENOUGH"
                        captionText="Danel Caesar - NEVER ENOUGH"
                        containerHeight="400px"
                        containerWidth="320px"
                        imageHeight="400px"
                        imageWidth="320px"
                        rotateAmplitude={6}
                        scaleOnHover={1.2}
                        showMobileWarning={false}
                        showTooltip={false}
                        displayOverlayContent={true}
                        overlayContent={
                            <p className="tilted-card-demo-text">
                                Danel Caesar - Always
                            </p>
                        }
                    />
                </div>

            </div>

            <div className="text-base absolute flex flex-col font-mono text-black ml-[85vw] mt-[65vh] space-y-6 z-0">
                <div ref={(el) => (musicTextsRef.current[0] = el)} className="flex flex-row gap-10">
                    <p>01</p>
                    <p>GOLDEN HOUR - J</p>
                </div>
                <div ref={(el) => (musicTextsRef.current[1] = el)} className="flex flex-row gap-10">
                    <p>02</p>
                    <p>FIJIBLUE - B</p>
                </div>
                <div ref={(el) => (musicTextsRef.current[2] = el)} className="flex flex-row gap-10">
                    <p>03</p>
                    <p>WHATIF - O</p>
                </div>
            </div>

            <audio ref={(el) => (audiosRef.current[0] = el)} src="/music/goldenHour.flac" />
            <audio ref={(el) => (audiosRef.current[1] = el)} src="/music/whatif.flac" />
            <audio ref={(el) => (audiosRef.current[2] = el)} src="/music/FijiBlue.flac" />

            <div className="w-full flex flex-col items-center"> {/* 改为 column 布局 */}
                <div className="w-full flex justify-start items-center text-xl font-medium gap-[9vw] mt-[10vh]">
                    <div className='CardContentLeft ml-[4vw]'>
                        <div className="absolute top-[35vh] left-[3vw] flex flex-row items-center justify-between w-full gap-[5vw]">
                            <div className="flex flex-row gap-[2vw]">
                                <svg width="3%" height="3%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" clipRule="evenodd" d="M10.9965 4.00001C11.4368 3.99846 11.8263 4.28508 11.9558 4.70591L15.1231 14.9997L18.0715 7.62861C18.1964 7.31651 18.4697 7.08801 18.7989 7.02042C19.1282 6.95284 19.4694 7.0552 19.7071 7.29289L22.7071 10.2929C23.0976 10.6834 23.0976 11.3166 22.7071 11.7071C22.3166 12.0976 21.6834 12.0976 21.2929 11.7071L19.3652 9.77946L15.9285 18.3714C15.771 18.765 15.3826 19.0165 14.959 18.9992C14.5355 18.9818 14.1689 18.6992 14.0442 18.2941L11.0121 8.43973L8.95782 15.2873C8.84938 15.6488 8.54667 15.9185 8.17511 15.9845C7.80355 16.0506 7.42643 15.9019 7.2 15.6L5 12.6667L2.8 15.6C2.46863 16.0418 1.84183 16.1314 1.4 15.8C0.95817 15.4686 0.868627 14.8418 1.2 14.4L4.2 10.4C4.38885 10.1482 4.68524 10 5 10C5.31475 10 5.61114 10.1482 5.8 10.4L7.6114 12.8152L10.0422 4.71265C10.1687 4.29092 10.5562 4.00156 10.9965 4.00001Z" fill="#000000" className="svgElem1"></path>
                                </svg>
                                <svg width="3%" height="3%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" clipRule="evenodd" d="M10.9965 4.00001C11.4368 3.99846 11.8263 4.28508 11.9558 4.70591L15.1231 14.9997L18.0715 7.62861C18.1964 7.31651 18.4697 7.08801 18.7989 7.02042C19.1282 6.95284 19.4694 7.0552 19.7071 7.29289L22.7071 10.2929C23.0976 10.6834 23.0976 11.3166 22.7071 11.7071C22.3166 12.0976 21.6834 12.0976 21.2929 11.7071L19.3652 9.77946L15.9285 18.3714C15.771 18.765 15.3826 19.0165 14.959 18.9992C14.5355 18.9818 14.1689 18.6992 14.0442 18.2941L11.0121 8.43973L8.95782 15.2873C8.84938 15.6488 8.54667 15.9185 8.17511 15.9845C7.80355 16.0506 7.42643 15.9019 7.2 15.6L5 12.6667L2.8 15.6C2.46863 16.0418 1.84183 16.1314 1.4 15.8C0.95817 15.4686 0.868627 14.8418 1.2 14.4L4.2 10.4C4.38885 10.1482 4.68524 10 5 10C5.31475 10 5.61114 10.1482 5.8 10.4L7.6114 12.8152L10.0422 4.71265C10.1687 4.29092 10.5562 4.00156 10.9965 4.00001Z" fill="#000000" className="svgElem1"></path>
                                </svg>
                                <svg width="3%" height="3%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" clipRule="evenodd" d="M10.9965 4.00001C11.4368 3.99846 11.8263 4.28508 11.9558 4.70591L15.1231 14.9997L18.0715 7.62861C18.1964 7.31651 18.4697 7.08801 18.7989 7.02042C19.1282 6.95284 19.4694 7.0552 19.7071 7.29289L22.7071 10.2929C23.0976 10.6834 23.0976 11.3166 22.7071 11.7071C22.3166 12.0976 21.6834 12.0976 21.2929 11.7071L19.3652 9.77946L15.9285 18.3714C15.771 18.765 15.3826 19.0165 14.959 18.9992C14.5355 18.9818 14.1689 18.6992 14.0442 18.2941L11.0121 8.43973L8.95782 15.2873C8.84938 15.6488 8.54667 15.9185 8.17511 15.9845C7.80355 16.0506 7.42643 15.9019 7.2 15.6L5 12.6667L2.8 15.6C2.46863 16.0418 1.84183 16.1314 1.4 15.8C0.95817 15.4686 0.868627 14.8418 1.2 14.4L4.2 10.4C4.38885 10.1482 4.68524 10 5 10C5.31475 10 5.61114 10.1482 5.8 10.4L7.6114 12.8152L10.0422 4.71265C10.1687 4.29092 10.5562 4.00156 10.9965 4.00001Z" fill="#000000" className="svgElem1"></path>
                                </svg>
                            </div>
                            <p className="absolute mx-[20vw] text-sm">
                                2022brave
                            </p>
                            <div className="flex flex-row gap-[10vw] ml-[8vw]">
                                <svg width="2%" height="3%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" clipRule="evenodd" d="M10.9965 4.00001C11.4368 3.99846 11.8263 4.28508 11.9558 4.70591L15.1231 14.9997L18.0715 7.62861C18.1964 7.31651 18.4697 7.08801 18.7989 7.02042C19.1282 6.95284 19.4694 7.0552 19.7071 7.29289L22.7071 10.2929C23.0976 10.6834 23.0976 11.3166 22.7071 11.7071C22.3166 12.0976 21.6834 12.0976 21.2929 11.7071L19.3652 9.77946L15.9285 18.3714C15.771 18.765 15.3826 19.0165 14.959 18.9992C14.5355 18.9818 14.1689 18.6992 14.0442 18.2941L11.0121 8.43973L8.95782 15.2873C8.84938 15.6488 8.54667 15.9185 8.17511 15.9845C7.80355 16.0506 7.42643 15.9019 7.2 15.6L5 12.6667L2.8 15.6C2.46863 16.0418 1.84183 16.1314 1.4 15.8C0.95817 15.4686 0.868627 14.8418 1.2 14.4L4.2 10.4C4.38885 10.1482 4.68524 10 5 10C5.31475 10 5.61114 10.1482 5.8 10.4L7.6114 12.8152L10.0422 4.71265C10.1687 4.29092 10.5562 4.00156 10.9965 4.00001Z" fill="#000000" className="svgElem1"></path>
                                </svg>
                                <svg width="2%" height="3%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" clipRule="evenodd" d="M10.9965 4.00001C11.4368 3.99846 11.8263 4.28508 11.9558 4.70591L15.1231 14.9997L18.0715 7.62861C18.1964 7.31651 18.4697 7.08801 18.7989 7.02042C19.1282 6.95284 19.4694 7.0552 19.7071 7.29289L22.7071 10.2929C23.0976 10.6834 23.0976 11.3166 22.7071 11.7071C22.3166 12.0976 21.6834 12.0976 21.2929 11.7071L19.3652 9.77946L15.9285 18.3714C15.771 18.765 15.3826 19.0165 14.959 18.9992C14.5355 18.9818 14.1689 18.6992 14.0442 18.2941L11.0121 8.43973L8.95782 15.2873C8.84938 15.6488 8.54667 15.9185 8.17511 15.9845C7.80355 16.0506 7.42643 15.9019 7.2 15.6L5 12.6667L2.8 15.6C2.46863 16.0418 1.84183 16.1314 1.4 15.8C0.95817 15.4686 0.868627 14.8418 1.2 14.4L4.2 10.4C4.38885 10.1482 4.68524 10 5 10C5.31475 10 5.61114 10.1482 5.8 10.4L7.6114 12.8152L10.0422 4.71265C10.1687 4.29092 10.5562 4.00156 10.9965 4.00001Z" fill="#000000" className="svgElem1"></path>
                                </svg>
                                <svg width="2%" height="3%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" clipRule="evenodd" d="M10.9965 4.00001C11.4368 3.99846 11.8263 4.28508 11.9558 4.70591L15.1231 14.9997L18.0715 7.62861C18.1964 7.31651 18.4697 7.08801 18.7989 7.02042C19.1282 6.95284 19.4694 7.0552 19.7071 7.29289L22.7071 10.2929C23.0976 10.6834 23.0976 11.3166 22.7071 11.7071C22.3166 12.0976 21.6834 12.0976 21.2929 11.7071L19.3652 9.77946L15.9285 18.3714C15.771 18.765 15.3826 19.0165 14.959 18.9992C14.5355 18.9818 14.1689 18.6992 14.0442 18.2941L11.0121 8.43973L8.95782 15.2873C8.84938 15.6488 8.54667 15.9185 8.17511 15.9845C7.80355 16.0506 7.42643 15.9019 7.2 15.6L5 12.6667L2.8 15.6C2.46863 16.0418 1.84183 16.1314 1.4 15.8C0.95817 15.4686 0.868627 14.8418 1.2 14.4L4.2 10.4C4.38885 10.1482 4.68524 10 5 10C5.31475 10 5.61114 10.1482 5.8 10.4L7.6114 12.8152L10.0422 4.71265C10.1687 4.29092 10.5562 4.00156 10.9965 4.00001Z" fill="#000000" className="svgElem1"></path>
                                </svg>
                            </div>
                            <p className="relative text-sm ">
                                2025love
                            </p>
                            <div className="flex flex-row gap-[2vw] relative right-[-8vw]">
                                <svg width="3%" height="3%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" clipRule="evenodd" d="M10.9965 4.00001C11.4368 3.99846 11.8263 4.28508 11.9558 4.70591L15.1231 14.9997L18.0715 7.62861C18.1964 7.31651 18.4697 7.08801 18.7989 7.02042C19.1282 6.95284 19.4694 7.0552 19.7071 7.29289L22.7071 10.2929C23.0976 10.6834 23.0976 11.3166 22.7071 11.7071C22.3166 12.0976 21.6834 12.0976 21.2929 11.7071L19.3652 9.77946L15.9285 18.3714C15.771 18.765 15.3826 19.0165 14.959 18.9992C14.5355 18.9818 14.1689 18.6992 14.0442 18.2941L11.0121 8.43973L8.95782 15.2873C8.84938 15.6488 8.54667 15.9185 8.17511 15.9845C7.80355 16.0506 7.42643 15.9019 7.2 15.6L5 12.6667L2.8 15.6C2.46863 16.0418 1.84183 16.1314 1.4 15.8C0.95817 15.4686 0.868627 14.8418 1.2 14.4L4.2 10.4C4.38885 10.1482 4.68524 10 5 10C5.31475 10 5.61114 10.1482 5.8 10.4L7.6114 12.8152L10.0422 4.71265C10.1687 4.29092 10.5562 4.00156 10.9965 4.00001Z" fill="#000000" className="svgElem1"></path>
                                </svg>
                                <svg width="3%" height="3%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" clipRule="evenodd" d="M10.9965 4.00001C11.4368 3.99846 11.8263 4.28508 11.9558 4.70591L15.1231 14.9997L18.0715 7.62861C18.1964 7.31651 18.4697 7.08801 18.7989 7.02042C19.1282 6.95284 19.4694 7.0552 19.7071 7.29289L22.7071 10.2929C23.0976 10.6834 23.0976 11.3166 22.7071 11.7071C22.3166 12.0976 21.6834 12.0976 21.2929 11.7071L19.3652 9.77946L15.9285 18.3714C15.771 18.765 15.3826 19.0165 14.959 18.9992C14.5355 18.9818 14.1689 18.6992 14.0442 18.2941L11.0121 8.43973L8.95782 15.2873C8.84938 15.6488 8.54667 15.9185 8.17511 15.9845C7.80355 16.0506 7.42643 15.9019 7.2 15.6L5 12.6667L2.8 15.6C2.46863 16.0418 1.84183 16.1314 1.4 15.8C0.95817 15.4686 0.868627 14.8418 1.2 14.4L4.2 10.4C4.38885 10.1482 4.68524 10 5 10C5.31475 10 5.61114 10.1482 5.8 10.4L7.6114 12.8152L10.0422 4.71265C10.1687 4.29092 10.5562 4.00156 10.9965 4.00001Z" fill="#000000" className="svgElem1"></path>
                                </svg>
                                <svg width="3%" height="3%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" clipRule="evenodd" d="M10.9965 4.00001C11.4368 3.99846 11.8263 4.28508 11.9558 4.70591L15.1231 14.9997L18.0715 7.62861C18.1964 7.31651 18.4697 7.08801 18.7989 7.02042C19.1282 6.95284 19.4694 7.0552 19.7071 7.29289L22.7071 10.2929C23.0976 10.6834 23.0976 11.3166 22.7071 11.7071C22.3166 12.0976 21.6834 12.0976 21.2929 11.7071L19.3652 9.77946L15.9285 18.3714C15.771 18.765 15.3826 19.0165 14.959 18.9992C14.5355 18.9818 14.1689 18.6992 14.0442 18.2941L11.0121 8.43973L8.95782 15.2873C8.84938 15.6488 8.54667 15.9185 8.17511 15.9845C7.80355 16.0506 7.42643 15.9019 7.2 15.6L5 12.6667L2.8 15.6C2.46863 16.0418 1.84183 16.1314 1.4 15.8C0.95817 15.4686 0.868627 14.8418 1.2 14.4L4.2 10.4C4.38885 10.1482 4.68524 10 5 10C5.31475 10 5.61114 10.1482 5.8 10.4L7.6114 12.8152L10.0422 4.71265C10.1687 4.29092 10.5562 4.00156 10.9965 4.00001Z" fill="#000000" className="svgElem1"></path>
                                </svg>
                            </div>
                        </div>
                    </div>
                    <div className='CardContentMid flex flex-col justify-start items-center text-center gap-[7vh] ml-[12vw] mt-[8vh]'>
                        <div className='flex flex-col justify-start items-center text-center gap-[12vh]'>
                            <p className='text-[10rem] font-bold uppercase'>Click cards</p>
                            <p className='text-[10rem] font-bold uppercase'>to play music</p>
                        </div>
                        <p>Please check your volume first.</p>
                        <div className='mt-[-5vh]'>
                            <VolumeSlider
                                leftIcon={<img src="/img/volume1.svg" alt='volume1' width={60} />}
                                rightIcon={<img src="/img/volume2.svg" alt='volume2' width={60} />}
                                startingValue={0}
                                defaultValue={32}
                                maxValue={100}
                                isStepped
                                stepSize={2}
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className='w-full absolute bottom-[1vh]'>
                <ScrollVelocity
                    texts={['Brave 22', '25 Love']}
                    velocity={200}
                    className="custom-scroll-text"
                />
            </div>
        </div>
    )
}

export default CardContent
