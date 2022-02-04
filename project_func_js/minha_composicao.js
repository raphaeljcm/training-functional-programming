const path = require('path');
const fn = require('./functions');

const dirPath = path.join(__dirname, "legendas");

const symbols = [
  '.', '?', '-', ',', '"', '♪',
  '_', '<i>', '</i>', '\r', '[', 
  ']', '(', ')', '!'
];

const palavrasMaisUsadas = fn.composicao(
  fn.readDirectory,
  fn.elementsFinishedWith(".srt"),
  fn.readFiles,
  fn.joiningElements,
  fn.separatingTextBy('\n'),
  fn.removeIfEmpty,
  fn.removeIfIncludes("-->"),
  fn.removeIfOnlyNumber,
  fn.removeSymbols(symbols),
  fn.joiningElements,
  fn.separatingTextBy(' '),
  fn.removeIfEmpty,
  fn.removeIfOnlyNumber,
  fn.joiningWords,
  fn.orderByNumericAttribute('amount', 'desc'),
  fn.creatingJsonFile(dirPath),
  () => fn.readingJsonFile(dirPath)
);

palavrasMaisUsadas(dirPath).then(console.log);