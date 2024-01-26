let bagDetails = document.querySelector("#bag-details");
let id = new URLSearchParams(location.search).get("id");
console.log(id);
axios("http://localhost:3000/products").then(
  (res) => {
    let datas = res.data;
    let element = datas.find((elem) => elem.id == id);
    bagDetails.innerHTML = `<div class="container">
    <div class="direction">
      <p>Home</p>
      <img src="./assets/images/chevron-left.png" alt="" />
      <p>Shoulder Bags</p>
    </div>
    <div class="bag-details">
      <div class="bag-details-left">
        <div class="bag-details-img">
          <div class="img-sale-favicon">
            <div class="sale-btn">
              <p>${element.sold} %</p>
            </div>
           
            <img class="empty-heart" name=${element.id} src="./assets/images/favourite empty.png" alt="" />
          </div>
          <img  style="width: 100%; height: 100%;" src="${element.image}" alt="" />
        </div>
      </div>
      <div class="bag-details-right">
        <p id="head">${element.name}</p>
        <div class="reviews">
          <div class="stars">
            <img src="./assets/images/star.png" alt="" />
            <img src="./assets/images/star.png" alt="" />
            <img src="./assets/images/star.png" alt="" />
            <img src="./assets/images/star.png" alt="" />
            <img src="./assets/images/star.png" alt="" />
          </div>
          <div class="reviewP">
            <p>5.0 | 2 reviews</p>
          </div>
        </div>

        <div class="price-box1">
          <div class="price">
            <div class="price-details">
              <p>2-9 pieces</p>
              <span>US $20.00</span>
            </div>
          </div>
          <div class="price">
            <div class="price-details">
              <p>10-49 pieces</p>
              <span>US $15.00</span>
            </div>
          </div>
        </div>

        <div class="price-box2">
          <div class="price">
            <div class="price-details">
              <p>50 pieces</p>
              <span>US $12.00</span>
            </div>
          </div>
          <div class="price">
            <div class="price-details">
              <p>2-9 pieces</p>
              <span>US $20.00</span>
            </div>
          </div>
        </div>

        <div class="size-color">
          <div class="bag-size">
            <p>Size</p>
            <div class="sizes">
              <div class="size1 size">XS</div>
              <div class="size2 size">S</div>
              <div class="size3 size">M</div>
            </div>
          </div>
          <div class="bag-color">
            <p>Color</p>
            <div class="colors">
              <div class="color1 color"></div>
              <div class="color2 color"></div>
              <div class="color3 color"></div>
              <div class="color4 color"></div>
            </div>
          </div>
        </div>

        <div class="bag-details-button">
          <button id="${element.id}" class="add-to-card-btn">
            <p id="add-card">Add to card</p>
          </button>
          <button class="cash-payment-btn">
            <p id="cash">Cash payment</p>
          </button>
        </div>
        <div class="whatsApp">
          <a href="">WhatsApp Order</a>
        </div>
      </div>
    </div>
  </div>`;
  let basketArr = JSON.parse(localStorage.getItem("basket"))

  let addToBasket = document.querySelector(".add-to-card-btn")
  addToBasket.addEventListener("click", function(){
    if (!basketArr.find((x) => x.id == addToBasket.id)) {
      datas.find((x) => x.id == addToBasket.id).count = 1;

      basketArr.push(datas.find((x) => x.id == addToBasket.id));
      Swal.fire({
        icon: "success",
        title: "The product has been added to the basket",
        showConfirmButton: false,
        timer: 1500,
      });
    } else {
      basketArr.find((x) => x.id == addToBasket.id).count++;
      Swal.fire({
        icon: "success",
        title: "the number of products in the basket increased",
        showConfirmButton: false,
        timer: 1500,
      });
    }
    localStorage.setItem("basket", JSON.stringify(basketArr));
  })
    let emptyHeart = document.querySelector(".empty-heart");
    // console.log(emptyHeart);
    let favArray = [];
    let localFavArray = JSON.parse(localStorage.getItem("favorites"));
    if (localFavArray) {
      favArray = localFavArray;
    }
    for (let element of favArray) {
      if (element.id == emptyHeart.getAttribute("name")) {
        emptyHeart.removeAttribute("src");
        emptyHeart.setAttribute("src", "./assets/images/favourite.png");
        emptyHeart.classList("empty-heart", "solid-heart");
      }
    }
    // console.log(datas);
    emptyHeart.addEventListener("click", function () {
      if (this.classList.contains("empty-heart")) {
        this.removeAttribute("src");
        this.setAttribute("src", "./assets/images/favourite.png");
        this.classList.replace("empty-heart", "solid-heart");
        let result = datas.find(
          (element) => element.id == this.getAttribute("name")
        );
        favArray.push(result);
        localStorage.setItem("favorites", JSON.stringify(favArray));
      } else {
        this.removeAttribute("src");
        this.setAttribute("src", "./assets/images/favourite empty.png");
        this.classList.replace("solid-heart", "empty-heart");
        favArray = favArray.filter(
          (element) => element.id != this.getAttribute("name")
        );
        localStorage.setItem("favorites", JSON.stringify(favArray));
      }
    });
  }
);
// ADmin PAnel --===--=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=>
let userArr = JSON.parse(localStorage.getItem("user"));
let userArrSesion = JSON.parse(sessionStorage.getItem("user"));
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

