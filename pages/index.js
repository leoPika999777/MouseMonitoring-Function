import React, { useEffect, useRef, useState } from 'react';
import styles from "@/styles/Mouse2.module.css";

export default function Mouse() {
  const [eyeTransforms, setEyeTransforms] = useState(Array.from({ length: 3 }, () => "rotate(0deg)"));
  const eyeRefs = useRef(Array.from({ length: 3 }, () => React.createRef()));

  useEffect(() => {
    const handleMouseMove = (event) => {
      const newTransforms = eyeRefs.current.map((eyeRef) => {
        const rect = eyeRef.current.getBoundingClientRect();
        const dx = event.pageX - rect.x;
        const dy = event.pageY - rect.y;
        const ang = (Math.atan2(dy, dx) / Math.PI) * 180;
        return `rotate(${ang}deg)`;
      });

      setEyeTransforms(newTransforms);
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div className={styles["face"]}>
      <img src="/image/dragon.png" />
      {Array.from({ length: 3 }).map((_, index) => (
        <div key={index} className={styles.eye} ref={eyeRefs.current[index]} style={{ left: [170, 300, 450][index], top: [280, 160, 280][index], transform: eyeTransforms[index] }}>
          <div className={styles["eye-white"]}></div>
          <div className={styles["eye-black"]}></div>
        </div>
      ))}
    </div>
  );
}
