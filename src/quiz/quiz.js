import { AnswersComponent } from "../answers/answers";

export class Quiz {
  constructor(htmlContainer, countryService) {
    this.htmlContainer = htmlContainer;
    this.countryService = countryService;
    this.renderNextButton(htmlContainer);
  }

  async renderQuestion() {
    const { countryName, answers, correctAnswer } = await this.countryService.getQuestion();
    this.renderTitle(this.htmlContainer, countryName);
    if (!this.answersContainer) {
      this.answersContainer = this.renderAnswerContainer(this.htmlContainer);
    }
    this.answersContainer.innerHTML = '';
    this.answers = new AnswersComponent(this.answersContainer, answers, correctAnswer)
  }

  renderNextButton(htmlContainer) {
    const nextButton = document.createElement('button');
    nextButton.setAttribute('data-testid', 'next-button');
    nextButton.className = 'next';
    nextButton.textContent = 'Next';
    nextButton.addEventListener('click', (event) => { this.renderQuestion(); });
    htmlContainer.appendChild(nextButton);
  }

  renderTitle(htmlContainer, countryName) {
    const question = htmlContainer.querySelector('#question');
    if (question) {
      return question.textContent = `${countryName} is the capital of `;
    }

    const nextButton = document.createElement('h2');
    nextButton.id = 'question';
    nextButton.setAttribute('data-testid', 'question');
    nextButton.textContent = `${countryName} is the capital of `;

    htmlContainer.appendChild(nextButton);
  }

  renderAnswerContainer(htmlContainer) {
    const container = document.createElement('section');
    htmlContainer.appendChild(container);
    return container;
  }
}