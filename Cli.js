const {
  mdLinks, route,
} = require('./Md-Links');
const {
  statsLinks,
} = require('./Paths');

const option1 = process.argv[3];
const option2 = process.argv[4];

if (option1 === undefined && option2 === undefined) {
  mdLinks(route, { validate: false })
    .then((res) => {
      console.log('Links leídos de los archivos Md:'.cyan, res);
    })
    .catch((err) => {
      console.log('err', err);
    });
}

if (option1 === '--validate' && option2 === undefined) {
  mdLinks(route, { validate: true })
    .then((res) => {
      console.log('Validación de Links:'.cyan, res);
    })
    .catch((err) => {
      console.log('err', err);
    });
}

if (option1 === '--stats' && option2 === undefined) {
  mdLinks(route, { validate: false })
    .then((res) => {
      console.log('Estadísticas básicas de los Links'.cyan, statsLinks(res));
    })
    .catch((err) => {
      console.log('err', err);
    });
}

if ((option1 === '--stats' && option2 === '--validate') || (option1 === '--validate' && option2 === '--stats')) {
  mdLinks(route, { validate: true })
    .then((res) => {
      console.log('Estadísticas de la válidación de los Links'.cyan, statsLinks(res, true));
    })
    .catch((err) => {
      console.log('err', err);
    });
}
