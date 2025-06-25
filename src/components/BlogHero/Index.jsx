import { gsap } from "gsap";
import { SplitText, ScrollTrigger } from "gsap/all";
import { useState, useRef, useEffect } from 'react';
import styles from './Style.module.css'
import YoungMan from '../../elemenets/YoungMan/YoungMan'
import WritingMan from "../../elemenets/WritingMan/WritingMan";
import BlurText from "../../modules/BlurText";
import { useBlogHeroAnimations } from "../../kits/useBlogHeroAnimations";

function BlogHero() {
  // 定义一个可复用的 SVG 组件
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

  gsap.registerPlugin(SplitText, ScrollTrigger);

  const {
    youngManRef,
    starGroupsRef,
    blogTitleRef,
    writingManRef,
    pageCircleRef,
    navItemsRef,
    heroDescRef
  } = useBlogHeroAnimations();

  useEffect(() => {
    
    const circleIn = document.querySelector(".pageCircle");
    // const circlePara = document.querySelector(".circleInpara");

    circleIn.addEventListener('mouseenter', () => {
      gsap.to(".circleIn", { scale: 1, transformOrigin: "center center", });
    });
    circleIn.addEventListener('mouseleave', () => {
      gsap.to(".circleIn", { scale: 0, transformOrigin: "center center" });
    });
    circleIn.addEventListener('mouseenter', () => {
      gsap.to(".circleInpara", { scale: 1, transformOrigin: "center center", delay: 0.25 });
    });
    circleIn.addEventListener('mouseleave', () => {
      gsap.to(".circleInpara", { scale: 0, transformOrigin: "center center" });
    });
  }, []);

  return (
    <div>
      <div id="hero" className={`page1 hero w-full h-screen relative overflow-hidden`}>

        <div className="w-full flex flex-row m-[2.5vw]">
          <div className="youngMan w-[10vw]" ref={youngManRef}>
            <YoungMan />
          </div>

          <div ref={starGroupsRef} className="flex-1 flex flex-col" style={{ opacity: 0 }}> {/* flex-1 占据剩余空间 */}
            <div className="flex-1 flex items-center"> {/* 添加内边距 */}
              <div className="flex gap-[1vw] justify-start">
                {Array.from({ length: 3 }).map((_, index) => (
                  <StarIcon key={index} />
                ))}
                <p className="text-sm ml-[8vw]">
                  2022brave
                </p>
              </div>
              <div className="flex justify-start gap-[10vw] mr-[5vw] ">
                {Array.from({ length: 3 }).map((_, index) => (
                  <StarIcon key={index} />
                ))}
              </div>
              <div className="flex gap-[1vw] justify-start">
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

        <div className="w-2/3 h-[20vh] ml-[3vw] relative">
          <div className="flex flex-col justify-start items-start">
            <div ref={blogTitleRef} className="blogTitle">
              <BlurText
                text="Learn. Share. Repeat."
                delay={100}
                animateBy="words"
                direction="top"
                className=" text-[6rem] font-semibold font-narrow uppercase tracking-tight"
              />
            </div>
            <div ref={writingManRef} className="">
              <WritingMan />
            </div>
          </div>
        </div>

        <div className="w-auto flex flex-row justify-center text-right ml-[50vw] gap-[15vw] z-10">
          <div className="thirdCol hidden sm:inline-block mt-[3vh]" data-animate="fade-in">
            <div ref={pageCircleRef} className={`pageCircle ${styles.pageCircle} relative w-[15vw] h-[15vw] border 
                        rounded-full ml-[3vw] flex items-center justify-center`}>
              <svg className="button__arrow transform" width="20%" viewBox="0 0 91 118" fill="none">
                <path d="M15.2307 57.4152L15.9378 56.708L15.2307 56.0009L14.5236 56.708L15.2307 57.4152ZM34.9813 77.1658L34.2742 77.8729L35.9813 79.58L35.9813 77.1658L34.9813 77.1658ZM0.151478 72.4944L-0.555622 71.7873L-1.26273 72.4944L-0.555622 73.2015L0.151478 72.4944ZM45.29 117.633L44.5828 118.34L45.29 119.047L45.9971 118.34L45.29 117.633ZM60.3692 102.554L61.0763 103.261L61.7839 102.553L61.0758 101.846L60.3692 102.554ZM60.3685 102.553L59.6614 101.846L58.9538 102.553L59.6619 103.261L60.3685 102.553ZM90.427 72.4944L91.1341 73.2015L91.8412 72.4944L91.1341 71.7873L90.427 72.4944ZM75.3478 57.4152L76.0549 56.7081L75.3478 56.001L74.6407 56.7081L75.3478 57.4152ZM56.3065 76.4565L55.3065 76.4565L55.3065 78.8707L57.0136 77.1636L56.3065 76.4565ZM56.3065 0.120074L57.3065 0.120074L57.3065 -0.879926L56.3065 -0.879926L56.3065 0.120074ZM34.9813 0.120076L34.9813 -0.879924L33.9813 -0.879924L33.9813 0.120076L34.9813 0.120076ZM14.5236 58.1223L34.2742 77.8729L35.6884 76.4587L15.9378 56.708L14.5236 58.1223ZM0.858585 73.2015L15.9378 58.1223L14.5236 56.708L-0.555622 71.7873L0.858585 73.2015ZM45.9971 116.926L0.858585 71.7873L-0.555622 73.2015L44.5828 118.34L45.9971 116.926ZM59.662 101.846L44.5828 116.926L45.9971 118.34L61.0763 103.261L59.662 101.846ZM59.6619 103.261L59.6625 103.261L61.0758 101.846L61.0751 101.845L59.6619 103.261ZM61.0756 103.26L91.1341 73.2015L89.7199 71.7873L59.6614 101.846L61.0756 103.26ZM91.1341 71.7873L76.0549 56.7081L74.6407 58.1223L89.7199 73.2015L91.1341 71.7873ZM74.6407 56.7081L55.5994 75.7494L57.0136 77.1636L76.0549 58.1223L74.6407 56.7081ZM57.3065 76.4565L57.3065 0.120074L55.3065 0.120074L55.3065 76.4565L57.3065 76.4565ZM56.3065 -0.879926L34.9813 -0.879924L34.9813 1.12008L56.3065 1.12007L56.3065 -0.879926ZM33.9813 0.120076L33.9813 77.1658L35.9813 77.1658L35.9813 0.120076L33.9813 0.120076Z" fill="currentColor"></path>
              </svg>
              <div className={`circleIn ${styles.circleIn} absolute w-[100%] h-[100%] scale-0 rounded-full flex flex-col items-center justify-center top-0 
                          left-0 bg-[#ffffff] text-[#000]`}>
                <p className={`circleInpara ${styles.circleInpara} font-[PlinaReg] text-center tracking-wider text-[.9vw] scale-0 w-[70%]`}>
                  If you don’t like it… <br/>(pretend you do 🧡)
                </p>
                {/* <div className={`circleInpara ${styles.circleInpara} text-[1.2vw] scale-0`}>
                  
                </div> */}
              </div>
            </div>
          </div>

          <div className="text-base flex flex-col font-mono text-black space-y-3 mt-[12vh]" data-animate="fade-in">
            {['OVERVIEW', 'BACK-END', 'FRONT-END', 'UI / UX'].map((item, index) => (
              <div
                key={index}
                className="flex flex-row gap-10"
                ref={el => navItemsRef.current[index] = el}
              >
                <p>0{index + 1}</p>
                <p>{item}</p>
              </div>
            ))}
          </div>

        </div>
        <div ref={heroDescRef} className={`heroDesc ${styles.heroDesc} absolute left-[2vw] bottom-[10vh] text-left break-words 
        w-[50vw] lg:w-[38vw]`} >
          <div className="flex flex-row text-[0.5rem] justify-center gap-1 p-1 items-center bg-black text-white w-[6vw]" data-animate="fade-in">
            <span>STUDY</span>
            <img src="/img/icon.svg" alt="emoji" width="30" height="30" style={{ display: "inline-block" }}></img>
            <span>BLOG</span>
          </div>
          <div className="w-full tracking-wider leading-relaxed text-[1rem] xxl:text-[1.5vw] font-semibold text-[#2c2c2c]" data-animate="fade-in">
            <p>Welcome to My Blog Zone – Where my brain gains and learning adventures get logged!
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
export default BlogHero