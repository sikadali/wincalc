import { describe, it, beforeEach } from 'mocha';
import { expect } from 'chai';
import { JSDOM } from 'jsdom';

describe('Digit display', function () {
    var runs = [
        {it: '0', option: 0}/*,
        {it: '1', option: 1},
        {it: '2', option: 2},
        {it: '3', option: 3},
        {it: '4', option: 4},
        {it: '5', option: 5},
        {it: '6', option: 6},
        {it: '7', option: 7},
        {it: '8', option: 8},
        {it: '9', option: 9}*/
    ];

    beforeEach(async function() {
      const dom = await JSDOM.fromFile('index.html', { runScripts: "dangerously", resources: "usable" });
        global.window = dom.window;
        global.document = dom.window.document;
    })
    
    runs.forEach(function (run) {
        it ('display ' + run.it + ' when clicking on the digit ' + run.it, function () {
            // arrange
            let digit = document.getElementById(run.it);

            // act
            digit.click();

            // assert
            expect(document.getElementById('display').value).to.equal('' + run.option);
        });
    });
});