import './App.css'
import { useRef, useEffect } from 'react'
import Loader from './components/loader/Index';
// import { LocomotiveScrollProvider } from 'react-locomotive-scroll'
// import 'locomotive-scroll/dist/locomotive-scroll.css'



function App() {
  const containerRef = useRef(null)
  // useEffect(() => {
  //   // Update the locomotive scroll whenever the location changes
  //   if (containerRef.current) {
  //     const event = new Event('resize');
  //     window.dispatchEvent(event);
  //   }
  // }, [location]);
  
  return (
    // <LocomotiveScrollProvider
    // options={
    //   {
    //     smooth: true,
    //     // ... all available Locomotive Scroll instance options 
    //   }
    // }
    // watch={
    //   [
    //     //...all the dependencies you want to watch to update the scroll
    //   ]
    // }
    
    // containerRef={containerRef}
    // >
      <div ref={containerRef} className='main text-white overflow-hidden'>
        <Loader />
      </div>
    // </LocomotiveScrollProvider>
    
  )
}

export default App
