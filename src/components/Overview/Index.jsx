import styles from './Style.module.css'
import UnderLine from '../Underline/Index'
import { useEffect, useRef } from 'react'
import hoverEffect from 'hover-effect'

function Overview() {
  let wrapper1 = useRef();
  let wrapper2 = useRef();
  let wrapper3 = useRef();

  useEffect(() => {
    if (window.matchMedia("(min-width: 1068px)").matches) {
      new hoverEffect({
        parent: wrapper1.current,
        intensity: 0.8,
        imagesRatio: 360 / 320,
        image1: '/img/IMG_1519.JPG',
        image2: '/img/IMG_1520.JPG',
        displacementImage: '/images/14.jpg',
        speedIn: 0.5,   // 鼠标移入时的过渡时间（秒）
        speedOut: 0.5,  // 鼠标移出时的过渡时间（秒）
      })

      new hoverEffect({
        parent: wrapper2.current,
        intensity: 0.8,
        imagesRatio: 360 / 320,
        image1: '/img/IMG_1522.JPG',
        image2: '/img/IMG_1538.JPG',
        displacementImage: '/images/14.jpg',
        speedIn: 0.5,   // 鼠标移入时的过渡时间（秒）
        speedOut: 0.5,  // 鼠标移出时的过渡时间（秒）
      })

      new hoverEffect({
        parent: wrapper3.current,
        intensity: 0.8,
        imagesRatio: 360 / 320,
        image1: '/img/IMG_1540.JPG',
        image2: '/img/IMG_1542.JPG',
        displacementImage: '/images/14.jpg',
        speedIn: 0.5,   // 鼠标移入时的过渡时间（秒）
        speedOut: 0.5,  // 鼠标移出时的过渡时间（秒）
      })
    }
  }, []);


  return (

    <div id="blog" className="page3 relative min-h-[130vh] mt-[5vh]">
      <div className="relative sm:flex gap-[5vw] w-full px-[4vw] py-[5vw] h-auto sm:px-[4vw] mt-[4vw]">

        <div className="w-full">

          {/* 标题部分 */}
          <div className="aboutHeading w-full flex flex-col justify-center items-center overflow-hidden space-y-[-1vh]">
            {/* 底部的大标题 */}
            <h1 className={`footText ${styles.footText} tracking-tighter
                                  text-[5vw] font-extrabold sm:tracking-normal uppercase`}>
              404 Sleep
            </h1>
            <div className='w-full flex flex-row justify-between'>
              <div className='flex flex-row items-center'>
                <div>
                  <img src="/img/icon.svg" width={35} className='mr-[1vw]' />
                </div>
                <div className='tracking-tighter text-[0.6vw] font-semibold sm:tracking-normal uppercase text-white bg-black p-2'>
                  CLOUD
                </div>
              </div>
              <div className={`footText ${styles.footText} tracking-tighter
                                      text-[5vw] font-extrabold sm:tracking-normal uppercase`}>
                100% Learning
              </div>
              <div className='flex flex-row items-center gap-5'>
                <div className='tracking-tighter text-[0.6vw] font-semibold sm:tracking-normal uppercase text-white bg-black p-2'>
                  CLOUD
                </div>
                <div>
                  <img src="/img/icon.svg" width={35} className='mr-[1vw]' />
                </div>
              </div>
            </div>
            <div className='flex flex-col justify-center items-center text-center gap-2 p-5'>
              <div className={`tracking-tighter text-base font-medium sm:tracking-normal`}>
                To become an excellent programmer
              </div>
              <div className={`tracking-tighter text-base font-medium sm:tracking-normal`}>
                one must have the ability to continuously learn and never give up.
              </div>
            </div>
          </div>

          <div className='w-full flex justify-center ml-[11vw]'>
            {/* 下划线组件，用来添加一个分隔线 */}
            <UnderLine marginBottom='-1vw' marginTop='3vw' />
          </div>
        </div>
      </div>

      <div className="w-full flex justify-between items-start gap-2 pt-0 overflow-x-hidden">

        {/* Image*/}
        <div className="secondCol w-1/3 mt-[2vw] ml-[2vw] ">
          <div className='mb-[1.6vw] ml-[11vw]'>
            <h2 className='text-[5vw] mt-[7vw] sm:mt-0 mb-[7vw] sm:mb-0 sm:text-[2vw] font-normal sm:tracking-tight sm:leading-[2vw] uppercase'>
              Back-End
            </h2>
          </div>
          <div id="imageContainer" ref={wrapper1} className={`imageContainer ${styles.imageContainer} relative overflow-hidden sm:w-[18vw] sm:h-[20vw] sm:ml-0`}>
            <img src="/img/IMG_1519.JPG" alt="image1"
              className="inline-block sm:hidden object-cover"
            />
          </div>

          <div className='flex mt-[7vw] ml-[7vw] sm:mt-[1.6vw] font-[PlinaReg] text-[3vw] sm:text-[.8vw] items-start justify-start gap-[2.4vw]
              border-b-[1px] border-white pb-[6vw] sm:pb-[1.6vw]'>
            <h5>Java Go Spring DB System and so on.</h5>
            <h5 className=''>2023</h5>
          </div>
        </div>



        {/* Image*/}
        <div className="secondCol w-1/3 mt-[2vw] ">
          <div className='mb-[1.6vw] ml-[10.5vw]'>
            <h2 className='text-[5vw] mt-[7vw] sm:mt-0 mb-[7vw] sm:mb-0 sm:text-[2vw] font-normal sm:tracking-tight sm:leading-[2vw] uppercase'>
              Front-End
            </h2>
          </div>
          <div id="imageContainer"
            ref={wrapper2}
            className={`imageContainer ${styles.imageContainer} sm:ml-0 sm:w-[18vw] sm:h-[20vw] relative overflow-hidden`}>
            <img src="https://obys.agency/wp-content/uploads/2022/06/OCHI.png" alt="image1"
              className="inline-block sm:hidden w-full h-full object-cover"
            />
            {/* <img src="https://obys.agency/wp-content/uploads/2022/06/OCHI_2-1.png" 
                alt="image1" className="absolute top-0 left-0 opacity-0 w-full h-full object-cover"
              />  */}
          </div>
          <div className='flex mt-[7vw] ml-[7.2vw] sm:mt-[1.6vw] font-[PlinaReg] text-[3vw] sm:text-[.8vw] items-start justify-start gap-[2.7vw]
              border-b-[1px] border-white pb-[6vw] sm:pb-[1.6vw]'>
            <h5>HTML CSS JS React Node and so on.</h5>
            <h5 className=''>2024</h5>
          </div>
        </div>


        {/* Image*/}
        <div className="thirdThirdCol w-1/3 mt-[2vw]">
          <div className='sm:mb-[1.6vw] ml-[13vw]'>
            <h2 className='text-[5vw] mt-[7vw] sm:mt-0 mb-[7vw] sm:mb-0 sm:text-[2vw] font-normal uppercase sm:tracking-tight sm:leading-[2vw]'>
              UI / UX
            </h2>
          </div>
          <div id="imageContainer"
            ref={wrapper3}
            className={`imageContainer ${styles.imageContainer} sm:ml-0 realtive w-[18vw] h-[20vw] relative overflow-hidden `}
          >
            <img src="https://obys.agency/wp-content/uploads/2023/12/Makhno_First.png" alt="image1"
              className="inline-block sm:hidden w-full h-full object-cover"
            />
          </div>
          <div className='flex mt-[7vw] ml-[7.2vw] sm:mt-[1.6vw] font-[PlinaReg] text-[3vw] sm:text-[.8vw] items-start justify-start gap-[1.5vw]
              border-b-[1px] border-white pb-[6vw] sm:pb-[1.6vw]'>
            <h5>GSAP Framer Figma Webflow and so on.</h5>
            <h5 className=''>2025</h5>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Overview
