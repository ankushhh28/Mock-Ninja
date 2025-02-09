import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

const CountdownAnimation = ({setCount}) => {
  const countdownRef = useRef(null);
  const [count, setCounts] = useState(3);

  setTimeout(() => {
    setCount(true)
    sessionStorage.setItem("count", JSON.stringify(true)); // Persist value
  }, 3300);
  

  useEffect(() => {
    if (count > 0) {
      gsap.fromTo(
        countdownRef.current,
        { scale: 0, opacity: 0 },
        { scale: 1.5, opacity: 1, duration: 0.5, ease: "back.out(1.7)" }
      );

      const timer = setTimeout(() => setCounts(count - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [count]);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        color: "white",
        fontWeight: "bold",
        position: "relative",
        overflow: "hidden",
      }}
      className="bg-gradient-to-br from-purple-200 to-purple-700"
    >
      {/* Countdown */}
      {count > 0 && (
        <div
          ref={countdownRef}
          style={{
            position: "absolute",
            textShadow: "0 0 20px #ffffff",
          }}
          className="text-[10rem] sm:text-[12rem]"
        >
          {count}
        </div>
      )}
    </div>
  );
};

export default CountdownAnimation;
