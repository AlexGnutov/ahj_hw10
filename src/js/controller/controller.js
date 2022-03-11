import GeoService from '../services/geo-service';
import AudioService from '../services/audio-service';
import VideoService from '../services/video-service';

export default class Controller {
  constructor(view) {
    this.view = view;
    this.geoService = new GeoService();
    this.audioService = new AudioService(this);
    this.videoService = new VideoService(this);

    // Controller temp variables
    this.currentCoords = null;
    this.currentTask = null;
    this.currentText = null;

    // Bind to elements
    this.cbStartAudio = this.view.controlBar.startAudio;
    this.cbStopAudio = this.view.controlBar.stopAudio;
    this.cbCancelAudio = this.view.controlBar.cancelAudio;
    this.cbStartVideo = this.view.controlBar.startVideo;
    this.cbStopVideo = this.view.controlBar.stopVideo;
    this.cbCancelVideo = this.view.controlBar.cancelVideo;
    this.textInputForm = this.view.controlBar.form;
    this.coordinatesForm = this.view.coordinatesForm.html();
    this.init();
  }

  init() {
    // New text post with service coordinates:
    this.textInputForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      await this.initTextPost(e);
    });
    // New text post with manual coordinates entered:
    this.coordinatesForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      await this.useManualCoords();
    });

    // AUDIO HANDLERS (start, stop, cancel buttons)
    this.cbStartAudio.addEventListener('click', async () => {
      await this.initAudioPost();
    });
    this.cbStopAudio.addEventListener('click', () => {
      this.stopAudioRecording();
    });
    this.cbCancelAudio.addEventListener('click', () => {
      this.cancelAudioRecording();
    });

    // VIDEO HANDLERS - the same
    this.cbStartVideo.addEventListener('click', async () => {
      await this.initVideoPost();
    });
    this.cbStopVideo.addEventListener('click', () => {
      this.stopVideoRecording();
    });
    this.cbCancelVideo.addEventListener('click', () => {
      this.cancelVideoRecording();
    });
  }

  // Post text
  // Check if coordinates available, if no show form
  async initTextPost(e) {
    const input = e.target.elements.text;
    this.currentText = input.value;
    const reply = await this.geoService.getCoordinates();
    if (reply.status === 'success') {
      this.currentCoords = [
        reply.coordinates.latitude,
        reply.coordinates.longitude,
      ];
      this.postText();
    } else {
      this.view.showCoordinatesForm(this.geoService.errors[reply.code]);
      this.currentTask = 'text';
    }
  }

  postText() {
    this.view.createNewTextPost(this.currentText, this.currentCoords);
    this.currentText = null;
    this.currentCoords = null;
  }

  // Routes with manual coords
  async useManualCoords() {
    const newCoords = this.view.coordinatesForm.validateAndReturnInput();
    if (!newCoords) {
      return;
    }
    this.currentCoords = newCoords;
    // Text Post with manual coords
    if (this.currentTask === 'text') {
      this.postText();
      this.view.hideCoordinatesForm();
      return;
    }
    // Audio Post with manual coords
    if (this.currentTask === 'audio') {
      await this.startAudioRecording();
      this.view.hideCoordinatesForm();
      return;
    }
    // Audio Post with manual coords
    if (this.currentTask === 'video') {
      await this.startVideoRecording();
      this.view.hideCoordinatesForm();
    }
  }

  // Audio functions
  async initAudioPost() {
    const reply = await this.geoService.getCoordinates();
    if (reply.status === 'success') {
      this.currentCoords = [
        reply.coordinates.latitude,
        reply.coordinates.longitude,
      ];
      await this.startAudioRecording();
    } else {
      this.view.showCoordinatesForm(this.geoService.errors[reply.code]);
      this.currentTask = 'audio';
    }
  }

  async startAudioRecording() {
    await this.audioService.init();
    this.audioService.startRecording();
    this.view.controlBar.switchToAudioControls();
  }

  stopAudioRecording() {
    this.view.controlBar.switchToStandardControls();
    this.audioService.stopRecording();
  }

  cancelAudioRecording() {
    this.view.controlBar.switchToStandardControls();
    this.audioService.cancelRecording();
  }

  // To be called from service event handler
  postAudio(uri) {
    this.view.createNewAudioPost(uri, this.currentCoords);
    this.currentTask = null;
  }

  // Video functions
  async initVideoPost() {
    const reply = await this.geoService.getCoordinates();
    if (reply.status === 'success') {
      this.currentCoords = [
        reply.coordinates.latitude,
        reply.coordinates.longitude,
      ];
      await this.startVideoRecording();
    } else {
      this.view.showCoordinatesForm(this.geoService.errors[reply.code]);
      this.currentTask = 'video';
    }
  }

  async startVideoRecording() {
    await this.videoService.init();
    this.videoService.startRecording();
    this.view.controlBar.switchToVideoControls();
  }

  stopVideoRecording() {
    this.view.controlBar.switchToStandardControls();
    this.videoService.stopRecording();
  }

  cancelVideoRecording() {
    this.view.controlBar.switchToStandardControls();
    this.videoService.cancelRecording();
  }

  postVideo(uri) {
    this.view.createNewVideoPost(uri, this.currentCoords);
    this.currentTask = null;
  }
}
