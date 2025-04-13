import React, { useEffect, useState, useRef } from "react";
import "./CounterSection.css";

const CounterItem = ({ label, target, subtext }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          let start = 0;
          const increment = target / 100;
          const duration = 2000; // 2 seconds
          const interval = duration / 100;

          const counter = setInterval(() => {
            start += increment;
            if (start >= target) {
              setCount(target);
              clearInterval(counter);
            } else {
              setCount(Math.floor(start));
            }
          }, interval);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) observer.observe(ref.current);

    return () => observer.disconnect();
  }, [target]);

  return (
    <div className="counter-item" ref={ref}>
      <span className="counter-number">{count}+</span>
      <p className="counter-label">{label}</p>
      <p className="counter-subtext">{subtext}</p>
    </div>
  );
};

const CounterSection = () => {
  return (
    <section className="counter-section">
      <div className="counter-intro">
        <h2>Bringing Books and Readers Together</h2>
        <p>
          Discover a world of stories, connect with fellow readers, and explore our growing collection.
        </p>
      </div>
      <div className="counter-container">
        <CounterItem label="Readers" target={500000} subtext="Engaged readers diving into new worlds daily." />
        <CounterItem label="Subscribers" target={100000} subtext="Premium members enjoying exclusive content." />
        <CounterItem label="Books" target={50000} subtext="Explore an ever-growing collection of stories." />
      </div>
    </section>
  );
};

export default CounterSection;
