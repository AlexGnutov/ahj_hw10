export default class AudioService {
  constructor(controller) {
    this.controller = controller;
    this.audioOutput = null;
    this.toOutputFlag = null;
    this.chunks = [];
  }

  async init() {
    this.stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: false,
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
      if (this.toOutputFlag) {
        this.audioOutput = URL.createObjectURL(blob);
        await this.controller.postAudio(this.audioOutput);
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
    this.stream.getTracks().forEach((track) => track.stop());
  }
}
