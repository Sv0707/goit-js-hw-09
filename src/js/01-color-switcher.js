function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  }

  const refs = {
      body: document.querySelector("body"),
      start: document.querySelector("[data-start]"),
      stop: document.querySelector("[data-stop]")
  }

let intervalId = null;

refs.stop.disabled = true;

const changeBodyColor = () => {
    refs.body.style.backgroundColor = getRandomHexColor();
}

refs.start.addEventListener("click", e => {
    changeBodyColor();
    refs.start.disabled = true;
    refs.stop.disabled = false;
    intervalId = setInterval(changeBodyColor, 1000);
  });

  refs.stop.addEventListener("click", e => {
    clearInterval(intervalId);
    refs.start.disabled = false;
    refs.stop.disabled = true;
  })
    
