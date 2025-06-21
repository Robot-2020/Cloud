import styles from './Style.module.css'
import { useState, useRef, useEffect } from "react";
import { navLinks } from '../../constants';
import { motion, scale } from "motion/react"
import { Link, useLocation } from 'react-router-dom';
import gsap from 'gsap';
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";
import { SplitText } from 'gsap/SplitText'; // assuming you're using GSAP plugins

const NavBar = () => {

  const location = useLocation(); // 获取当前路由
  const [hoverIndex, setHoverIndex] = useState(-1);

  // 根据当前路由自动计算 selectedIndex
  const selectedIndex = navLinks.findIndex(
    (navLink) => navLink.link === location.pathname
  );

  // 鼠标进入时更新 hoverIndex
  const handleMouseEnter = (index) => {
    setHoverIndex(index); // 记录当前悬停项
  };

  // 鼠标离开时恢复 hoverIndex
  const handleMouseLeave = () => {
    setHoverIndex(-1); // 清除悬停项
  };

  const handleClick = (index) => {
    setHoverIndex(-1); // 可选：点击后清除悬停状态
  };

  return (
    <header id="navbar" className={`navbar w-full relative top-[3vh] z-100`}>
      <div className="inner w-full flex flex-row justify-between items-center">
        <a href="/" className="logo flex flex-row items-center p-2 bg-black text-white left-[2vw] z-10">
          <span className='text-[1.5rem] ml-[2px]'>CLOUD</span>
          <img src="/img/icon.svg" alt="emoji" width="40" height="40" style={{ display: "inline-block" }}></img>
          <span className='text-[1.5rem] mr-[2px] '>LOVE</span>
        </a>

        <nav className="desktop flex flex-row justify-center mr-[2vw]">
          <ul className="flex flex-row">
            {navLinks.map((navLink, index) => (
              <li key={index} className="group">
                <Link to={navLink.link}
                  onClick={() => handleClick(index)} // 设置选中的导航项
                  onMouseEnter={() => handleMouseEnter(index)} // 鼠标进入时更新选中
                  onMouseLeave={handleMouseLeave} // 鼠标离开时恢复默认
                >
                  <motion.div whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.8 }}>
                    <span
                      className={`navtext p-4 border-3 transition-all text-[1rem] ${((selectedIndex === index && (hoverIndex === index || hoverIndex === -1)) || hoverIndex === index) // 当选中或悬停时
                        ? 'bg-black text-white rounded-xl ' // 选中时的样式
                        : 'bg-gray text-black border-gray-200 rounded-md ' // 默认样式
                        }`}
                    >
                      {navLink.name}
                    </span>
                  </motion.div>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className=''>
          <div class="flex items-center justify-center">
            <div class="relative group">
              <a href="https://diveintodream.cn/vue-app/" class="inline-block">
              <button
                class="relative inline-block p-px font-semibold leading-6 text-pink-300 bg-white shadow-2xl cursor-pointer rounded-2xl shadow-pink-400 transition-all duration-300 ease-in-out hover:scale-105 active:scale-95 hover:shadow-pink-300"
              >
                <span
                  class="absolute inset-0 rounded-2xl bg-gradient-to-r from-pink-500 via-pink-100 to-white p-[2px] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                ></span>
                <span class="relative z-10 block px-6 py-3 rounded-2xl bg-white border border-pink-200">
                  <div class="relative z-10 flex items-center space-x-3">
                    <span
                      class="transition-all duration-500 group-hover:translate-x-1.5 group-hover:text-pink-600">Whoosh! ✨
                    </span>
                  </div>
                </span>
              </button>
              </a>
            </div>
          </div>
        </div>
      </div>


    </header>
  );
}

export default NavBar;
