import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const refs = {
  form: document.querySelector('.form'),
};

refs.form.addEventListener('submit', handlerSubmit);

function handlerSubmit(e) {
  e.preventDefault();

  const resultData = {};

  const formData = new FormData(refs.form);

  formData.forEach((value, key) => (resultData[key] = +value));

  let { delay, step, amount } = resultData;

  for (let i = 1; i <= amount; i += 1) {
    createPromise(i, delay)
      .then(({ position, delay }) => {
        iziToast.success({
          title: 'OK',
          message: `✅ Fulfilled promise ${position} in ${delay}ms`,
          position: 'topRight',
        });
      })
      .catch(({ position, delay }) => {
        iziToast.error({
          title: 'Error',
          message: `❌ Rejected promise ${position} in ${delay}ms`,
          position: 'topRight',
        });
      });

    delay += step;
  }

  refs.form.reset()
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;

  return new Promise((response, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        response({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

