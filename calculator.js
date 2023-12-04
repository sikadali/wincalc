let input = document.getElementById("display");
let buttons = document.querySelectorAll("button");

const SPACE_REGEX = / /g;
const SPACE_CHAR = " ";
const EMPTY_CHAR = "";
const EQUAL = "=";
const CLEAR = "C";
const CLEAR_ENTRY = "CE";

let arr = Array.from(buttons);
arr.forEach((button) => {
     button.addEventListener("click", (e) => {
          if (e.target.innerHTML == EQUAL) {
               input.value = eval(removeSpaceChar(input.value));
          } else if (e.target.innerHTML == CLEAR) {
               input.value = EMPTY_CHAR;
          } else if (e.target.className == "operator bi bi-backspace") {
               input.value = input.value.substring(0, string.length - 1);
          } else {
               input.value += e.target.innerHTML;
               spacingInputValue();
          }
     });
});

function spacingInputValue() {
     const arrayStrings = removeSpaceCharFromInput().split("");
     const reversingArray = arrayStrings.reverse();

     let result = "";
     for (let i = 0; i < reversingArray.length; i++) {
          result = reversingArray[i] + result;
          if ((i + 1) % 3 == 0 && i != reversingArray.length - 1) {
               result = SPACE_CHAR + result;
          }
     }

     input.value = result;
}

function removeSpaceCharFromInput() {
     return input.value.replace(SPACE_REGEX, "");
}
