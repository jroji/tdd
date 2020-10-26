import { CountriesService } from "./components/countries/countries";
import { Quiz } from "./components/quiz/quiz";

const countryService = new CountriesService();
new Quiz(document.querySelector('.answers'), countryService);
