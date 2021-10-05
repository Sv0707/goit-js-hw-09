
import Notiflix from 'notiflix';

const createPromise = (number, ms) => {
  return new Promise((resolve, reject) => {
    
    setTimeout(() => {      
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve({
          position: number,
          delay: ms,
        });
      } 
      else {
        reject({
          position: number,
          delay: ms,
        });
          }
        }, ms);

  }
)
}

const refs = {
  form: document.querySelector(".form"),
}

refs.form.addEventListener("submit", e => {
  e.preventDefault();
const amount = parseInt(e.currentTarget.elements.amount.value);
const step = parseInt(e.currentTarget.elements.step.value);
let delay = parseInt(e.currentTarget.elements.delay.value);
for (let i = 1; i <= amount; i++) {
  createPromise(i, delay)
  .then(({ position, delay }) => Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`))
  .catch(({ position, delay }) => Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`));
  delay += step;
}
})
