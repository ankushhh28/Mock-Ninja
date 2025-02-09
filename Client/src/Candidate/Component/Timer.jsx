import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const bgColors = [
  "bg-red-600",
  "bg-blue-600",
  "bg-green-600",
  "bg-yellow-600",
  "bg-purple-600",
];

export default function Timer() {
  const [count, setCount] = useState(5);
  const [showTagline, setShowTagline] = useState(false);

  useEffect(() => {
    if (count > 1) {
      const timer = setTimeout(() => setCount(count - 1), 1000);
      return () => clearTimeout(timer);
    } else if (count === 1) {
      setTimeout(() => {
        setShowTagline(true);
      }, 1000);
    }
  }, [count]);

  return (
    <div
      className={`flex items-center justify-center h-screen transition-colors duration-1000 ${
        !showTagline ? bgColors[count - 1] : "bg-black"
      } relative`}
    >
      {!showTagline ? (
        <div className="relative w-64 h-64 border-4 border-gray-300 rounded-full flex items-center justify-center shadow-xl">
          <div className="absolute w-56 h-56 border-4 border-gray-300 rounded-full bg-gray-800"></div>
          <motion.div
            className="absolute w-full h-full border-8 border-transparent border-t-white rounded-full"
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
          ></motion.div>
          <motion.span
            key={count}
            className="absolute text-white text-6xl font-extrabold"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.5 }}
          >
            {count}
          </motion.span>
        </div>
      ) : (
        <motion.div
          className="text-white text-6xl font-extrabold flex"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          {"Let's crack it!".split(" ").map((word, wordIndex) => (
            <div key={wordIndex} className="mr-2 flex">
              {word.split("").map((letter, letterIndex) => (
                <motion.span
                  key={letterIndex}
                  className="inline-block"
                  initial={{ opacity: 0, y: -50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.5,
                    delay: wordIndex * 0.6 + letterIndex * 0.1,
                  }}
                >
                  {letter}
                </motion.span>
              ))}
            </div>
          ))}
        </motion.div>
      )}
    </div>
  );
}
