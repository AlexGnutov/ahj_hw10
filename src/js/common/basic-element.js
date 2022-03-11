import { create } from '../utils/utils';

export default class BasicElement {
  constructor(containerClassName) {
    this.container = create('div', containerClassName);
  }

  bindToDOM(parent) {
    parent.appendChild(this.container);
  }

  html() {
    return this.container;
  }
}
