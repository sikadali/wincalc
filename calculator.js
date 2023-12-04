let input = document.getElementById("display");
let buttons = document.querySelectorAll("button");

const SPACE_REGEX = / /g;
const SPACE_CHAR = " ";
const EMPTY_CHAR = "";
const EQUAL = "=";
const CLEAR = "C";
const CLEAR_ENTRY = "CE";
const NEGATIVE_CLASS = "negative";
const NEGATIVE = "-";
const ZERO = "0";

let arr = Array.from(buttons);

arr.forEach((button) => {
     button.addEventListener("click", (e) => {
          const innerHTML = e.target.innerHTML;
          if (innerHTML == EQUAL) {
               input.value = eval(removeSpaceChar(input.value));
          } else if (e.target.className == NEGATIVE_CLASS) {
               if (
                    input.value != "0" &&
                    input.value != "" &&
                    !inputValueIsNegative()
               ) {
                    input.value = NEGATIVE + input.value;
               } else if (inputValueIsNegative()) {
                    input.value = removeFirstChar(input.value);
               }
          } else if (innerHTML == CLEAR) {
               input.value = EMPTY_CHAR;
          } else if (e.target.className == "operator bi bi-backspace") {
               if (input.value.length > 1) {
                    input.value = removeLastChar(input.value);
               } else if (input.value.length == 1) {
                    input.value = "";
               }
          } else if (innerHTML == ZERO && input.value == "") {
          } else {
               input.value += innerHTML;
               spacingInputValue();
          }
     });
});

function inputValueIsNegative() {
     return input.value.startsWith(NEGATIVE);
}

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

function removeFirstChar(str) {
     return str.substring(1);
}

function removeLastChar(str) {
     return str.substring(0, str.length - 1);
}
