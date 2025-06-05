import styles from './Style.module.css'

function Landing() {

  return (

    <div className='page1 w-full min-h-screen relative px-[4vw] py-[16vw] space-y-2
        sm:px-[18vw] sm:py-[3vw] sm:flex sm:flex-row sm:items-start sm:gap-16'>

        <div className='firstword ${styles.firstword} font-[silkSerif] text-[5vw] mt-[5vw]
                sm:text-[3.6vw] sm:leading-[6vw]'>

            <h4>01</h4>
        </div>

        <div className='text-[10vw] leading-[10vw]tracking-tighter font-[PlinaReg] uppercase
                sm:text-[6vw] sm:leading-[6vw] sm:tracking-normal'>
                
            <div className={`hero ${styles.hero} mt-[5vw]`} id="hero1">
                <h1>We Design</h1>
            </div>

            <div className={`hero ${styles.hero}`} id="hero2">
                <h1>Unique</h1>
            </div>

            <div className={`hero ${styles.hero}`} id="hero3">
                <h2>Web</h2>
                <h3>/</h3>
                <h2>Graphic</h2>
            </div>

            <div className={`hero ${styles.hero}`} id="hero4">
                <h1>Experience</h1>
            </div>
            
        </div>

    </div>
  )
}

export default Landing