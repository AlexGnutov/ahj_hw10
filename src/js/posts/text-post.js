import BasicElement from '../common/basic-element';

export default class TextPost extends BasicElement {
  constructor(text, coordinates) {
    super('text-post-container');
    this.markup = `
      <div class="text-post-header">${new Date().toLocaleString()}</div>
      <div class="text-post-content"></div>
      <div class="text-post-footer">${coordinates.toString()}</div>
    `;
    this.container.innerHTML = this.markup;
    this.container.querySelector('.text-post-content').innerText = text;
  }
}
