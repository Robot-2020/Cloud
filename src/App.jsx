import './App.css'
import { motion, useScroll } from "motion/react"
import ClickSpark from './modules/ClickSpark';
import { useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollSmoother } from 'gsap/ScrollSmoother';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import HomePage from './pages/Home';
import BlogPage from './pages/Blog';
import ContactSection from './pages/Contact';
import Footer from './components/Footer/Index';

function App() {
  const { scrollYProgress } = useScroll();

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollSmoother);

    const smoother = ScrollSmoother.create({
      smooth: 3, // 默认平滑时间
      effects: true,
      smoothTouch: 0.1,
      normalizeScroll: true, // 标准化滚动行为
      ignoreMobileResize: true, // 避免移动端抖动
    });

    return () => smoother.kill(); // 清理
  }, []);

  return (
    <>
      <motion.div
        id="scroll-indicator"
        style={{
          scaleX: scrollYProgress,
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          height: 10,
          originX: 0,
          backgroundColor: "#ff0088",
        }}
      />

      <div id="smooth-wrapper">
        {/* <Loader /> */}
        <div className='' style={{ background: "#F8F4EC" }} id="smooth-content">
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
                  <Route path="/" element={<HomePage />}>
                    <Route index element={<ContactSection />} />
                    <Route path="contact" element={<ContactSection />} />
                  </Route>
                  <Route path="/blog" element={<BlogPage />} />
                  {/* 可以添加更多路由 */}
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
