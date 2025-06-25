import './App.css'
import { motion, useScroll } from "motion/react"
import ClickSpark from './modules/ClickSpark';
import { useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger, ScrollSmoother } from 'gsap/all';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import HomePage from './pages/HomePages';
import BlogPage from './pages/BlogPages';
import ContactPage from './pages/ContactPage';
import Footer from './components/Footer/Index';
import BlogDetail from './components/BlogDetail/Index';
import Lenis from "@studio-freight/lenis";

function App() {

  const { scrollYProgress } = useScroll();

  useLayoutEffect(() => {
    const lenis = new Lenis({
      lerp: 0.05, // 平滑度（0-1，越小越平滑）
      wheelMultiplier: 0.7, // 小于1 = 降低滚轮灵敏度
      smoothWheel: true, // 启用鼠标滚轮平滑
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy(); // 清理
    };
  }, []);

  return (
    <>
      <motion.div id="scroll-indicator"
        style={{
          scaleX: scrollYProgress,
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          height: 10,
          originX: 0,
          backgroundColor: "#FF82AB",
        }}
      />
      <div id="smooth-wrapper">
        {/* <Loader /> */}
        <div className='' style={{ background: "#FAF4EC" }} id="smooth-content">
          <ClickSpark
            sparkColor='#F74592'
            sparkSize={10}
            sparkRadius={20}
            sparkCount={10}
            duration={600}
            extraScale={1.2}
          >
            <div className="app">
              <NavBar />
              <main>
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="contact" element={<ContactPage />} />
                  <Route path="blog" element={<BlogPage />}>
                    {/* <Route path=":id" element={<BlogDetail />} /> */}
                  </Route>
                </Routes>
              </main>
              <Footer />
            </div>
          </ClickSpark>
        </div>
      </div>
    </>
  )
}

export default App
