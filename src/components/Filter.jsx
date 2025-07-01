import React from 'react';

const types = [
  'Colorless',
  'Darkness',
  'Dragon',
  'Fairy',
  'Fighting',
  'Fire',
  'Grass',
  'Lightning',
  'Metal',
  'Psychic',
  'Water',
];

const rarities = ['Common', 'Uncommon', 'Rare', 'Rare Holo'];
const series = ['Base', 'XY', 'Sun & Moon', 'Sword & Shield', 'Scarlet & Violet'];

export default function Filters({ filters, setFilters }) {
  const toggle = (group, value) => {
    setFilters(prev => {
      const updated = new Set(prev[group]);
      updated.has(value) ? updated.delete(value) : updated.add(value);
      return { ...prev, [group]: [...updated] };
    });
  };

  const renderOptions = (group, options) => (
    <div>
      <h3>{group.charAt(0).toUpperCase() + group.slice(1)}</h3>
      {options.map(opt => (
        <label key={opt} style={{ marginRight: '10px', userSelect: 'none' }}>
          <input
            type="checkbox"
            checked={filters[group].includes(opt)}
            onChange={() => toggle(group, opt)}
          />
          {opt}
        </label>
      ))}
    </div>
  );

  return (
    <div>
      {renderOptions('types', types)}
      {renderOptions('rarities', rarities)}
      {renderOptions('series', series)}
    </div>
  );
}
