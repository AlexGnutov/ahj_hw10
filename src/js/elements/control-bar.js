import BasicElement from '../common/basic-element';

export default class ControlBar extends BasicElement {
  constructor() {
    super('control-bar');
    this.markup = `
      <form class="cb-form">
        <input class="cb-input" name="text">
        <div class="cb-controls-standard cb-controls">
            <button class="cb-start-audio cb-button" type="button"></button>
            <button class="cb-start-video cb-button" type="button"></button>
        </div>
        <div class="cb-controls-audio cb-controls hidden">
            <button class="cb-stop-audio cb-button" type="button"></button>
            <button class="cb-cancel-audio cb-button" type="button"></button>
        </div>
        <div class="cb-controls-video cb-controls hidden">
            <button class="cb-stop-video cb-button" type="button"></button>
            <button class="cb-cancel-video cb-button" type="button"></button>
        </div>
      </form>
    `;
    this.container.innerHTML = this.markup;
    // Links to elements
    this.form = this.container.querySelector('.cb-form');
    this.startAudio = this.container.querySelector('.cb-start-audio');
    this.stopAudio = this.container.querySelector('.cb-stop-audio');
    this.cancelAudio = this.container.querySelector('.cb-cancel-audio');
    this.startVideo = this.container.querySelector('.cb-start-video');
    this.stopVideo = this.container.querySelector('.cb-stop-video');
    this.cancelVideo = this.container.querySelector('.cb-cancel-video');
    this.input = this.container.querySelector('.cb-input');
    this.standardControls = this.container.querySelector('.cb-controls-standard');
    this.audioControls = this.container.querySelector('.cb-controls-audio');
    this.videoControls = this.container.querySelector('.cb-controls-video');
  }

  clearInput() {
    this.input.value = '';
  }

  switchToStandardControls() {
    this.standardControls.classList.remove('hidden');
    this.audioControls.classList.add('hidden');
    this.videoControls.classList.add('hidden');
  }

  switchToAudioControls() {
    this.standardControls.classList.add('hidden');
    this.audioControls.classList.remove('hidden');
  }

  switchToVideoControls() {
    this.standardControls.classList.add('hidden');
    this.videoControls.classList.remove('hidden');
  }
}
