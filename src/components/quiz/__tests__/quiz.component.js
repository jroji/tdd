import { getAllByRole, getByTestId, getByText, waitFor } from "@testing-library/dom";
import { Quiz } from "../quiz.component";
import userEvent from "@testing-library/user-event";
import { CountriesService } from "../../countries/countries.service";
import { QuestionMock } from "../../countries/__mocks__/countries.service.mock";

// Gracias al automock de Jest, podemos hacer esto para mockear todas las respuestas
jest.mock("../../countries/countries.service");

// Para evitar que la petición devuelva undefined, mockeamos la respuesta del método que nos interesa
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

  it ('renders correctly', () => {
    expect(dom).toMatchSnapshot();
  });

  beforeEach(() => {
    // Limpiamos los mocks para que en cada test, el numero de peticiones iniciales sea 0
    CountriesService.mockClear();
  });

  it('should render the next button', () => {
    expect(getByText(dom, 'Next')).toBeVisible();
  });

  it('next button shouldnt be visible without an answer', () => {
    expect(getByText(dom, 'Next'))
  });

  describe('clicking on next', () => {
    beforeEach(async () => {
      userEvent.click(getByText(dom, 'Next'));
      await waitFor(() => expect(getByTestId(dom, 'question')).toBeDefined());
    })

    it('should hide next button', () => {
      expect(getByText(dom, 'Next')).not.toBeVisible();
    });

    it('should render a question', () => {
      const title = getByTestId(dom, 'question');
      expect(title.textContent).toBe('Spain is the capital of ');
    });

    // Este test, sería probar funcionalidades internas, lo cual no nos interesa con el enfoque 'user-driven-testing'
    // it('next button should update the question', () => {
    //   expect(countriesService.getQuestion).toHaveBeenCalled();
    // })

    describe('after click on an answer', () => {

      beforeEach(() => {
        const answerSection = getByTestId(dom, 'answers-section');
        userEvent.click(getAllByRole(answerSection, 'button')[0]);
      });

      it('should render the next button', async () => {
        expect(getByText(dom, 'Next')).toBeVisible();
      });
    })

  })
});