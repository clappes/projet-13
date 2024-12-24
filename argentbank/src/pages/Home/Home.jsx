import React from "react";

import info from "../../data/info.json";
import FeatureItem from "../../components/FeatureItem/FeatureItem";

const Home = () => {
  return (
    <div>
      <div className="hero">
        <section className="hero-content">
          <h2 className="sr-only">Promoted Content</h2>
          <p className="subtitle">No fees.</p>
          <p className="subtitle">No minimum deposit.</p>
          <p className="subtitle">High interest rates.</p>
          <p className="text">Open a savings account with Argent Bank today!</p>
        </section>
      </div>
      {info.card.map((item) => (
        <FeatureItem h3={item.title} p={item.paragraph} src={item.icon} alt="alt" />
      ))}
    </div>
  );
};

export default Home;