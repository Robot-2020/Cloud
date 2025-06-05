import styles from './Style.module.css'
import UnderLine from '../Underline/Index'
import gsap from 'gsap'
import { useEffect, useRef} from 'react'
import hoverEffect from 'hover-effect'

function Project() {

  return (
    <div className='page3 relative w-full min-h-screen px-[4vw] py-[3vw]
        sm:px-[18vw] sm:py-[3vw]'>
        <div className='flex gap-[5vw]'>

          <div className='left sm:pl-[1vw]'>
            <div className='firstword font-[silkSerif] text-[3vw] mt-[1.5vw]
                sm:text-[1w] sm:leading-[6vw]'>

                <h4>02</h4>

            </div>
          </div>
          
          <div className='w-full right'>
            <div className='aboutHeading overflow-hidden pb-[4vw] flex flex-col tracking-tighter 
                text-[5vw] leading-[8vw] font-[PlinaReg] uppercase
                sm:pb-0 '>

                <h1>My Projects</h1>
                
            </div>

            <div className='underlineAnimation'>
              <UnderLine marginBottom={'3vw'} marginTop={'-1vw'}/>
            </div>
          </div>

        </div>

        
    </div>
  )
}

export default Project
