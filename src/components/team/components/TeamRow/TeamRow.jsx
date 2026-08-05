import React, { useState } from 'react';
import TeamCard from '../TeamCard/TeamCard';
import useScrollReveal from '../../hooks/useScrollReveal';
import './TeamRow.css';

const COLUMNS_PER_ROW = 5;
const STAGGER_DELAY_MS = 90;

function TeamRow({ row, rowIndex, anyRowHovered, onRowHover }) {
  const { ref, visible } = useScrollReveal();
  const [hoveredIdx, setHoveredIdx] = useState(null);

  const isIncompleteRow = row.length < COLUMNS_PER_ROW;

  return (
    <div
      ref={ref}
      className={`team-row ${
        isIncompleteRow ? 'team-row--centered' : 'team-row--stretch'
      }`}
    >
      {row.map((member, ci) => {
        const dimmed =
          (hoveredIdx !== null && hoveredIdx !== ci) ||
          (anyRowHovered && hoveredIdx === null);

        return (
          <div
            key={member.name}
            className={`team-row__cell ${
              isIncompleteRow ? 'team-row__cell--fixed' : 'team-row__cell--full'
            }`}
          >
            <TeamCard
              member={member}
              index={rowIndex * COLUMNS_PER_ROW + ci}
              revealed={visible}
              delay={ci * STAGGER_DELAY_MS}
              dimmed={dimmed}
              onHover={(on) => {
                setHoveredIdx(on ? ci : null);
                onRowHover(on);
              }}
            />
          </div>
        );
      })}
    </div>
  );
}

export default TeamRow;