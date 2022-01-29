const path = require('path');
const fn = require('./functions');

const dirPath = path.join(__dirname, "legendas");

const symbols = [
  '.', '?', '-', ',', '"', '♪',
  '_', '<i>', '</i>', '\r', '[', 
  ']', '(', ')', '!'
];

fn.readDirectory(dirPath) 
  .then(fn.elementsFinishedWith(".srt")) // I have all the dir pathes
  .then(fn.readFiles) // I have only .srt pathes
  .then(fn.gatheringElements) // I have the content of the files
  .then(fn.separatingTextBy('\n')) // I have all the content of all the files gathered in 1 string
  .then(fn.removeIfEmpty) // I have all the content splitted in several lines
  .then(fn.removeIfIncludes("-->")) // I have all the content free of empty lines
  .then(fn.removeIfOnlyNumber)  // I have all the content free of the time
  .then(fn.removeSymbols(symbols)) // I have all the content free of numbers
  .then(fn.gatheringElements) // I have all the content free of any symbols
  .then(fn.separatingTextBy(' ')) // I have a big string with all the words
  .then(fn.removeIfEmpty) // I have an array with each word 
  .then(fn.removeIfOnlyNumber) // I removed all the empty spaces again
  .then(fn.gatheringWords) // I removed all the numbers again
  .then(fn.orderByNumericAttribute('amount', 'desc')) // I created an object with all the words and its amount, we're almost there
  .then(console.log); // Now I have what I always wanted, all the words order by the amount in ascending or descending order!