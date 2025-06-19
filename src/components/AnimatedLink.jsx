import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { useState } from 'react';


export default function AnimatedLink({item}) {
    const [isHovered, setisHovered] = useState(false);
  return (
    <motion.div className="cursor-pointer relative overflow-hidden"
        onMouseEnter={() => setisHovered(true)}
        onMouseLeave={() => setisHovered(false)}
    >
        <AnimatedWord item={item} animation={letterAnimation} isHovered={isHovered} />
        {/* <div className='absolute top-0'>
            <AnimatedWord item={item} animation={letterAnimationTwo} isHovered={isHovered} />
        </div> */}
        
    </motion.div>
  )
}

const titleAnimation = {
    rest: {
        transition: {
            staggerChildren: 0.035,
        }
    },
    hover: {
        transition: {
            staggerChildren: 0.035,
        }
    }
}

const letterAnimation = {
    rest: {
        y: 0,
    },
    hover: {
        y: -35,
        transition: {
            duration: 0.2,
            ease: [.3,.86,.36,.95],
            type: "spring",
            stiffness: 100
        },
    },
}


AnimatedLink.propTypes = {
    item: PropTypes.string.isRequired,  
};

const AnimatedWord = ({item, animation, isHovered}) => {
    return (
        <motion.span 
            variants={titleAnimation}
            initial="rest"
            animate={isHovered ? "hover" : "rest"}
            className="relative whitespace-nowrap">
            {item.title.split("").map((character, i) => 
                character === " " ? (<span key={i}> &nbsp;</span>) : 
                (
                    <motion.span key={i} variants={animation} className="relative inline-block whitespace-nowrap">
                        {character}
                    </motion.span>
                )
            )}
        </motion.span>
    )
} 

AnimatedWord.propTypes = {
    item: PropTypes.string.isRequired,
    animation: PropTypes.object.isRequired,
    isHovered: PropTypes.bool.isRequired,  
};