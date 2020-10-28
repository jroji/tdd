export class AnswersComponent {

  constructor(domElement, answers, correctAnswer) {
    this.correctAnswer = correctAnswer
    this.answerButtons = [];
    this.renderAnswersOnContainer(answers, domElement);
  }

  renderAnswersOnContainer(answers, domElement) {
    answers.forEach((answer) => {
      const button = this.createButton(answer);
      this.answerButtons.push(button);
      domElement.appendChild(button);
    });
  }

  createButton (answer) {
    const element = document.createElement('button');
    element.className = 'answer-button';
    element.textContent = answer;
    element.addEventListener('click', (event) => { this.validateAnswer(event) })
    return element
  }

  validateAnswer(event) {
    const answer = event.target.textContent;
    const isCorrect = answer === this.correctAnswer;

    event.target.classList.add(isCorrect ? 'correct' : 'incorrect');

    this.disableAllButtons(this.answerButtons, this.correctAnswer)
    this.notifyAnswer(event.target, isCorrect);
  }

  disableAllButtons(buttons, correctAnswer) {
    buttons.forEach((button) => {
      button.setAttribute('disabled', true);

      if (button.textContent === correctAnswer) {
        button.classList.add('correct');
      }
    });
  }

  notifyAnswer(fromElement, isCorrect) {
    const answerClickEvent = new CustomEvent('answerClick', {
      detail: isCorrect,
      bubbles: true,
    });

    fromElement.dispatchEvent(answerClickEvent);
  }
}