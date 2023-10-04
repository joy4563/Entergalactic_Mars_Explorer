let user = localStorage.getItem('mars_user');
if (user) {
    console.log(user);
    document.getElementById('login').classList.add('hidden')
    document.getElementById('profileImg').classList.remove('hidden')
}
else {
    document.getElementById('login').classList.remove('hidden')
    document.getElementById('profileImg').classList.add('hidden')
}