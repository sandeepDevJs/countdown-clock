let countdown;
const timeDisplay = document.querySelector(".display__time-left");
const timeEndDisplay = document.querySelector(".display__end-time");
const buttons = document.querySelectorAll("[data-time]")

function timer(seconds) {
    clearInterval(countdown); //clear existing timer

    const now = Date.now();
    const then  = now + seconds * 1000;
    displayTimeLeft(seconds);
    displayTimeEnd(then);

    countdown = setInterval( function () {
        const secondsLeft = Math.round((then - Date.now()) / 1000)
        if(secondsLeft <= 0) clearInterval(countdown);
        
        displayTimeLeft(secondsLeft)
    } , 1000)
}

function displayTimeLeft(seconds) {

    const minutes = Math.floor(seconds / 60);
    const remainderSeconds = seconds % 60;
    const time  = `${minutes}:${remainderSeconds < 10 ? "0" : ""}${remainderSeconds}`;

    timeDisplay.textContent = time;
    document.title = time;
}

function displayTimeEnd(timestamps) {
    const end = new Date(timestamps);

    const hour = end.getHours();
    const adjustedHour = hour > 12 ? hour -12  : hour;
    const mins = end.getMinutes();

    timeEndDisplay.textContent = `Be Back At ${adjustedHour}:${mins < 10 ? "0" : ""}${mins}`

}

function startTimer(e) {
    const seconds = parseInt(this.dataset.time);
    timer(seconds);
}

buttons.forEach(b => b.addEventListener("click", startTimer));

document.customForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const mins = parseInt(this.minutes.value);
    timer(mins * 60)
    this.reset();
})