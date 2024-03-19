'use strict';

const { it, expect, describe } = require('@jest/globals');
const {
  parseMarkdownToEsc,
  setInversed,
} = require('./escParser');

describe('Markdown to ESC Converter', () => {
  describe('setInversed', () => {
    it('should replace preformatted blocks with \x1b[7m esc', () => {
      const text = 'PRE{{0}}PRE';
      const preformatted = ['This is preformatted text'];
      const expected = '\x1b[7mThis is preformatted text\x1b[27m';
      expect(setInversed(text, preformatted)).toEqual(expected);
    });
    it('should replace preformatted blocks with <pre> tags', () => {
      const text = 'PRE{{0}}PRE. Nice! PRE{{1}}PRE';
      const preformatted = ['This is preformatted text', 'And 1 more!'];
      const expected =
        '\x1b[7mThis is preformatted text\x1b[27m. Nice! ' +
        '\x1b[7mAnd 1 more!\x1b[27m';
      expect(setInversed(text, preformatted)).toEqual(expected);
    });
  });

  describe('parseMarkdownToHtml', () => {
    it('should convert Markdown text to ESC with \x1b[1m esc', () => {
      const text = 'This is _bold_ text.';
      const expected = 'This is \x1b[1mbold\x1b[22m text.';
      expect(parseMarkdownToEsc(text)).toEqual(expected);
    });

    it('should convert Markdown text to ESC with \x1b[3m esc', () => {
      const text = 'This is _ita_lic_ text.';
      const expected = 'This is \x1b[3mita_lic\x1b[23m text.';
      expect(parseMarkdownToEsc(text)).toEqual(expected);
    });

    it('should convert Markdown text to ESC with \x1b[7m esc', () => {
      const text = 'This is `monospaced` text.';
      const expected = 'This is \x1b[7mmonospaced\x1b[27m text.';
      expect(parseMarkdownToEsc(text)).toEqual(expected);
    });

    it('should convert Markdown text to ESC with \x1b[7m esc', () => {
      const text = 'This is\n' +
        '```\n' +
        '**preformatted**\n' +
        '```\n' +
        'text.';
      const expected = 'This is\n' +
        '\x1b[7m' +
        '\n**preformatted**\n' +
        '\x1b[27m\n' +
        'text.';
      expect(parseMarkdownToEsc(text)).toEqual(expected);
    });
  });
});
