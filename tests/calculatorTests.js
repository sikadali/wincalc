import { describe, it, beforeEach, before, afterEach } from "mocha";
import { expect, assert } from "chai";
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
          { it: "0", option: "0" },
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

     it("display 01 when clicking consecutively on the digits 0 and 1", function () {
          // arrange
          let digit0 = document.getElementById("0");
          let digit1 = document.getElementById("1");

          // act
          digit0.click();
          digit1.click();

          // assert
          expect(display.value).to.equal("01");
     });

     it("display 99 when clicking two times on the digit 9", function () {
          // arrange
          let digit = document.getElementById("9");

          // act
          multipleClicks(digit, 2);

          // assert
          expect(display.value).to.equal("99");
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
});

/*describe("Negate operation", () => {
     it("displayed positive number turns negative when clicking on negate button", () => {
          // arrange
          let negate = document.getElementById("negative");

          // act

          // assert
     });
});*/

function waitForDom() {
     return new Promise((resolve) => {
          dom = new JSDOM(html, {
               runScripts: "dangerously",
               resources: "usable",
               url: `file://${path.resolve(__dirname, "..")}/index.html`,
          });
          dom.window.document.addEventListener("DOMContentLoaded", () => {
               resolve();
          });
     });
}

function multipleClicks(digit, times) {
     for (let i = 0; i < times; i++) {
          digit.click();
     }
}