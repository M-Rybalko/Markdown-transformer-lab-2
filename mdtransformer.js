'use strict';

const { program, Option } = require('commander');
const validator = require('./mdvalidator');
const fs = require('node:fs');
const { dirname } = require('path');

const options = program.opts();
const preformatted = [];
const tags = [
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

const getParagraphs = (text) => text.split('\n\n').reduce((acc, cur) =>
  `${acc}<p>${cur}</p>\n`, ''
);

const separatePreformatted = (text) => {
  const preformattedText = text.match(
    /(?:^|\n)```(?:\n)?(.*?)(?:\n)?```(?:\n|$)/gs
  );
  if (!preformattedText) return text;

  preformatted.push(...preformattedText);
  return preformatted.reduce(
    (acc, cur, index) => acc.replace(cur, `\nPRE{{${index}}}PRE\n`),
    text
  );
};

const setInversed  = (text) => {
  for (const pre of preformatted) {
    const newPre = `\x1b[7m${pre.replace(/(?:\n)```/g, '')}\x1b[27m`;
    text = text.replace(`PRE{{${preformatted.indexOf(pre)}}}PRE`, newPre);
  }
  return text;
};

const setPreformatted = (text) => {
  for (const pre of preformatted) {
    const newPre = `<pre>${pre.replace(/(?:\n)```/g, '')}</pre>`;
    text = text.replace(`PRE{{${preformatted.indexOf(pre)}}}PRE`, newPre);
  }
  return text;
};

const readFile = () => {
  const isExists = fs.existsSync(program.args[0]);
  if (!isExists) throw new Error('file not found');
  return fs.readFileSync(program.args[0], 'utf-8');
};

const writeToHtml = (text) => {
  const path = dirname(options.out);
  const isExists = fs.existsSync(path);
  if (!isExists) throw new Error('out is not correct');
  fs.writeFileSync(options.out, text);
};

const parseMarkdownToHtml = (text) => {
  validator.validateNesting(text, tags);
  let newText = getParagraphs(text);
  for (const tag of tags) {
    newText = newText.replace(tag.pattern, tag.html);
  }
  validator.validateUnclosed(newText);
  newText = setPreformatted(newText);
  options.out ? writeToHtml(newText) : console.log(newText);
};

const parseMarkdownToEsc = (text) => {
  validator.validateNesting(text, tags);
  let newText = text;
  for (const tag of tags) {
    newText = newText.replace(tag.pattern, tag.esc);
  }
  validator.validateUnclosed(newText);
  newText = setInversed(newText);
  options.out ? writeToHtml(newText) : console.log(newText);
};

program.name('MD to HTML transformer')
  .description('Transforms a MD file to HTML')
  .argument('<path>', 'path to markdown file')
  .option('-o, --out <path>', 'path to html file')
  .addOption(
    new Option('-f, --format <type>', 'output format').choices([
      'html',
      'esc',
    ])
  )
  .action(() => {
    options.format === 'html' ?
      parseMarkdownToHtml(separatePreformatted(readFile(program.args[0]))) :
      parseMarkdownToEsc(separatePreformatted(readFile(program.args[0])));
  });
program.parse();
