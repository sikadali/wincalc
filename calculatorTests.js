import { describe, it } from 'mocha';
import { expect } from 'chai';
import { JSDOM } from 'jsdom';

describe('updateMsg', function () {
    var runs = [
        {it: '0', option: 0}
    ];

    beforeEach(function() {
      return JSDOM.fromFile('index.html')
        .then((dom) => {
          global.window = dom.window;
          global.document = dom.window.document;
        });
    })
    
    runs.forEach(function (run) {
        it ('display ' + run.it + ' when clicking on the digit ' + run.it, function () {
            // arrange
            let digit = document.getElementById(run.it);

            // act
            digit.click();

            // assert
            expect(document.getElementById('display').innerHTML).to.equal(''+run.option);
        });
    });
});