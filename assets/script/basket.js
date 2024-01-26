basketArr = JSON.parse(localStorage.getItem("basket")) || [];

let sum = 0;

let basketLeftBox = document.querySelector(".basket_left_box");
let userArr = JSON.parse(localStorage.getItem("user")) || [];
let userArrSesion = JSON.parse(sessionStorage.getItem("user")) || [];
let navProfile = document.querySelector(".nav-sign-up");

console.log(basketArr);
fetch("http://localhost:3000/users")
  .then((res) => res.json())
  .then((data) => {
    if (userArrSesion.isLogged == true) {
      console.log(data.find((x) => x.id == userArrSesion.userID));
      console.log(basketArr);
      fetch(
        "http://localhost:3000/users/" +
          `${userArrSesion.userID}`,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          method: "PUT",
          body: JSON.stringify({
            basket: basketArr,

            // HELP-==-=-=-=-=-=-=-=-=-
          }),
        }
      );
    } else if (userArr.isLogged == true) {
      let findUser = data.find((x) => x.id == userArr.userID);

      console.log((findUser.basket = basketArr));

      fetch(
        "http://localhost:3000/users" +
          `${userArr.userID}`,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          method: "PUT",
          body: JSON.stringify({
            basket: basketArr,

            // HELP-==-=-=-=-=-=-=-=-=-
          }),
        }
      );
    }
  });

basketArr.forEach((element) => {
  basketLeftBox.innerHTML += `
   <div class="basket_item">
   <div class="basket_item_left">
     <div class="basket_item_image">
       <img
         src="${element.image}"
         alt=""
       />
     </div>
   </div>
   <div class="basket_item_right">
     <div class="basket_item_title_price">
       <div class="basket_item_title">
         <p>${element.name}</p>
       </div>
       <div class="basket_item_price">
         <p>US $${element.price * element.count}</p>
       </div>
     </div>
     <div class="basket_item_size_color">
       <div class="basket_item_size">
         <p>Size: XS</p>
       </div>
       <div class="basket_item_color">
         <p>Color: ${element.color}</p>
       </div>
     </div>
     <div class="basket_item_delivery">
       <p>Delivery: 25-32 days</p>
     </div>
     <div class="basket_item_quality">
       <p>Quantity</p>
     </div>
     <div class="basket_item_right_down">
       <div class="basket_item_quantity">
         <div class="basket_item_count"><input class="count_input" value="${
           element.count
         }"= ></div>
         <div class="basket_item_chevron">
          <div class="decrease">-</div>
          <div class="increase">+</div>
         </div>
       </div>
       <div class="basket_item_favorite_remove">
         <div class="basket_item_favorite">
         <img name="${
           element.id
         }" class="empty-heart" src="./assets/images/heart (2).png" alt="">
  
           <p name="${element.id}" id="basket-favorite-text">Favorite</p>
         </div>
         <div id="${element.id}" class="basket_item_remove">
  <img src="./assets/images/trash 1.png" alt="">            
         
           <p>Remove</p>
         </div>
       </div>
     </div>
   </div>
  </div>
   `;

  sum += Math.round(element.price * element.count);
});

// ADD FAVORITES -=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=->
let heartIcons = document.querySelectorAll(".empty-heart");
let favTexts = document.querySelectorAll("#basket-favorite-text");
let favArray = [];
let localFavArray = JSON.parse(localStorage.getItem("favorites"));
if (localFavArray) {
  favArray = localFavArray;
}
for (let element of favArray) {
  for (let icon of heartIcons) {
    for (let favText of favTexts) {
      if (
        element.id == icon.getAttribute("name") &&
        element.id == favText.getAttribute("name")
      ) {
        favText.style.color = "#DF4244";
        icon.removeAttribute("src");
        icon.setAttribute("src", "./assets/images/favourite solid basket.png");
        icon.classList.replace("empty-heart", "solid-heart");
      }
    }
  }
}

