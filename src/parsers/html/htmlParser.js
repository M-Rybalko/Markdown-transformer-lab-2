'use strict';

const validator = require('../../validators/validator');
const patterns = require('../../constants/patterns');
const { separatePreformatted } = require('../../utils/utils');

const getParagraphs = (text) => text.split('\n\n').reduce((acc, cur) =>
  `${acc}<p>${cur}</p>\n`, ''
);

const setPreformatted = (text, preformatted) => {
  for (const pre of preformatted) {
    const newPre = `<pre>${pre.replace(/\n```/g, '')}</pre>`;
    text = text.replace(`PRE{{${preformatted.indexOf(pre)}}}PRE`, newPre);
  }
  return text;
};

const parseMarkdownToHtml = (text) => {
  const { noPreformattedText, preformatted } = separatePreformatted(text);
  let newText = noPreformattedText;
  validator.validateNesting(text, patterns);
  newText = getParagraphs(newText);
  for (const tag of patterns) {
    newText = newText.replace(tag.pattern, tag.html);
  }
  validator.validateUnclosed(newText);
  newText = setPreformatted(newText, preformatted);
  return newText;
};

module.exports = {
  getParagraphs,
  setPreformatted,
  parseMarkdownToHtml,
};
