
let dateInput = null
let timerId = null
document.querySelector("#count-button").addEventListener("click", function (e) {
    clearInterval(timerId);
    dateInput = document.querySelector("#final-date-input").value;

    if (dateInput === "") {
        return;
    }
    dateInput = new Date(dateInput);
    document.querySelector("#message").style.display = "none"
    timer();
    timerId = setInterval(timer, 1000);
})

function  timer() {
    let now = new Date().getTime();

    let interval = (dateInput.getTime() - now) / 1000;
    interval = Math.floor(interval);

    if (interval <= 0) {
        document.querySelector("#message").style.display = "block";
        clearInterval(timerId);
        clearTimer()
        return;
    }

    let days = Math.floor(interval / (60 * 60 * 24));
    let hours = Math.floor(interval % (60 * 60 * 24) / (60 * 60));
    let minutes = Math.floor(interval % (60 * 60) / 60);
    let seconds = Math.floor(interval % 60);

    document.querySelector("#days").innerText = days;
    document.querySelector("#hours").innerText = hours;
    document.querySelector("#minutes").innerText = minutes;
    document.querySelector("#seconds").innerText = seconds;
}

function clearTimer() {
    document.querySelector("#days").innerText = "-";
    document.querySelector("#hours").innerText = "-";
    document.querySelector("#minutes").innerText = "-";
    document.querySelector("#seconds").innerText = "-";
}

document.querySelector(".button-stop").addEventListener("click", function (e) {
    clearInterval(timerId)
})