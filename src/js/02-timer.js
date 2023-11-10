import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const refs = {
  input: document.querySelector('#datetime-picker'),
  btnStart: document.querySelector('[data-start]'),
  btnReset: document.querySelector('[data-reset]'),
  userDays: document.querySelector('[data-days]'),
  userHours: document.querySelector('[data-hours]'),
  userMinutes: document.querySelector('[data-minutes]'),
  userSeconds: document.querySelector('[data-seconds]'),
};

refs.btnStart.addEventListener('click', handlerStart);
refs.btnReset.addEventListener('click', handlerReset);

disabledToogleBtnStart();
hiddenToogleBtnReset();
let finishDate = null;
let idInterval = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    finishDate = selectedDates[0];

    if (finishDate.getTime() < new Date().getTime()) {
      iziToast.error({
        title: 'Error',
        message: 'Please choose a date in the future',
        position: 'topRight',
      });
      return;
    }

    disabledToogleBtnStart();
  },
};

flatpickr(refs.input, options);

function handlerStart() {
  hiddenToogleBtnReset();
  disabledToogleBtnStart();

  idInterval = setInterval(() => {
    if (finishDate.getTime() < new Date().getTime()) {
      reset();
      return;
    }
    const timer = convertMs(finishDate.getTime() - new Date().getTime());
    const { days, hours, minutes, seconds } = timer;
    const { userDays, userHours, userMinutes, userSeconds } = refs;

    userDays.textContent = addLeadingZero(days);
    userHours.textContent = addLeadingZero(hours);
    userMinutes.textContent = addLeadingZero(minutes);
    userSeconds.textContent = addLeadingZero(seconds);
  }, 1000);
}

function handlerReset() {
  reset();
  const { userDays, userHours, userMinutes, userSeconds } = refs;

  refs.input.value = getDataNow();
  userDays.textContent = '00';
  userHours.textContent = '00';
  userMinutes.textContent = '00';
  userSeconds.textContent = '00';
}

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function reset() {
  clearInterval(idInterval);
  refs.btnStart.disabled = true;
  hiddenToogleBtnReset();
}

function disabledToogleBtnStart() {
  refs.btnStart.disabled = !refs.btnStart.disabled;
}

function hiddenToogleBtnReset() {
  refs.btnReset.hidden = !refs.btnReset.hidden;
}

function getDataNow() {
  return (
    new Date().getFullYear() +
    '-' +
    addLeadingZero(new Date().getMonth() + 1) +
    '-' +
    addLeadingZero(new Date().getDate()) +
    ' ' +
    addLeadingZero(new Date().getHours()) +
    ':' +
    addLeadingZero(new Date().getMinutes())
  );
}
