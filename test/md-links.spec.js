const {
  isFiles, dir, isDirectory, validatePath, recursive, getLinks, validateLinks, readMd,
} = require('../Paths');
const {
  mdLinks,
} = require('../Md-Links');

jest.mock('node:process', () => ({
  argv: ['', '', 'Pruebas'],
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
  it('recursive should be a function', () => {
    expect(typeof recursive).toBe('function');
  });
  it('getLinks should be a function', () => {
    expect(typeof getLinks).toBe('function');
  });
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
