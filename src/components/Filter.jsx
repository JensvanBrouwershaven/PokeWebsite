import React, { useState } from 'react';

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

const rarities = [
  "Amazing Rare",
  "Common",
  "LEGEND",
  "Promo",
  "Rare",
  "Rare ACE",
  "Rare BREAK",
  "Rare Holo",
  "Rare Holo EX",
  "Rare Holo GX",
  "Rare Holo LV.X",
  "Rare Holo Star",
  "Rare Holo V",
  "Rare Holo VMAX",
  "Rare Prime",
  "Rare Prism Star",
  "Rare Rainbow",
  "Rare Secret",
  "Rare Shining",
  "Rare Shiny",
  "Rare Shiny GX",
  "Rare Ultra",
  "Uncommon"
];

const series = ['Base', 'XY', 'Sun & Moon', 'Sword & Shield', 'Scarlet & Violet'];

export default function Filters({ filters, setFilters }) {
  const [openSection, setOpenSection] = useState(null);

  const toggle = (group, value) => {
    setFilters(prev => {
      const updated = new Set(prev[group]);
      updated.has(value) ? updated.delete(value) : updated.add(value);
      return { ...prev, [group]: [...updated] };
    });
  };

  const renderOptions = (group, options) => (
    <div style={{ padding: '8px 0' }}>
      {options.map(opt => (
        <label key={opt} style={{ display: 'block', marginBottom: 4, userSelect: 'none' }}>
          <input
            type="checkbox"
            checked={filters[group].includes(opt)}
            onChange={() => toggle(group, opt)}
            style={{ marginRight: 6 }}
          />
          {opt}
        </label>
      ))}
    </div>
  );

  const renderSection = (title, group, options) => (
    <div style={{ borderBottom: '1px solid #444', marginBottom: 10 }}>
      <button
        onClick={() => setOpenSection(openSection === group ? null : group)}
        style={{
          width: '100%',
          textAlign: 'left',
          padding: '10px',
          fontSize: '1.1em',
          backgroundColor: '#222',
          color: 'white',
          border: 'none',
          cursor: 'pointer',
          outline: 'none',
          userSelect: 'none',
        }}
      >
        {title}
        <span style={{ float: 'right' }}>
          {openSection === group ? '▾' : '▸'}
        </span>
      </button>
      {openSection === group && (
        <div style={{ paddingLeft: 15, backgroundColor: '#333' }}>
          {renderOptions(group, options)}
        </div>
      )}
    </div>
  );

  return (
    <div style={{ width: 250, color: 'white', padding: 10, borderRadius: 6 }}>
      {renderSection('Types', 'types', types)}
      {renderSection('Rarity', 'rarities', rarities)}
      {renderSection('Set', 'series', series)}
    </div>
  );
}
