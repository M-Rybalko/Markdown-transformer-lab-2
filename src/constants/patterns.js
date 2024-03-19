'use strict';

const patterns = [
  { pattern: /(?<=[ ,.:;>\n\t]|^)\*\*(?=\S)(.+?)(?<=\S)\*\*(?=[ ,.:;<\n\t]|$)/g,
    html: '<b>$1</b>',
    esc: '\x1b[1m$1\x1b[22m',
  },
  {
    pattern: /(?<=[ ,.:;>\n\t]|^)_(?=\S)(.+?)(?<=\S)_(?=[ ,.:;<\n\t]|$)/g,
    html: '<i>$1</i>',
    esc: '\x1b[3m$1\x1b[23m',
  },
  {
    pattern: /(?<=[ ,.:;>\n\t]|^)`(?=\S)(.+?)(?=\S)`(?=[ ,.:;<\n\t]|$)/g,
    html: '<tt>$1</tt>',
    esc: '\x1b[7m$1\x1b[27m',
  },
];

module.exports = patterns;
