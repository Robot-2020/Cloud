import { gsap } from "gsap";
import { SplitText, ScrollTrigger } from "gsap/all";
import { useState, useRef, useEffect } from 'react';
import TrueFocus from '../../modules/TrueFocus';
import styles from './Style.module.css'
import YoungMan from '../../elemenets/YoungMan/YoungMan'
import TitleCard from "../../modules/TitleCard";
import LoadingThreeDotsPulse from "../../elemenets/LoadingDots/LoadingThreeDotsPulse"
import LightDark from "../../modules/LightDark";

function Hero() {

  gsap.registerPlugin(SplitText, ScrollTrigger);

  const heroTitleRef = useRef(null);
  const heroDescRef = useRef(null);
  const titleCardsRef = useRef([]);

  useEffect(() => {

    titleCardsRef.current.forEach((titleCard, index) => {
      gsap.to(titleCard, {
        y: `${window.innerHeight / 1.43}`,
        x: index == 0 ? "+=15vw" : index == 1 ? "0" : "-=15vw",
        rotation: index == 0 ? -25 : index == 1 ? "0" : 25,
        opacity: 0.1,
        scale: 0.6,
        force3D: true,
        scrollTrigger: {
          trigger: titleCard,
          start: 'center 60%',  // 修改为更可靠的触发点
          end: 'bottom 20%',
          scrub: 1,
        },
      });
    });

  }, []);

  return (
    <div>
      <div id="hero" className={`page1 hero w-full min-h-[120vh] relative overflow-hidden`}>

        <div className="youngMan absolute top-36 left-24 overflow-hidden">
          <YoungMan />
        </div>

        <div className="absolute top-52 left-[10vw] flex flex-row items-center justify-between w-full">
          <div className="flex flex-row gap-[1vw]">
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
          <p className="absolute mx-[15vw] text-sm">
            2022brave
          </p>
          <div className="flex flex-row gap-[10vw]">
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
          <p className="relative text-sm right-[7vw]">
            2025love
          </p>
          <div className="flex flex-row gap-[1vw] relative right-[-4vw]">
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

        <div className="heroText absolute top-[-15vh] left-0 w-full h-screen flex justify-center items-center">
          <h1 ref={heroTitleRef} className="heroTitle">
            <TrueFocus
              sentence="&nbsp;Hey&nbsp; I'm&nbsp;Cloud."
              manualMode={false}
              blurAmount={5}
              borderColor="rgba(255, 130, 171, 1)"
              animationDuration={1.5}
              pauseBetweenAnimations={1}
            />
          </h1>
        </div>

        {/* 简历卡片 */}
        {/* <div className="w-full h-screen absolute left-[30vw] bottom-[2vh] z-30 flex overflow-hidden pointer-events-none">
        <Lanyard position={[0, 0, 18]} gravity={[0, -20, 0]} fov={20} />
      </div> */}

        <div className={`titleCards relative flex flex-row min-h-[120vh] top-[5vh] justify-center items-center space-x-[2vw]`}>
          <div className={`titleCard relative ${styles.titleCard}`} >
            <div ref={(el) => (titleCardsRef.current[0] = el)}>
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
          </div>
          <div className={`titleCard ${styles.titleCard}`}>
            <div ref={(el) => (titleCardsRef.current[1] = el)}>
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
          </div>
          <div className={`titleCard ${styles.titleCard}`}>
            <div ref={(el) => (titleCardsRef.current[2] = el)}>
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
        </div>

        <div ref={heroDescRef} className={`heroDesc ${styles.heroDesc} absolute w-full bottom-[5vh] left-20 text-left break-words 
        max-w-[50vw] mr-[5vh] text-[1.5rem] lg:text-[2.5rem] font-semibold text-[#2c2c2c] z-10`}>
          <div className="flex flex-row text-[0.6rem] justify-center gap-1 p-1 items-center bg-black text-white w-[6.5vw]">
            <span>Academic</span>
            <img src="/img/icon.svg" alt="emoji" width="30" height="30" style={{ display: "inline-block" }}></img>
            <span >Work Career</span>
          </div>
          <div className="w-full tracking-wide leading-relaxed">
            <p>I’m Cloud, a master’s student in Computer Science at UESTC. I’ve worked on backend development at JD and Meituan, and now at Baidu.com, focusing on ad traffic monetization.</p>
            <p>Feel free to connect! <img src="/img/smile.svg" alt="emoji" width="80" height="80" className="ml-[1vw]" style={{ display: "inline-block" }}></img></p>
          </div>
        </div>

        <div className="absolute top-[1.5vh] right-[3.8vw] z-10">
          <LightDark />
        </div>
        <div className="absolute bottom-[22vh] right-10">
          <LoadingThreeDotsPulse />
        </div>
      </div>
    </div>
  )
}
export default Hero