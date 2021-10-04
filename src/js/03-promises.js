function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  if (shouldResolve) {
    setTimeout(() => {
      console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
      console.log(position, delay);
    }, delay);
  } else {
    setTimeout(() => {
      console.log(`❌ Rejected promise ${position} in ${delay}ms`);
      console.log(position, delay);
    }, delay);
  }
}

const refs = {
  form: document.querySelector('.form'),
};

refs.form.addEventListener('submit', e => {
  e.preventDefault();
  const amount = parseInt(e.currentTarget.elements.amount.value);
  const step = parseInt(e.currentTarget.elements.step.value);
  let delay = parseInt(e.currentTarget.elements.delay.value);
  for (let i = 0; i < amount; i++) {
    createPromise(i, delay);
    delay += step;
  }
});
