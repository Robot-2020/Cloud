import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

export const useHeroAnimations = () => {
    const titleHeadRef = useRef(null);
    const heroTitleRef = useRef(null);
    const heroDescRef = useRef(null);
    const titleCardsRef = useRef([]); // 用于存储三个卡片的 ref

    useEffect(() => {
        // 确保所有 ref 都已连接
        if (
            titleHeadRef.current &&
            heroTitleRef.current &&
            heroDescRef.current &&
            titleCardsRef.current.length === 3 && // 确保三个卡片都已连接
            titleCardsRef.current.every(ref => ref !== null) // 确保每个 ref 都不为 null
        ) {
            const tl = gsap.timeline({ defaults: { ease: "power2.out" } });

            // 设置初始状态（防止闪现）
            tl.set([
                titleHeadRef.current.querySelectorAll('div, p'),
                heroTitleRef.current,
                heroDescRef.current.children,
            ], {
                opacity: 0,
                y: 40
            });

            // 第一部分动画 - titleHead 内容
            tl.to(titleHeadRef.current.querySelectorAll('div, p'), {
                opacity: 1,
                y: 0,
                duration: 0.6,
                stagger: 0.1
            }, "+=0.5");

            // 第二部分动画 - 主标题
            tl.to(heroTitleRef.current, {
                opacity: 1,
                y: 0,
                duration: 1
            }, "-=0.1");

            // 第三部分动画 - 描述内容
            tl.to(heroDescRef.current.children, {
                opacity: 1,
                y: 0,
                duration: 1,
                stagger: 0.15
            }, "-=0.1");
        }
    }, []);

    return { titleHeadRef, heroTitleRef, heroDescRef, titleCardsRef };
};