let userArr = JSON.parse(localStorage.getItem("user"));
let userArrSesion = JSON.parse(sessionStorage.getItem("user"));
let navProfile = document.querySelector(".nav-sign-up");
let user;
let searchInput = document.querySelector(".search_input");
let hero_slider = document.querySelector(".hero_slider");
console.log(searchInput.value);
fetch("http://localhost:3000/products")
  .then((res) => res.json())
  .then((data) => {
    fetch("http://localhost:3000/products")
      .then((res) => res.json())
      .then((data) => {
        searchInput.addEventListener("input", function () {
          hero_slider.innerHTML = "";

          data.forEach((element) => {
            if (
              element.name
                .toLowerCase()
                .trim()
                .includes(searchInput.value.toLowerCase().trim())
            ) {
              hero_slider.innerHTML += ` <div class="card">
              <div class="card_heart_info">
              <img class="empty-heart" name="${
                element.id
              }" src="./assets/images/favourite empty.png" alt="">
                  
              </div>
              <div class="card_new_info">
              <a href="./productDetails.html?id=${element.id}">
                  <p>${element.discountPercent}%</p>
              </div>
              <div class="card_image">
              
              <img
                src= "${element.image}"
                alt=""
              />
              </div>
              <div class="card_down">
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
          <div class="card_text_button">
              <button id="${
                element.id
              }" class="add_to_card">Add to card</button>
            </div>
          </div>
            </div>
              </div>`;
            } else {
            }
          });
        });
      });
  });

let heroSlider1 = document.querySelector(".slider1");
fetch("http://localhost:3000/products")
  .then((res) => res.json())
  .then((data) => {
    let max = 0;
    data.filter((elem) => {
      if (elem.price > max) {
        max = elem.price;
      }
      console.log(max);
      if (elem.price == max) {
        heroSlider1.innerHTML = `
      <img style ="margin-top:90px; style="max-width: 500px; max-height: 450px; margin-top:90px;"" src="${elem.image}">
`;
      }
    });
  });
let heroSlider2 = document.querySelector(".slider2");
console.log(heroSlider2);
fetch("http://localhost:3000/products")
  .then((res) => res.json())
  .then((data) => {
    data.filter((elem) => {
      let min = data[0].price;

      if (elem.price < min) {
        min = elem.price;
      }
      console.log(min);
      if (elem.price == min) {
        heroSlider2.innerHTML = `
      <img style="max-width: 500px; max-height: 450px; margin-top:90px;" src="${elem.image}">

`;
      }
    });
  });

let heroSliders = document.querySelector(".hero_sliders");
$(document).ready(function () {
  $(".hero_sliders").slick({
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    dots: true,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 3000,
  });
});

let featured_cards = document.querySelector(".featured_cards");

