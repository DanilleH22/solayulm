import React from "react";
import Wave from "react-wavify";

const WavesBackground = () => {
  return (
    <div
      style={{
        width: "400px",
        height: "300px",
        borderRadius: "50%",
        overflow: "hidden",
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transform: 'translate(-5%, 2%)',
        
      }}
    >
      {/* First wave layer */}
      <Wave
        fill="url(#gradient1)"
        paused={false}
        options={{
          height: 20,
          amplitude: 30,
          speed: 0.15,
          points: 4,
        }}
        style={{ position: "absolute", bottom: 0, width: "100%" }}
      >
        <defs>
          <linearGradient id="gradient1" gradientTransform="rotate(90)">
           
            <stop offset="10%" stopColor="#2c9ecf" />
            <stop offset="50%" stopColor="#6a74cf" />
            <stop offset="90%" stopColor="#9b6acc" />
          </linearGradient>
        </defs>
      </Wave>

      {/* Second wave layer */}
      <Wave
        fill="url(#gradient2)"
        paused={false}
        options={{
          height: 40,
          amplitude: 25,
          speed: 0.2,
          points: 4,
        }}
        style={{ position: "absolute", bottom: 0, width: "100%" }}
      >
        <defs>
          <linearGradient id="gradient2" gradientTransform="rotate(90)">
             <stop offset="10%" stopColor="#38bdf8" />
            <stop offset="50%" stopColor="#818cf8" />
            <stop offset="90%" stopColor="#c084fc" />
          </linearGradient>
        </defs>
      </Wave>

      {/* Third wave layer */}

      <Wave
        fill="url(#gradient3)"
        paused={false}
        options={{
          height: 60,
          amplitude: 35,
          speed: 0.25,
          points: 4,
        }}
        style={{ position: "absolute", bottom: 0, width: "100%" }}
      >
        <defs>
          <linearGradient id="gradient3" gradientTransform="rotate(90)">
             <stop offset="10%" stopColor="#2b98c7ff" />
            <stop offset="50%" stopColor="#6670c8ff" />
            <stop offset="90%" stopColor="#9b6bcbff" />
          </linearGradient>
        </defs>
      </Wave>

       {/* Fourth wave layer */}
      <Wave
        fill="url(#gradient4)"
        paused={false}
        options={{
          height: 80,
          amplitude: 40,
          speed: 0.2,
          points: 4,
        }}
        style={{ position: "absolute", bottom: 0, width: "100%" }}
      >
        <defs>
          <linearGradient id="gradient4" gradientTransform="rotate(90)">
             <stop offset="10%" stopColor="#38bdf8" />
            <stop offset="50%" stopColor="#818cf8" />
            <stop offset="90%" stopColor="#c084fc" />
          </linearGradient>
        </defs>
      </Wave>
      
    </div>
  );
};

export default WavesBackground;
