import React from 'react';
import BackgroundEffects from './components/BackgroundEffects/BackgroundEffects';
import Header from './components/Header/Header';
import TeamGrid from './components/TeamGrid/TeamGrid';
import TEAM from './data/teamData';
import './team.css';

function Team() {
  return (
    <div className="team">
      <BackgroundEffects />

      <section className="team__content">
        <Header />
        <TeamGrid team={TEAM} />
      </section>
    </div>
  );
}

export default Team;