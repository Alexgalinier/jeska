import flatMap from 'lodash/flatMap';
import { budgetExample3entry, budgetExample3cat, budgetExample3group } from './Budget.example';

const MAX_BASE = 1000;

class BudgetServiceClass {
  constructor() {
    this.cats = budgetExample3cat;
    this.group = budgetExample3group;
    this.entries = budgetExample3entry;

    this.budget = this.cats.map(cat => {
      if (cat.data) {
        cat.data = cat.data.map(entryId => this.entries.filter(_ => _.id === entryId)[0]);
      }
      if (cat.group) {
        cat.group = cat.group.map(groupId => {
          const group = this.group.filter(_ => _.id === groupId)[0];
          group.data = group.data.map(entryId => this.entries.filter(_ => _.id === entryId)[0]);
          return group;
        });
      }

      return cat;
    });
  }

  maxBudget() {
    const max = this.budget
      .map(_ => {
        if (_.group) {
          return flatMap(_.group, _ => _.data).reduce((acc, entry) => acc + entry.value, 0);
        }

        return _.data.reduce((acc, entry) => acc + entry.value, 0);
      })
      .reduce((max, catMax) => (catMax > max ? catMax : max), 0);
    return max > MAX_BASE ? Math.ceil(max / 100) * 100 : MAX_BASE;
  }

  updateBudget(id, type, val) {
    return new Promise((res, rej) => {
      console.log(this.entries);
      this.entries = this.entries.map(entry => {
        if (entry.id !== id) return entry;

        switch (type) {
          case 'value':
            entry['value'] = Number(val);
            break;
          case 'label':
          default:
            entry['label'] = val;
            break;
        }

        return entry;
      });
      res();
    });
  }

  fetchBudget = () => {
    return new Promise((res, rej) => {
      res(this.budget);
    });
  };

  byId(id) {
    return flatMap(this.budget, _ => _.data)
      .filter(_ => _.id === id)
      .pop();
  }
}

export const BudgetService = new BudgetServiceClass();
