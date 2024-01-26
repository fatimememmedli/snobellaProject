let emailInput = document.querySelector(".email_input")
let form = document.querySelector("form")


let user = JSON.parse(localStorage.getItem("userCheck"))

form.addEventListener("submit",function(e){
e.preventDefault()
fetch("http://localhost:3000/users").then((res)=> res.json()).then((data)=>{


    let find = data.find((x)=> x.email == emailInput.value)
user.email = emailInput.value
    
if (find) {

    Swal.fire({
        icon: "error",

        text: "This Email is already used",

      });
}
else{
    fetch("http://localhost:3000/users", {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(user),
  })
    .then(function (res) {
      console.log(res);

      Swal.fire({
        icon: "success",
        title: "You have successfully created an account",
        showConfirmButton: false,
        timer: 1500,
      }).then(() => {
    window.location.href = "login.html";
        });
      })
      .catch(function (res) {
        console.log(res);
      });

console.log(user);
}

})

})

