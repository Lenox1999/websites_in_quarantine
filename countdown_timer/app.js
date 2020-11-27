// main container access
const main_Container = document.querySelector(".main");

// setup countdown area
const countdown_Input = document.querySelector(".main .time_input");
const button = document.querySelector(".start_button");
const hourLabel = document.querySelector(".hours");
const minutes = document.querySelector(".minutes");
const seconds = document.querySelector(".seconds");

// Time picker element access
const timer_button = document.querySelector(".set_time");
const time_picker = document.querySelector(".time_picker");

let playing = false;
let working = false;

// setup alarm tone

const audio = new Audio("./assets/alarm_sound.mp3");

// set initial time value for timepicker
time_picker.value = "17:00";

// setup alarm tone

let time = undefined;

const countdown = (min, secs) => {
  time = min * 60 + secs;

  let hours = 0;

  if (min > 60) {
    let sum = min / 60;
    hours = Math.round(sum);
    min = sum % 1;
    min = min * 60;
    min = Math.round(min);
  }
  console.log(min);

  button.innerHTML = `Stop`;
  if (secs <= 0) {
    min -= 1;
    secs = 59;
  }

  if (min <= 0 && secs <= 0) {
    hours -= 1;
    min = 59;
    secs = 59;
  }
  working = true;

  let showMins = min;
  let showSecs = secs;
  console.log(time);
  setInterval(() => {
    console.log(hours, showMins, showSecs);
    time -= 1;
    showSecs -= 1;

    if (showSecs == 0 && showMins >= 1) {
      showSecs = 59;
      showMins -= 1;
    }

    if (hours >= 1 && showMins <= 0 && showSecs <= 0) {
      hours -= 1;
      showMins = 59;
    }

    if (!time <= 0) {
      hourLabel.innerHTML = `${hours} h`;
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
  let dateParse;
  // check if platform is by apple
  let isMacLike = /(Mac|iPhone|iPod|iPad)/i.test(navigator.platform);
  // fix for different Unix Time Format
  if (navigator.platform.split(" ")[0] === "Linux" || isMacLike) {
    // Linux and Unix-like systems and Mac/iPhone
    dateParse = new Date().toLocaleString().split("/");
  } else {
    // for windows
    dateParse = new Date().toLocaleString().split(".");
  }
  console.log(dateParse);
  console.log(dateParse[2]);
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
