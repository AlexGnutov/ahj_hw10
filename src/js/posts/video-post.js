import BasicElement from '../common/basic-element';

export default class VideoPost extends BasicElement {
  constructor(uri, coordinates) {
    super('text-post-container');
    this.markup = `
      <div class="text-post-header">${new Date().toLocaleString()}</div>
      <video src="${uri}" controls width="300px"></video>
      <div class="text-post-footer">${coordinates.toString()}</div>
    `;
    this.container.innerHTML = this.markup;
  }
}
