import React, { useEffect, useRef, useState } from 'react'
import styles from './Style.module.css'
import TitleCard from '../../modules/TitleCard'

const FlipTitleCard = ({
    imageSrc,
    backImgSrc,
    altText = "Tilted card image",
    captionText = "",
    containerHeight = "400px",
    containerWidth = "320%",
    imageHeight = "400px",
    imageWidth = "320px",
    scaleOnHover = 1.2,
    rotateAmplitude = 6,
    showMobileWarning = false,
    showTooltip = false,
    overlayContent = null,
    displayOverlayContent = true,
    backTitle="",
    backContent= "",
}) => {
  
  const titleCardRef = useRef(null);

  const [isFlipped, setIsFlipped] = useState(false);

  return (
      <div className={`titleCard ${styles.titleCard} ${styles.flipCard}`}
        onClick={() => setIsFlipped(!isFlipped)}>
        <div className={`${styles.flipCardInner} ${isFlipped ? styles.flipped : ''}`}>
          <div ref={titleCardRef} className={styles.flipCardFront}>
            <TitleCard
              imageSrc={imageSrc}
              altText={altText}
              captionText={captionText}
              containerHeight={containerHeight}
              containerWidth={containerWidth}
              imageHeight={imageHeight}
              imageWidth={imageWidth}
              rotateAmplitude={rotateAmplitude}
              scaleOnHover={scaleOnHover}
              showMobileWarning={showMobileWarning}
              showTooltip={showTooltip}
              displayOverlayContent={displayOverlayContent}
              overlayContent={overlayContent}
            />
          </div>
          <div className={styles.flipCardBack} style={{ backgroundImage: `url(${backImgSrc})` }}>
            <div className={styles.backContent} style={{gap: 5}}>
              <h3 className='text-xl font-semibold '>{backTitle}</h3>
              <p className='tracking-tighter'>{backContent}</p>
            </div>
          </div>
        </div>
      </div>
  )
}

export default FlipTitleCard
