'use strict';

const { program, Option } = require('commander');
const { writeToFile, readFile } = require('./src/utils/utils');
const { parseMarkdownToEsc } = require('./src/parsers/esc/escParser');
const { parseMarkdownToHtml } = require('./src/parsers/html/htmlParser');

const options = program.opts();

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
    const res = options.format === 'html' ?
      parseMarkdownToHtml(readFile(program.args[0])) :
      parseMarkdownToEsc(readFile(program.args[0]));
    options.out ? writeToFile(res, options.out) : console.log(res);
  });
program.parse();
