# markov-rs
[![Build Status](https://travis-ci.com/JakeStanger/markov-rs.svg?branch=master)](https://travis-ci.com/JakeStanger/markov-rs)

Node bindings for the Rust module 'markov'.

This currently only offers a string markov chain, and a subsection of (arguably) the most useful methods.
Typescript typings are included.

## Installation

This package requires Rust to be installed. 
Several Linux distros offer it in their official repos, 
or you can grab it from [here](https://www.rust-lang.org/learn/get-started).

You will also require `gcc`, `make`, and `python` installed 
for `node-gyp` to do its business.
In most cases you probably will.

## Usage

Import the package:

```ts
// vanilla node
const StringChain = require('markov-rs').StringChain;

// typescript
import { StringChain } from 'markov-rs';
```

Then create a new instance:

```ts
const chain = new StringChain();

// or to create a chain of specific order:
const chain = new StringChain(2);

// or to load a previously saved chain:
const chain = new StringChain('./path/to/chain.mko');
```

And start using it:

```ts
console.log(chain.isEmpty()) // -> true

// then populate:
chain.feedString('here is a sentence.');

// or populate using a file.
// The file should contain a sentence per line.
chain.feedFile('./path/to/text/file.txt');

// to generate from your chain:
const sentence = chain.generateString();

// to guarantee it starts with a token:
const promptedSentence = chain.generateStringFromToken('here');

// and to save it to disk to be loaded again later:
chain.save('./path/to/chain.mko');
```
