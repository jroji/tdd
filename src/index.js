import { CountriesService } from "./components/countries/countries";
import { Quiz } from "./components/quiz/quiz";

const init = (element) => {
  const countryService = new CountriesService();
  new Quiz(element, countryService);
}

init(document.querySelector('.answers'));