// FeaturedCards=-=-=-=-=-=-=-=-=-=-=-=-===-
fetch("http://localhost:3000/products")
  .then((res) => res.json())
  .then((data) => {
    data.forEach((element) => {
      if (element.categoryFirst) {
        let child = ` <div class="card">
        <div class="card_heart_info">
        <img class="empty-heart" name="${
          element.id
        }" src="./assets/images/favourite empty.png" alt="">
            
        </div>
        <div class="card_new_info">
        <a href="./productDetails.html?id=${element.id}">
            <p>${element.discountPercent}%</p>
        </div>
        <div class="card_image">
        
        <img
          src= "${element.image}"
          alt=""
        />
        </div>
        <div class="card_down">
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
    <div class="card_text_button">
        <button id="${element.id}" class="add_to_card">Add to card</button>
      </div>
    </div>
      </div>
        </div>`;
        featured_cards.innerHTML += child;
      }

      let card_new_info = document.querySelectorAll(".card_new_info");
      card_new_info.forEach((card) => {
        if (!element.discountPercent == "") {
          card.style.backgroundColor = "red";
        } else {
          card.style.backgroundColor = "green";
        }
      });
    });
    // SOLID  HEART ICON FEATURED CARD -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
    let heartIcons = document.querySelectorAll(".empty-heart");

    let favArray = [];
    let localFavArray = JSON.parse(localStorage.getItem("favorites"));
    if (localFavArray) {
      favArray = localFavArray;
    }
    for (let element of favArray) {
      for (let icon of heartIcons) {
        if (element.id == icon.getAttribute("name")) {
          icon.removeAttribute("src");
          icon.setAttribute("src", "./assets/images/favourite.png");
          icon.classList.replace("empty-heart", "solid-heart");
        }
      }
    }

    // addToCard();

    $(document).ready(function () {
      $(".featured_cards").slick({
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 1,

        arrows: true,
        autoplay: true,
        autoplaySpeed: 1000,
        useTransform: false,
        pauseOnHover: true,

        responsive: [
          {
            breakpoint: 912,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 1,
              arrows: false,
            },
          },
          {
            breakpoint: 500,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
              arrows: false,
            },
          },
        ],
      });
    });

    let bestseller_cards = document.querySelector(".bestseller_cards");
    // BestSeller cards=-=-=-=-

    data.forEach((element) => {
      if (element.categoryFirst) {
        let child1 = ` <div class="card">
        <div class="card_heart_info">
        <img class="bestseller-empty-heart" name="${
          element.id
        }" src="./assets/images/favourite empty.png" alt="">
          
         </div>
              <div class="card_new_info">
              <a href="./productDetails.html?id=${element.id}">
  
                  <p>${element.discountPercent}%</p>
              </div>
              <div class="card_image">
              <img
                src= "${element.image}"
                alt=""
              />
              </div>
              <div class="card_down">
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
          <div class="card_text_button">
              <button id="${
                element.id
              }"  class="add_to_card">Add to card</button>
            </div>
          </div>
            </div>
              </div>`;
        bestseller_cards.innerHTML += child1;
      }

      let card_new_info = document.querySelectorAll(".card_new_info");
      card_new_info.forEach((card) => {
        if (!element.discountPercent == "") {
          card.style.backgroundColor = "red";
        } else {
          card.style.backgroundColor = "green";
        }
      });
    });

    // SOLID  HEART ICON BESTSELLER CARD -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=

    let bestsellerHeartIcons = document.querySelectorAll(
      ".bestseller-empty-heart"
    );
    for (let element of favArray) {
      for (let icon of bestsellerHeartIcons) {
        if (element.id == icon.getAttribute("name")) {
          icon.removeAttribute("src");
          icon.setAttribute("src", "./assets/images/favourite.png");
          icon.classList.replace("empty-heart", "solid-heart");
        }
      }
    }
    $(document).ready(function () {
      $(".bestseller_cards").slick({
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 1,

        arrows: true,
        autoplay: true,
        autoplaySpeed: 1000,
        useTransform: false,
        responsive: [
          {
            breakpoint: 912,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 1,
              arrows: false,
            },
          },
          {
            breakpoint: 500,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
              arrows: false,
            },
          },
        ],
      });
    });

    // Discount Cards=-=-=--=--=-=-=-
    let discount_cards = document.querySelector(".discount_cards");
    data.forEach((element) => {
      if (element.categoryFirst) {
        let child = ` <div class="card">
        <div class="card_heart_info">
        <img class="discount-empty-heart" name="${
          element.id
        }" src="./assets/images/favourite empty.png" alt="">
          
         </div>
              <div class="card_new_info">
              <a href="./productDetails.html?id=${element.id}">

                  <p>${element.discountPercent}%</p>
              </div>
              <div class="card_image">
              <img
                src= "${element.image}"
                alt=""
              />
              </div>
              <div class="card_down">
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
          <div class="card_text_button">
              <button id="${
                element.id
              }" class="add_to_card">Add to card</button>
            </div>
          </div>
            </div>
              </div>`;
        discount_cards.innerHTML += child;
      }

      let card_new_info = document.querySelectorAll(".card_new_info");
      card_new_info.forEach((card) => {
        if (!element.discountPercent == "") {
          card.style.backgroundColor = "red";
        } else {
          card.style.backgroundColor = "green";
        }
      });
    });
    addToCard();

    // SOLID  HEART ICON DISCOUNT CARD -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=

    let discountHeartIcons = document.querySelectorAll(".discount-empty-heart");
    for (let element of favArray) {
      for (let icon of discountHeartIcons) {
        if (element.id == icon.getAttribute("name")) {
          icon.removeAttribute("src");
          icon.setAttribute("src", "./assets/images/favourite.png");
          icon.classList.replace(
            "discount-empty-heart",
            "discount-solid-heart"
          );
        }
      }
    }
    // Add  favorites local Storage When Click FeaturedIcon-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=>
    for (let featuredHeartIcon of heartIcons) {
      featuredHeartIcon.addEventListener("click", function () {
        for (let bestsellerIcon of bestsellerHeartIcons) {
          for (let discountIcon of discountHeartIcons) {
            if (
              this.getAttribute("name") ==
                bestsellerIcon.getAttribute("name") &&
              this.getAttribute("name") == discountIcon.getAttribute("name")
            ) {
              if (
                this.classList.contains("empty-heart") &&
                bestsellerIcon.classList.contains("bestseller-empty-heart") &&
                discountIcon.classList.contains("discount-empty-heart")
              ) {
                Swal.fire({
                  icon: "success",
                  title: "The product has been added to the Wishlist",
                  showConfirmButton: false,
                  timer: 1500,
                });
                //featured
                this.removeAttribute("src");
                this.setAttribute("src", "./assets/images/favourite.png");
                this.classList.replace("empty-heart", "solid-heart");
                //bestseller
                bestsellerIcon.classList.replace(
                  "bestseller-empty-heart",
                  "bestseller-solid-heart"
                );
                bestsellerIcon.removeAttribute("src");
                bestsellerIcon.setAttribute(
                  "src",
                  "./assets/images/favourite.png"
                );
                //discount
                discountIcon.classList.replace(
                  "discount-empty-heart",
                  "discount-solid-heart"
                );
                discountIcon.removeAttribute("src");
                discountIcon.setAttribute(
                  "src",
                  "./assets/images/favourite.png"
                );
                //push localStorage
                let result = data.find(
                  (elem) => elem.id == this.getAttribute("name")
                );
                favArray.push(result);
                localStorage.setItem("favorites", JSON.stringify(favArray));
              } else {
                Swal.fire({
                  icon: "success",
                  title: "The product removed from Wishlist!",
                  showConfirmButton: false,
                  timer: 1500,
                });
                //featured
                this.removeAttribute("src");
                this.setAttribute("src", "./assets/images/favourite empty.png");
                this.classList.replace("solid-heart", "empty-heart");
                //bestseller
                bestsellerIcon.removeAttribute("src");
                bestsellerIcon.setAttribute(
                  "src",
                  "./assets/images/favourite empty.png"
                );
                bestsellerIcon.classList.replace(
                  "bestseller-solid-heart",
                  "bestseller-empty-heart"
                );
                //discount
                discountIcon.removeAttribute("src");
                discountIcon.setAttribute(
                  "src",
                  "./assets/images/favourite empty.png"
                );
                discountIcon.classList.replace(
                  "discount-solid-heart",
                  "discount-empty-heart"
                );
                // pop localStorage
                favArray = favArray.filter(
                  (element) => element.id != this.getAttribute("name")
                );
                localStorage.setItem("favorites", JSON.stringify(favArray));
              }
            }
          }
        }
      });
    }

    // Add  favorites local Storage When Click BestsellerIcon-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=>

    for (let bestsellerIcon of bestsellerHeartIcons) {
      bestsellerIcon.addEventListener("click", function () {
        for (let featuredIcon of heartIcons) {
          for (let discountIcon of discountHeartIcons) {
            if (
              this.getAttribute("name") == featuredIcon.getAttribute("name") &&
              this.getAttribute("name") == discountIcon.getAttribute("name")
            ) {
              if (
                this.classList.contains("bestseller-empty-heart") &&
                featuredIcon.classList.contains("empty-heart") &&
                discountIcon.classList.contains("discount-empty-heart")
              ) {
                Swal.fire({
                  icon: "success",
                  title: "The product has been added to the Wishlist",
                  showConfirmButton: false,
                  timer: 1500,
                });
                //featured
                this.removeAttribute("src");
                this.setAttribute("src", "./assets/images/favourite.png");
                this.classList.replace(
                  "bestseller-empty-heart",
                  "bestseller-solid-heart"
                );
                //featuredIcon
                featuredIcon.classList.replace("empty-heart", "solid-heart");
                featuredIcon.removeAttribute("src");
                featuredIcon.setAttribute(
                  "src",
                  "./assets/images/favourite.png"
                );
                //discount
                discountIcon.classList.replace(
                  "discount-empty-heart",
                  "discount-solid-heart"
                );
                discountIcon.removeAttribute("src");
                discountIcon.setAttribute(
                  "src",
                  "./assets/images/favourite.png"
                );
                //push localStorage
                let result = data.find(
                  (elem) => elem.id == this.getAttribute("name")
                );
                favArray.push(result);
                localStorage.setItem("favorites", JSON.stringify(favArray));
              } else {
                Swal.fire({
                  icon: "success",
                  title: "The product removed from Wishlist!",
                  showConfirmButton: false,
                  timer: 1500,
                });
                //featured
                this.removeAttribute("src");
                this.setAttribute("src", "./assets/images/favourite empty.png");
                this.classList.replace(
                  "bestseller-solid-heart",
                  "bestseller-empty-heart"
                );
                //featured
                featuredIcon.removeAttribute("src");
                featuredIcon.setAttribute(
                  "src",
                  "./assets/images/favourite empty.png"
                );
                featuredIcon.classList.replace("solid-heart", "empty-heart");
                //discount
                discountIcon.removeAttribute("src");
                discountIcon.setAttribute(
                  "src",
                  "./assets/images/favourite empty.png"
                );
                discountIcon.classList.replace(
                  "discount-solid-heart",
                  "discount-empty-heart"
                );
                // pop localStorage
                favArray = favArray.filter(
                  (element) => element.id != this.getAttribute("name")
                );
                localStorage.setItem("favorites", JSON.stringify(favArray));
              }
            }
          }
        }
      });
    }
    // Add  favorites local Storage When Click DiscountIcon-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=>
    for (let discountIcon of discountHeartIcons) {
      discountIcon.addEventListener("click", function () {
        for (let bestsellerIcon of bestsellerHeartIcons) {
          for (let featuredIcon of heartIcons) {
            if (
              this.getAttribute("name") ==
                bestsellerIcon.getAttribute("name") &&
              this.getAttribute("name") == featuredIcon.getAttribute("name")
            ) {
              if (
                this.classList.contains("discount-empty-heart") &&
                bestsellerIcon.classList.contains("bestseller-empty-heart") &&
                featuredIcon.classList.contains("empty-heart")
              ) {
                console.log(discountIcon);
                Swal.fire({
                  icon: "success",
                  title: "The product has been added to the Wishlist",
                  showConfirmButton: false,
                  timer: 1500,
                });
                //discount
                this.removeAttribute("src");
                this.setAttribute("src", "./assets/images/favourite.png");
                this.classList.replace(
                  "discount-empty-heart",
                  "discount-solid-heart"
                );
                //bestseller
                bestsellerIcon.classList.replace(
                  "bestseller-empty-heart",
                  "bestseller-solid-heart"
                );
                bestsellerIcon.removeAttribute("src");
                bestsellerIcon.setAttribute(
                  "src",
                  "./assets/images/favourite.png"
                );
                //featured
                featuredIcon.classList.replace("empty-heart", "solid-heart");
                featuredIcon.removeAttribute("src");
                featuredIcon.setAttribute(
                  "src",
                  "./assets/images/favourite.png"
                );
                //push localStorage
                let result = data.find(
                  (elem) => elem.id == this.getAttribute("name")
                );
                favArray.push(result);
                localStorage.setItem("favorites", JSON.stringify(favArray));

                console.log(bestsellerIcon);
              } else {
                Swal.fire({
                  icon: "success",
                  title: "The product removed from Wishlist!",
                  showConfirmButton: false,
                  timer: 1500,
                });
                //discount
                this.removeAttribute("src");
                this.setAttribute("src", "./assets/images/favourite empty.png");
                this.classList.replace(
                  "discount-solid-heart",
                  "discount-empty-heart"
                );
                //bestseller
                bestsellerIcon.removeAttribute("src");
                bestsellerIcon.setAttribute(
                  "src",
                  "./assets/images/favourite empty.png"
                );
                bestsellerIcon.classList.replace(
                  "bestseller-solid-heart",
                  "bestseller-empty-heart"
                );
                //featured
                featuredIcon.removeAttribute("src");
                featuredIcon.setAttribute(
                  "src",
                  "./assets/images/favourite empty.png"
                );
                featuredIcon.classList.replace("solid-heart", "empty-heart");
                // pop localStorage
                favArray = favArray.filter(
                  (element) => element.id != this.getAttribute("name")
                );
                localStorage.setItem("favorites", JSON.stringify(favArray));
              }
            }
          }
        }
      });
    }
    $(document).ready(function () {
      $(".discount_cards").slick({
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 1,

        arrows: true,
        autoplay: true,
        autoplaySpeed: 1000,
        useTransform: false,
        responsive: [
          {
            breakpoint: 912,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 1,
              arrows: false,
            },
          },
          {
            breakpoint: 700,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
              arrows: false,
            },
          },
        ],
      });
    });

    // BASKETTTTTTTTTTTTT

    basketData = JSON.parse(localStorage.getItem("basket"));
    let basketArr = [];
    if (basketData) {
      basketArr = basketData;
    }
    function addToCard() {
      let add_to_card = document.querySelectorAll(".add_to_card");

      add_to_card.forEach((addBtn) => {
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
          sessionStorage.setItem("basket".JSON.stringify(basketArr));
        });
      });
    }

    //fetch bitir
  });

jQuery.event.special.touchstart = {
  setup: function (_, ns, handle) {
    this.addEventListener("touchstart", handle, {
      passive: !ns.includes("noPreventDefault"),
    });
  },
};
jQuery.event.special.touchmove = {
  setup: function (_, ns, handle) {
    this.addEventListener("touchmove", handle, {
      passive: !ns.includes("noPreventDefault"),
    });
  },
};
if (userArrSesion.isLogged == true || userArr.isLogged == true) {
  navProfile.innerHTML = `<a href="./myAccountOrders.html">
  <div class="nav_profile">

  <div class = "nav_profile_image">
  <img src="https://www.hollywoodreporter.com/wp-content/uploads/2022/05/Musk-2.jpg?w=2000&h=1126&crop=1&resize=2000%2C1126" class="nav_image" >
  </div>
  <div class= "nav_profile_text">Profile</div>
  <i class=" logout fa-solid fa-right-from-bracket"></i>
  </div></a>`;
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
