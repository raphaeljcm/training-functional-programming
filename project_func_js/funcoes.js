const fs = require('fs');
const path = require('path');

function readDirectory(dirPath) {
  return new Promise((resolve, reject) => {
    try {
      let files = fs.readdirSync(dirPath);
      const fullPath = files.map(file => path.join(dirPath, file));

      resolve(fullPath);
    } catch(err) {
      reject(err);
    }
  });
}

function readFiles(arrayOfPathes) {
  return Promise.all(arrayOfPathes.map(eachElementPath => readEachFile(eachElementPath)));
}

function readEachFile(path) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, (err, content) => {
      if(content) {
        resolve(content.toString());
      } else {
        reject(err);
      }
    });
  });
}

function elementsFinishedWith(array, custom) {
  return array.filter(el => el.endsWith(custom));
}

function removeIfEmpty(array) {
  return array.filter(el => el.trim());
}

function removeIfIncludes(array, custom) {
  return array.filter(el => !el.includes(custom));
}

module.exports = {
  readDirectory,
  readFiles, 
  readEachFile,
  elementsFinishedWith,
  removeIfEmpty,
  removeIfIncludes,
}