const markov = require('../lib');
const fs = require('fs');

describe('when importing', () => {
  test('module is object', () => {
    expect(typeof markov).toBe('object');
  });

  test('module has StringChain', () => {
    expect(typeof markov.StringChain).toBe('function');
  });
});

describe('when instancing StringChain', () => {
  it('can be constructed without an argument', () => {
    expect(new markov.StringChain()).toBeInstanceOf(markov.StringChain);
  });

  it('can be constructed with a numerical argument', () => {
    expect(new markov.StringChain(2)).toBeInstanceOf(markov.StringChain);
  });

  it('can be constructed with a string argument', () => {
    expect(new markov.StringChain('./test/test.mko')).toBeInstanceOf(markov.StringChain);
  });
});

describe('when using StringChain', () => {
  let stringChain;

  beforeEach(() => {
    stringChain = new markov.StringChain();
  });

  it('can be fed strings', () => {
    stringChain.feedString('this is a test string');
  });

  it('can be fed a text file', () => {
    stringChain.feedFile('./test/test.txt');
  });

  it('can generate a string', () => {
    stringChain.feedString('this is a test string');

    let string = stringChain.generateString();

    expect(typeof string).toBe('string');
    expect(string.length).toBeGreaterThan(0);
  });

  it('can generate a string with a starting token', () => {
    stringChain.feedFile('./test/test.txt');

    let string = stringChain.generateStringFromToken('Press');

    expect(typeof string).toBe('string');
    expect(string.length).toBeGreaterThan(0);
    expect(string.startsWith('Press')).toBeTruthy();
  });

  it('correctly shows when it is empty', () => {
    expect(stringChain.isEmpty()).toBeTruthy();

    stringChain.feedString('this is a test string');

    expect(stringChain.isEmpty()).toBeFalsy();
  });

  it('can be saved to file', () => {
    stringChain.feedString('this is a test string');
    stringChain.save('./test/generated.mko');

    expect(fs.existsSync('./test/generated.mko')).toBeTruthy();
  });

  afterAll(() => {
    fs.unlinkSync('./test/generated.mko')
  })
})
