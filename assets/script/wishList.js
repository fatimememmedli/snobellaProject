let favItemBox = document.querySelector(".favorite-products-box");
let favArray = JSON.parse(localStorage.getItem("favorites")) || [];
let localLoginUser = JSON.parse(localStorage.getItem("user"));
let sessionLoginUser = JSON.parse(sessionStorage.getItem("user"));

// console.log(localLoginUser);

fetch("http://localhost:3000/users")
  .then((res) => res.json())
  .then((data) => {
    let userFind = data.find((elem) => elem.id == localLoginUser.userID);
    console.log(userFind);
    // console.log((userFind.favorites = favArray));
  });

if (localLoginUser.isLogged) {
  fetch(
    "http://localhost:3000/users/" +
      `${localLoginUser.userID}`,
    {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "PUT",
      body: JSON.stringify({
        favorites: favArray,
      }),
    }
  );
} else if (sessionLoginUser.isLogged) {
  fetch(
    "http://localhost:3000/users/" +
      `${sessionLoginUser.userID}`,
    {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "PUT",
      body: JSON.stringify({
        favorites: favArray,
      }),
    }
  );
}

console.log(favArray);
for (let element of favArray) {
  favItemBox.innerHTML += `
    <div class="card">
                <div class="card_close_info">
                  <img name="${
                    element.id
                  }" class="fav-close-icon" src="./assets/images/close.png" alt="" />
                </div>
                <div class="card_new_info">
                  <p>${element.discountPercent}%</p>
                </div>
                <div class="card_image">
                  <img
                    src="${element.image}"
                    alt=""
                  />
                </div>
                <div class="card_text">
                  <div class="card_text_rate">
                    <img src="./assets/images/star.png" alt="" />
                    <img src="./assets/images/star.png" alt="" />
                    <img src="./assets/images/star.png" alt="" />
                    <img src="./assets/images/star.png" alt="" />
                    <img src="./assets/images/star.png" alt="" />
                  </div>
                  <div class="card_text_description">
                    <p>
                     ${element.description}
                    </p>
                  </div>
                  <div class="card_text_prices">
                    <div class="card_text_price_discount">
                      <p>$${element.price}</p>
                    </div>
                    <div class="card_text_price">From $${Math.floor(
                      (element.price * (100 + element.discountPercent)) / 100
                    )}</div>
                  </div>
                  <div  class="card_text_button">
                    <button class="add_to_basket"   id="${
                      element.id
                    }"  >Add to card</button>
                  </div>
                </div>
              </div>
    `;
  fetch("http://localhost:3000/products")
    .then((res) => res.json())
    .then((data) => {
      let addToBasket = document.querySelectorAll(".add_to_basket");

      let basketArr = JSON.parse(localStorage.getItem("basket"));

      addToBasket.forEach((addBtn) => {
        addBtn.addEventListener("click", function (e) {
          e.stopPropagation();
          e.preventDefault();
          if (!basketArr.find((x) => x.id == addBtn.id)) {
            data.find((x) => x.id == addBtn.id).count = 1;

            basketArr.push(data.find((x) => x.id == addBtn.id));
            Swal.fire({
              icon: "success",
              title: "The product has been added to the basket",
              showConfirmButton: false,
              timer: 1500,
            });
          } else {
            basketArr.find((x) => x.id == addBtn.id).count++;
            Swal.fire({
              icon: "success",
              title: "the number of products in the basket increased",
              showConfirmButton: false,
              timer: 1500,
            });
          }
          localStorage.setItem("basket", JSON.stringify(basketArr));
        });
      });
    });

  let favCloseIcons = document.querySelectorAll(".fav-close-icon");
  console.log(favCloseIcons);
  for (let closeIcon of favCloseIcons) {
    closeIcon.addEventListener("click", function () {
      Swal.fire({
        icon: "success",
        title: "The product removed from Wishlist!",
        showConfirmButton: false,
        timer: 1500,
      });
      this.parentElement.parentElement.remove();
      favArray = favArray.filter(
        (elem) => elem.id != this.getAttribute("name")
      );
      localStorage.setItem("favorites", JSON.stringify(favArray));
    });
  }
}
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
