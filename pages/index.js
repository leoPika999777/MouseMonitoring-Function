import React, { useEffect, useRef, useState } from "react";
import styles from "@/styles/index.module.css";

export default function Mouse() {
  const [eyeTransforms, setEyeTransforms] = useState(
    Array.from({ length: 3 }, () => "rotate(0deg)")
  );
  const eyeRefs = useRef(Array.from({ length: 3 }, () => React.createRef()));
  const [showHello, setShowHello] = useState(false);

  useEffect(() => {
    const handleMouseMove = (event) => {
      const newTransforms = eyeRefs.current.map((eyeRef) => {
        const rect = eyeRef.current.getBoundingClientRect();
        const dx = event.pageX - rect.x;
        const dy = event.pageY - rect.y;
        const ang = (Math.atan2(dy, dx) / Math.PI) * 180;
        return `rotate(${ang}deg)`;
      });

      // 取得螢幕寬高
      const screenWidth = window.innerWidth;
      const screenHeight = window.innerHeight;

      // 設定判斷門檻值為螢幕寬高的10%
      const thresholdX = screenWidth * 0.1;
      const thresholdY = screenHeight * 0.1;

      // 判斷滑鼠是否在螢幕右邊10%以及最上方10%的位置
      if (event.pageX > screenWidth - thresholdX && event.pageY < thresholdY) {
        setShowHello(true);
      } else {
        setShowHello(false);
      }

      setEyeTransforms(newTransforms);
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <>
    <div className={styles["body"]}>
    <div className={styles["face"]}>
      <img src="/image/dragon.png" />
      {Array.from({ length: 3 }).map((_, index) => (
        <div
          key={index}
          className={styles.eye}
          ref={eyeRefs.current[index]}
          style={{
            left: [170, 300, 450][index],
            top: [280, 160, 280][index],
            transform: eyeTransforms[index],
          }}
        >
          <div className={styles["eye-white"]}></div>
          <div className={styles["eye-black"]}></div>
        </div>
      ))}
      {showHello && (
        <div className={styles["hello"]}>
          <div className={styles["helloimg"]}>
            <img src="/image/hello-01.png" />
          </div>
          <div className={styles["hellop"]}>你要離開了嗎</div>
        </div>
      )}
    </div>
    </div>
    

    </>
    
  );
}
