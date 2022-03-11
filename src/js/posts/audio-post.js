import BasicElement from '../common/basic-element';

export default class AudioPost extends BasicElement {
  constructor(uri, coordinates) {
    super('text-post-container');
    this.markup = `
      <div class="text-post-header">${new Date().toLocaleString()}</div>
      <audio src="${uri}" controls></audio>
      <div class="text-post-footer">${coordinates.toString()}</div>
    `;
    this.container.innerHTML = this.markup;
  }
}
