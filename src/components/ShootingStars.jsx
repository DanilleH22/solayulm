import React, { useEffect, useState, useRef } from "react";

// Utility function for classNames
const cn = (...classes) => classes.filter(Boolean).join(" ");

// Shooting Stars Component with static stars in the background
const ShootingStars = ({
  minSpeed = 10,
  maxSpeed = 20,
  minDelay = 200,
  maxDelay = 4200,
  starColor = "#9E00FF",
  trailColor = "#2EB9DF",
  starWidth = 20,
  starHeight = 8,
  numStaticStars = 100,
  className,
}) => {
  const [star, setStar] = useState(null);
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== "undefined" ? window.innerWidth : 1600,
    height: typeof window !== "undefined" ? window.innerHeight : 1400,
  });
  const [staticStars, setStaticStars] = useState([]);
  const svgRef = useRef(null);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Initialize static stars
  useEffect(() => {
    const stars = [];
    for (let i = 0; i < numStaticStars; i++) {
      stars.push({
        id: i,
        x: Math.random() * windowSize.width,
        y: Math.random() * windowSize.height,
        radius: Math.random() * 1.5 + 0.5,
        opacity: Math.random() * 0.5 + 0.3,
      });
    }
    setStaticStars(stars);
  }, [windowSize, numStaticStars]);

  // Generate shooting stars
  const getRandomStartPoint = () => {
    const side = Math.floor(Math.random() * 4);
    const offset = Math.random() * windowSize.width;
    switch (side) {
      case 0:
        return { x: offset, y: 0, angle: 45 };
      case 1:
        return { x: windowSize.width, y: offset, angle: 135 };
      case 2:
        return { x: offset, y: windowSize.height, angle: 225 };
      case 3:
        return { x: 0, y: offset, angle: 315 };
      default:
        return { x: 0, y: 0, angle: 45 };
    }
  };

  useEffect(() => {
    const createStar = () => {
      const { x, y, angle } = getRandomStartPoint();
      const newStar = {
        id: Date.now(),
        x,
        y,
        angle,
        scale: 1,
        speed: Math.random() * (maxSpeed - minSpeed) + minSpeed,
        distance: 0,
      };
      setStar(newStar);
      const randomDelay = Math.random() * (maxDelay - minDelay) + minDelay;
      setTimeout(createStar, randomDelay);
    };

    createStar();
  }, [minSpeed, maxSpeed, minDelay, maxDelay, windowSize]);

  // Animate shooting star
  useEffect(() => {
    let animationFrame;
    const moveStar = () => {
      if (star) {
        setStar((prevStar) => {
          if (!prevStar) return null;
          const newX =
            prevStar.x +
            prevStar.speed * Math.cos((prevStar.angle * Math.PI) / 180);
          const newY =
            prevStar.y +
            prevStar.speed * Math.sin((prevStar.angle * Math.PI) / 180);
          const newDistance = prevStar.distance + prevStar.speed;
          const newScale = 1 + newDistance / 100;
          if (
            newX < -20 ||
            newX > windowSize.width + 20 ||
            newY < -20 ||
            newY > windowSize.height + 20
          ) {
            return null;
          }
          return { ...prevStar, x: newX, y: newY, distance: newDistance, scale: newScale };
        });
      }
      animationFrame = requestAnimationFrame(moveStar);
    };
    moveStar();
    return () => cancelAnimationFrame(animationFrame);
  }, [star, windowSize]);

  return (
    <svg ref={svgRef} className={cn("w-full h-full absolute inset-0", className)}>
      {/* Static stars in the background */}
      {staticStars.map((s) => (
        <circle key={s.id} cx={s.x} cy={s.y} r={s.radius} fill="#fff" opacity={s.opacity} />
      ))}

      {/* Shooting star */}
      {star && (
        <rect
          key={star.id}
          x={star.x}
          y={star.y}
          width={starWidth * star.scale}
          height={starHeight}
          fill="url(#gradient)"
          transform={`rotate(${star.angle}, ${
            star.x + (starWidth * star.scale) / 2
          }, ${star.y + starHeight / 2})`}
        />
      )}

      <defs>
        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: trailColor, stopOpacity: 0 }} />
          <stop offset="100%" style={{ stopColor: starColor, stopOpacity: 1 }} />
        </linearGradient>
      </defs>
    </svg>
  );
};

// Main component combining multiple shooting stars layers
const SpaceBackground = () => {
  return (
    <div className="absolute inset-0">
      <ShootingStars
        starColor="#9E00FF"
        trailColor="#2EB9DF"
        minSpeed={15}
        maxSpeed={20}
        minDelay={1000}
        maxDelay={3000}
      />
      <ShootingStars
        starColor="#FF0099"
        trailColor="#FFB800"
        minSpeed={10}
        maxSpeed={15}
        minDelay={2000}
        maxDelay={4000}
      />
      <ShootingStars
        starColor="#00FF9E"
        trailColor="#00B8FF"
        minSpeed={20}
        maxSpeed={20}
        minDelay={1500}
        maxDelay={3500}
      />
      
    </div>
  );
};

export default SpaceBackground;
