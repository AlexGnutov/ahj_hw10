import BasicElement from '../common/basic-element';
import CoordinatesForm from '../elements/coordinates-form';
import TextPost from '../posts/text-post';
import PostContainer from '../elements/post-container';
import ControlBar from '../elements/control-bar';
import AudioPost from '../posts/audio-post';
import VideoPost from '../posts/video-post';

export default class View extends BasicElement {
  constructor(parent) {
    super('bt-container');
    this.postContainer = new PostContainer();
    this.postContainer.bindToDOM(this.container);
    this.controlBar = new ControlBar();
    this.controlBar.bindToDOM(this.container);
    this.coordinatesForm = new CoordinatesForm();
    this.coordinatesForm.bindToDOM(this.container);
    this.coordinatesForm.hideForm();
    parent.appendChild(this.container);
  }

  createNewTextPost(text, coordinates) {
    const textPost = new TextPost(text, coordinates);
    textPost.bindToDOM(this.postContainer.html());
    this.clearControlBarInput();
  }

  createNewAudioPost(uri, coordinates) {
    const audioPost = new AudioPost(uri, coordinates);
    audioPost.bindToDOM(this.postContainer.html());
  }

  createNewVideoPost(uri, coordinates) {
    const videoPost = new VideoPost(uri, coordinates);
    videoPost.bindToDOM(this.postContainer.html());
  }

  clearControlBarInput() {
    this.controlBar.clearInput();
  }

  hideCoordinatesForm() {
    this.coordinatesForm.hideForm();
  }

  showCoordinatesForm(reason) {
    this.coordinatesForm.showForm(reason);
  }
}
