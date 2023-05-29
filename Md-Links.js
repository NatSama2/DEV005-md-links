// const fs = require('fs');
// const path = require('path');
const {
  readMd, recursive, validatePath, route, validateLinks,
} = require('./Paths');

const mdLinks = (path, options = { validate: false }) => new Promise((resolve, reject) => {
  if (validatePath(path) === undefined) {
    reject(new Error('La ruta no existe :c'.bgRed));
    return;
  }
  Promise.all(recursive(path).map((file) => readMd(file)))
    .then((results) => {
      const arrObjMd = [].concat(...results);
      if (!options.validate) {
        resolve(arrObjMd);
      } else {
        resolve(validateLinks(arrObjMd));
      }
    })
    .catch((error) => {
      console.log(':c', error);
      reject(error);
    });
});

module.exports = {
  mdLinks,
  route,
};

/* if (!path.isAbsolute(file)) {
    toAbsolute(file);
  }; */
