export default class GeoService {
  constructor() {
    this.hasAPI = !!navigator.geolocation;
    this.errors = [
      '',
      'Геолокация отключена пользователем',
      'Данные геолокации недоступны',
      'Время ожидания истекло',
    ];
  }

  async getCoordinates() {
    if (!this.hasAPI) {
      return {
        status: 'error',
        message: 'No Geolocation API provided by browser',
      };
    }

    return new Promise((resolve) => {
      navigator.geolocation.getCurrentPosition((position) => {
        resolve({
          status: 'success',
          coordinates: position.coords,
        });
      }, (error) => {
        resolve({
          status: 'error',
          code: error.code,
          message: error.message,
        });
      });
    });
  }
}
