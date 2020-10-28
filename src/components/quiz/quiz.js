import { AnswersComponent } from "../answers/answers";

/**
 * Crea un Quiz con preguntas y respuestas sobre países
* @param {HTMLElement} htmlContainer
* @param {countryService} countryService
 */
export class Quiz {

  constructor(htmlContainer, countryService) {
    this.htmlContainer = htmlContainer;
    this.countryService = countryService;
    this.renderNextButton(htmlContainer);
    this.htmlContainer.addEventListener('answerClick', (event) => this.handleAnswer(event));
  }

  /**
   * Realiza una petición al servicio de países y renderiza las respuestas
   */
  async renderQuestion() {
    const { countryName, answers, correctAnswer } = await this.countryService.getQuestion();
    this.renderTitle(this.htmlContainer, countryName);
    if (!this.answersContainer) {
      this.answersContainer = this.renderAnswerContainer(this.htmlContainer);
    }
    this.answersContainer.innerHTML = '';
    this.nextButton.style.display = 'none';
    this.answers = new AnswersComponent(this.answersContainer, answers, correctAnswer)
  }

  /**
   * Pinta el botón de next y asocia el evento
   * @param {HTMLElement} htmlContainer
   */
  renderNextButton(htmlContainer) {
    const nextButton = this.createElement('button', 'Next', 'next-button');
    nextButton.className = 'next';
    nextButton.addEventListener('click', (event) => { this.renderQuestion(); });

    this.nextButton = nextButton;
    htmlContainer.appendChild(nextButton);
  }

  /**
   * Pinta una pregunta con el nombre del país a adivinar
   * @param {HTMLElement} htmlContainer
   * @param {string} countryName
   */
  renderTitle(htmlContainer, countryName) {
    let question = htmlContainer.querySelector('#question');
    if (question) {
      return question.textContent = `${countryName} is the capital of `;
    }

    question = this.createElement('h2', `${countryName} is the capital of `, 'question');
    question.id = 'question';

    htmlContainer.appendChild(question);
  }

  /**
   * Crea el contenedor para añadir las respuestas
   * @param {HTMLElement} htmlContainer
   */
  renderAnswerContainer(htmlContainer) {
    const container = this.createElement('section', '', 'answers-section');
    htmlContainer.appendChild(container);
    return container;
  }

  /**
   * Crea y devuelve un elemento HTML con la configuración proporcionada
   * @param {string} tag Etiqueta a crear
   * @param {string} content Contenido que se mostrará al usuario
   * @param {string} testId Identificador de test
   */
  createElement(tag, content, testId) {
    const element = document.createElement(tag);
    element.textContent = content;
    element.setAttribute('data-testid', testId);
    return element;
  }

  handleAnswer(event) {
    this.nextButton.style.display = 'block';
  }
}