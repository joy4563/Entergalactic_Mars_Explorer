let hrs = document.getElementById('hrs')
let min = document.getElementById('min')
let sec = document.getElementById('sec')

setInterval(() => {
    let currentTime = new Date();
    hrs.innerHTML = (currentTime.getHours()<10?"0":"") + (((currentTime.getMinutes()+36)%60)==0?currentTime.getHours()+5:currentTime.getHours()+4);
    min.innerHTML = (currentTime.getMinutes()<10?"0":"") + ((currentTime.getMinutes()+36)%60);
    sec.innerHTML = (currentTime.getSeconds()<10?"0":"") + currentTime.getSeconds();
},1000)