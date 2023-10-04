let user = localStorage.getItem('mars_user');
if (user) {
    console.log(user);
    document.getElementById('login').classList.add('hidden')
}