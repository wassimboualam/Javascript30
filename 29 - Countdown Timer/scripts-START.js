let countdown ;
const timerDisplay = document.querySelector(".display__time-left");
const endTime =  document.querySelector(".display__end-time");
const buttons = document.querySelectorAll("[data-time]")

function timer(seconds) {
    clearInterval(countdown);
    const now = Date.now();
    const then = now + seconds * 1000;
    displaySecondsLeft(seconds);
    displayEndTime(then);
    countdown = setInterval(() => {
        const secondsLeft = Math.floor((then - Date.now()) / 1000);
        // check if below 0
        if (secondsLeft < 0) {
            clearInterval(countdown);
            return ;
        }
        // display it
        displaySecondsLeft(secondsLeft);
    }, 1000);
}

function doubleDigit(num) {
    return (num.toString().length==1)? "0"+ num:num;
}

function displaySecondsLeft(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remeinderSeconds = seconds % 60;
    timerDisplay.textContent = minutes + " : " + doubleDigit(remeinderSeconds);
}

function displayEndTime(timestamp) {
    const end = new Date(timestamp);
    const hours = end.getHours();
    const minutes = end.getMinutes();
    const time = hours + ":" + doubleDigit(minutes);
    endTime.textContent = "Be back at " + time;
}

function startTimer() {
    const seconds = this.dataset.time;
    timer(seconds);
}

buttons.forEach(button => button.addEventListener("click", startTimer));
document.customForm.addEventListener("submit", function(e)  {
    e.preventDefault();
    const minutes = this.minutes.value;
    timer(minutes * 60);
    this.reset();
})