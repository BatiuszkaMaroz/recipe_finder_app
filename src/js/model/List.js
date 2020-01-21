import uniqid from 'uniqid';

export default class List {
  constructor() {
    this.items = [];
  }

  addItem (id, count, unit, ingredient) {
    const item = {
      id,
      count: parseFloat(count),
      unit,
      ingredient,
    }
    this.items.push(item);

    this.persistData();

    return item;
  }

  deleteItem (id) {
    const index = this.items.findIndex(elm => elm.id === id);
    this.items.splice(index, 1);

    this.persistData();
  }

  updateCount (id, newCount) {
    this.items.find(elm => elm.id === id).count = newCount;
  }

  clearList () {
    this.items = [];
    localStorage.setItem('list', '[]');
  }

  persistData() {
    localStorage.setItem('list', JSON.stringify(this.items));
  }

  readStorage() {
    const data = JSON.parse(localStorage.getItem('list'));
    if(data) this.items = data;
  }
}