for (let heartIcon of heartIcons) {
  heartIcon.addEventListener("click", function () {
    if (this.classList.contains("empty-heart")) {
      Swal.fire({
        icon: "success",
        title: "The product has been added to the Wishlist",
        showConfirmButton: false,
        timer: 1500,
      });
      for (let favText of favTexts) {
        if (this.getAttribute("name") == favText.getAttribute("name")) {
          favText.style.color = "#DF4244";
        }
      }
      this.removeAttribute("src");
      this.setAttribute("src", "./assets/images/favourite solid basket.png");
      this.classList.replace("empty-heart", "solid-heart");
      fetch("http://localhost:3000/products")
        .then((res) => res.json())
        .then((data) => {
          let result = data.find(
            (elem) => elem.id == this.getAttribute("name")
          );
          favArray.push(result);
          localStorage.setItem("favorites", JSON.stringify(favArray));
        });
    } else {
      Swal.fire({
        icon: "success",
        title: "The product removed from Wishlist!",
        showConfirmButton: false,
        timer: 1500,
      });
      for (let favText of favTexts) {
        if (this.getAttribute("name") == favText.getAttribute("name")) {
          favText.style.color = "black";
        }
      }
      this.removeAttribute("src");
      this.setAttribute("src", "./assets/images/heart (2).png");
      this.classList.replace("solid-heart", "empty-heart");
      favArray = favArray.filter(
        (element) => element.id != this.getAttribute("name")
      );
      localStorage.setItem("favorites", JSON.stringify(favArray));
    }
  });
}

//function end

let SubTotal = document.querySelector(".basket_right_box_subtotal_price");
let TotalPrice = document.querySelector(".basket_right_box_up_totat_price");
console.log(SubTotal);
SubTotal.innerHTML = `<p>US $${sum}</p>`;
TotalPrice.innerHTML = `<p>US $${sum}</p>`;

// Artirmaq-=-==--=-=-=-=-=-=
let increase = document.querySelectorAll(".increase");

increase.forEach((btn, index) => {
  btn.addEventListener("click", function () {
    let productcount = ++btn.parentElement.previousElementSibling.children[0]
      .value;

    basketArr[index].count = productcount;

    btn.parentElement.parentElement.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.children[1].innerHTML = `<p>US $${(
      productcount * basketArr[index].price
    ).toFixed(2)}$</p> `;
    priceRender();

    localStorage.setItem("basket", JSON.stringify(basketArr));
  });
});
// Azaltmaq =-=-=-=-=-=--=-=-=-=-=-=-=--=-=-=-=-=-
let decrease = document.querySelectorAll(".decrease");
decrease.forEach((btn, index) => {
  btn.addEventListener("click", function () {
    if (basketArr[index].count == 1) {
      localStorage.setItem("basket", JSON.stringify(basketArr));
    } else {
      let productcount = --btn.parentElement.previousElementSibling.children[0]
        .value;

      basketArr[index].count = productcount;

      btn.parentElement.parentElement.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.children[1].innerHTML = `<p>US $${(
        productcount * basketArr[index].price
      ).toFixed(2)}$</p> `;
    }
    priceRender();

    localStorage.setItem("basket", JSON.stringify(basketArr));
  });
});

// Remove =-=-=-=---=-=-=-=-=-=-=-=-=-=-=--==-
let BasketItemRemove = document.querySelectorAll(".basket_item_remove");
BasketItemRemove.forEach((btn) => {
  btn.addEventListener("click", function () {
    Swal.fire({
      icon: "success",
      title: "removed",
      showConfirmButton: false,
      timer: 1500,
    });
    basketArr = basketArr.filter((x) => x.id != btn.id);
    priceRender();
    console.log(
      btn.parentElement.parentElement.parentElement.parentElement.remove()
    );

    localStorage.setItem("basket", JSON.stringify(basketArr));
    sessionStorage.setItem("basket".JSON.stringify(basketArr));
  });
});

function priceRender() {
  let sum = 0;
  basketArr.forEach((item) => {
    sum += Math.round(item.count * item.price);
  });
  SubTotal.innerHTML = `<p>US $${sum}</p>`;
  TotalPrice.innerHTML = `<p>US $${sum}</p>`;
}
priceRender();

