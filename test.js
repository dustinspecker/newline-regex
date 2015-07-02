/* global describe, it */
/* eslint no-unused-expressions:0 */
'use strict';
var newlineRegex = require('./')
  , expect = require('chai').expect;

describe('newline-regex', function () {
  describe('default export', function () {
    it('should match Unix newline', function () {
      /*jshint -W030 */
      expect(newlineRegex.test('Unix\n')).to.be.true;
    });

    it('should match Windows newline', function () {
      /*jshint -W030 */
      expect(newlineRegex.test('Windows\r\n')).to.be.true;
    });

    it('should not match when no newline', function () {
      /*jshint -W030 */
      expect(newlineRegex.test('Nothing')).to.be.false;
    });
  });

  describe('g export', function () {
    it('should find 2 newline characters', function () {
      /*jshint -W030 */
      expect('Unix\n and Windows\r\n'.match(newlineRegex.g).length).to.eql(2);
    });
  });
});
