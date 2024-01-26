let newProductNameInp = document.querySelector(".new-product-name");
let newProductFirstInp = document.querySelector(".new-product-first-category");
let newProductSecondInp = document.querySelector(
  ".new-product-second-category"
);
let newProductImageInp = document.querySelector(".new-product-image-link");
let newProductPriceInp = document.querySelector(".new-product-price");
let newProductDisPerInp = document.querySelector(
  ".new-product-discount-percent"
);
let newProductRatingInp = document.querySelector(".new-product-rating");
let newProductDescInp = document.querySelector(".new-product-description");
let newProductColorInp = document.querySelector(".new-product-color");
let createNewProductBtn = document.querySelector(".created-product-btn");

// POst Api -=-==-==-=-=-=-=-=-=--=-=-=-=-=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=->
createNewProductBtn.addEventListener("click", function (e) {
  e.preventDefault();
  //   console.log("salam");
  //   console.log(newProductDescInp.value);
  if (
    newProductNameInp.value.length == 0 ||
    newProductFirstInp.value.length == 0 ||
    newProductSecondInp.value.length == 0 ||
    newProductImageInp.value.length == 0 ||
    newProductPriceInp.value.length == 0 ||
    newProductDisPerInp.value.length == 0 ||
    newProductRatingInp.value.length == 0 ||
    newProductDescInp.value.length == 0 ||
    newProductColorInp.value.length == 0
  ) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Input is Empty!",
      footer: '<a href="#">Why do I have this issue?</a>',
    });
  } else {
    let obj = {
      name: newProductNameInp.value,
      categoryFirst: newProductFirstInp.value,
      categorySecond: newProductSecondInp.value,
      image: newProductImageInp.value,
      price: newProductPriceInp.value,
      discountPercent: newProductDisPerInp.value,
      rating: newProductRatingInp.value,
      description: newProductDescInp.value,
      color: newProductColorInp.value,
    };
    console.log(obj);
    fetch("https://654a29ace182221f8d52a244.mockapi.io/products/products", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(obj),
    });
    Swal.fire({
      icon: "success",
      title: "You have successfully created an product",
      showConfirmButton: false,
      timer: 1500,
    });
    newProductNameInp.value = "";
    newProductFirstInp.value = "";
    newProductSecondInp.value = "";
    newProductImageInp.value = "";
    newProductPriceInp.value = "";
    newProductDisPerInp.value = "";
    newProductRatingInp.value = "";
    newProductDescInp.value = "";
    newProductColorInp.value = "";
  }
});

// Deleted product Api -=-=-=-=-=-=-=-=-=-=-=-=-=-==-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=->
let deleteProductInp = document.querySelector(".deleted-product-input");
let deleteProductBtn = document.querySelector(".deleted-product-btn");
// console.log(deleteProductInp);
deleteProductBtn.addEventListener("click", function (e) {
  e.preventDefault();
  //   console.log("sslsm");
  if (deleteProductInp.value.length == 0) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Input is Empty!",
      footer: '<a href="#">Why do I have this issue?</a>',
    });
  } else {
    fetch("https://654a29ace182221f8d52a244.mockapi.io/products/products")
      .then((res) => res.json())
      .then((data) => {
        //   console.log(data);
        data.forEach((elem) => {
          // console.log(elem.name);
          if (
            elem.name

              .toUpperCase()

              .includes(deleteProductInp.value.toUpperCase())
          ) {
            //   console.log(elem.id);
            fetch(
              "https://654a29ace182221f8d52a244.mockapi.io/products/products/" +
                `${elem.id}`,
              {
                method: "DELETE",
              }
            );
            Swal.fire({
              icon: "success",
              title: "Product Deleted",
              showConfirmButton: false,
              timer: 1500,
            });
            deleteProductInp.value = "";
          } else {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Product not found!",
              footer: '<a href="#">Why do I have this issue?</a>',
            });
          }
        });
      });
  }
});

// Add User Api -=-=-=-=-=-=-=-=-=-=-=-=-=-==-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=->

let nameInput = document.querySelector(".new-username-input");
let passwordInput = document.querySelector(".new-pass-input");
let balanceInput = document.querySelector(".new-balance-input");
let emailInput = document.querySelector(".new-email-input");
let createNewUserBtn = document.querySelector(".created-user-btn");

