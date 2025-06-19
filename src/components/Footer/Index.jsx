import React from 'react'
import Clock from '../Clock/Index'
import styles from "./Style.module.css"
import { leftLinks, midLinks, rightLinks, lastLinks } from '../../constants'

const Footer = () => {

    return (
        <div className='w-full min-h-[30vh] bg-black p-10'> {/* 添加 padding */}
            <div className='footInner'>
                {/* First Line */}
                <div className='footerSitemap flex justify-between mt-[5vh]'>
                    {/* Left */}
                    <div className='footerSitemapLeft flex flex-col items-start gap-5 uppercase ml-[2vw] '>
                        <div className={`footTitle ${styles.footTitle} w-auto flex items-center border-2 p-2 text-black text-base font-medium`} style={{ background: "linear-gradient(208deg,rgba(255, 207, 255, 1) 0%, rgba(255, 229, 173, 1) 73%)" }}>
                            What are my skills?
                        </div>

                        <div className='flex flex-row items-center justify-center text-center p-0 m-0' style={{ background: "linear-gradient(208deg,rgba(255, 207, 255, 1) 0%, rgba(255, 229, 173, 1) 73%)" }}>
                            <div className={`blogControl ${styles.footTitle} w-auto gap-1 flex items-center border-2 p-2 text-black text-base font-medium`} >
                                <img src="/img/blogs.svg" width={28} height={28} alt='cake'></img>
                                <a href="/blog">
                                    Check my blogs
                                </a>
                            </div>
                        </div>

                    </div>

                    {/* Mid */}
                    <div className='footerSitemapMid flex flex-row gap-[6vw]'>

                        {/* 左列 */}
                        <div className='flex flex-col space-y-5 text-white text-base font-medium text-left uppercase'> {/* text-left 确保左对齐 */}
                            {leftLinks.map((link, index) => (
                                <div key={`left-${index}`} className='w-full'>
                                    {link.text}
                                </div>
                            ))}
                        </div>

                        {/* 中列 */}
                        <div className='flex flex-col space-y-5 text-white text-base font-medium text-left uppercase'>
                            {midLinks.map((link, index) => (
                                <div key={`mid-${index}`} className='w-full'>
                                    {link.text}
                                </div>
                            ))}
                        </div>

                        {/* 右列 */}
                        <div className='flex flex-col space-y-5 text-white text-base font-medium text-left uppercase'>
                            {rightLinks.map((link, index) => (
                                <div key={`right-${index}`} className='w-full'>
                                    {link.text}
                                </div>
                            ))}
                        </div>

                        {/* 最后列 */}
                        <div className='flex flex-col space-y-5 text-white text-base font-medium text-left uppercase'>
                            {lastLinks.map((link, index) => (
                                <div key={`right-${index}`} className='w-full'>
                                    {link.text}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right*/}
                    <div className='footerSitemapRight flex items-start mr-[2vw]'>
                        <div className=''>
                            <Clock />
                        </div>
                    </div>
                </div>
            </div>

            <div className='footAction w-full flex flex-row justify-between items-end mt-[12vh] ml-[2vw]'>
                <div className=' text-white text-base font-medium text-left uppercase'>
                    <img src="/img/icon.svg" width={25} className='mr-[1vw]' />
                </div>

                <div className=' text-white text-sm font-medium text-left uppercase'>
                    <p>2022Brave</p>
                </div>

                <div className=' text-white text-base flex flex-row font-medium text-left uppercase mr-[1.5vw]'>
                    <img src="/img/icon.svg" width={25} className='mr-[1vw]' />
                    <img src="/img/icon.svg" width={25} className='mr-[1vw]' />
                    <img src="/img/icon.svg" width={25} className='mr-[1vw]' />
                </div>

                <div className=' text-white text-sm font-medium text-left uppercase'>
                    <p>2025Love</p>
                </div>

                <div className=' text-white text-base font-medium text-left uppercase'>
                    <img src="/img/icon.svg" width={25} className='mr-[4.8vw]' />
                </div>
            </div>

            <div className='footAction w-full h-[8vh] flex flex-row justify-between items-end mb-[1vh] ml-[2vw]'>
                <div className='footActionLeft text-white text-base font-medium text-left uppercase'>
                    <p>@2025 CLOUD LOVE</p>
                </div>

                <div className='footActionMid text-white text-base font-medium text-left uppercase mr-[3vw]'>
                    <p>AUTHOR:&nbsp;&nbsp;CLOUD</p>
                </div>

                <div className='footActionRight text-white text-base font-medium text-left mr-[5vw]'>
                    <p>FROM CHINA</p>
                </div>
            </div>
        </div>
    )
}

export default Footer