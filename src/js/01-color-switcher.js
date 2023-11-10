function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
  }


  const refs = {
    body: document.querySelector('body'),
    btnStart: document.querySelector('[data-start]'),
    btnStop : document.querySelector('[data-stop]')
  }


  refs.btnStart.addEventListener('click', handlerStart);
  refs.btnStop.addEventListener('click', handlerStop);
  refs.btnStop.disabled = true;

  let intervalId = null;

  function handlerStart(e) {
    let currentColor = getRandomHexColor();
    let bodyBgColor = refs.body.style;

    bodyBgColor.backgroundColor= currentColor;
    intervalId = setInterval(()=>{
      currentColor = getRandomHexColor();
      bodyBgColor.backgroundColor = currentColor;
    }, 1000)

    refs.btnStop.disabled = false;
    toogleDisabled(e)

  }

  function handlerStop(e) {
    clearInterval(intervalId)
    refs.btnStart.disabled = false;
    toogleDisabled(e)
  }

  function toogleDisabled(e) {
    e.target.disabled =!e.target.disabled
  }



