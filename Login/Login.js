function loginToWebsite(loginInfo) {
    console.log(loginInfo.email)
    fetch(`http://localhost:5000/userLogin/${loginInfo.email}`)
        .then(res => res.json())
        .then(data => {
            console.log(data);
            if (data.msg) {
                alert(data.msg);
            } else if(data.userPassword==loginInfo.password){
                localStorage.setItem("mars_user", loginInfo.email);
                swal({
                    title: "Successfully Login",
                    text: `Welcome to Mars ${data.userName}`,
                    icon: "success",
                    button: "OK",
                }).then((value) => {
                    window.location.href = '../index.html';
                });
            }
        });
}

document.getElementById('login_button').addEventListener('click', function () {
    let user_email = document.getElementById('email').value;
    let user_password = document.getElementById('password').value;

    let loginInfo = {
        email: user_email,
        password : user_password
    }

    loginToWebsite(loginInfo);
})