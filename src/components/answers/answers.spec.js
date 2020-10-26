import { getAllByTestId, getByText } from "@testing-library/dom";
import userEvent from '@testing-library/user-event'
import { AnswersComponent } from "./answers";


describe('rendering answers on a container', () => {
  const answers = ['Madrid', 'Pekin', 'Hong Kong', 'Kiev'];
  let dom;

  beforeEach(() => {
    dom = document.createElement('div');
    new AnswersComponent(dom, answers, 'Madrid');
  });

  it('should render 4 answers given an array', () => {
    const buttons = getAllByTestId(dom, 'answer-button');
    expect(buttons.length).toBe(4);
  });

  it('should render the answer in each button', () => {
    const buttons = getAllByTestId(dom, 'answer-button');
    buttons.forEach((button, i) => {
      expect(button.textContent).toBe(answers[i]);
    });
  })

  describe('on correct answer click', () => {
    let answer;

    beforeEach(() => {
      answer = getByText(dom, 'Madrid');
      userEvent.click(answer);
    });

    it('should validate', () => {
      expect(answer.classList).toContain('correct');
    });

    it('should disable every answer', () => {
      getAllByTestId(dom, 'answer-button').forEach((button) => {
        expect(button).toBeDisabled();
      })
    });
  });

  describe('on incorrect click', () => {
    let answer;

    beforeEach(() => {
      answer = getByText(dom, 'Kiev');
      userEvent.click(answer);
    })


    it('should validate', () => {
      expect(answer.classList).toContain('incorrect');
    });


    it('should check the correct answer', () => {
      expect(getByText(dom, 'Madrid').classList).toContain('correct');
    });
  })

})