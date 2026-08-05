import React, { useState } from 'react';
import TeamRow from '../TeamRow/TeamRow';
import { chunkArray } from '../../utils/helpers';
import './TeamGrid.css';

const COLUMNS_PER_ROW = 5;

function TeamGrid({ team }) {
  const rows = chunkArray(team, COLUMNS_PER_ROW);
  const [hoveredRow, setHoveredRow] = useState(null);

  return (
    <div className="team-grid">
      {rows.map((row, ri) => (
        <TeamRow
          key={ri}
          row={row}
          rowIndex={ri}
          anyRowHovered={hoveredRow !== null && hoveredRow !== ri}
          onRowHover={(on) => setHoveredRow(on ? ri : null)}
        />
      ))}
    </div>
  );
}

export default TeamGrid;