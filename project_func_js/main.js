const path = require('path');
const fn = require('./functions');

const dirPath = path.join(__dirname, "legendas");

fn.readDirectory(dirPath) 
  .then(allFiles => fn.elementsFinishedWith(allFiles, ".srt")) // I have all the dir pathes
  .then(filteredFiles => fn.readFiles(filteredFiles)) // I have only .srt pathes
  .then(contentFiles => contentFiles.join('\n')) // I have the content of the files
  .then(contentGathered => contentGathered.split('\n')) // I have all the content of all the files gathered in 1 string
  .then(lines => fn.removeIfEmpty(lines)) // I have all the content splitted in several lines
  .then(lines => fn.removeIfIncludes(lines, "-->")) // I have all the content free of empty lines
  .then(console.log); // I have all the content free of the time