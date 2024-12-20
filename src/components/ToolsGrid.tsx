import React from 'react';
import ToolCard from './shared/ToolCard';
import { mainTools } from '../constants/tools';

function ToolsGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {mainTools.map((tool) => (
        <ToolCard key={tool.id} {...tool} />
      ))}
    </div>
  );
}

export default ToolsGrid;