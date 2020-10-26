
const BASE_API = 'https://restcountries.eu/rest/v2/';

export class CountriesService {

  async getCountries() {
    const response = await fetch(`${BASE_API}all`);
    const countries = await response.json();
    return countries;
  }

  async getQuestion() {
    if (!this.countries) {
      this.countries = await this.getCountries();
    }

    const countryToGuess = this.getRandomCountry(this.countries);

    return {
      countryName: countryToGuess.name,
      answers: this.getAnswers(this.countries, countryToGuess),
      correctAnswer: countryToGuess.capital
    }
  }

  getRandomCountry(countries) {
    const max = this.countries.length;
    const idx = Math.floor(Math.random()*(max-0)+0);
    return countries[idx];
  }

  getAnswers(countries, countryToGuess) {
    return [
      countryToGuess.capital,
      this.getRandomCountry(countries).capital,
      this.getRandomCountry(countries).capital,
      this.getRandomCountry(countries).capital,
    ].sort(() => Math.random() - 0.5);
  }
}