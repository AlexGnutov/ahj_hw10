import BasicElement from '../common/basic-element';
import InputValidation from '../services/input-validation';

export default class CoordinatesForm extends BasicElement {
  constructor() {
    super('crd-form-container');
    this.markup = `
      <form class="crd-form" novalidate>
          <h3>Не удалось загрузить текущие координаты</h3>
          <p class="crd-form-reason">''</p>
          <p>Пожалуйста, введите широту и долготу через запятую:</p>
          <input class="crd-form-input" name="coordinates">
          <button type="submit" class="crd-form-ok-button">Ok</button>
          <button type="button" class="crd-form-cancel-button">X</button>
          <div class="crd-form-error hidden"></div>
      </form>      
    `;
    this.container.innerHTML = this.markup;
    this.addHandlers();
  }

  addHandlers() {
    this.container.querySelector('.crd-form-input').addEventListener('input', () => {
      this.container.querySelector('.crd-form-error').classList.add('hidden');
    });
    this.container.querySelector('.crd-form-cancel-button').addEventListener('click', () => {
      this.hideForm();
    });
  }

  showForm(reason) {
    const reasonField = this.container.querySelector('.crd-form-reason');
    reasonField.innerText = reason;
    this.container.classList.remove('hidden');
    this.container.querySelector('.crd-form-input').focus();
  }

  hideForm() {
    this.container.classList.add('hidden');
  }

  validateAndReturnInput() {
    const inputValue = this.container.querySelector('.crd-form-input').value;
    // Check compliance to pattern
    if (!InputValidation.validateString(inputValue)) {
      this.showMessage('Введите координаты через запятую, для разделения десятичных частей используйте точки');
      return false;
    }
    // Parse values
    const parsed = InputValidation.parseValues(inputValue);
    if (!parsed) {
      this.showMessage('Некорректные координаты - используйте числа');
      return false;
    }
    // Check coordinates values
    const coords = InputValidation.verifyCoordinates(parsed);
    if (!coords) {
      this.showMessage('Некорректные значения координат +90/-90 и +180/-180');
      return false;
    }
    return coords;
  }

  showMessage(message) {
    const output = this.container.querySelector('.crd-form-error');
    output.innerText = message;
    output.classList.remove('hidden');
    setTimeout(() => {
      output.classList.add('hidden');
    }, 4000);
    this.container.querySelector('.crd-form-input').focus();
  }
}
