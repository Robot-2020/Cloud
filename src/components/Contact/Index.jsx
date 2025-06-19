import AnimatedLink from '../AnimatedLink.jsx'
import UnderLine from '../Underline/Index.jsx'
import styles from './Style.module.css'
import { socialLinks } from "../../constants/index.js";
import YoungMan from '../../elemenets/YoungMan/YoungMan.jsx';

function Contact() {
    return (
        <div className='contact' id='contact'>

            <div className="relative sm:flex gap-[5vw] w-full px-[4vw] py-[5vw] h-auto sm:px-[4vw] mt-[4vw]">

                <div className="w-full">

                    {/* 标题部分 */}
                    <div className="aboutHeading w-full flex flex-col justify-center items-center overflow-hidden space-y-[-2vh]">
                        {/* 底部的大标题 */}
                        <h1 className={`footText ${styles.footText} tracking-tighter
                            text-[5vw] font-extrabold sm:tracking-normal uppercase`}>
                            24/7
                        </h1>
                        <div className='w-full flex flex-row justify-between'>
                            <div className='flex flex-row items-center'>
                                <div>
                                    <img src="/img/icon.svg" width={35} className='mr-[1vw]' />
                                </div>
                                <div className='tracking-tighter text-[0.6vw] font-semibold sm:tracking-normal uppercase text-white bg-black p-2'>
                                    CLOUD
                                </div>
                            </div>
                            <div className={`footText ${styles.footText} tracking-tighter
                                text-[5vw] font-extrabold sm:tracking-normal uppercase`}>
                                chat with me
                            </div>
                            <div className='flex flex-row items-center gap-5'>
                                <div className='tracking-tighter text-[0.6vw] font-semibold sm:tracking-normal uppercase text-white bg-black p-2'>
                                    CLOUD
                                </div>
                                <div>
                                    <img src="/img/icon.svg" width={35} className='mr-[1vw]' />
                                </div>
                            </div>
                        </div>
                        <div className='flex flex-col justify-center items-center text-center gap-2 p-5'>
                            <div className={`tracking-tighter text-base font-medium sm:tracking-normal`}>
                                Just kidding, if you really want to chat with me.
                            </div>
                            <div className={`tracking-tighter text-base font-medium sm:tracking-normal`}>
                                Please do so between 10:00-20:00 Beijing time on weekdays.
                            </div>
                        </div>

                    </div>

                    <div className='w-full flex justify-center ml-[11vw]'>
                        {/* 下划线组件，用来添加一个分隔线 */}
                        <UnderLine marginBottom='3vw' marginTop='3vw' />
                    </div>

                    {/* 社交信息、地址和联系方式区域 */}
                    <div className=" sm:flex items-center justify-between ml-[13vw] mr-[13vw] gap-[12vw]">
                        {/* 联系方式部分 */}
                        <div className="first flex flex-col gap-10">
                            <h3 className="sm:text-[1.2vw] font-semibold">Say Hi!</h3>
                            <div className="youngMan overflow-hidden scale-125 ml-[1vw]">
                                <YoungMan />
                            </div>
                        </div>

                        <div className="middle space-y-2 ml-[5vw]">
                            {/* 社交部分标题 */}
                            <div className="flex gap-5 flex-row mb-[1.5vw] sm:text-[1.2vw] text-[1vw] items-center justify-start text-center  text-black text-xl font-medium">
                                <img src="/img/emoji/heart.svg" alt="emoji" width="40" height="40" className="inline-block" />
                                <p>
                                    Socials
                                </p>
                            </div>
                            {/* 渲染社交链接 */}
                            {socialLinks.map((item, index) => {
                                return (
                                    <div id='socialLinkKey' key={index}
                                        className='relative flex flex-col text-[3.4vw] leading-[5vw] 
                                    sm:text-[.7vw] sm:leading-[1.4vw] font-medium'
                                    >
                                        {/* 渲染每个社交链接的组件 */}
                                        <AnimatedLink item={item} />
                                    </div>
                                )
                            })}
                        </div>

                        {/* 地址部分 */}
                        <div className="last space-y-2">
                            <div className="flex gap-3 w-auto flex-row mb-[1.5vw] sm:text-[1.2vw] text-[1vw] items-center justify-start text-center text-black text-xl font-medium">
                                <img src="/img/emoji/pain.svg" alt="emoji" width="40" height="40" className="inline-block" />
                                <p>
                                    Address
                                </p>
                            </div>
                            <h2 className="text-[3.4vw] leading-[5vw] sm:text-[0.7vw] sm:leading-[1.4vw] font-medium">No.10 Shangdi 10th Street</h2>
                            <h2 className="text-[3.4vw] leading-[5vw] sm:text-[0.7vw] sm:leading-[1.4vw] font-medium">Haidian District</h2>
                            <h2 className="text-[3.4vw] leading-[5vw] sm:text-[0.7vw] sm:leading-[1.4vw] font-medium">Beijing | China</h2>
                        </div>
                    </div>

                    {/* 底部的分隔线 */}
                    <div className='w-full flex justify-center ml-[11vw]'>
                        {/* 下划线组件，用来添加一个分隔线 */}
                        <UnderLine marginBottom='3vw' marginTop='3vw' />
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Contact
