#!/usr/bin/env node
const fs = require('fs');
const colors = require('colors');
const {
  mdLinks, route,
} = require('./Md-Links');
const {
  statsLinks, broken,
} = require('./Paths');

const welcomeContent = fs.readFileSync('welcome.md', 'utf-8').cyan;
console.log(welcomeContent);

setTimeout(() => {
  const option1 = process.argv[3];
  const option2 = process.argv[4];

  if (option1 === undefined && option2 === undefined) {
    mdLinks(route, { validate: false })
      .then((links) => {
        console.log(`${'Links leídos de los archivos Md:'.yellow}\n`);
        links.forEach((link) => {
          console.log(`${colors.green('Link:')} ${link.href}`);
          console.log(`${colors.green('Texto:')} ${link.text}`);
          console.log(`${colors.green('File:')} ${link.file}\n`);
        });
      })
      .catch((err) => {
        console.log('Error:', err.message);
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
            console.log(colors.cyan('File:'), link.File);
            console.log(colors.cyan('Status:'), link.Status);
            console.log(colors.cyan('StatusText:'), `${link.StatusText}\n`);
          } else {
            console.log(colors.red('Link:'), link.Link);
            console.log(colors.red('Text:'), link.Text);
            console.log(colors.red('File:'), link.File);
            console.log(colors.red('Status:'), link.Status);
            console.log(colors.red('StatusText:'), `${link.StatusText}\n`);
          }
        });
      })
      .catch((err) => {
        console.log('Error:', err.message);
      });
  }

  if (option1 === '--stats' && option2 === undefined) {
    mdLinks(route, { validate: false })
      .then((res) => {
        console.log(`${'Estadísticas básicas de los Links:'.green}\n`, statsLinks(res));
      })
      .catch((err) => {
        console.log('err', err.message);
      });
  }

  if ((option1 === '--stats' && option2 === '--validate') || (option1 === '--validate' && option2 === '--stats')) {
    mdLinks(route, { validate: false })
      .then((res) => {
        // console.log(`${'Estadísticas de la válidación de los Links:'.gray}\n`, statsLinks(res, true));
        const a = statsLinks(res);
        console.log(`${'Estadísticas de la válidación de los Links:'.green}`);
        console.log(`${a}Broken: ${broken.length}`);
      })
      .catch((err) => {
        console.log('err', err.message);
      });
  }
}, 3000);
