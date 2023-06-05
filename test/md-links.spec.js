const {
  isFiles, dir, isDirectory, validatePath, recursive, getLinks, validateLinks, readMd,
} = require('../Paths');
const {
  mdLinks,
} = require('../Md-Links');

jest.mock('node:process', () => ({
  argv: ['', '', 'Pruebasssssss'],
}));

describe('Path function', () => {
  it('isFiles should be a function', () => {
    expect(typeof isFiles).toBe('function');
  });
  it('dir should be a function', () => {
    expect(typeof dir).toBe('function');
  });
  it('isDirectory should be a function', () => {
    expect(typeof isDirectory).toBe('function');
  });
  it('validatePath should be a function', () => {
    expect(typeof validatePath).toBe('function');
  });
  it('validatePath should be returt absolute Path', () => {
    const userPath = 'Pruebas';
    const absolute = validatePath(userPath);
    expect(absolute).toBe('C:\\Users\\Natalie\\Desktop\\[ Nat ]\\Laboratoria\\5to Proyecto\\DEV005-md-links\\Pruebas');
  });
  it('recursive should be a function', () => {
    expect(typeof recursive).toBe('function');
  });
  it('getLinks should be a function', () => {
    expect(typeof getLinks).toBe('function');
  });
  /*   it('should return an array with the info of each link as an object (href, text, file)', () => {
    const fileRoute = 'Pruebas\\Directorio\\Archivos2md\\archivo4.md';
    const dataOfFile = '[GitHub](https://github.com/NatSama2)[Markdown](https://es.wikipedia.org/wiki/Markdown)';
    const arrayLinkInfo = [
      {
        file: 'Pruebas\\Directorio\\Archivos2md\\archivo4.md',
        href: 'https://github.com/NatSama2',
        text: 'GitHub',
      },
      {
        file: 'Pruebas\\Directorio\\Archivos2md\\archivo4.md',
        href: 'https://es.wikipedia.org/wiki/Markdown',
        text: 'Markdown',
      },
    ];
    expect(getLinks(dataOfFile, fileRoute)).toEqual(arrayLinkInfo);
  }); */
  it('statusLinks should be a function', () => {
    expect(typeof validateLinks).toBe('function');
  });
  it('readMd should be a function', () => {
    expect(typeof readMd).toBe('function');
  });
});

describe('Md-Links function', () => {
  it('mdLinks should be a function', () => {
    expect(typeof mdLinks).toBe('function');
  });
/*   it('mdLinks should return a promise', () => {
    expect(mdLinks).toBeInstanceOf(Promise);
  }); */
});

// Mockear la función fetch para simular que la respuestas sea exitosa
global.fetch = jest.fn().mockResolvedValue({
  status: 200,
  statusText: 'OK',
});
