const colors = require('colors');
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
    .then((links) => {
      console.log(`${'Validación de Links:'.yellow}\n`);
      links.forEach((link) => {
        if (link.StatusText === 'OK') {
          console.log(colors.cyan('Link:'), link.Link);
          console.log(colors.cyan('Text:'), link.Text);
          // console.log(colors.cyan('File:'), link.file);
          console.log(colors.cyan('Status:'), link.Status);
          console.log(colors.cyan('StatusText:'), `${link.StatusText}\n`);
        } else {
          console.log(colors.red('Link:'), link.Link);
          console.log(colors.red('Text:'), link.Text);
          // console.log(colors.red('File:'), link.file);
          console.log(colors.red('Status:'), link.Status);
          console.log(colors.red('StatusText:'), `${link.StatusText}\n`);
        }
      });
    })
    .catch((err) => {
      console.log('Error:', err);
    });
}

if (option1 === '--stats' && option2 === undefined) {
  mdLinks(route, { validate: false })
    .then((res) => {
      console.log(`${'Estadísticas básicas de los Links:'.cyan}\n`, statsLinks(res));
    })
    .catch((err) => {
      console.log('err', err);
    });
}

if ((option1 === '--stats' && option2 === '--validate') || (option1 === '--validate' && option2 === '--stats')) {
  mdLinks(route, { validate: true })
    .then((res) => {
      console.log(`${'Estadísticas de la válidación de los Links:'.cyan}\n`, statsLinks(res, true));
    })
    .catch((err) => {
      console.log('err', err);
    });
}
