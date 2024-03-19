'use strict';
const validator = require('../../validators/validator');
const patterns = require('../../constants/patterns');
const { separatePreformatted } = require('../../utils/utils');

const setInversed  = (text, preformatted) => {
  for (const pre of preformatted) {
    const newPre = `\x1b[7m${pre.replace(/\n```/g, '')}\x1b[27m`;
    text = text.replace(`PRE{{${preformatted.indexOf(pre)}}}PRE`, newPre);
  }
  return text;
};

const parseMarkdownToEsc = (text) => {
  const { noPreformattedText, preformatted } = separatePreformatted(text);
  validator.validateNesting(text, patterns);
  let newText = noPreformattedText;
  for (const tag of patterns) {
    newText = newText.replace(tag.pattern, tag.esc);
  }
  validator.validateUnclosed(newText);
  newText = setInversed(newText, preformatted);
  return newText;
};

module.exports = { setInversed, parseMarkdownToEsc };

