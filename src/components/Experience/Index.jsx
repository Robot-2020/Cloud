import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { expCards } from "../../constants";
import GlowCard from "../../kits/GlowCard";
import UnderLine from '../Underline/Index'

const Experience = () => {

    // 使用GSAP库来创建动画
  useGSAP(() => {
    // Loop through each timeline card and animate them in
    gsap.utils.toArray(".timeline-card").forEach((card) => {
      gsap.from(card, {
        xPercent: -100,    // 卡片从左侧进入
        opacity: 0,        // 起始透明度为 0
        transformOrigin: "left left", // 动画起始点设置为卡片的左上角
        ease: "power2.inOut",         // 使用平滑的加减速动画
        scrollTrigger: {
          trigger: card,   // 触发元素为卡片
          start: "top 80%", // 当卡片顶部距离视口顶部 70% 位置时触发动画
          onUpdate: (self) => {
            gsap.to(card, {
              opacity: self.progress * 2.5, // 根据滚动进度调整透明度
            });
        },
        },
      });
    });

    // 动画时间轴的高度变化
    gsap.to(".timeline", {
      transformOrigin: "bottom bottom", // 设置动画的起始点在时间轴的底部
      ease: "power1.inOut",
      scrollTrigger: {
        trigger: ".timeline", // 触发元素id为时间线
        start: "top 55%", // 时间轴顶部在视口中心时开始动画
        end: "70% center",   // 动画结束点为时间轴位置达到视口的 70%
        onUpdate: (self) => {
          gsap.to(".timeline", {
            scaleY: 1 - self.progress, // 根据滚动进度，缩放时间轴的高度
          });
        },
      },
    });

    // 动画文本出现
    gsap.utils.toArray(".expText").forEach((text) => {
      gsap.from(text, {
        opacity: 0,        // 初始透明度为 0
        xPercent: 0,       // 从左侧进入
        ease: "power2.inOut", // 动画曲线
        scrollTrigger: {
          trigger: text,
          start: "top 80%", // 当文本距离视口顶部 70% 时触发
          toggleActions: "play none none reverse", // 当触发时播放动画，离开视口时反转动画
          onUpdate: (self) => {
            gsap.to(text, {
              opacity: self.progress * 2.5, // 根据滚动进度调整透明度
            });
          },
        },
      });
    }, "<"); // 这个符号表示将动画插入在现有动画的起始位置
  }, []);

  return (
    <section id="experience" className="flex-center justify-center items-center md:mt-60 mt-40 section-padding xl:px-0 ">
      {/* 这个 section 用于展示工作经验部分，使用了 flex 布局来居中 */}
      <div className="w-full h-full md:px-20 mt-40 px-5">
        {/* 设置容器宽度和高度为 100%，并根据屏幕尺寸设置内边距 */}
        <h1 className='font-semibold md:text-10xl text-9xl text-center'>
          Work Experience
        </h1>
        {/* 显示工作经验的标题 */}
 
        <div className="flex justify-center items-center ml-[12vw]">
          
          <UnderLine marginBottom='4vw' marginTop='3vw' />
        </div>

        <div className="mt-32 relative">
          {/* 设置上下外边距为 32，相对定位，为了放置绝对定位的子元素 */}
          
          <div className="relative z-50 xl:space-y-32 space-y-10  ml-[15vw]">
            {/* 使用相对定位，设置 z-index 为 50，防止被其他元素遮挡；设置不同屏幕尺寸下的垂直间距 */}
            
            {expCards.map((card) => (
              <div key={card.title} className="exp-card-wrapper ">
                {/* 遍历 expCards 数组，渲染每个工作经验卡片，使用 title 作为 key */}
                
                <div className="xl:w-2/6">
                  {/* 设置卡片左侧的宽度为 2/6 */}
                  <GlowCard card={card}>
                    {/* 使用自定义的 GlowCard 组件显示每个工作经验卡片 */}
                    <div>
                      <img src={card.imgPath} alt="exp-img" />
                      {/* 渲染卡片的图像，路径为 card.imgPath */}
                    </div>
                  </GlowCard>
                </div>

                <div className="xl:w-4/6">
                  {/* 设置卡片右侧的宽度为 4/6 */}
                  <div className="flex items-start">
                    {/* 使用 flex 布局，子元素顶部对齐 */}
                    
                    <div className="timeline-wrapper ml-[-5.35vw]">
                      <div className="timeline" />
                      {/* 渲染时间轴的主要部分 */}
                      <div className="gradient-line w-5 h-full " />
                      {/* 渲染渐变线，宽度为 1，高度为 100% */}
                    </div>

                    <div className="expText flex xl:gap-20 md:gap-10 gap-5 relative z-20">
                      {/* 使用 flex 布局来排列工作经验文本部分，设置不同屏幕尺寸下的间距 */}
                      
                      <div className="timeline-logo">
                        <img src={card.logoPath} alt="logo" />
                        {/* 渲染公司 logo */}
                      </div>
                      
                      <div>
                        <h1 className="font-semibold text-3xl">{card.title}</h1>
                        {/* 渲染职位标题，使用字体加粗和较大的字体大小 */}
                        <p className="my-5 text-white-50">🗓️&nbsp;{card.date}</p>
                        {/* 渲染工作时间，使用上下外边距 */}
                        <p className="text-[#839CB5] italic">Responsibilities</p>
                        {/* 显示“Responsibilities”字段，设置为灰色斜体 */}
                        
                        <ul className="list-disc ms-5 mt-5 flex flex-col gap-5 text-white-50">
                          {/* 使用无序列表显示职责 */}
                          {card.responsibilities.map((responsibility, index) => (
                            <li key={index} className="text-lg">
                              {responsibility}
                            </li>
                            )
                          )}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience
