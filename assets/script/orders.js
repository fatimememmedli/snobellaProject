let userArr = JSON.parse(localStorage.getItem("user"));
let userArrSesion = JSON.parse(sessionStorage.getItem("user"));
let navProfile = document.querySelector(".nav-sign-up");

if (userArrSesion.isLogged == true || userArr.isLogged == true) {
  navProfile.innerHTML = `<a href="./myAccountOrders.html">
    <div class="nav_profile">
  
    <div class = "nav_profile_image">
    <img src="https://www.hollywoodreporter.com/wp-content/uploads/2022/05/Musk-2.jpg?w=2000&h=1126&crop=1&resize=2000%2C1126" class="nav_image" >
    </div>
    <div class= "nav_profile_text">Profile</div></a>
    <i class=" logout fa-solid fa-right-from-bracket"></i>
    </div>`;
}

fetch(
  "http://localhost:3000/users/" +
    `${userArr.userID}`
)
  .then((res) => res.json())
  .then((data) => {
    let name = document.querySelector(".name-clientCode");
    name.innerHTML = `<p> Username  :${data.name}</p>`;
    let tBody = document.querySelector(".tbody");
    data.orders.forEach((element) => {
      console.log(element);
      tBody.innerHTML += `
    <tr>
    <th scope="row">${element.id}</th>
    <td>${element.productCount}</td>
    <td>US $${element.total_price}</td>
    <td>${element.order_date}</td>
    <td>Delivered</td>
    <td>...</td>
   
    
  </tr>`;
    });
  });
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
