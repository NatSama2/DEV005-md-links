const fs = require('fs');
const { readMd, recursive } = require('./Paths');
// const path = require('path');
const route = process.argv[2];

const mdLinks = (route) => new Promise((resolve, reject) => {
  Promise.all(recursive(route).map((file) => readMd(file)))
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
    console.log('Links', res);
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
