let form = document.querySelector("form");
let nameInput = document.querySelector(".first_last_name");
let passwordInput = document.querySelector(".password");
console.log(passwordInput);
let emailInput = document.querySelector(".email");
console.log(emailInput);
console.log(emailInput.value);
let checkbox = document.querySelector(".checkbox");
let userArr = JSON.parse(localStorage.getItem("user"));
let navProfile = document.querySelector(".nav-sign-up");
let basketArr = JSON.parse(localStorage.getItem("basket"));
let favArray = JSON.parse(localStorage.getItem("favorites"));

console.log(basketArr);
localStorage.setItem(
  "user",
  JSON.stringify({
    isLogged: false,
  })
);
sessionStorage.setItem(
  "user",
  JSON.stringify({
    isLogged: false,
  })
);
// if (userArr.isLogged == false && userArrSesion.isLogged == false) {
//     localStorage.setItem("basket",[])

// }
form.addEventListener("submit", function (e) {
  e.preventDefault();
  fetch("http://localhost:3000/users")
    .then((res) => res.json())
    .then((data) => {
      let found = data.find(
        (element) =>
          element.email == emailInput.value &&
          element.password == passwordInput.value
      );
      // console.log(found.basket);

      if (found) {
        if (checkbox.checked) {
          localStorage.setItem("basket", JSON.stringify(found.basket));
          localStorage.setItem("favorites", JSON.stringify(found.favorites));

          localStorage.setItem(
            "user",
            JSON.stringify({
              isLogged: true,
              admin: found.admin,
              userID: found.id,
              username: found.name,
              basket: found.basket,
              favorites: found.favorites,
              balance: found.balance,

              orders: [
                {
                  orders: found.orders,
                },
              ],
            })
          );
          Swal.fire({
            icon: "success",
            title: "you entered account",
            showConfirmButton: false,
            timer: 1500,
          });

          window.location.href = "index.html";
        } else if (!checkbox.checked) {
          sessionStorage.setItem(
            "user",
            JSON.stringify({
              admin: found.admin,

              isLogged: true,
              userID: found.id,
              username: found.name,
              basket: found.basket,
              favorites: found.favorites,
              balance: found.balance,

              orders: [
                {
                  orders: found.orders,
                },
              ],
            })
          );
          Swal.fire({
            icon: "success",
            title: "you entered account",
            showConfirmButton: false,
            timer: 1500,
          });
          window.location.href = "index.html";
        }
      } else {
        localStorage.setItem(
          "user",
          JSON.stringify({
            isLogged: false,
          })
        );
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Password or Username are wrong!",
        });
      }

      emailInput.value = "";
      passwordInput.value = "";
    });
});
