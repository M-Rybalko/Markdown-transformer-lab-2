'use strict';

const fs = require('node:fs');
const { it, expect, describe } = require('@jest/globals');
const { readFile, writeToFile, separatePreformatted } = require('./utils');

describe('Utils tests', () => {

  describe('readFile', () => {
    it('reads a file correctly', () => {
      const filePath = 'testFile.txt';
      const fileContent = 'This is a test file content';
      fs.writeFileSync(filePath, fileContent);
      expect(readFile(filePath)).toBe(fileContent);
      fs.unlinkSync(filePath);
    });

    it('throws an error if file does not exist', () => {
      expect(() => readFile('nonexistentFile.txt')).toThrow('file not found');
    });
  });

  describe('writeToFile', () => {
    it('writes content to file', () => {
      const filePath = 'testOutput.txt';
      const content = 'Test content';
      writeToFile(content, filePath);
      expect(fs.readFileSync(filePath, 'utf-8')).toBe(content);
      fs.unlinkSync(filePath);
    });

    it('throws an error if output directory does not exist', () => {
      expect(() =>
        writeToFile('content', 'nonexistentDir/testOutput.txt'))
        .toThrow('out is not correct');
    });
  });

  describe('separatePreformatted', () => {
    it('separates preformatted text from the rest', () => {
      const text = 'Normal text\n```\nPreformatted text\n```\nMore normal text';
      const result = separatePreformatted(text);
      expect(result.noPreformattedText)
        .toBe('Normal text\nPRE{{0}}PRE\nMore normal text');
      expect(result.preformatted).toEqual(['\n```\nPreformatted text\n```\n']);
    });

    it('handles no preformatted text', () => {
      const text = 'Normal text\nMore normal text';
      const result = separatePreformatted(text);
      expect(result.noPreformattedText).toBe(text);
      expect(result.preformatted).toEqual([]);
    });
  });
});
