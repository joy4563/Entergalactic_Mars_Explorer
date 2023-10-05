function sendDataToDatabase(user_booking_info) {
    fetch('http://localhost:5000/seatBooking', {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(user_booking_info)
    })
        .then(res => res.json())
        .then(data => {
            if (data.insertedId) {
                alert("Confirm Your Booking Successfully");
                window.location.href = "../userProfile/userProfile.html";
        }
    })
}

function loadData() {
    let user = localStorage.getItem('mars_user');
    fetch(`http://localhost:5000/userRegister/${user}`)
        .then(res => res.json())
        .then(data => getUserInfo(data));
}

function getUserInfo(data) {
    document.getElementById('name').value = data.userName;
    document.getElementById('email').value = data.userEmail;
    document.getElementById('phone').value = data.userPhone;
    document.getElementById('age').value = data.userAge;
}


document.getElementById('confirm').addEventListener('click', function () {
    let applicant_name = document.getElementById('name').value;
    let applicant_email = document.getElementById('email').value;
    let phoneNumber = document.getElementById('phone').value;
    let age = document.getElementById('age').value;
    let back_account_no = document.getElementById('account').value;

    const urlParams = new URLSearchParams(window.location.search);
    const company_info = urlParams.get('value').split(',');
    let company_name_value = company_info[0]
    let company_tour_launching_date = company_info[1];
    let planet = company_info[2];

    const user_booking_info = {
        userName: applicant_name,
        userEmail: applicant_email,
        userAge: age,
        phoneNumber: phoneNumber,
        companyName: company_name_value,
        userBankAccount: back_account_no,
        launchingDate: company_tour_launching_date,
        planet: planet
    }

    console.log(user_booking_info);
    sendDataToDatabase(user_booking_info);
})


let user = localStorage.getItem('mars_user');
if (!user) {
    window.location.href="../Login/Login.html"
}

loadData()

