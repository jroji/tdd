export class AnswersComponent {

  constructor(domElement, answers, correctAnswer) {
    this.correctAnswer = correctAnswer
    this.answerButtons = [];
    this.renderAnswersOnContainer(answers, domElement);
  }

  renderAnswersOnContainer(answers, domElement) {
    answers.forEach((answer) => {
      const element = document.createElement('button');
      element.setAttribute('data-testid', 'answer-button');
      element.className = 'answer-button';
      element.textContent = answer;
      element.addEventListener('click', (event) => { this.validateAnswer(event) })
      this.answerButtons.push(element);
      domElement.appendChild(element);
    });
  }

  validateAnswer(event) {
    const answer = event.target.textContent;
    const isCorrect = answer === this.correctAnswer;

    event.target.classList.add(isCorrect ? 'correct' : 'incorrect');

    this.answerButtons.forEach((button) => {
      button.setAttribute('disabled', true);

      if (button.textContent === this.correctAnswer) {
        button.classList.add('correct');
      }
    })
  }
}