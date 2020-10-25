(()=>{"use strict";class t{constructor(t,e,n){this.correctAnswer=n,this.answerButtons=[],this.renderAnswersOnContainer(e,t)}renderAnswersOnContainer(t,e){t.forEach((t=>{const n=document.createElement("button");n.setAttribute("data-testid","answer-button"),n.className="answer-button",n.textContent=t,n.addEventListener("click",(t=>{this.validateAnswer(t)})),this.answerButtons.push(n),e.appendChild(n)}))}validateAnswer(t){const e=t.target.textContent===this.correctAnswer;t.target.classList.add(e?"correct":"incorrect"),this.answerButtons.forEach((t=>{t.setAttribute("disabled",!0),t.textContent===this.correctAnswer&&t.classList.add("correct")}))}}const e=new class{async getCountries(){const t=await fetch("https://restcountries.eu/rest/v2/all");return await t.json()}async getQuestion(){this.countries||(this.countries=await this.getCountries());const t=this.getRandomCountry(this.countries);return{countryName:t.name,answers:this.getAnswers(this.countries,t),correctAnswer:t.capital}}getRandomCountry(t){const e=this.countries.length;return t[Math.floor(Math.random()*(e-0)+0)]}getAnswers(t,e){return[e.capital,this.getRandomCountry(t).capital,this.getRandomCountry(t).capital,this.getRandomCountry(t).capital].sort((()=>Math.random()-.5))}};new class{constructor(t,e){this.htmlContainer=t,this.countryService=e,this.renderNextButton(t)}async renderQuestion(){const{countryName:e,answers:n,correctAnswer:s}=await this.countryService.getQuestion();this.renderTitle(this.htmlContainer,e),this.answersContainer||(this.answersContainer=this.renderAnswerContainer(this.htmlContainer)),this.answersContainer.innerHTML="",this.answers=new t(this.answersContainer,n,s)}renderNextButton(t){const e=document.createElement("button");e.setAttribute("data-testid","next-button"),e.className="next",e.textContent="Next",e.addEventListener("click",(t=>{this.renderQuestion()})),t.appendChild(e)}renderTitle(t,e){const n=t.querySelector("#question");if(n)return n.textContent=e+" is the capital of ";const s=document.createElement("h2");s.id="question",s.setAttribute("data-testid","question"),s.textContent=e+" is the capital of ",t.appendChild(s)}renderAnswerContainer(t){const e=document.createElement("section");return t.appendChild(e),e}}(document.querySelector(".answers"),e)})();