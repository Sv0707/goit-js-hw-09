// Описан в документации
import flatpickr from 'flatpickr';
import Notiflix from 'notiflix';
// Дополнительный импорт стилей
import 'flatpickr/dist/flatpickr.min.css';
require("flatpickr/dist/themes/dark.css");

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
refs.start.classList.add("button");
refs.stop.classList.add("button");

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
const addLeadingZero = function(value) {
  return String(value).padStart(2, 0);
}

const countTime = function (selectData) {
  const now = Date.now();
  const diff = selectData.getTime() - now;
  if (diff < 1000) {
    clearInterval(intervalId);
    refs.start.disabled = true;
  }

    refs.days.textContent = addLeadingZero(convertMs(diff).days);
    refs.hours.textContent = addLeadingZero(convertMs(diff).hours);
    refs.minutes.textContent = addLeadingZero(convertMs(diff).minutes);
    refs.seconds.textContent = addLeadingZero(convertMs(diff).seconds);
};

const options = {
  enableTime: true,
  dateFormat: "d.m.Y H:i",
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    refs.start.disabled = false;
    const now = Date.now();
    const diff = selectedDates[0].getTime() - now;
    if (diff < 0) {
      refs.start.disabled = true;
      Notiflix.Notify.warning('Please choose a date in the future');
    }
      refs.start.addEventListener('click', e => {
      countTime(selectedDates[0]);
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
