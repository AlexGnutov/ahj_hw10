export default class VideoService {
  constructor(controller) {
    this.controller = controller;
    this.videoOutput = null;
    this.toOutputFlag = null;
    this.chunks = [];
  }

  async init() {
    this.stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: true,
    });

    this.recorder = new MediaRecorder(this.stream);

    this.recorder.addEventListener('start', () => {
      // console.log('recording started');
    });

    this.recorder.addEventListener('dataavailable', (evt) => {
      // console.log('data available');
      this.chunks.push(evt.data);
    });

    this.recorder.addEventListener('stop', async () => {
      // console.log('recording stopped');
      const blob = new Blob(this.chunks);
      this.stream.getTracks().forEach((track) => track.stop());
      if (this.toOutputFlag) {
        this.videoOutput = URL.createObjectURL(blob);
        await this.controller.postVideo(this.videoOutput);
      }
      this.toOutputFlag = null;
      this.chunks = [];
    });
  }

  startRecording() {
    this.recorder.start();
  }

  stopRecording() {
    this.toOutputFlag = true;
    this.recorder.stop();
  }

  cancelRecording() {
    this.toOutputFlag = false;
    this.recorder.stop();
  }
}
