'use strict';

const { it, expect, describe } = require('@jest/globals');
const {
  validateNesting,
  validateUnclosed,
  markdownElements
} = require('./validator');
const patterns = require('../constants/patterns');

describe('validationTests', () => {
  describe('validateNesting', () => {
    it('throws an error if nested markup is found', () => {
      const text = 'This **is _a_ test**.';
      expect(() =>
        validateNesting(text, markdownElements))
        .toThrow('Invalid file. Nested markup is not allowed');
    });

    it('does not throw an error if no nested markup is found', () => {
      const text = 'This **is** a test.';
      expect(() => validateNesting(text, patterns)).not.toThrow();
    });
  });

  describe('validateUnclosed', () => {
    it('throws an error if trailing markup is found', () => {
      const text = 'This **is a test';
      expect(() =>
        validateUnclosed(text))
        .toThrow('Invalid file. Trailing markup is not allowed');
    });

    it('does not throw an error if no trailing markup is found', () => {
      const text = 'This is a test';
      expect(() => validateUnclosed(text)).not.toThrow();
    });
  });
});

