import { describe, it, beforeEach, before, afterEach } from "mocha";
import { expect } from "chai";
import { JSDOM } from "jsdom";

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// replicate __dirname functionnality in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const html = fs.readFileSync(path.resolve(__dirname, "../index.html"), "utf8");

let dom;

before(() => waitForDom());

beforeEach(function () {
     global.window = dom.window;
     global.document = dom.window.document;
     global.display = document.getElementById("display");
});

afterEach(function () {
     global.display.value = "";
});

describe("Screen displaying digits", function () {
     var runs = [
          { it: "1", option: "1" },
          { it: "2", option: "2" },
          { it: "3", option: "3" },
          { it: "4", option: "4" },
          { it: "5", option: "5" },
          { it: "6", option: "6" },
          { it: "7", option: "7" },
          { it: "8", option: "8" },
          { it: "9", option: "9" },
     ];

     runs.forEach((run) => {
          it(
               "display " + run.it + " when clicking on the digit " + run.it,
               function () {
                    // arrange
                    let digit = document.getElementById(run.it);

                    // act
                    digit.click();

                    // assert
                    expect(display.value).to.equal(run.option);
               }
          );
     });

     it("does nothing when clicking on 0 while only 0 is displayed", function () {
          // arrange
          let digit = document.getElementById("0");

          // act
          multipleClicks(digit, 2);

          // assert
          expect(display.value).to.equal("");
     });

     it("display 1 when clicking consecutively on the digits 0 and 1", function () {
          // arrange
          let digit0 = document.getElementById("0");
          let digit1 = document.getElementById("1");

          // act
          digit0.click();
          digit1.click();

          // assert
          expect(display.value).to.equal("1");
     });

     it("display 10 when clicking consecutively on the digits 1 and 0", function () {
          // arrange
          let digit0 = document.getElementById("0");
          let digit1 = document.getElementById("1");

          // act
          digit1.click();
          digit0.click();

          // assert
          expect(display.value).to.equal("10");
     });

     it("display 99 when clicking two times on the digit 9", function () {
          // arrange
          let digit = document.getElementById("9");

          // act
          multipleClicks(digit, 2);

          // assert
          expect(display.value).to.equal("99");
     });

     it("display 9,9 when clicking two times on the digit 9", function () {
          // arrange
          let digit = document.getElementById("9");
          let digitComma = document.getElementById(".");

          // act
          digit.click();
          digitComma.click();
          digit.click();

          // assert
          expect(display.value).to.equal("9,9");
     });
});

describe("Space for big numbers", function () {
     it("display 9 999 when clicking 4 times on the digit 9", function () {
          // arrange
          let digit = document.getElementById("9");

          // act
          multipleClicks(digit, 4);

          // assert
          expect(display.value).to.equal("9 999");
     });

     it("display 99 999 when clicking 5 times on the digit 9", function () {
          // arrange
          let digit = document.getElementById("9");

          // act
          multipleClicks(digit, 5);

          // assert
          expect(display.value).to.equal("99 999");
     });

     it("display 999 999 when clicking 6 times on the digit 9", function () {
          // arrange
          let digit = document.getElementById("9");

          // act
          multipleClicks(digit, 6);

          // assert
          expect(display.value).to.equal("999 999");
     });

     it("display 9 999 999 when clicking 7 times on the digit 9", function () {
          // arrange
          let digit = document.getElementById("9");

          // act
          multipleClicks(digit, 7);

          // assert
          expect(display.value).to.equal("9 999 999");
     });

     it("display 9 999 999 999 999 999 when clicking 16 times on the digit 9", function () {
          // arrange
          let digit = document.getElementById("9");

          // act
          multipleClicks(digit, 16);

          // assert
          expect(display.value).to.equal("9 999 999 999 999 999");
     });

     it("display 1 230 123 012 301 230 when inputing the number 1230123012301230", function () {
          // arrange
          let digit0 = document.getElementById("0");
          let digit1 = document.getElementById("1");
          let digit2 = document.getElementById("2");
          let digit3 = document.getElementById("3");

          // act
          for (let i = 0; i < 4; i++) {
               click1230(digit1, digit2, digit3, digit0);
          }

          // assert
          expect(display.value).to.equal("1 230 123 012 301 230");
     });

     it("display 999,9 when putting comma", function () {
          // arrange
          let digit = document.getElementById("9");
          let digitComma = document.getElementById(".");

          // act
          multipleClicks(digit, 3);
          digitComma.click();
          digit.click();

          // assert
          expect(display.value).to.equal("999,9");
     });

     it("display 9 999,9999 when putting comma", function () {
          // arrange
          let digit = document.getElementById("9");
          let digitComma = document.getElementById(".");

          // act
          multipleClicks(digit, 4);
          digitComma.click();
          multipleClicks(digit, 4);

          // assert
          expect(display.value).to.equal("9 999,9999");
     });

     function click1230(digit1, digit2, digit3, digit0) {
          digit1.click();
          digit2.click();
          digit3.click();
          digit0.click();
     }
});

