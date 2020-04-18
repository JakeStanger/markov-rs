/// <reference types="node" />

export class StringChain {
  /**
   * Creates a new chain, or loads from file.
   * If a string argument is supplied, this is used from the path to load from.
   * If an numerical argument is supplied, this is used as the chain order. This must be an integer.
   * @param initArg The chain order, or file path.
   */
  constructor(initArg?: string | number);

  /** Returns true if the chain is empty. */
  isEmpty(): boolean;

  /** Adds a string to the chain.
   *
   * @param str: The string to add
   */
  feedString(str: string): void;

  /**
   * Reads a text file at the specified path and adds its contents to the chain.
   *
   * This file should be formatted such that each line is a new sentence.
   * Punctuation may be included if it is desired.
   *
   * @param path The file path to read from
   */
  feedFile(path: string): void;

  /** Generates a random string of text using the chain. */
  generateString(): string;

  /**
   * Generates a random string of text using the chain,
   * starting with the specified token.
   *
   * If the token is not found in the chain,
   * an empty string is returned.
   *
   * @param token The starting token
   */
  generateStringFromToken(token: string): string;

  /**
   * Saves the chain to the specified path
   * so that it can be loaded again later.
   *
   * @param path The file path to save to
   */
  save(path: string): void;
}
