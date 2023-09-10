let hrs = document.getElementById('hrs')
let min = document.getElementById('min')
let sec = document.getElementById('sec')
let sol1 = document.getElementById("sol")

setInterval(() => {
    let prev_date = new Date('05 Aug 2012 13:49:59');
    let now = new Date();
    let diff = now - prev_date;
    let sol = (((diff / 1000)) / 88775.244);
    let hrs = (((diff / 1000) - (parseInt(sol) * 88775.244)) / 3699) - 6.00;
    sol1.innerHTML = sol;
    hrs.innerHTML = hrs;
    min.innerHTML =
        (currentTime.getMinutes() < 10 ? "0" : "") +
        ((currentTime.getMinutes() - 10) % 60);
    sec.innerHTML = (currentTime.getSeconds()<10?"0":"") + currentTime.getSeconds();
},1000)