import { CountriesService } from "./countries";
import { CountriesMock } from "./__mocks__/countries.mock";

describe('fetching countries', () => {
  let countries;

  beforeAll(() => {
    global.fetch = jest.fn().mockImplementation(() => Promise.resolve({
      json: () => Promise.resolve(CountriesMock)
    }));

    countries = new CountriesService();
  });

  it('should return countries', async (done) => {
    const countryList = await countries.getCountries();
    expect(global.fetch).toHaveBeenCalledWith('https://restcountries.eu/rest/v2/all');
    expect(countryList[0].name).toBe('Åland Islands');
    done();
  });

  it('should return a Quiz object', async (done) => {
    const quizObject = await countries.getQuestion();
    expect(quizObject).toHaveProperty('answers');
    expect(quizObject).toHaveProperty('correctAnswer');
    expect(quizObject).toHaveProperty('countryName');
    done();
  });

  it('should return correct answer in answers', async (done) => {
    const quizObject = await countries.getQuestion();
    expect(quizObject.answers).toContain(quizObject.correctAnswer);
    done();
  })
})