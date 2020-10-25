import { getByTestId, getByText, waitFor } from "@testing-library/dom";
import { Quiz } from "./quiz";
import { AnswersComponent } from "../answers/answers";
import userEvent from "@testing-library/user-event";
import { CountriesService } from "../countries/countries";
import { QuestionMock } from "../countries/__mocks__/countries.mock";
jest.mock("../answers/answers");
jest.mock("../countries/countries.js");

const mockCountriesAnswers = () => {
  CountriesService.prototype.getQuestion = jest.fn().mockReturnValue(QuestionMock);
};

describe('rendering quiz', () => {
  let dom;
  let countriesService;

  beforeAll(() => {
    mockCountriesAnswers();
    dom = document.createElement('div');
    countriesService = new CountriesService();

    new Quiz(dom, countriesService);
  });

  beforeEach(() => {
    AnswersComponent.mockClear();
    CountriesService.mockClear();
  });

  it('should render the next button', () => {
    expect(getByText(dom, 'Next')).toBeVisible();
  });

  describe('clicking on next', () => {
    beforeEach(() => {
      userEvent.click(getByText(dom, 'Next'));
    })

    it('should render a question', async () => {
      await waitFor(() => expect(getByTestId(dom, 'question')).toBeDefined());
      const title = getByTestId(dom, 'question');
      expect(title.textContent).toBe('Spain is the capital of ');
    });

    it('should render answers inside quiz', async () => {
      await waitFor(() => expect(getByTestId(dom, 'question')).toBeDefined());
      expect(AnswersComponent).toHaveBeenCalled();
    });

    it('next button should update the question', async () => {
      await waitFor(() => expect(getByTestId(dom, 'question')).toBeDefined());
      expect(countriesService.getQuestion).toHaveBeenCalled();
      expect(getByText(dom, 'Next')).toBeVisible();
    })
  })
});