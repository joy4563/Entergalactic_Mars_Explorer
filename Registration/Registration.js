function sendDataToDatabase(userInfo) {
    spinner.classList.remove('hidden')
    fetch('http://localhost:5000/userRegister', {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(userInfo)
    })
        .then(res => res.json())
        .then(data => {
            if (data.insertedId) {
                spinner.classList.add('hidden')
                alert("Registration Successful");
                localStorage.setItem("mars_user", userInfo.userEmail);
                window.location.href = "../index.html";
        }
    })
}

const spinner = document.getElementById("loading-spinner")

document.getElementById('register').addEventListener('click', function () {
    let user_name = document.getElementById('name').value;
    let user_phone = document.getElementById('phone').value;
    let user_email = document.getElementById('email').value;
    let user_age = document.getElementById('age').value;
    let user_location = document.getElementById('location').value;
    let user_password = document.getElementById('password').value;

    const userInfo = {
        userName: user_name,
        userEmail: user_email,
        userAge: user_age,
        userPhone: user_phone,
        userLocation: user_location,
        userPassword: user_password
    }

    console.log(userInfo);
    sendDataToDatabase(userInfo);
})