describe("Negate operation", () => {
     it("does nothing when clicking on negate button while no number inputed", () => {
          // arrange
          let negate = document.getElementById("neg");

          // act
          negate.click();

          // assert
          expect(display.value).to.equal("");
     });

     it("does nothing when clicking on negate button while 0 in input", () => {
          // arrange
          let negate = document.getElementById("neg");

          // act
          negate.click();

          // assert
          expect(display.value).to.equal("");
     });

     it("1 turns -1 when clicking on negate button", () => {
          // arrange
          let negate = document.getElementById("neg");
          let digit1 = document.getElementById("1");

          // act
          digit1.click();
          negate.click();

          // assert
          expect(display.value).to.equal("-1");
     });

     it("-1 turns 1 when clicking on negate button", () => {
          // arrange
          let negate = document.getElementById("neg");
          display.value = "-1";

          // act
          negate.click();

          // assert
          expect(display.value).to.equal("1");
     });

     it("2 stays 2 when clicking 2 times on negate button", () => {
          // arrange
          let negate = document.getElementById("neg");
          let digit1 = document.getElementById("1");

          // act
          digit1.click();
          negate.click();
          negate.click();

          // assert
          expect(display.value).to.equal("1");
     });

     it("-10 000 turns 10 000 when clicking on negate button", () => {
          // arrange
          let negate = document.getElementById("neg");
          display.value = "-10 000";

          // act
          negate.click();

          // assert
          expect(display.value).to.equal("10 000");
     });

     it("10 000 turns 10 000 when clicking 2 times on negate button", () => {
          // arrange
          let negate = document.getElementById("neg");
          let digit0 = document.getElementById("0");
          let digit1 = document.getElementById("1");

          // act
          digit1.click();
          multipleClicks(digit0, 4);
          negate.click();
          negate.click();

          // assert
          expect(display.value).to.equal("10 000");
     });
});

describe("Delete operation", () => {
     it("1 disappears when clicking on backspace", () => {
          // arrange
          let backspace = document.getElementById("backspace");
          let digit = document.getElementById("1");

          // act & assert
          digit.click();
          expect(display.value).to.equal("1");
          backspace.click();
          expect(display.value).to.equal("");
     });

     it("11 becomes 1 when clicking on backspace", () => {
          // arrange
          let backspace = document.getElementById("backspace");
          let digit = document.getElementById("1");

          // act
          digit.click();
          digit.click();
          backspace.click();

          // assert
          expect(display.value).to.equal("1");
     });

     it("1 111 becomes 111 when clicking on backspace", () => {
          // arrange
          let backspace = document.getElementById("backspace");
          let digit = document.getElementById("1");

          // act
          multipleClicks(digit, 4);
          backspace.click();

          // assert
          expect(display.value).to.equal("111");
     });

     it("11 111 111 becomes 1 111 111 when clicking on backspace", () => {
          // arrange
          let backspace = document.getElementById("backspace");
          let digit = document.getElementById("1");

          // act
          multipleClicks(digit, 8);
          backspace.click();

          // assert
          expect(display.value).to.equal("1 111 111");
     });
});

describe("Sum operation", () => {
     beforeEach((done) => waitDom(done));
     it("display 1 when clicking on 1 then +", () => {
          // arrange
          let sum = document.getElementById("sum");
          let digit = document.getElementById("1");

          // act
          digit.click();
          sum.click();

          // assert
          expect(display.placeholder).to.equal("1");
     });

     it("display 2 when clicking on 1, + then 2", () => {
          // arrange
          let sum = document.getElementById("sum");
          let digit1 = document.getElementById("1");
          let digit2 = document.getElementById("2");

          // act
          digit1.click();
          sum.click();
          digit2.click();

          // assert
          expect(display.value).to.equal("2");
     });

     it("click on 1, +, 2, then = leads to 3", () => {
          // arrange
          let sum = document.getElementById("sum");
          let digit1 = document.getElementById("1");
          let digit2 = document.getElementById("2");
          let equal = document.getElementById("=");

          // act
          digit1.click();
          sum.click();
          digit2.click();
          equal.click();

          // assert
          expect(display.placeholder).to.equal("3");
     });

     it("click on 1, +, 2, +, 3 leads to 6", () => {
          // arrange
          let sum = document.getElementById("sum");
          let digit1 = document.getElementById("1");
          let digit2 = document.getElementById("2");
          let digit3 = document.getElementById("3");
          let equal = document.getElementById("=");

          // act
          digit1.click();
          sum.click();
          digit2.click();
          sum.click();
          digit3.click();
          equal.click();

          // assert
          expect(display.placeholder).to.equal("6");
     });
});

function waitForDom() {
     return new Promise((resolve) => {
          dom = getJsdom();
          dom.window.document.addEventListener("DOMContentLoaded", () => {
               resolve();
          });
     });
}

function waitDom(done) {
     dom = getJsdom();
     dom.window.document.addEventListener("DOMContentLoaded", () => {
          done();
     });
}

function getJsdom() {
     return new JSDOM(html, {
          runScripts: "dangerously",
          resources: "usable",
          url: `file://${path.resolve(__dirname, "..")}/index.html`,
     });
}

function multipleClicks(digit, times) {
     for (let i = 0; i < times; i++) {
          digit.click();
     }
}