createNewUserBtn.addEventListener("click", function (e) {
  e.preventDefault();
  //   console.log("Salam");
  if (
    nameInput.value.length == 0 ||
    passwordInput.value.length == 0 ||
    balanceInput.value.length == 0 ||
    emailInput.value.length == 0
  ) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Input is Empty!",
      footer: '<a href="#">Why do I have this issue?</a>',
    });
  } else {
    fetch("https://654a29ace182221f8d52a244.mockapi.io/products/users")
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        let resultUsername = data.find((elem) => elem.name === nameInput.value);
        let resultEmail = data.find((elem) => elem.email === emailInput.value);

        {
          if (resultUsername) {
            // console.log(result);
            Swal.fire({
              icon: "error",
              text: "This username already exists",
            });
            nameInput.value = "";
          } else if (nameInput.value.length <= 3) {
            Swal.fire({
              icon: "error",
              text: "Username must be at least 4 characters long",
            });
          } else if (balanceInput.value <= 0) {
            Swal.fire({
              icon: "error",
              text: "Balance must be greater than 0",
            });
            balanceInput.value = "";
          } else if (!/[A-Z]/.test(passwordInput.value)) {
            Swal.fire({
              icon: "error",
              text: "Password must contain at least 1 capital letter",
            });
            passwordInput.value = "";
          } else if (resultEmail) {
            // console.log(resultEmail);
            Swal.fire({
              icon: "error",

              text: "This Email is already used",
            });
            emailInput.value = "";
          } else {
            let user = {
              name: nameInput.value,
              password: passwordInput.value,
              balance: balanceInput.value,
              email: emailInput.value,
              basket: [],
              favorites: [],
            };
            console.log(user);
            fetch(
              "https://654a29ace182221f8d52a244.mockapi.io/products/users",
              {
                headers: {
                  Accept: "application/json",
                  "Content-Type": "application/json",
                },
                method: "POST",
                body: JSON.stringify(user),
              }
            );
            Swal.fire({
              icon: "success",
              title: "You have successfully created an account",
              showConfirmButton: false,
              timer: 1500,
            });
            nameInput.value = "";
            passwordInput.value = "";
            balanceInput.value = "";
            emailInput.value = "";
          }
        }
      });
  }
});
// Deleted User Api -=-=-=-=-=-=-=-=-=-=-=-=-=-==-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=->
let deleteUserInp = document.querySelector(".delete-user-input");
let deleteUserBtn = document.querySelector(".deleted-user-btn");

deleteUserBtn.addEventListener("click", function (e) {
  e.preventDefault();
  //   console.log("salam");
  if (deleteUserInp.value.length == 0) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Input is Empty!",
      footer: '<a href="#">Why do I have this issue?</a>',
    });
  } else {
    fetch("https://654a29ace182221f8d52a244.mockapi.io/products/users")
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        data.forEach((elem) => {
          if (
            elem.name.toUpperCase().includes(deleteUserInp.value.toUpperCase())
          ) {
            // console.log(elem);
            fetch(
              "https://654a29ace182221f8d52a244.mockapi.io/products/users/" +
                `${elem.id}`,
              {
                method: "Delete",
              }
            );
            Swal.fire({
              icon: "success",
              title: "User Deleted",
              showConfirmButton: false,
              timer: 1500,
            });
          } else {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "User not found!",
              footer: '<a href="#">Why do I have this issue?</a>',
            });
          }
        });
      });
  }
});
// Modify User Api -=-=-=-=-=-=-=-=-=-=-=-=-=-==-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=->
let modifyUserNameInp = document.querySelector(".modify-username-input");
let modifyUserKeyInp = document.querySelector(".modify-user-key");
let modifyUserKeyValueInp = document.querySelector(".modify-user-key-value");
let modifyUserBtn = document.querySelector(".modify-user-btn");
// console.log(modifyUserNameInp);
// modifyUserBtn.addEventListener("click", function (e) {
//   e.preventDefault();
//   // console.log(modifyUserNameInp.value);
//   if (
//     modifyUserNameInp.value.length == 0 ||
//     modifyUserKeyInp.value.length == 0 ||
//     modifyUserKeyValueInp.value.length == 0
//   ) {
//     Swal.fire({
//       icon: "error",
//       title: "Oops...",
//       text: "Input is Empty!",
//       footer: '<a href="#">Why do I have this issue?</a>',
//     });
//   } else {
//     fetch("https://654a29ace182221f8d52a244.mockapi.io/products/users")
//       .then((res) => res.json())
//       .then((data) => {
//         data.forEach((element) => {
//           // console.log(element.name);
//           if (
//             element.name
//               .toUpperCase()
//               .includes(modifyUserNameInp.value.toUpperCase())
//           ) {
//             console.log("tapildi");
//             let UserKey = modifyUserKeyInp.value;

//             let userKeyValue = modifyUserKeyValueInp.value;
//             fetch(
//               "https://654a29ace182221f8d52a244.mockapi.io/products/users/" +
//                 `${element.id}`,
//               {
//                 headers: {
//                   Accept: "application/json",
//                   "Content-Type": "application/json",
//                 },

//                 method: "PUT",
//                 body: JSON.stringify({
//                   UserKey: userKeyValue,
//                 }),
//               }
//             );
//             Swal.fire({
//               icon: "success",
//               title: "User Deleted",
//               showConfirmButton: false,
//               timer: 1500,
//             });
//           } else {
//             Swal.fire({
//               icon: "error",
//               title: "Oops...",
//               text: "User not found!",
//               footer: '<a href="#">Why do I have this issue?</a>',
//             });
//           }
//         });
//       });
//   }
// });
