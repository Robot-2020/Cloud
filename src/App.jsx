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
import ContactSection from './pages/ContactPage';
import Footer from './components/Footer/Index';
import BlogDetail from './components/BlogDetail/Index';
import Loader from './components/Loader/Index';
import { useState } from 'react';

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

function App() {

  const { scrollYProgress } = useScroll();

  const [isLoading, setIsLoading] = useState(true);

  useLayoutEffect(() => {
    // 确保DOM已加载
    ScrollSmoother.create({
      smooth: 3, // 平滑时间（秒）
      effects: true, // 启用效果
      smoothTouch: 0.1, // 触摸设备的平滑度
      normalizeScroll: true, // 标准化滚动行为
      ignoreMobileResize: true, // 避免移动端抖动
    });
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
                  <Route path="contact" element={<ContactSection />} />
                  <Route path="blog" element={<BlogPage />}>
                    <Route path=":id" element={<BlogDetail />} />
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
