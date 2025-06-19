import styles from './Style.module.css'
import { useState, useRef, useEffect } from "react";
import { navLinks } from '../../constants';
import { motion, scale } from "motion/react"
import LightDark from "../../modules/LightDark"
import { Link, useLocation } from 'react-router-dom';

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
    <header id="navbar" className={`navbar top-[3vh]`}>
      <div className="inner">
        <a href="#hero" className="logo flex flex-row items-center p-2 bg-black text-white absolute left-[2vw]">
          <span className='text-[1.5rem] ml-[2px]'>CLOUD</span>
          <img src="/img/icon.svg" alt="emoji" width="40" height="40" style={{display: "inline-block"}}></img>
          <span className='text-[1.5rem] mr-[2px] '>LOVE</span>
        </a>

        <nav className="desktop w-full flex flex-row justify-center items-center text-center absolute left-[1vw]">
          <ul>
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
                      className={`navtext p-4 border-3 transition-all text-[1rem] ${((selectedIndex === index && (hoverIndex === index || hoverIndex === -1))|| hoverIndex === index) // 当选中或悬停时
                        ? 'bg-black text-white rounded-xl border-white' // 选中时的样式
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
        

      </div>
    </header>
  );
}

export default NavBar;
