let cards = document.querySelectorAll(".cards");
let backPacks = document.querySelector(".backpacks");
let handBags = document.querySelector(".hand_bags");
let checkBox = document.querySelectorAll(".checkbox");

// checkBox.forEach(element => {
//   element.addEventListener("change",function(){
//     console.log("sad");
//   })
// })

cards.forEach((card) => {
  fetch("http://localhost:3000/products")
    .then((res) => res.json())
    .then((data) => {
      data.forEach((element) => {
        card.innerHTML += ` <div class="card">
                <div class="card_heart_info">
                <img class="empty-heart" name="${
                  element.id
                }" src="./assets/images/favourite empty.png" alt="">
                </div>
                <div class="card_new_info">
                    <p>${element.discountPercent}%</p>
                </div>
              <div class="card_image">
              <a href="./productDetails.html?id=${element.id}">
                <img
                  src= "${element.image}"
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
                <div class="card_text_button">
                    <button id= "${
                      element.id
                    }" class="add_to_basket">Add to card</button>
                  </div>
              </div>
            </div></a>`;

        let card_new_info = document.querySelectorAll(".card_new_info");
        card_new_info.forEach((card) => {
          if (!element.discountPercent == "") {
            card.style.backgroundColor = "red";
          } else {
            card.style.backgroundColor = "green";
          }
        });
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

      //add Wishlist -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=->
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

      for (let heartIcon of heartIcons) {
        heartIcon.addEventListener("click", function () {
          if (this.classList.contains("empty-heart")) {
            Swal.fire({
              icon: "success",
              title: "The product has been added to the Wishlist",
              showConfirmButton: false,
              timer: 1500,
            });
            this.removeAttribute("src");
            this.setAttribute("src", "./assets/images/favourite.png");
            this.classList.replace("empty-heart", "solid-heart");
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

      //fetch end
    });
});

backPacks.addEventListener("click", function () {
  cards.forEach((card) => {
    card.innerHTML = "";

    fetch("http://localhost:3000/products")
      .then((res) => res.json())
      .then((data) => {
        data.forEach((element) => {
          if (element.categoryFirst == "Backpacks") {
            card.innerHTML += ` <div class="card">
            <div class="card_heart_info">
            <img class="empty-heart" name="${
              element.id
            }" src="./assets/images/favourite empty.png" alt="">
            </div>
            <div class="card_new_info">
                <p>${element.discountPercent}%</p>
            </div>
          <div class="card_image">
            <img
              src= "${element.image}"
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
            <div class="card_text_button">
                <button id= "${
                  element.id
                }" class="add_to_basket">Add to card</button>
              </div>
          </div>
        </div>`;

            let card_new_info = document.querySelectorAll(".card_new_info");
            card_new_info.forEach((card) => {
              if (!element.discountPercent == "") {
                card.style.backgroundColor = "red";
              } else {
                card.style.backgroundColor = "green";
              }
            });
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
          }
        });
        //add Wishlist -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=->

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

        for (let heartIcon of heartIcons) {
          heartIcon.addEventListener("click", function () {
            if (this.classList.contains("empty-heart")) {
              Swal.fire({
                icon: "success",
                title: "The product has been added to the Wishlist",
                showConfirmButton: false,
                timer: 1500,
              });
              this.removeAttribute("src");
              this.setAttribute("src", "./assets/images/favourite.png");
              this.classList.replace("empty-heart", "solid-heart");
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

        // fetch end
      });
  });
});

handBags.addEventListener("click", function () {
  cards.forEach((card) => {
    card.innerHTML = "";

    fetch("http://localhost:3000/products")
      .then((res) => res.json())
      .then((data) => {
        data.forEach((element) => {
          if (element.categoryFirst == "Handbags") {
            card.innerHTML += ` <div class="card">
                      <div class="card_heart_info">
                      <img class="empty-heart" name="${
                        element.id
                      }" src="./assets/images/favourite empty.png" alt="">
                      </div>
                      <div class="card_new_info">
                          <p>${element.discountPercent}%</p>
                      </div>
                    <div class="card_image">
                      <img
                        src= "${element.image}"
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
                          (element.price * (100 + element.discountPercent)) /
                            100
                        )}</div>
                        
                      </div>
                      <div class="card_text_button">
                          <button id= "${
                            element.id
                          }" class="add_to_basket">Add to card</button>
                        </div>
                    </div>
                  </div>`;

            let card_new_info = document.querySelectorAll(".card_new_info");
            card_new_info.forEach((card) => {
              if (!element.discountPercent == "") {
                card.style.backgroundColor = "red";
              } else {
                card.style.backgroundColor = "green";
              }
            });
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
          }
        });
        //add Wishlist -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=->

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

        for (let heartIcon of heartIcons) {
          heartIcon.addEventListener("click", function () {
            if (this.classList.contains("empty-heart")) {
              Swal.fire({
                icon: "success",
                title: "The product has been added to the Wishlist",
                showConfirmButton: false,
                timer: 1500,
              });
              this.removeAttribute("src");
              this.setAttribute("src", "./assets/images/favourite.png");
              this.classList.replace("empty-heart", "solid-heart");
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

        //fetch end
      });
  });
});

let minInput = document.querySelector(".min_price");
let maxInput = document.querySelector(".max_price");
let searchBtn = document.querySelector(".fa-magnifying-glass");
searchBtn.addEventListener("click", function () {
  cards.forEach((card) => {
    card.innerHTML = "";

    fetch("http://localhost:3000/products")
      .then((res) => res.json())
      .then((data) => {
        data.forEach((element) => {
          if (
            maxInput.value >= element.price &&
            minInput.value <= element.price
          ) {
            card.innerHTML += ` <div class="card">
      <div class="card_heart_info">
      <img class="empty-heart" name="${
        element.id
      }" src="./assets/images/favourite empty.png" alt="">
      </div>
      <div class="card_new_info">
          <p>${element.discountPercent}%</p>
      </div>
    <div class="card_image">
      <img
        src= "${element.image}"
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
      <div class="card_text_button">
          <button id= "${element.id}" class="add_to_basket">Add to card</button>
        </div>
    </div>
  </div>`;
            let card_new_info = document.querySelectorAll(".card_new_info");
            card_new_info.forEach((card) => {
              if (!element.discountPercent == "") {
                card.style.backgroundColor = "red";
              } else {
                card.style.backgroundColor = "green";
              }
            });
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
          }
        });
        //add Wishlist -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=->

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

        for (let heartIcon of heartIcons) {
          heartIcon.addEventListener("click", function () {
            if (this.classList.contains("empty-heart")) {
              Swal.fire({
                icon: "success",
                title: "The product has been added to the Wishlist",
                showConfirmButton: false,
                timer: 1500,
              });
              this.removeAttribute("src");
              this.setAttribute("src", "./assets/images/favourite.png");
              this.classList.replace("empty-heart", "solid-heart");
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

        //fetch end
      });
  });
});

// COLOR FILTER=-=-=-=-=-=-=--=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
let colorRed = document.querySelector(".red");
let colorBlue = document.querySelector(".blue");
let colorBlack = document.querySelector(".black");
colorBlack.addEventListener("click", function () {
  cards.forEach((card) => {
    card.innerHTML = "";

    fetch("http://localhost:3000/products")
      .then((res) => res.json())
      .then((data) => {
        data.forEach((element) => {
          if (element.color == "Black") {
            card.innerHTML += ` <div class="card">
      <div class="card_heart_info">
      <img class="empty-heart" name="${
        element.id
      }" src="./assets/images/favourite empty.png" alt="">
      </div>
      <div class="card_new_info">
          <p>${element.discountPercent}%</p>
      </div>
    <div class="card_image">
      <img
        src= "${element.image}"
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
      <div class="card_text_button">
          <button id= "${element.id}" class="add_to_basket">Add to card</button>
        </div>
    </div>
  </div>`;
            let card_new_info = document.querySelectorAll(".card_new_info");
            card_new_info.forEach((card) => {
              if (!element.discountPercent == "") {
                card.style.backgroundColor = "red";
              } else {
                card.style.backgroundColor = "green";
              }
            });
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
          }
        });

        //add Wishlist -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=->

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

        for (let heartIcon of heartIcons) {
          heartIcon.addEventListener("click", function () {
            if (this.classList.contains("empty-heart")) {
              Swal.fire({
                icon: "success",
                title: "The product has been added to the Wishlist",
                showConfirmButton: false,
                timer: 1500,
              });
              this.removeAttribute("src");
              this.setAttribute("src", "./assets/images/favourite.png");
              this.classList.replace("empty-heart", "solid-heart");
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
        //fetch end
      });
  });
});
colorRed.addEventListener("click", function () {
  cards.forEach((card) => {
    card.innerHTML = "";

    fetch("http://localhost:3000/products")
      .then((res) => res.json())
      .then((data) => {
        data.forEach((element) => {
          if (element.color == "Red") {
            card.innerHTML += ` <div class="card">
      <div class="card_heart_info">
      <img class="empty-heart" name="${
        element.id
      }" src="./assets/images/favourite empty.png" alt="">
      </div>
      <div class="card_new_info">
          <p>${element.discountPercent}%</p>
      </div>
    <div class="card_image">
      <img
        src= "${element.image}"
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
      <div class="card_text_button">
          <button id= "${element.id}" class="add_to_basket">Add to card</button>
        </div>
    </div>
  </div>`;
            let card_new_info = document.querySelectorAll(".card_new_info");
            card_new_info.forEach((card) => {
              if (!element.discountPercent == "") {
                card.style.backgroundColor = "red";
              } else {
                card.style.backgroundColor = "green";
              }
            });
            let addToBasket = document.querySelectorAll(".add_to_basket");
            console.log(addToBasket);
            let basketArr = JSON.parse(localStorage.getItem("basket"));

            addToBasket.forEach((addBtn) => {
              console.log(addBtn);
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
          }
        });
        //add Wishlist -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=->

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

        for (let heartIcon of heartIcons) {
          heartIcon.addEventListener("click", function () {
            if (this.classList.contains("empty-heart")) {
              Swal.fire({
                icon: "success",
                title: "The product has been added to the Wishlist",
                showConfirmButton: false,
                timer: 1500,
              });
              this.removeAttribute("src");
              this.setAttribute("src", "./assets/images/favourite.png");
              this.classList.replace("empty-heart", "solid-heart");
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

        //fetch end
      });
  });
});
colorBlue.addEventListener("click", function () {
  cards.forEach((card) => {
    card.innerHTML = "";

    fetch("http://localhost:3000/products")
      .then((res) => res.json())
      .then((data) => {
        data.forEach((element) => {
          if (element.color == "Navy Blue") {
            card.innerHTML += ` <div class="card">
      <div class="card_heart_info">
      <img class="empty-heart" name="${
        element.id
      }" src="./assets/images/favourite empty.png" alt="">
      </div>
      <div class="card_new_info">
          <p>${element.discountPercent}%</p>
      </div>
    <div class="card_image">
      <img
        src= "${element.image}"
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
      <div class="card_text_button">
          <button id= "${element.id}" class="add_to_basket">Add to card</button>
        </div>
    </div>
  </div>`;
            let card_new_info = document.querySelectorAll(".card_new_info");
            card_new_info.forEach((card) => {
              if (!element.discountPercent == "") {
                card.style.backgroundColor = "red";
              } else {
                card.style.backgroundColor = "green";
              }
            });
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
          }
        });

        //add Wishlist -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=->

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

        for (let heartIcon of heartIcons) {
          heartIcon.addEventListener("click", function () {
            if (this.classList.contains("empty-heart")) {
              Swal.fire({
                icon: "success",
                title: "The product has been added to the Wishlist",
                showConfirmButton: false,
                timer: 1500,
              });
              this.removeAttribute("src");
              this.setAttribute("src", "./assets/images/favourite.png");
              this.classList.replace("empty-heart", "solid-heart");
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
        //fetch end
      });
  });
});
// CHEVRONSSSSS=-=-=-=-=-==-=--=
let color_chevron = document.querySelector(".color_chevron");
let filterDown_color = document.querySelector(".filter_color_down");
let filterDown_categories = document.querySelector(".filter_category_down");
let category_chevron = document.querySelector(".category_chevron");
let filterDown_material = document.querySelector(".filter_material_down");
let material_chevron = document.querySelector(".material_chevron");
let filterDown_price = document.querySelector(".filter_price_down");
let price_chevron = document.querySelector(".price_chevron");
let filterDown_size = document.querySelector(".filter_size_down");
let size_chevron = document.querySelector(".size_chevron");
console.log(filterDown_color);
console.log(filterDown_categories);
// color chevron =-=-=-=-=-=-
color_chevron.addEventListener("click", function () {
  if (filterDown_color.style.display == "none") {
    filterDown_color.style.display = "block";
    color_chevron.style.transform = "rotate(0deg)";
  } else {
    filterDown_color.style.display = "none";
    color_chevron.style.transform = "rotate(180deg)";
  }
});
// category chevron =-=-==-=-=-=--=-==
category_chevron.addEventListener("click", function () {
  if (filterDown_categories.style.display == "none") {
    filterDown_categories.style.display = "block";
    category_chevron.style.transform = "rotate(0deg)";
  } else {
    filterDown_categories.style.display = "none";
    category_chevron.style.transform = "rotate(180deg)";
  }
});
//  Material chevron =-=-=-=-=-=-=-
material_chevron.addEventListener("click", function () {
  if (filterDown_material.style.display == "none") {
    filterDown_material.style.display = "block";
    material_chevron.style.transform = "rotate(0deg)";
  } else {
    filterDown_material.style.display = "none";
    material_chevron.style.transform = "rotate(180deg)";
  }
});
//  Price chevron=-=-=-=-=-=-=--=-=-=-=-=

price_chevron.addEventListener("click", function () {
  if (filterDown_price.style.display == "none") {
    filterDown_price.style.display = "block";
    material_chevron.style.transform = "rotate(0deg)";
  } else {
    filterDown_price.style.display = "none";
    price_chevron.style.transform = "rotate(180deg)";
  }
});
//  size chevron =-=-=-=-=-=-=-=-=-=-=-=-
// size_chevron.addEventListener("click", function () {
//   if (filterDown_size.style.display == "none") {
//     filterDown_size.style.display = "block";
//     size_chevron.style.transform = "rotate(0deg)";
//   } else {
//     filterDown_size.style.display = "none";
//     size_chevron.style.transform = "rotate(180deg)";
//   }
// });

let featured_chevron = document.querySelector(".featured_chevron");
let featuredDown = document.querySelector(
  ".main_info_right_result_featured_down"
);

featured_chevron.addEventListener("click", function () {
  if (featuredDown.style.display == "block") {
    featuredDown.style.display = "none";
    featured_chevron.style.transform = "rotate(0deg)";
  } else {
    featuredDown.style.display = "block";
    featured_chevron.style.transform = "rotate(180deg)";
  }
});

// LOWPRICE=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
let lowPrice = document.querySelector(".low_price");
lowPrice.addEventListener("click", function () {
  cards.forEach((card) => {
    card.innerHTML = "";
    fetch("http://localhost:3000/products")
      .then((res) => res.json())
      .then((data) => {
        data.sort((x, y) => x.price - y.price);
        data.forEach((element) => {
          card.innerHTML += ` <div class="card">
            <div class="card_heart_info">
            <img class="empty-heart" name="${
              element.id
            }" src="./assets/images/favourite empty.png" alt="">
            </div>
            <div class="card_new_info">
                <p>${element.discountPercent}%</p>
            </div>
          <div class="card_image">
            <img
              src= "${element.image}"
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
            <div class="card_text_button">
                <button id= "${
                  element.id
                }" class="add_to_basket">Add to card</button>
              </div>
          </div>
        </div>`;
          let card_new_info = document.querySelectorAll(".card_new_info");
          card_new_info.forEach((card) => {
            if (!element.discountPercent == "") {
              card.style.backgroundColor = "red";
            } else {
              card.style.backgroundColor = "green";
            }
          });
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
        //add Wishlist -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=->

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

        for (let heartIcon of heartIcons) {
          heartIcon.addEventListener("click", function () {
            if (this.classList.contains("empty-heart")) {
              Swal.fire({
                icon: "success",
                title: "The product has been added to the Wishlist",
                showConfirmButton: false,
                timer: 1500,
              });
              this.removeAttribute("src");
              this.setAttribute("src", "./assets/images/favourite.png");
              this.classList.replace("empty-heart", "solid-heart");
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

        //fetch end
      });
  });
});
// HIGHPRICE=-=-=-=-=--==-==-=--=-=-=-=-=-=-=--=-=-=-=-=-=-=-
let highPrice = document.querySelector(".high_price");
highPrice.addEventListener("click", function () {
  cards.forEach((card) => {
    card.innerHTML = "";
    fetch("http://localhost:3000/products")
      .then((res) => res.json())
      .then((data) => {
        data.sort((x, y) => y.price - x.price);
        data.forEach((element) => {
          card.innerHTML += ` <div class="card">
            <div class="card_heart_info">
            <img class="empty-heart" name="${
              element.id
            }" src="./assets/images/favourite empty.png" alt="">
            </div>
            <div class="card_new_info">
                <p>${element.discountPercent}%</p>
            </div>
          <div class="card_image">
            <img
              src= "${element.image}"
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
            <div class="card_text_button">
                <button id= "${
                  element.id
                }" class="add_to_basket">Add to card</button>
              </div>
          </div>
        </div>`;
          let card_new_info = document.querySelectorAll(".card_new_info");
          card_new_info.forEach((card) => {
            if (!element.discountPercent == "") {
              card.style.backgroundColor = "red";
            } else {
              card.style.backgroundColor = "green";
            }
          });
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

        //add Wishlist -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=->

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

        for (let heartIcon of heartIcons) {
          heartIcon.addEventListener("click", function () {
            if (this.classList.contains("empty-heart")) {
              Swal.fire({
                icon: "success",
                title: "The product has been added to the Wishlist",
                showConfirmButton: false,
                timer: 1500,
              });
              this.removeAttribute("src");
              this.setAttribute("src", "./assets/images/favourite.png");
              this.classList.replace("empty-heart", "solid-heart");
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

        //fetch end
      });
  });
});
// LowSales =-=-=-=-=-=-=-=-=-=-=-=-=-=-
let LowSales = document.querySelector(".low_sales");
LowSales.addEventListener("click", function () {
  cards.forEach((card) => {
    card.innerHTML = "";
    fetch("http://localhost:3000/products")
      .then((res) => res.json())
      .then((data) => {
        data.sort((x, y) => x.sold - y.sold);
        data.forEach((element) => {
          card.innerHTML += ` <div class="card">
            <div class="card_heart_info">
            <img class="empty-heart" name="${
              element.id
            }" src="./assets/images/favourite empty.png" alt="">
            </div>
            <div class="card_new_info">
                <p>${element.discountPercent}%</p>
            </div>
          <div class="card_image">
            <img
              src= "${element.image}"
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
            <div class="card_text_button">
                <button id= "${
                  element.id
                }" class="add_to_basket">Add to card</button>
              </div>
          </div>
        </div>`;
          let card_new_info = document.querySelectorAll(".card_new_info");
          card_new_info.forEach((card) => {
            if (!element.discountPercent == "") {
              card.style.backgroundColor = "red";
            } else {
              card.style.backgroundColor = "green";
            }
          });
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
        //add Wishlist -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=->

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

        for (let heartIcon of heartIcons) {
          heartIcon.addEventListener("click", function () {
            if (this.classList.contains("empty-heart")) {
              Swal.fire({
                icon: "success",
                title: "The product has been added to the Wishlist",
                showConfirmButton: false,
                timer: 1500,
              });
              this.removeAttribute("src");
              this.setAttribute("src", "./assets/images/favourite.png");
              this.classList.replace("empty-heart", "solid-heart");
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

        //fetch end
      });
  });
});
// HighSales=-=-=--=-=--=-=-=-=-=---=-=-=-=-=-=-=-=--
let highSales = document.querySelector(".high_sales");
highSales.addEventListener("click", function () {
  cards.forEach((card) => {
    card.innerHTML = "";
    fetch("http://localhost:3000/products")
      .then((res) => res.json())
      .then((data) => {
        data.sort((x, y) => y.price - x.price);
        data.forEach((element) => {
          card.innerHTML += ` <div class="card">
            <div class="card_heart_info">
            <img class="empty-heart" name="${
              element.id
            }" src="./assets/images/favourite empty.png" alt="">
            </div>
            <div class="card_new_info">
                <p>${element.discountPercent}%</p>
            </div>
          <div class="card_image">
            <img
              src= "${element.image}"
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
            <div class="card_text_button">
                <button id= "${
                  element.id
                }" class="add_to_basket">Add to card</button>
              </div>
          </div>
        </div>`;

          let card_new_info = document.querySelectorAll(".card_new_info");
          card_new_info.forEach((card) => {
            if (!element.discountPercent == "") {
              card.style.backgroundColor = "red";
            } else {
              card.style.backgroundColor = "green";
            }
          });
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

        //add Wishlist -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=->

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

        for (let heartIcon of heartIcons) {
          heartIcon.addEventListener("click", function () {
            if (this.classList.contains("empty-heart")) {
              Swal.fire({
                icon: "success",
                title: "The product has been added to the Wishlist",
                showConfirmButton: false,
                timer: 1500,
              });
              this.removeAttribute("src");
              this.setAttribute("src", "./assets/images/favourite.png");
              this.classList.replace("empty-heart", "solid-heart");
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

        //fetch end
      });
  });
});
// Product Listden Baskete Elave etmek=-=-=-=-=-=--=-=-=-=-=-=-=-=-=-=-
let userArr = JSON.parse(localStorage.getItem("user"));
let userArrSesion = JSON.parse(sessionStorage.getItem("user"));
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
