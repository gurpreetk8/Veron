import React from "react";
import "./UpcomingReleases.css";

const UpcomingReleases = () => {
  return (
    <section className="upcoming-releases">
      <h2>Upcoming Releases</h2>
      <div className="releases-grid">
        <div className="release-card">
          <img src="https://i.pinimg.com/474x/ed/8c/4c/ed8c4c297d1d66cd871db02c4d4a6575.jpg" alt="Book 1" className="release-cover" />
          <h3>New Horizons</h3>
          <p>by Jane Smith</p>
          <p className="release-date">Releasing on: April 15, 2025</p>
        </div>
        <div className="release-card">
          <img src="/path-to-book2.jpg" alt="Book 2" className="release-cover" />
          <h3>Beyond the Stars</h3>
          <p>by Alex Turner</p>
          <p className="release-date">Releasing on: May 10, 2025</p>
        </div>
        {/* Add more upcoming books here */}
      </div>
    </section>
  );
};

export default UpcomingReleases;
