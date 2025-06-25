import React from 'react'
import TitleCard from "../../modules/TitleCard"
import { gsap } from "gsap";
import { SplitText, ScrollTrigger, ScrollSmoother } from "gsap/all";
import { useState, useRef, useEffect } from 'react';
import styles from './Style.module.css'
import ScrollVelocity from '../../modules/ScrollVelocity';
import VolumeSlider from "../../modules/VolumeSlider"
import ThreadLine from '../../modules/ThreadLine';
import MusicMan from '../../elemenets/MusicMan/MusicMan';
import FlipTitleCard from "../../elemenets/FlipTitleCard/FlipTitleCard";

const Music = () => {
    const StarIcon = ({ width = "3%", height = "3%" }) => (
        <svg
            width={width}
            height={height}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M10.9965 4.00001C11.4368 3.99846 11.8263 4.28508 11.9558 4.70591L15.1231 14.9997L18.0715 7.62861C18.1964 7.31651 18.4697 7.08801 18.7989 7.02042C19.1282 6.95284 19.4694 7.0552 19.7071 7.29289L22.7071 10.2929C23.0976 10.6834 23.0976 11.3166 22.7071 11.7071C22.3166 12.0976 21.6834 12.0976 21.2929 11.7071L19.3652 9.77946L15.9285 18.3714C15.771 18.765 15.3826 19.0165 14.959 18.9992C14.5355 18.9818 14.1689 18.6992 14.0442 18.2941L11.0121 8.43973L8.95782 15.2873C8.84938 15.6488 8.54667 15.9185 8.17511 15.9845C7.80355 16.0506 7.42643 15.9019 7.2 15.6L5 12.6667L2.8 15.6C2.46863 16.0418 1.84183 16.1314 1.4 15.8C0.95817 15.4686 0.868627 14.8418 1.2 14.4L4.2 10.4C4.38885 10.1482 4.68524 10 5 10C5.31475 10 5.61114 10.1482 5.8 10.4L7.6114 12.8152L10.0422 4.71265C10.1687 4.29092 10.5562 4.00156 10.9965 4.00001Z"
                fill="#000000"
                className="svgElem1"
            />
        </svg>
    );

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
                        scale: 1,
                        opacity: 1,
                        duration: 0.3,
                        ease: 'power2.out',
                    });

                })
                gsap.to(listenHumanRef.current, {
                    x: 0,
                    y: 0,
                    scale: 1,
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
            x: () => {
                const cardRect = cards[index].getBoundingClientRect();
                return (window.innerWidth / 2) - (cardRect.left + cardRect.width / 2);
            },
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
            x: -250,
            scale: 1.2,
            duration: 0.3,
            ease: 'power2.out',
        });

        gsap.to(listenHumanRef.current, {
            scale: 0.9,
            x: () => {
                const cardRect = listenHumanRef.current.getBoundingClientRect();
                return ((window.innerWidth / 2) - (cardRect.left + cardRect.width / 2)) * 0.3;
            },
            y: 25,
            duration: 0.3,
            ease: 'power2.out'
        })
        handlePlayPause(index, true);
    };

    useEffect(() => {
        // 确保所有卡片和容器已加载
        if (titleCardsRef.current.length === 0 || !containerRef.current) return;

        // 确保所有卡片都有有效尺寸（避免未渲染的组件）
        if (titleCardsRef.current.some(card => !card.offsetHeight)) return;

    }, [titleCardsRef.current, containerRef.current, audiosRef.current]);

    return (
        <div ref={containerRef} className='card min-h-[160vh] relative w-full' id="card">

            <div className="containerHeader w-full">
                <div style={{
                    width: '100%', height: '400px', position: 'relative', background: 'black', isolation: 'isolate',
                    zIndex: 0,
                    transform: 'translateZ(0)',
                }}>
                    <ThreadLine
                        amplitude={1.9}
                        distance={0.2}
                        enableMouseInteraction={true}
                    />
                </div>
            </div>

            <div ref={listenHumanRef} className='absolute h-screen flex justify-center mt-[12.5vh] '>
                <MusicMan />
            </div>

            <div className={`titleCardContainer ${styles.titleCardContainer} absolute w-full h-screen mt-[20vh] flex flex-row justify-center space-x-[2vw] items-center`}>
                <div className={`titleCard  z-10 ${styles.titleCard}`} ref={(el) => (titleCardsRef.current[0] = el)} onClick={() => handleCardClick(0)}>
                    <FlipTitleCard
                        imageSrc="https://diveintodream.oss-cn-shenzhen.aliyuncs.com/img/IMG_1522.JPG"
                        backImgSrc="https://diveintodream.oss-cn-shenzhen.aliyuncs.com/img/IMG_1522.JPG"
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
                            <p className="tilted-card-caption ">
                                NEVER ENOUGH - Daniel Caesar
                            </p>
                        }
                        backTitle="Daniel Caesar"
                        backContent="Daniel Caesar is a Canadian R&B singer, songwriter, and producer known for his soulful voice and emotive lyrics. "
                    />
                </div>

                <div className={`titleCard z-10 ${styles.titleCard}`} ref={(el) => (titleCardsRef.current[1] = el)} onClick={() => handleCardClick(1)}>
                    <FlipTitleCard ref={(tc) => titleCardsRef.current[1] = tc}
                        imageSrc="https://diveintodream.oss-cn-shenzhen.aliyuncs.com/img/IMG_1519.JPG"
                        backImgSrc="https://diveintodream.oss-cn-shenzhen.aliyuncs.com/img/IMG_1519.JPG"
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
                            <p className="tilted-card-caption ">
                                brent brentⅡ - Zucker / Cutler
                            </p>
                        }
                        backTitle="Zucker / Cutler"
                        backContent="Zucker and Cutler frequently collaborate, creating melancholic yet uplifting tracks. Their joint EP, brent (2019), and singles like this is how you fall in love showcase their seamless vocal chemistry and intimate songwriting."
                    />
                </div>

                <div className={`titleCard z-10 ${styles.titleCard}`} ref={(el) => (titleCardsRef.current[2] = el)} onClick={() => handleCardClick(2)}>
                    <FlipTitleCard
                        imageSrc="https://diveintodream.oss-cn-shenzhen.aliyuncs.com/img/1566985357487.JPG"
                        backImgSrc="https://diveintodream.oss-cn-shenzhen.aliyuncs.com/img/1566985357487.JPG"
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
                            <p className="tilted-card-caption ">
                                Sunsets & Goodbyes - Ollie
                            </p>
                        }
                        backTitle="Ollie"
                        backContent="Ollie is a rising singer, songwriter, and producer known for his smooth blend of R&B, lo-fi, and alternative pop. "
                    />
                </div>
            </div>

            <div className="absolute flex flex-col text-base font-mono text-black ml-[82vw] mt-[60vh] space-y-5">
                <div ref={(el) => (musicTextsRef.current[0] = el)} className="flex flex-row gap-10">
                    <p>01</p>
                    <p>TOO DEEP TO TURN BACK</p>
                    <audio ref={(el) => (audiosRef.current[0] = el)} src="https://diveintodream.oss-cn-shenzhen.aliyuncs.com/music/DanielCaesar.flac" />
                </div>
                <div ref={(el) => (musicTextsRef.current[1] = el)} className="flex flex-row gap-10">
                    <p>02</p>
                    <p>this is how you fall in love</p>
                    <audio ref={(el) => (audiosRef.current[1] = el)} src="https://diveintodream.oss-cn-shenzhen.aliyuncs.com/music/ZuckerCutler.flac" />
                </div>
                <div ref={(el) => (musicTextsRef.current[2] = el)} className="flex flex-row gap-10">
                    <p>03</p>
                    <p>sad sad</p>
                    <audio ref={(el) => (audiosRef.current[2] = el)} src="https://diveintodream.oss-cn-shenzhen.aliyuncs.com/music/Ollie.flac" />
                </div>
            </div>

            <div className="w-full flex flex-col"> {/* 改为 column 布局 */}
                <div className="w-full flex justify-start items-center text-xl font-medium mt-[5vh] ml-[5vw]">
                    <div className="flex-1 flex flex-col"> {/* flex-1 占据剩余空间 */}
                        <div className="flex-1 flex items-center"> {/* 添加内边距 */}
                            <div className="flex gap-[1.5vw] justify-start">
                                {Array.from({ length: 3 }).map((_, index) => (
                                    <StarIcon key={index} />
                                ))}
                                <p className="text-sm ml-[10vw]">
                                    2022brave
                                </p>
                            </div>
                            <div className="flex justify-start gap-[12vw] mr-[2vw] ">
                                {Array.from({ length: 3 }).map((_, index) => (
                                    <StarIcon key={index} />
                                ))}
                            </div>
                            <div className="flex gap-[1.5vw] justify-start">
                                <p className="text-sm mr-[10vw]">
                                    2025love
                                </p>
                                {Array.from({ length: 3 }).map((_, index) => (
                                    <StarIcon key={index} />
                                ))}
                                <p>
                                </p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            <div className='CardContentMid flex flex-col justify-center items-center gap-[2vh] mt-[6vh]'>
                <div className='flex flex-col justify-center items-center text-center leading-[12vh]'>
                    <p className='text-[6vw] font-bold uppercase'>Click cards</p>
                    <p className='text-[6vw] font-bold uppercase'>to play music</p>
                </div>
                <div className=''>
                    <p>Please check your volume first.</p>
                </div>
                <div className=''>
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

            <div className='w-full absolute bottom-[2vh]'>
                <ScrollVelocity
                    texts={['Brave 22', '25 Love']}
                    velocity={200}
                    className="custom-scroll-text"
                />
            </div>
        </div>
    )
}

export default Music
