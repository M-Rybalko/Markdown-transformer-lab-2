'use strict';

const { it, expect, describe } = require('@jest/globals');
const {
  parseMarkdownToHtml,
  setPreformatted,
  getParagraphs
} = require('./htmlParser');

describe('Markdown to HTML Converter', () => {
  describe('getParagraphs', () => {
    it('should convert text into paragraphs wrapped in <p> tags', () => {
      const text = 'This is a paragraph.\n\nThis is another paragraph.';
      const expected =
        '<p>This is a paragraph.</p>\n<p>This is another paragraph.</p>\n';
      expect(getParagraphs(text)).toEqual(expected);
    });
    describe('getParagraphs', () => {
      it('should convert text into paragraphs wrapped in <p> tags', () => {
        const text = 'Even with single line!';
        const expected =
          '<p>Even with single line!</p>\n';
        expect(getParagraphs(text)).toEqual(expected);
      });
    });
  });

  describe('setPreformatted', () => {
    it('should replace preformatted blocks with <pre> tags', () => {
      const text = 'PRE{{0}}PRE';
      const preformatted = ['This is preformatted text'];
      const expected = '<pre>This is preformatted text</pre>';
      expect(setPreformatted(text, preformatted)).toEqual(expected);
    });
    it('should replace preformatted blocks with <pre> tags', () => {
      const text = 'PRE{{0}}PRE. Nice! PRE{{1}}PRE';
      const preformatted = ['This is preformatted text', 'And 1 more!'];
      const expected =
        '<pre>This is preformatted text</pre>. Nice! <pre>And 1 more!</pre>';
      expect(setPreformatted(text, preformatted)).toEqual(expected);
    });
  });

  describe('parseMarkdownToHtml', () => {
    it('should convert Markdown text to HTML with bold tag', () => {
      const text = 'This is **bold** text.';
      const expected = '<p>This is <b>bold</b> text.</p>\n';
      expect(parseMarkdownToHtml(text)).toEqual(expected);
    });

    it('should convert Markdown text to HTML with italic tag', () => {
      const text = 'This is _ita_lic_ text.';
      const expected = '<p>This is <i>ita_lic</i> text.</p>\n';
      expect(parseMarkdownToHtml(text)).toEqual(expected);
    });

    it('should convert Markdown text to HTML with tt tag', () => {
      const text = 'This is `monospaced` text.';
      const expected = '<p>This is <tt>monospaced</tt> text.</p>\n';
      expect(parseMarkdownToHtml(text)).toEqual(expected);
    });

    it('should convert Markdown text to HTML with pre tag', () => {
      const text = 'This is\n' +
        '```\n' +
        '**preformatted**\n' +
        '```\n' +
        'text.';
      const expected = '<p>This is\n' +
        '<pre>\n' +
        '**preformatted**\n' +
        '</pre>\n' +
        'text.</p>\n';
      expect(parseMarkdownToHtml(text)).toEqual(expected);
    });
  });
});
