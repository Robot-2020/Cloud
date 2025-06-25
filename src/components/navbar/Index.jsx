import styles from './Style.module.css'
import { useState } from "react";
import { navLinks } from '../../constants';
import { motion } from "motion/react"
import { Link, useLocation, useNavigate } from 'react-router-dom';

const NavBar = () => {

  const location = useLocation(); // 获取当前路由
  const [hoverIndex, setHoverIndex] = useState(-1);

  // 根据当前路由自动计算 selectedIndex
  const selectedIndex = navLinks.findIndex(
    (navLink) => navLink.link === location.pathname);

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

  const navigate = useNavigate();

  const goToHome = () => {
    navigate("/", { state: { fromNav: false } }); // 标记来自导航
  };

  return (
    <header id="navbar" className={`navbar w-full relative top-[3vh] z-100`}>
      <div className="inner w-full flex flex-row justify-between items-center">
        <a onClick={goToHome} className="logo flex flex-row items-center p-2 bg-black text-white left-[2vw] z-10">
          <span className='text-[1.5rem] ml-[2px]'>CLOUD</span>
          <img src="/img/icon.svg" alt="emoji" width="40" height="40" style={{ display: "inline-block" }}></img>
          <span className='text-[1.5rem] mr-[2px] '>LOVE</span>
        </a>

        <nav className="desktop flex flex-row justify-center mr-[2vw]">
          <ul className="flex flex-row">
            {navLinks.map((navLink, index) => (
              <li key={index} className="group">
                <Link to={navLink.link} state={{ fromNav: true }}
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
          <div className="flex items-center justify-center">
            <div className="relative group">
              <a href="https://diveintodream.cn/vue-app/" className="inline-block">
                <button
                  className="relative inline-block p-px font-semibold leading-6 text-pink-300 bg-slate-200 shadow-2xl cursor-pointer rounded-2xl shadow-pink-300 transition-all duration-300 ease-in-out hover:scale-105 active:scale-95 hover:shadow-pink-500"
                >
                  <span
                    className="absolute inset-0 rounded-2xl bg-gradient-to-r from-pink-400 via-pink-200 to-white p-[2px] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  ></span>
                  <span className="relative z-10 block px-6 py-3 rounded-2xl bg-neutral-100 border border-pink-300">
                    <div className="relative z-10 flex items-center space-x-3">
                      <span
                        className="transition-all duration-500 group-hover:translate-x-1.5 group-hover:text-pink-600 group-hover:bg-neutral-100">Whoosh! ✨
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
