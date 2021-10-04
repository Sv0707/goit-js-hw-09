function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  if (shouldResolve) {
    setTimeout(() => {
    console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
    console.log(position, delay);
    }, delay)
  } else {
    setTimeout(() => {
      console.log(`❌ Rejected promise ${position} in ${delay}ms`);
      console.log(position, delay);
      }, delay)
      }
}

const amount = 3;
let delay = 300;
const step = 500;

for (let i = 0; i < amount; i++) {
  createPromise(i, delay);
  delay += step;
}
