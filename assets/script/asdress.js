let userArr = JSON.parse(localStorage.getItem("user"));
let userArrSesion = JSON.parse(sessionStorage.getItem("user"));
let navProfile = document.querySelector(".nav-sign-up");
let loginName = document.querySelector(".login-name");
if (userArrSesion.isLogged) {
  loginName.innerHTML = `${userArrSesion.username}`;
} else if (userArr.isLogged) {
  loginName.innerHTML = `${userArr.username}`;
}
if (userArrSesion.isLogged == true || userArr.isLogged == true) {
  navProfile.innerHTML = `<div class="nav_profile">

  <div class = "nav_profile_image">
  <img src="https://www.hollywoodreporter.com/wp-content/uploads/2022/05/Musk-2.jpg?w=2000&h=1126&crop=1&resize=2000%2C1126" class="nav_image" >
  </div>
  <div class= "nav_profile_text">Profile</div>
  <i class=" logout fa-solid fa-right-from-bracket"></i>

  </div>`;
}
let logOut = document.querySelector(".logout");
console.log(logOut);
logOut.addEventListener("click", function () {
  window.location.href = "login.html";
});
// ADmin PAnel --===--=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=>
let adminPanelTextBox = document.querySelector(".admin-panel");
if (userArr.admin) {
  adminPanelTextBox.innerHTML = `
  <a style="font-weight: bold" href="./adminPanel.html"
              >Admin Panel</a
            >
  `;
} else if (userArrSesion.admin) {
  adminPanelTextBox.innerHTML = `
  <a style="font-weight: bold" href="./adminPanel.html"
              >Admin Panel</a
            >
  `;
}
