let timerInterval;
let secondsElapsed = 0;

function formatTime(seconds) {
    let launch_time = new Date("05 Aug 2012 13:49:59");
    let current_time = new Date();
    let diff = (current_time - launch_time) / 1000;
    const timeObject = convertTime(diff);


    console.log(timeObject);

    return `${String(timeObject.days).padStart(2, "0")} :${String(
        timeObject.hours
    ).padStart(2, "0")} :${String(timeObject.minutes).padStart(
        2,
        "0"
    )} :${String(parseInt(timeObject.seconds)).padStart(2, "0")}`;
}

function updateTimer() {
    secondsElapsed += 1;
    document.getElementById("timer").textContent =
        formatTime(secondsElapsed);
}

timerInterval = setInterval(updateTimer, 1000);

function convertTime(x) {
    let seconds = x + 30 + (9 * 61.25)
    const secondsInMinute = 61.25;
    const secondsInHour = 3699;
    const secondsInDay = 88775.244;
    const secToMillisec = 1.021;


    const days = Math.floor(seconds / secondsInDay);
    const remainingSeconds = seconds % secondsInDay;
    const hours = Math.floor(remainingSeconds / secondsInHour) - 6;
    const remainingSecondsAfterHours = remainingSeconds % secondsInHour;


    const minutes = Math.floor(
        remainingSecondsAfterHours / secondsInMinute
    );
    const secondsWithoutMinutes = (remainingSecondsAfterHours % secondsInMinute);
    const milliseconds = secondsWithoutMinutes * secToMillisec;

    return {
        days,
        hours,
        minutes,
        seconds: secondsWithoutMinutes,
        milliseconds,
    };
}
