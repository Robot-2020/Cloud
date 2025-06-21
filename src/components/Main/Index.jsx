import FlowingMenu from "../../modules/FlowingMenu"
import styles from "./Style.module.css"
import React, { useState, useRef } from 'react';
import { motion } from "framer-motion";
import ThreadLine from "../../modules/ThreadLine";
import { throttle } from 'lodash';

const Main = () => {
    // 使用 useRef 创建一个数组，用于存储每个圆球的引用
    const ballsRef = useRef([]);
    // 使用数组分别跟踪每个圆球的动画状态
    const [animatingBalls, setAnimatingBalls] = useState([false, false, false, false]);

    const handleBallClick = (index) => {
        setAnimatingBalls(prev => {
            const newState = [...prev];
            // 只在当前未动画时才触发新动画
            if (!newState[index]) {
                newState[index] = true;
            }
            return newState;
        });
    };

    const handleAnimationComplete = (index) => {
        setAnimatingBalls(prev => {
            const newState = [...prev];
            newState[index] = false; // 动画完成后重置状态
            return newState;
        });
    };

    const demoItems = [
        { link: '#', text: 'Tunnel', image: "/img/tunnel.jpg" },
    ];

    const [hoveredIndex, setHoveredIndex] = useState(null); // 存储当前 hover 的元素索引
    const linesRef = useRef([]); // 用于存储所有的 span 元素
    const lines = new Array(58).fill(0); // 根据需要的线条数生成数组
    const [initialBrightness, setInitialBrightness] = useState([]); // 存储每个 span 的初始亮度
    const [initialHeight, setInitialHeight] = useState([]); // 存储每个 span 的初始亮度

    // 随机生成每个 span 的亮度
    const generateInitialBrightness = () => {
        const brightnessArray = new Array(lines.length).fill(0).map(() => Math.random() * (1 - 0.5) + 1.5);// 随机亮度在 1.5 到 0.5 之间
        setInitialBrightness(brightnessArray); // 设置亮度状态
    };

    // 随机生成每个 span 的亮度
    const generateInitialHeight = () => {
        const HeightArray = new Array(lines.length).fill(0).map(() => Math.random() * 2 + 10);// 随机亮度在 1.5 到 0.5 之间
        setInitialHeight(HeightArray); // 设置亮度状态
    };

    // 处理鼠标移动事件
    const handleMouseMove = throttle((event) => {
        const mouseX = event.clientX;
        let index = null;

        // 遍历所有的 span，检查鼠标位置是否在该 span 范围内
        linesRef.current.forEach((line, i) => {
            const rect = line.getBoundingClientRect(); // 获取每个 span 元素的边界信息

            // 这里加了一个偏移值，可以根据需要调整范围
            const buffer = 10; // 允许鼠标进入一个 buffer 区域，来触发事件

            // 判断鼠标是否在该 span 的 X 轴范围内
            if (mouseX >= rect.left - buffer && mouseX <= rect.right + buffer) {
                index = i; // 找到当前鼠标所在的 span 索引
            }
        });

        setHoveredIndex(index); // 更新 hoveredIndex
    }, 50);

    const handleMouseLeave = () => {
        setHoveredIndex(null); // 恢复状态
    };

    // 初始化时生成随机亮度
    React.useEffect(() => {
        generateInitialBrightness();
        generateInitialHeight();
    }, []);

    return (
        <div id="container" className={`page3 ${styles.page3} containerRelative relative min-h-[80vh] bg-black p-0 m-0 overflow-hidden border-none`}
            onMouseMove={handleMouseMove} // 监听鼠标移动事件
            onMouseLeave={handleMouseLeave}>

            <div style={{ height: '100px', position: 'relative', background: 'black' }} className=''>
                <FlowingMenu items={demoItems} />
            </div>

            <div className="w-full relative top-[5vh]">
                <div className="w-full flex items-center justify-between text-white uppercase px-5">
                    <span className="text-lg font-medium ml-[2vw]">magical transport planet</span>

                    <span className="text-lg font-medium ml-[21.5vw]">Mysterious star</span>

                    <span className="text-lg font-medium ">Piano and music</span>
                </div>

                <div className="w-auto h-auto">
                    <div className="mt-[2vh] mr-[1vw] inset-0 flex items-center justify-end">
                        {/* 垂直线条 */}
                        <div className="flex flex-row h-full justify-center space-x-4">
                            {lines.map((_, index) => (
                                <span
                                    ref={(el) => (linesRef.current[index] = el)} // 将每个元素添加到 ref 数组
                                    key={index}
                                    className="intro_action-line bg-white"
                                    style={{
                                        width: '1px', // 线条宽度
                                        opacity: 1,
                                        height: initialHeight[index], // 默认高度
                                        transform: hoveredIndex === index ? 'scaleY(1.5)' : 'scaleY(1)', // 使用transform缩放
                                        transition: 'height 0.3s ease, filter 0.3s ease', // 平滑过渡
                                        willChange: 'transform, filter, background-color',
                                        filter:
                                            hoveredIndex !== null ? (Math.abs(hoveredIndex - index) <= 2
                                                ? 'brightness(2.5)' // 当前和邻近的 1 个元素亮度为 1
                                                : 'brightness(0.5)'
                                            )
                                                : `brightness(${initialBrightness[index]})`, // 默认亮度
                                        backgroundColor: hoveredIndex !== null && Math.abs(hoveredIndex - index) <= 1 ? 'white' : 'rgba(255, 255, 255, 0.8)', // 当前和邻近的变亮
                                    }}
                                />
                            ))}
                        </div>
                    </div>
                </div>

                <div className="w-auto h-auto">
                    <div className="flex flex-row justify-end gap-20 mt-[20vh] mr-[8vw]">
                        <motion.div
                            ref={(el) => (ballsRef.current[0] = el)}
                            className="w-24 h-24 bg-gradient-to-br from-[#ffe32e] to-[#ffd2f3] rounded-full cursor-pointer"
                            onClick={() => handleBallClick(0)}
                            animate={
                                animatingBalls[0]
                                    ? {
                                        scale: [1, 2, 2, 2, 1],
                                        rotate: [0, 0, 180, 180, 0],
                                        borderRadius: ["0%", "20%", "50%", "20%", "50%"],
                                    }
                                    : {} // 不点击时为空对象，无动画
                            }
                            transition={{
                                duration: 2,
                                ease: "easeInOut",
                                times: [0, 0.2, 0.5, 0.8, 1],
                            }}
                            onAnimationComplete={() => handleAnimationComplete(0)}
                        />

                        <motion.div
                            ref={(el) => (ballsRef.current[1] = el)}
                            className="w-24 h-24 bg-gradient-to-br from-[#ffd2f3] to-[#ffe32e] rounded-full cursor-pointer"
                            onClick={() => handleBallClick(1)}
                            animate={
                                animatingBalls[1]
                                    ? {
                                        scale: [1, 2, 2, 2, 1],
                                        rotate: [0, 90, 180, 270, 0],
                                        borderRadius: ["50%", "20%", "0%", "20%", "50%"]
                                    }
                                    : {} // 不点击时为空对象，无动画
                            }
                            transition={{
                                duration: 2,
                                ease: "easeInOut",
                                times: [0, 0.2, 0.5, 0.8, 1],
                            }}
                            onAnimationComplete={() => handleAnimationComplete(1)}
                        />

                        <motion.div
                            ref={(el) => (ballsRef.current[2] = el)}
                            className="w-24 h-24 bg-gradient-to-br from-[#ffe32e] to-[#ffb5e5] -rotate-90 rounded-full cursor-pointer"
                            onClick={() => handleBallClick(2)}
                            animate={
                                animatingBalls[2]
                                    ? {
                                        scale: [1, 2, 1, 2, 2, 1],
                                        rotate: [0, 0, 180, 180, 90, 0],
                                        borderRadius: ["50%", "30%", "0%", "30%", "0%", "50%"],
                                    }
                                    : {} // 不点击时为空对象，无动画
                            }
                            transition={{
                                duration: 3,
                                ease: "easeInOut",
                                times: [0, 0.2, 0.5, 0.8, 1],
                            }}
                            onAnimationComplete={() => handleAnimationComplete(2)}
                        />

                        <motion.div
                            ref={(el) => (ballsRef.current[3] = el)}
                            className="w-24 h-24 bg-gradient-to-br from-[#ffb5e5] to-[#ffe32e] -rotate-90 rounded-full cursor-pointer"
                            onClick={() => handleBallClick(3)}
                            animate={
                                animatingBalls[3]
                                    ? {
                                        scale: [1, 2, 2, 1, 2, 1],
                                        rotate: [0, 0, 180, 180, 90, 90],
                                        borderRadius: ["0%", "0%", "50%", "50%", "0%", "50%"],
                                    }
                                    : {} // 不点击时为空对象，无动画
                            }
                            transition={{
                                duration: 3,
                                ease: "easeInOut",
                                times: [0, 0.2, 0.5, 0.8, 1],
                            }}
                            onAnimationComplete={() => handleAnimationComplete(3)}
                        />
                    </div>
                </div>

                <div className="w-auto">
                    <div className="mt-[20vh] mr-[1vw] inset-0 flex items-center justify-end">
                        {/* 垂直线条 */}
                        <div className="flex flex-row justify-center space-x-4">
                            {lines.map((_, index) => (
                                <span
                                    ref={(el) => (linesRef.current[index] = el)} // 将每个元素添加到 ref 数组
                                    key={index}
                                    className="intro_action-line bg-white"
                                    style={{
                                        width: '1px', // 线条宽度
                                        opacity: 1,
                                        height: initialHeight[index], // 默认高度
                                        transform: hoveredIndex === index ? 'scaleY(1.5)' : 'scaleY(1)', // 使用transform缩放
                                        transition: 'height 0.3s ease, filter 0.3s ease', // 平滑过渡
                                        willChange: 'transform, filter, background-color',
                                        transformStyle: 'preserve-3d', // 启用硬件加速
                                        filter:
                                            hoveredIndex !== null ? (Math.abs(hoveredIndex - index) <= 2
                                                ? 'brightness(2.5)' // 当前和邻近的 1 个元素亮度为 1
                                                : 'brightness(0.6)'
                                            )
                                                : `brightness(${initialBrightness[index]})`, // 默认亮度
                                        backgroundColor: hoveredIndex !== null && Math.abs(hoveredIndex - index) <= 1 ? 'white' : 'rgba(255, 255, 255, 0.8)', // 当前和邻近的变亮
                                    }}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Main底部文案 */}
            <div className="w-full">
                <div className="w-1/3 ml-[2vw] mb-[12vh] text-white font-semibold text-3xl text-start tracking-wide leading-relaxed">
                    Welcome to the mysterious music planet. please try clicking on the stars on the right, and they will start converting.
                </div>
            </div>
        </div>
    )
}

export default Main
