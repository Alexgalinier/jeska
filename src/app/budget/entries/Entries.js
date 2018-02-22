import React from 'react';
import { Block } from 'a_design-components';
import Input from './Input';
import './Entries.css';

export default ({ budget, onChange }) => {
  const curryOnChange = (id, type) => e => onChange(id, type, e.target.value);

  const formatGroup = group => (
    <div key={group.id} className="group">
      <h3>{group.label}</h3>
      {group.data.map(_ => formatData(_))}
    </div>
  );

  const formatData = entry => (
    <div key={entry.id} className="row">
      <Input key={entry.id + 'label'} inputValue={entry.label} inputOnChange={curryOnChange(entry.id, 'label')} />
      <Input key={entry.id + 'value'} inputValue={entry.value} inputOnChange={curryOnChange(entry.id, 'value')} />
      <div className="square"> </div>
    </div>
  );

  return (
    <div className="Entries _p25 _br1 _bc-grey1">
      {budget.map(cat => (
        <Block key={cat.id} title={cat.label} className={cat.color}>
          {cat.data ? cat.data.map(_ => formatData(_)) : ''}
          {cat.group ? cat.group.map(_ => formatGroup(_)) : ''}
        </Block>
      ))}
    </div>
  );
};
