document.getElementById('logout').addEventListener('click', function () {
    let user = localStorage.getItem('mars_user');
    if (user) {
        console.log(user);
        localStorage.removeItem('mars_user');
        window.location.href = "../index.html";
    }
})

function loadData() {
    let user = localStorage.getItem('mars_user');
    fetch(`http://localhost:5000/userConfirmation?email=${user}`)
        .then(res => res.json())
        .then(data => getUserBookingInfo(data));
}

function getUserBookingInfo(data) {
    console.log(data);
    const userBookingInfo = document.getElementById('userBookingInformation')
    for (let i = 0; i < data.length; i++){
        userBookingInfo.innerHTML = `<div>
            <div class="card w-96 shadow-xl bg-black text-white">
            <div class="card-body">
                <h2 class="text-center font-bold text-2xl">${data[i].planet}</h2>
                <p>${data[i].companyName}</p>
                <p>${data[i].userName}</p>
                <p>${data[i].userEmail}</p>
                <p>${data[i].phoneNumber}</p>
                <p>${data[i].userAge}</p>
                <p>${data[i].launchingDate}</p>
            </div>
            </div>
        </div>`
        
    }
}

loadData()