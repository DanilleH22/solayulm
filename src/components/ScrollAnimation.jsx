import React, { useRef, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'framer-motion';

const ScrollAnimation = ({ children, animationVariants, className }) => {
  const ref = useRef(null);
  const isInView = useInView(ref);
  const controls = useAnimation();

  // React to visibility changes
  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    } else {
      controls.start("hidden");
    }
  }, [isInView, controls]);

  // Default animation if none provided
  const defaultVariants = {
    hidden: { opacity: 0, x: 100 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8 } },
  };

  return (
    <motion.div
      ref={ref}
      variants={animationVariants || defaultVariants}
      initial="hidden"
      animate={controls}
      className={className}
    >
        <motion.div  
                  initial={{ y: 0 }}
                  animate={{ y: [0, -5, 0], rotate: [0, 0.5, 0] }} // floating effect
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
      {children}
      </motion.div>
    </motion.div>
  );
};

export default ScrollAnimation;