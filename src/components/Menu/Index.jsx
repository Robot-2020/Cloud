import React from 'react'
import styles from './Style.module.css'
import { useState, useRef, useEffect } from "react";
import { navLinks } from '../../constants';
import { motion, scale } from "motion/react"
import { Link, useLocation } from 'react-router-dom';
import gsap from 'gsap';
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";
import { SplitText } from 'gsap/SplitText'; // assuming you're using GSAP plugins
const Index = () => {

      // 注册插件, 文本扰乱和切割
  gsap.registerPlugin(ScrambleTextPlugin, SplitText);

  // Initial setup
  const contentEl = useRef(null);
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

    tl.to(
      [brandLogoRef.current, menuBtnRef.current],
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

    tl.to(
      titleLinesRef.current,
      {
        y: "0%",
        duration: 0.64,
        stagger: 0.075,
        ease: slideEase
      },
      "-=0.4"
    );


    tl.to(scrollTextRef.current, {
      opacity: 1,  // 将透明度设置为 0，元素将消失
      duration: 0.5, // 动画时长（根据需要调整）
      ease: "power2.inOut" // 可以自定义动画的缓动效果
    });
  };


  useEffect(() => {
    

    menuBtnRef.current.addEventListener("click", openMenu);
    closeBtnRef.current.addEventListener("click", closeMenu);

    navLinksRef.current.forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        closeMenu();
      });
    });

  }, [isAnimating])

    return (
        <div className={`${styles.heroRoot} w-full h-screen opacity-0`}>
            {/* Menu */}
            <div ref={contentEl} className={`${styles.contentContainer} contentContainer`} id="content">
                <header className={`${styles.siteHeader} siteHeader`}>
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
}

export default Index
