'use strict';

const markdownElements = [
  /(?<=[ ,.:;\n\t]|^)\*\*(?=\S)/g,
  /(?<=\S)\*\*(?=[ ,.:;\n\t]|$)/g,
  /(?<=[ ,.:;\n\t]|^)_(?=\S)/g,
  /(?<=\S)_(?=[ ,.:;\n\t]|$)/g,
  /(?<=[ ,.:;\n\t]|^)`(?=\S)/g,
  /(?=\S)`(?=[ ,.:;\n\t]|$)/g,
];

const getMarkdown = (text, cases) => {
  const markdown = [];
  for (const element of cases) {
    const formatted = text.match(element.pattern);
    if (formatted) {
      markdown.push(...formatted.map((match) =>
        match.replace(element.pattern, '$1')
      ));
    }
  }
  return markdown;
};

const validateNesting = (text, cases) => {
  const elements = getMarkdown(text, cases);
  for (const element of elements) {
    for (const cs of cases) {
      const errorList = element.match(cs.pattern);
      if (errorList) {
        throw new Error('Invalid file. Nested markup is not allowed');
      }
    }
  }
};

const validateUnclosed = (text) => {
  for (const element of markdownElements) {
    const errorList = text.match(element);
    if (errorList) {
      throw new Error('Invalid file. Trailing markup is not allowed');
    }
  }
};

module.exports = { validateNesting, validateUnclosed, markdownElements };
