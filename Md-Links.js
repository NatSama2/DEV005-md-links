const fs = require('fs');

//Leer archivo 
const readMD = (file) => {
  return new Promise((resolve, reject) => {
    fs.readFile(file, 'utf8', (err, data) => {
      if (err) reject(err);
      resolve(data);
    });
  });
};
const readMDs = (files) => {
  return Promise.all(files.map((file) => readMD(file)));
};


const mdLinks = (path, options) => {
  return new Promise((resolve, reject) => {
    

  });
};
  
module.exports = {
  mdLinks,
  readMD,
  readMDs
};
  

/* if (!path.isAbsolute(file)) {
    toAbsolute(file);
  }; */