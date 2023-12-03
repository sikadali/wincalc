let input = document.getElementById("display");
let buttons = document.querySelectorAll("button");

let arr = Array.from(buttons);
arr.forEach((button) => {
     button.addEventListener("click", (e) => {
          if (e.target.innerHTML == "=") {
               input.value = eval(input.value);
          } else if (e.target.innerHTML == "C") {
               input.value = "";
          } else if (e.target.className == "operator bi bi-backspace") {
               input.value = input.value.substring(0, string.length - 1);
          } else {
               input.value += e.target.innerHTML;
          }
     });
});
