import React from 'react';

interface TextStatsProps {
  text: string;
}

function TextStats({ text }: TextStatsProps) {
  const stats = {
    characters: text.length,
    charactersNoSpaces: text.replace(/\s/g, '').length,
    words: text.trim() ? text.trim().split(/\s+/).length : 0,
    sentences: text.trim() ? text.split(/[.!?]+/).filter(Boolean).length : 0,
    paragraphs: text.trim() ? text.split(/\n\s*\n/).filter(Boolean).length : 0,
    lines: text.trim() ? text.split('\n').length : 0
  };

  const statItems = [
    { label: 'Characters (with spaces)', value: stats.characters },
    { label: 'Characters (no spaces)', value: stats.charactersNoSpaces },
    { label: 'Words', value: stats.words },
    { label: 'Sentences', value: stats.sentences },
    { label: 'Paragraphs', value: stats.paragraphs },
    { label: 'Lines', value: stats.lines }
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {statItems.map(({ label, value }) => (
        <div key={label} className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
          <div className="text-2xl font-bold text-indigo-600">{value}</div>
          <div className="text-sm text-gray-600">{label}</div>
        </div>
      ))}
    </div>
  );
}

export default TextStats;