import View from './view/view';
import Controller from './controller/controller';

export default class Blog {
  constructor(parent) {
    this.view = new View(parent);
    this.controller = new Controller(this.view);
  }
}
