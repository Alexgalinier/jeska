import React, { PureComponent } from 'react';
import { Block, Button } from 'a_design-components';
import Input from './Input';
import Loader from './../loader/loader';
import './Entries.css';

export default class Entries extends PureComponent {
  catsLastInput = {};
  groupsLastInput = {};

  componentDidUpdate() {
    const { focusOnCat, focusOnGroup } = this.props;

    if (focusOnCat && this.catsLastInput[focusOnCat]) {
      this.catsLastInput[focusOnCat].focus();
    }

    if (focusOnGroup && this.groupsLastInput[focusOnGroup]) {
      this.groupsLastInput[focusOnGroup].focus();
    }
  }

  render() {
    const { budget, budgetUpdate, budgetRemove, loadBudgetStatus } = this.props;

    const curryOnChange = (id, type, parentType) => e => budgetUpdate(id, type, e.target.value, parentType);
    const curryOnRemove = id => () => budgetRemove(id);

    const formatCat = cat => (
      <div>
        {cat.data.map((_, index) => {
          if (index === cat.data.length - 1) {
            return formatData(_, input => (this.catsLastInput[cat.id] = input));
          }
          return formatData(_);
        })}
        <Button title="+ Ajouter" onClick={curryOnChange(cat.id, '', 'cat')} />
      </div>
    );

    const formatGroup = group => (
      <div key={group.id} className="group">
        <h3>{group.label}</h3>
        {group.data.map((_, index) => {
          if (index === group.data.length - 1) {
            return formatData(_, input => (this.groupsLastInput[group.id] = input));
          }
          return formatData(_);
        })}
        <Button title="+ Ajouter" onClick={curryOnChange(group.id, '', 'group')} />
      </div>
    );

    const formatData = (entry, ref) => (
      <div key={entry.id} className="row">
        <Input
          inputRef={ref}
          key={entry.id + 'label'}
          inputValue={entry.label}
          inputOnChange={curryOnChange(entry.id, 'label')}
        />
        <input
          type="text"
          className="input"
          key={entry.id + 'value'}
          value={entry.value}
          onChange={curryOnChange(entry.id, 'value')}
          maxLength="4"
        />
        <Button title="x" className="square" onClick={curryOnRemove(entry.id)} />
      </div>
    );

    return (
      <div className="Entries">
        {loadBudgetStatus === 'pending' ? <Loader /> : ''}
        {budget.map(cat => (
          <Block key={cat.id} title={cat.label} className={cat.color}>
            {cat.data ? formatCat(cat) : ''}
            {cat.group ? cat.group.map(_ => formatGroup(_)) : ''}
          </Block>
        ))}
      </div>
    );
  }
}