let navProfile = document.querySelector(".nav-sign-up");
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
let Pdescription = document.querySelector("#p-description");
let Preview = document.querySelector("#p-reviews");
let reviewDescriptionBox = document.querySelector(".people-reviews");
console.log(Pdescription);
fetch("http://localhost:3000/products")
  .then((res) => res.json())
  .then((data) => {
    data.forEach((product) => {
      // console.log(product);
      if (product.id == id) {
        console.log(product.reviews);
        for (let review of product.reviews) {
          reviewDescriptionBox.innerHTML += `
          <div class="person-review">
              <div class="name-star">
                <div class="person-name">${review.from}</div>
                <div class="review-stars">
                  <img src="./assets/images/star.png" alt="" />
                  <img src="./assets/images/star.png" alt="" />
                  <img src="./assets/images/star.png" alt="" />
                  <img src="./assets/images/star.png" alt="" />
                  <img src="./assets/images/star.png" alt="" />
                </div>
              </div>
              <div class="review-date">${review.createDate}</div>
              <div class="review-paragraph">
                ${review.comment}
              </div>
            </div>
          `;
        }
      }
    });
 

  });
Pdescription.addEventListener("click", function (e) {
  e.preventDefault();
  Pdescription.style.color = "#212121";
  Preview.style.color = "#858585";
  fetch("http://localhost:3000/products")
    .then((res) => res.json())
    .then((data) => {
      data.forEach((element) => {
        if (element.id == id) {
          reviewDescriptionBox.innerHTML = `
        <div class="review-description-paragraph">
        ${element.description}
      </div>
        `;
        }
      });
    });
});
Preview.addEventListener("click", function (e) {
  e.preventDefault();
  Pdescription.style.color = "#858585";
  Preview.style.color = "#212121";
  fetch("http://localhost:3000/products")
    .then((res) => res.json())
    .then((data) => {
      data.forEach((product) => {
        // console.log(product);
        if (product.id == id) {
          console.log(product.reviews);
          for (let review of product.reviews) {
            reviewDescriptionBox.innerHTML += `
          <div class="person-review">
              <div class="name-star">
                <div class="person-name">${review.from}</div>
                <div class="review-stars">
                  <img src="./assets/images/star.png" alt="" />
                  <img src="./assets/images/star.png" alt="" />
                  <img src="./assets/images/star.png" alt="" />
                  <img src="./assets/images/star.png" alt="" />
                  <img src="./assets/images/star.png" alt="" />
                </div>
              </div>
              <div class="review-date">${review.createDate}</div>
              <div class="review-paragraph">
                ${review.comment}
              </div>
            </div>
          `;
          }
        }
      });
    });
});
