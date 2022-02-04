const fs = require('fs');
const path = require('path');

function composicao(...fns) {
  return function(valor) {
    return fns.reduce(async(acc, fn) => {
      if(Promise.resolve(acc) === acc) { // is it a promise?
        return fn(await acc);
      } else {
        return fn(acc);
      }
    }, valor);
  }
}

function readDirectory(dirPath) {
  return new Promise((resolve, reject) => {
    try {
      const files = fs.readdirSync(dirPath).map(file => path.join(dirPath, file));

      resolve(files);
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

function elementsFinishedWith(custom) {
  return function(array) {
    return array.filter(el => el.endsWith(custom));
  }
}

function removeIfEmpty(array) {
  return array.filter(el => el.trim());
}

function removeIfIncludes(custom) {
  return function(array) {
    return array.filter(el => !el.includes(custom));
  }
}

function removeIfOnlyNumber(array) {
  return array.filter(el => {
    const num = parseInt(el.trim());

    return num !== num; // it'll only be TRUE if it return NaN, which means, there are words
  }); 
}

function removeSymbols(symbols) {
  return function(array) {
    return array.map(el => {
      return symbols.reduce((acc, symbol) => {
        return acc.split(symbol).join('');
      }, el); 
    });
  }
}

function joiningElements(array) {
  return array.join(' '); 
}  

function separatingTextBy(symbol) {
  return function(text) {
    return text.split(symbol);
  }
}

function joiningWords(words) { 
  return Object.values(words.reduce((acc, el) => { // with Object.values I'll only return the values, didn't know that, awesome!
    const word = el.toLowerCase();
    const amount = acc[word] ? acc[word].amount + 1 : 1;

    acc[word] = { word, amount } // acc = {} which means: { word: {word: word(variable), amount: amount(variable)}}. Because of that I used Object.values

    return acc;
  }, {})); 
}

function orderByNumericAttribute(key, order = 'asc') {
  return function(array) {
    const asc = (obj1, obj2) => obj1[key] - obj2[key];
    const desc = (obj1, obj2) => obj2[key] - obj1[key];
    
    // Here I'm using Imutability, pay attention
    // [...array] I'm creating a NEW array and cloning the array passed in the function into it
    // this way, I won't make a change in the previous array, very important
    // If I had not done that, it would be a coleteral damage and would change my array
    // I can do the spread operator or Object.freeze to prevent any updates in it
    return [...array].sort(order === 'asc' ? asc : desc);
  }
}

function creatingJsonFile(dirPath) {
  return function(array) {
    return new Promise((resolve, reject) => {
      try { 
        const json = JSON.stringify(array);
        const fullPath = path.join(dirPath, 'subtitles.json')

        fs.writeFile(fullPath, json, 'utf-8', err => {
          if(err) {
            reject(err);
          } else {
            resolve('File created.');
          }
        });

      } catch(err) {
        reject(err);
      }
    });
  }
}

function readingJsonFile(dirPath) {
  return new Promise((resolve, reject) => {
    try {
      const fullPath = path.join(dirPath, 'subtitles.json');
      fs.readFile(fullPath, (err, content) => {
        if(content) {
          const fileInJson = JSON.parse(content);
          resolve(fileInJson);
        } else {
          reject(err);
        }
      });
    } catch(err) {
      reject(err);
    }
  });
}
  
module.exports = {
  composicao,
  readDirectory,
  readFiles, 
  readEachFile,
  elementsFinishedWith,
  removeIfEmpty,
  removeIfIncludes,
  removeIfOnlyNumber,
  removeSymbols,
  joiningElements,
  separatingTextBy,
  joiningWords,
  orderByNumericAttribute,
  creatingJsonFile,
  readingJsonFile,  
}