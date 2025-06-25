import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

export const useBlogHeroAnimations = () => {
  // 主元素 ref
  const youngManRef = useRef(null);
  const starGroupsRef = useRef(null);
  const blogTitleRef = useRef(null);
  const writingManRef = useRef(null);
  const pageCircleRef = useRef(null);
  const navItemsRef = useRef([]);
  const heroDescRef = useRef(null);

  useEffect(() => {
    // 等待所有 ref 都连接
    const checkRefs = [
      youngManRef.current,
      blogTitleRef.current,
      writingManRef.current,
      pageCircleRef.current,
      heroDescRef.current,
      starGroupsRef.current,
      navItemsRef.current.length === 4 && // 确保三个卡片都已连接
      navItemsRef.current.every(ref => ref !== null)
    ];

    if (checkRefs.every(Boolean)) {
      const tl = gsap.timeline({ defaults: { ease: "power2.out" } });

      // 设置初始状态
      tl.set([
        youngManRef.current,
        starGroupsRef.current,
        blogTitleRef.current,
        pageCircleRef.current,
        writingManRef.current,
        ...navItemsRef.current,
        heroDescRef.current.children,
      ], {
        opacity: 0,
        y: 20,
        immediateRender: true, // 强制同步执行
      });

      // 1. YoungMan 动画（0.8秒）
      tl.to(youngManRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8
      }, "+=0.3"); // 延迟0.3秒开始

      // 2. YoungMan 和星星组动画
      tl.to(starGroupsRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.1
      }, "-=0.4"); // 与前一个动画重叠0.4秒

      // 3. 主标题动画（1秒）
      tl.to(blogTitleRef.current, {
        opacity: 1,
        y: 0,
        duration: 1
      }, "+=0.2"); // 前一个动画结束后0.2秒开始

      // 4. 写作小人动画（0.8秒）
      tl.to(writingManRef.current, {
        opacity: 0.8,
        y: 0,
        duration: 0.8
      }, "-=0.1"); // 与前一个动画重叠0.3秒

      tl.to(pageCircleRef.current, {
        opacity: 1,
        y: 0,
        duration: 1
      }, "+=0.2"); // 前一个动画结束后0.2秒开始


      // 5. 导航项动画（依次出现）
      tl.to(navItemsRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.15
      }, "-=0.2"); // 与圆形按钮动画部分重叠

      // 6. 描述区域动画
      tl.to(heroDescRef.current.children, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.1
      }, "-=0.1");
    }
  }, []);

  return {
    youngManRef,
    starGroupsRef,
    blogTitleRef,
    writingManRef,
    pageCircleRef,
    navItemsRef,
    heroDescRef
  };
};