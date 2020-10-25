import { CountriesService } from "./countries/countries";
import { Quiz } from "./quiz/quiz";

const countryService = new CountriesService();
new Quiz(document.querySelector('.answers'), countryService);
