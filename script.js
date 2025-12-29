// Project by Vedant Vyawhare
let [ms, sec, min, hr] = [0, 0, 0, 0];
let display = document.getElementById('display');
let timer = null;
let lapCounter = 1;

document.getElementById('startBtn').addEventListener('click', () => {
    if(timer !== null) clearInterval(timer);
    timer = setInterval(runTimer, 10);
});

document.getElementById('stopBtn').addEventListener('click', () => {
    clearInterval(timer);
});

document.getElementById('resetBtn').addEventListener('click', () => {
    clearInterval(timer);
    [ms, sec, min, hr] = [0, 0, 0, 0];
    display.innerHTML = '00:00:00:<span class="ms-small">00</span>';
    document.getElementById('laps').innerHTML = '';
    lapCounter = 1;
});

function runTimer() {
    ms += 10;
    if(ms == 1000) { ms = 0; sec++; }
    if(sec == 60) { sec = 0; min++; }
    if(min == 60) { min = 0; hr++; }

    let h = hr < 10 ? "0" + hr : hr;
    let m = min < 10 ? "0" + min : min;
    let s = sec < 10 ? "0" + sec : sec;
    let milli = ms < 100 ? "0" + ms/10 : ms/10;
    
    // Clean display with smaller milliseconds
    display.innerHTML = `${h}:${m}:${s}:<span class="ms-small">${String(milli).padStart(2, '0')}</span>`;
}

function recordLap() {
    if(timer === null) return;
    let lapTime = display.innerText;
    let lapList = document.getElementById('laps');
    let li = document.createElement('li');
    li.innerHTML = `<span>Lap ${lapCounter++}</span> <span>${lapTime}</span>`;
    lapList.prepend(li); // Newest lap on top
}

document.getElementById('lapBtn').addEventListener('click', recordLap);