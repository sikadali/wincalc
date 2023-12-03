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
               input.value = eval(input.value.replace(SPACE_REGEX, ""));
          } else if (e.target.innerHTML == CLEAR) {
               input.value = EMPTY_CHAR;
          } else if (e.target.className == "operator bi bi-backspace") {
               input.value = input.value.substring(0, string.length - 1);
          } else {
               input.value += e.target.innerHTML;
               if (input.value.length == 4) {
                    input.value = insertSpaceCharAtIndex(input.value, 1);
               }
          }
     });
});

function insertSpaceCharAtIndex(str, index) {
     return str.substring(0, index) + SPACE_CHAR + str.substring(index);
}