if (userArrSesion.isLogged == true || userArr.isLogged == true) {
  navProfile.innerHTML = `<div class="nav_profile">

  <div class = "nav_profile_image">
  <img src="https://www.hollywoodreporter.com/wp-content/uploads/2022/05/Musk-2.jpg?w=2000&h=1126&crop=1&resize=2000%2C1126" class="nav_image" >
  </div>
  <div class= "nav_profile_text">Profile</div>
  <i class=" logout fa-solid fa-right-from-bracket"></i>

  </div>`;
}

// basket :[
//   data.basket,{
//     nem : "asdas"
//   }
// ],
// favorites : [
//   data.favorites,{

//   }
// ],

let basket_item = document.querySelectorAll(".basket_item");
let basket_right_box_subtotal_price = document.querySelector(
  ".basket_right_box_subtotal_price"
);
let basket_right_box_up_totat_price = document.querySelector(
  ".basket_right_box_up_totat_price"
);
console.log(basket_item);
// ORDER BUTTON =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=--=-

let orderBtn = document.querySelector(".basket_right_box_button_confirm_cart");
orderBtn.addEventListener("click", function () {
  if (userArr.isLogged == true) {
    if (userArr.balance > sum) {
      userArr.balance = userArr.balance - sum;

      console.log(basketArr);
      userArr.basket = [];
      basketArr = [];
      basket_item.forEach((item) => {
        item.remove();
      });
      basket_right_box_up_totat_price.innerHTML = `<p>US $0</p>`;
      basket_right_box_subtotal_price.innerHTML = `<p>US $0</p>`;
      console.log(basketArr);
      sessionStorage.setItem("basket", JSON.stringify([]));

      localStorage.setItem("basket", JSON.stringify([]));
      localStorage.setItem("user", JSON.stringify(userArr));
      fetch(
        "http://localhost:3000/users" +
          `${userArr.userID}`
      )
        .then((res) => res.json())
        .then((data) => {
          fetch(
            "http://localhost:3000/users" +
              `${userArr.userID}`,
            {
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
              },
              method: "PUT",
              body: JSON.stringify({
                balance: userArr.balance,
                orders: [
                  ...data.orders,
                  {
                    productCount: 2,
                    total_price: sum,
                    order_date: new Date(),
                    id: Math.random().toString(30).slice(2),
                  },
                ],
                // HELP-==-=-=-=-=-=-=-=-=-
              }),
            }
          );
        });
    } else {
      console.log("sads");
      Swal.fire({
        icon: "error",

        text: "Balance is not enough",
      });
    }
  } else if (userArrSesion.isLogged == true) {
    if (userArrSesion.balance > sum) {
      userArrSesion.balance = userArrSesion.balance - sum;

      console.log(basketArr);
      userArrSesion.basket = [];
      basketArr = [];
      basket_item.forEach((item) => {
        item.remove();
      });
      basket_right_box_up_totat_price.innerHTML = `<p>US $0</p>`;
      basket_right_box_subtotal_price.innerHTML = `<p>US $0</p>`;
      console.log(basketArr);
      localStorage.setItem("basket", JSON.stringify([]));

      sessionStorage.setItem("basket", JSON.stringify([]));

      sessionStorage.setItem("user", JSON.stringify(userArrSesion));
      fetch(
        "http://localhost:3000/users" +
          `${userArrSesion.userID}`
      )
        .then((res) => res.json())
        .then((data) => {
          fetch(
            "http://localhost:3000/users" +
              `${userArrSesion.userID}`,
            {
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
              },
              method: "PUT",
              body: JSON.stringify({
                balance: userArrSesion.balance,
                orders: [
                  ...data.orders,
                  {
                    productCount: 2,
                    total_price: sum,
                    order_date: new Date(),
                    id: Math.random().toString(30).slice(2),
                  },
                ],
                // HELP-==-=-=-=-=-=-=-=-=-
              }),
            }
          );
        });
    } else {
      Swal.fire({
        icon: "error",

        text: "Balance is not enough",
      });
    }
  } else {
    window.location.href = "login.html";
  }
});

let logOut = document.querySelector(".logout");
console.log(logOut);
logOut.addEventListener("click", function () {
  window.location.href = "login.html";
});
sessionStorage.setItem("basket", JSON.stringify(basketArr));
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
