/* global describe, it */
/* eslint no-unused-expressions:0 */
'use strict';
import {expect} from 'chai';
import newlineRegex from './lib/';

describe('newline-regex', () => {
  describe('default export', () => {
    it('should match Unix newline', () => {
      /*jshint -W030 */
      expect(newlineRegex.test('Unix\n')).to.be.true;
    });

    it('should match Windows newline', () => {
      /*jshint -W030 */
      expect(newlineRegex.test('Windows\r\n')).to.be.true;
    });

    it('should not match when no newline', () => {
      /*jshint -W030 */
      expect(newlineRegex.test('Nothing')).to.be.false;
    });
  });

  describe('g export', () => {
    it('should find 2 newline characters', () => {
      /*jshint -W030 */
      expect('Unix\n and Windows\r\n'.match(newlineRegex.g).length).to.eql(2);
    });
  });
});
