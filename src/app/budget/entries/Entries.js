import React from 'react';
import { Block } from 'a_design-components';
import Input from './Input';
import './Entries.css';

export default ({ budget, onChange }) => {
  const curryOnChange = (id, type, parentType) => e => onChange(id, type, e.target.value, parentType);

  const formatCat = cat => (
    <div>
      {cat.data.map(_ => formatData(_))}
      <div key={cat.id + 'new-entry'} className="row">
        <Input
          key={cat.id + 'new-label'}
          inputValue={cat.newLabel}
          inputOnChange={curryOnChange(cat.id, 'label', 'cat')}
        />
        <Input
          key={cat.id + 'new-value'}
          inputValue={cat.newValue}
          inputOnChange={curryOnChange(cat.id, 'value', 'cat')}
        />
        <div className="square"> </div>
      </div>
    </div>
  );

  const formatGroup = group => (
    <div key={group.id} className="group">
      <h3>{group.label}</h3>
      {group.data.map(_ => formatData(_))}
      <div key={group.id + 'new-entry'} className="row">
        <Input
          key={group.id + 'new-label'}
          inputValue={group.newLabel}
          inputOnChange={curryOnChange(group.id, 'label', 'group')}
        />
        <Input
          key={group.id + 'new-value'}
          inputValue={group.newValue}
          inputOnChange={curryOnChange(group.id, 'value', 'group')}
        />
        <div className="square"> </div>
      </div>
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
          {cat.data ? formatCat(cat) : ''}
          {cat.group ? cat.group.map(_ => formatGroup(_)) : ''}
        </Block>
      ))}
    </div>
  );
};
