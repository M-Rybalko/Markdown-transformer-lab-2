'use strict';

const { dirname } = require('path');
const fs = require('node:fs');
const { program } = require('commander');

const readFile = () => {
  const isExists = fs.existsSync(program.args[0]);
  if (!isExists) throw new Error('file not found');
  return fs.readFileSync(program.args[0], 'utf-8');
};

const writeToFile = (text, out) => {
  const path = dirname(out);
  const isExists = fs.existsSync(path);
  if (!isExists) throw new Error('out is not correct');
  fs.writeFileSync(out, text);
};

const separatePreformatted = (text) => {
  const preformatted = [];
  const preformattedText = text.match(
    /(?:^|\n)```\n?(.*?)\n?```(?:\n|$)/gs
  );
  if (!preformattedText) return { noPreformattedText: text, preformatted: [] };

  preformatted.push(...preformattedText);
  const noPreformattedText = preformatted.reduce(
    (acc, cur, index) => acc.replace(cur, `\nPRE{{${index}}}PRE\n`),
    text
  );
  return { noPreformattedText, preformatted };
};

module.exports = { readFile, writeToFile, separatePreformatted };
