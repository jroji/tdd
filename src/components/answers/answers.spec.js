import { getAllByRole, getByText, waitFor } from "@testing-library/dom";
import userEvent from '@testing-library/user-event'
import { AnswersComponent } from "./answers";


describe('Rendering AnswersComponent', () => {
  // Given
  const answers = ['Madrid', 'Pekin', 'Hong Kong', 'Kiev'];
  let dom;

  beforeEach(() => {
    // Given
    dom = document.createElement('div');
    // When
    new AnswersComponent(dom, answers, 'Madrid');
  });

  it('should render 4 answers given an array', () => {
    // Then
    const buttons = getAllByRole(dom, 'button');
    expect(buttons.length).toBe(4);
  });

  it('should render the answer in each button', () => {
    // Then
    const buttons = getAllByRole(dom, 'button');
    buttons.forEach((button, i) => {
      expect(button.textContent).toBe(answers[i]);
    });
  })

  describe('on correct answer click', () => {
    let answer;

    beforeAll(() => {
      // Given
      answer = getByText(dom, 'Madrid');
      // When
      userEvent.click(answer);
    });

    // Este test está conectado a lógica del componente (la clase correct)
    it('should validate', () => {
      // Then
      expect(answer.classList).toContain('correct');
    });

    it('should disable every answer', () => {
      // Then
      waitFor(() => getAllByRole(dom, 'button').forEach((button) => {
        expect(button).toBeDisabled();
      }));
    });
  });

  describe('on incorrect click', () => {
    let answer;

    beforeAll(() => {
      // Given
      answer = getByText(dom, 'Kiev');
      // When
      userEvent.click(answer);
    });

    it('should mark the correct answer', async (done) => {
      // Then
      waitFor(() => expect(getByText(dom, 'Madrid').classList).toContain('correct'));
      done();
    });

    it('should mark the incorrect answer', async (done) => {
      // Then
      waitFor(() => expect(answer.classList).toContain('incorrect'));
      done();
    });
  });

})