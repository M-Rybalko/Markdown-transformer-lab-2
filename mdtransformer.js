'use strict';

const { program } = require('commander');
const validator = require('./mdvalidator');
const fs = require('node:fs');
const { dirname } = require('path');

const options = program.opts();
const preformatted = [];
const tags = [
  { pattern: /(?<=[ ,.:;>\n\t]|^)\*\*(?=\S)(.+?)(?<=\S)\*\*(?=[ ,.:;<\n\t]|$)/g,
    replacement: '<b>$1</b>',
  },
  {
    pattern: /(?<=[ ,.:;>\n\t]|^)_(?=\S)(.+?)(?<=\S)_(?=[ ,.:;<\n\t]|$)/g,
    replacement: '<i>$1</i>',
  },
  {
    pattern: /(?<=[ ,.:;>\n\t]|^)`(?=\S)(.+?)(?=\S)`(?=[ ,.:;<\n\t]|$)/g,
    replacement: '<tt>$1</tt>',
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

const parseMarkdown = (text) => {
  validator.validateNesting(text, tags);
  let newText = getParagraphs(text);
  for (const tag of tags) {
    newText = newText.replace(tag.pattern, tag.replacement);
  }
  validator.validateUnclosed(newText);
  newText = setPreformatted(newText);
  options.out ? writeToHtml(newText) : console.log(newText);
};

program.name('MD to HTML transformer')
  .description('Transforms a MD file to HTML')
  .argument('<path>', 'path to markdown file')
  .option('-o, --out <path>', 'path to html file')
  .action(() => {
    parseMarkdown(separatePreformatted(readFile(program.args[0])));
  });
program.parse();
