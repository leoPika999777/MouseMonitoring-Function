import React, { useEffect } from 'react';
import styles from "@/styles/Mouse.module.css";

export default function Mouse() {
  useEffect(() => {
    const eyes = document.querySelectorAll(".eye");

    const handleMouseMove = (event) => {
      eyes.forEach((eye) => {
        const rect = eye.getBoundingClientRect();
        const dx = event.pageX - rect.x;
        const dy = event.pageY - rect.y;
        const ang = (Math.atan2(dy, dx) / Math.PI) * 180;
        eye.style.transform = `rotate(${ang}deg)`;
      });
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []); // Empty dependency array means this effect runs once on mount

  return (
    <div className={styles["face"]}>
      <div className={styles["eye"]}>
        <div className={styles["eye-white"]}></div>
        <div className={styles["eye-black"]}></div>
      </div>
      <div className={styles["eye"]}></div>
      <div className={styles["eye"]}></div>
    </div>
  );
}
