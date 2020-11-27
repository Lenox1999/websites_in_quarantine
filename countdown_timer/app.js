const main_Container = document.querySelector(".main");

const timer_button = document.querySelector(".set_time");
const time_picker = document.querySelector(".time_picker");

const countdown_Input = document.querySelector(".main .time_input");
const button = document.querySelector(".start_button");
const minutes = document.querySelectorAll("h2")[0];
const seconds = document.querySelectorAll("h2")[1];

let playing = false;
let working = false;

// setup alarm tone

const audio = new Audio("./assets/alarm_sound.mp3");

// setup time picker
time_picker.value = "17:00";

// setup alarm tone

let time = undefined;

const countdown = (min, secs) => {
  button.innerHTML = `Stop`;
  if (secs <= 0) {
    min -= 1;
    secs = 59;
  }
  working = true;
  time = min * 60 + secs;

  let showMins = min;
  let showSecs = secs;
  setInterval(() => {
    time -= 1;
    showSecs -= 1;

    if (showSecs == 0 && showMins >= 1) {
      showSecs = 59;
      showMins -= 1;
    }

    if (!time <= 0) {
      minutes.innerHTML = `${showMins} min`;
      seconds.innerHTML = `${showSecs} s`;
    } else {
      const finsihLabel = document.createElement("h2");
      finsihLabel.innerHTML = "Countdown has finished";
      // hide minutes and secs
      minutes.style.display = "none";
      seconds.style.display = "none";
      // show that countdown has finished
      main_Container.append(finsihLabel);
      audio.volume = 0.2;
      audio.play();
      playing = true;
      button.innerHTML = "Snooze";
      working = false;
      return;
    }
  }, 1000);
};

button.addEventListener("click", () => {
  if (playing || working) {
    audio.pause();
    playing = false;
    countdown_Input.value = "";
    location.reload();
  }

  const input = countdown_Input.value;
  if (!input || input.trim() == "") {
    console.error("no countdown time given");
  }
  const mins = parseInt(input.split(":")[0]);
  const secs = parseInt(input.split(":")[1]);
  if ((mins == 0 && secs == 0) || (!mins && !secs)) {
    return;
  }
  countdown(mins, secs);
});

timer_button.addEventListener("click", () => {
  // const now = new Date().toLocaleString();
  const dateParse = new Date().toLocaleString().split(".");
  const dateValue = new Date(
    dateParse[2].split(",")[0],
    dateParse[1],
    dateParse[0],
    time_picker.value.split(":")[0],
    time_picker.value.split(":")[1]
  );
  dateValue.getHours * 60;
  let diff =
    dateValue.getHours() * 60 +
    dateValue.getMinutes() -
    (new Date().getMinutes() + new Date().getHours() * 60);

  if (diff < 0) {
    diff = diff * diff;
  }
  countdown(diff, 0);
});
