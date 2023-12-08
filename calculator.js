let input = document.getElementById("display");
let buttons = document.querySelectorAll("button");
let arr = Array.from(buttons);

const SPACE_REGEX = / /g;
const SPACE_CHAR = " ";
const EMPTY_CHAR = "";
const EQUAL = "=";
const CLEAR = "C";
const CLEAR_ENTRY = "CE";
const BACKSPACE = "backspace";
const NEG_ID = "neg";
const NEGATIVE = "-";
const PLUS = "+";
const ZERO = "0";
const COMMA_DISPLAY = ",";

let digitButtons = Array.from(document.querySelectorAll(".row .digit"));
digitButtons.forEach((button) => {
     button.addEventListener("click", (e) => {
          const innerHTML = e.target.innerHTML;
          if (innerHTML == ZERO && input.value == "") {
          } else if (innerHTML == COMMA_DISPLAY) {
               input.value += innerHTML;
          } else {
               input.value += innerHTML;
               spacingInputValue();
          }
     });
});

let operationButtons = Array.from(document.querySelectorAll(".row .operator"));
operationButtons.forEach((button) => {
     button.addEventListener("click", (e) => {
          const id = e.target.id;
          if (id == NEG_ID) {
               if (
                    input.value != "0" &&
                    input.value != "" &&
                    !inputValueIsNegative()
               ) {
                    input.value = NEGATIVE + input.value;
               } else if (inputValueIsNegative()) {
                    input.value = removeFirstChar(input.value);
               }
          } else if (id == BACKSPACE) {
               input.value = removeLastChar(input.value);
               spacingInputValue();
          }
     });
});

/*
arr.forEach((button) => {
     button.addEventListener("click", (e) => {
          const innerHTML = e.target.innerHTML;
          if (innerHTML == EQUAL) {
               compute.secondEntry = transformToFloat(input.value);
               input.value = compute.operation();
               freeDisplay(input.value);
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
               deleteNumberInput();
               spacingInputValue();
          } else if (innerHTML == ZERO && input.value == "") {
          } else if (innerHTML == PLUS) {
               compute.operator = operators.SUM;
               compute.firstEntry = transformToFloat(input.value);
               freeDisplay(compute.firstEntry);
          } else {
               input.value += innerHTML;
               spacingInputValue();
          }
     });
});*/

function spacingInputValue() {
     const parts = removeSpaceChar(input.value).split(COMMA_DISPLAY);
     const integerPart = parts[0];
     const fractionalPart = parts[1];

     const arrayStrings = removeSpaceChar(integerPart).split("");
     const reversingArray = arrayStrings.reverse();

     let result = "";
     for (let i = 0; i < reversingArray.length; i++) {
          result = reversingArray[i] + result;
          if ((i + 1) % 3 == 0 && i != reversingArray.length - 1) {
               result = SPACE_CHAR + result;
          }
     }

     if (fractionalPart) {
          input.value = result + COMMA_DISPLAY + fractionalPart;
     } else {
          input.value = result;
     }
}

function deleteNumberInput() {
     if (input.value.length > 1) {
          input.value = removeLastChar(input.value);
     } else if (input.value.length == 1) {
          input.value = "";
     }
}

function inputValueIsNegative() {
     return input.value.startsWith(NEGATIVE);
}

function removeSpaceChar(str) {
     return str.replace(SPACE_REGEX, "");
}

function removeFirstChar(str) {
     return str.substring(1);
}

function removeLastChar(str) {
     return str.substring(0, str.length - 1);
}

function transformToFloat() {
     return parseFloat(removeSpaceChar(input.value));
}

function freeDisplay(value) {
     input.value = "";
     input.placeholder = value;
}

const operators = {
     SUM: "+",
};
class Compute {
     constructor(firstEntry, secondEntry, operator) {
          this.firstEntry = firstEntry;
          this.secondEntry = secondEntry;
          this.operator = operator;
     }

     operation() {
          if (this.operator == operators.SUM) {
               return this.firstEntry + this.secondEntry;
          }
          return 0;
     }
}

let compute = new Compute();
