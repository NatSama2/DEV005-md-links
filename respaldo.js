
// Validar si la ruta existe
if (fs.existsSync(rout)) {
  console.log('El directorio existe:'.bgMagenta, rout);

  // convertir ruta a absoluta
  console.log('Ruta absoluta: '.yellow, path.resolve(rout));

  // Verificar si la ruta es un directorio
  const isDirectory = fs.lstatSync(rout).isDirectory();
  if (isDirectory) {
    // Mostrar archivos en el directorio
    const files = fs.readdirSync(rout);
    console.log('Archivos en el directorio:'.blue, files);

    // Mostrar archivos con extensión .md
    const mdFiles = files.filter((file) => path.extname(file) === '.md');
    if (mdFiles.length > 0) {
      console.log('Lista de archivos con extensión .md:'.blue);
      mdFiles.forEach((file) => {
        console.log(file.yellow);
      });
    } else {
      console.log('El directorio no contiene archivos .md'.red);
    
    // Función recursiva
    const recursive = (route) => {
      let arrayMd = [];

      if (fs.statSync(route).isFile()) {
        arrayMd.push(route);
      } else {
        const elements = fs.readdirSync(route);
        elements.forEach((element) => {
          let newRoute = path.join(route, element);         
            arrayMd = arrayMd.concat(recursive(newRoute));
        });
      }
      return arrayMd.filter((file) => path.extname(file) === '.md');
    };
    console.log('Lista de archivos .md encontrados de forma recursiva:'.blue);
    console.log(recursive(rout));
  }

  } else {
    console.log('La ruta no es un directorio'.red);
  }
} else {
  console.log('La ruta no existe :c'.red);
};