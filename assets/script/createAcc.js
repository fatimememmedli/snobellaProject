let form = document.querySelector("form");
let nameInput = document.querySelector(".first_last_name");
let passwordInput = document.querySelector(".password");
let balanceInput = document.querySelector(".balance");
console.log(balanceInput);
fetch("http://localhost:3000/users")
  .then((res) => res.json())
  .then((data) => {
    form.addEventListener("submit", function (e) {
      let user = {};
      e.preventDefault();
      user.name = nameInput.value;
      user.password = passwordInput.value;
      user.balance = balanceInput.value;
      user.orders = [];
      user.basket = [];
      user.favorites = [];
      let find = data.find((x) => x.username === nameInput.value);
      if (find) {
        nameInput.value = "";

        Swal.fire({
          icon: "error",
          text: "This username already exists",
        });
      } else if (nameInput.value.length <= 3) {
        Swal.fire({
          icon: "error",
          text: "Username must be at least 4 characters long",
        });
      } else if (balanceInput.value <= 0) {
        balanceInput.value = "";

        Swal.fire({
          icon: "error",
          text: "Balance must be greater than 0",
        });
      } else if (!/[A-Z]/.test(passwordInput.value)) {
        passwordInput.value = "";

        Swal.fire({
          icon: "error",
          text: "Password must contain at least 1 capital letter",
        });
      } else {
        localStorage.setItem("userCheck", JSON.stringify(user));

        window.location.href = "createAccountEmail.html";

        nameInput.value = "";

        passwordInput.value = "";
        balanceInput.value = "";
      }

      console.log(user);
    });
  });
