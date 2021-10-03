// Описан в документации
import flatpickr from 'flatpickr';
// Дополнительный импорт стилей
import 'flatpickr/dist/flatpickr.min.css';

const refs = {
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
  start: document.querySelector('[data-start]'),
  stop: document.querySelector('[data-stop]'),
};

let intervalId = null;
refs.start.disabled = true;

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
const countTime = function (selectData) {
  const now = Date.now();
  const diff = selectData.getTime() - now;
  if (diff < 0) {
    window.alert('Please choose a date in the future');
  }
  if (diff < 1000) {
    clearInterval(intervalId);}
console.log(diff);
    refs.days.textContent = convertMs(diff).days;
    refs.hours.textContent = convertMs(diff).hours;
    refs.minutes.textContent = convertMs(diff).minutes;
    refs.seconds.textContent = convertMs(diff).seconds;
};

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    refs.start.disabled = false;
    countTime(selectedDates[0]);
    refs.start.addEventListener('click', e => {
      intervalId = setInterval(() => {
        countTime(selectedDates[0]);
      }, 1000);
    });
  },
};

refs.stop.addEventListener('click', e => {
  clearInterval(intervalId);
});

flatpickr('#date-selector', options);
