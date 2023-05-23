// const fs = require('fs');
// const path = require('path');
const { readMd, recursive } = require('./Paths');

const route = process.argv[2];

const mdLinks = (path) => new Promise((resolve, reject) => {
  Promise.all(recursive(path).map((file) => readMd(file)))
    .then((results) => {
      const arrObjMd = [].concat(...results);
      resolve(arrObjMd);
    })
    .catch((error) => {
      console.log(':c', error);
      reject(error);
    });
});

mdLinks(route)
  .then((res) => {
    console.log('Links leídos de los archivos Md:'.yellow, res);
  })
  .catch((err) => {
    console.log('err', err);
  });

/* module.exports = {
  /mdLinks,
  readMd,
}; */

/* if (!path.isAbsolute(file)) {
    toAbsolute(file);
  }; */
